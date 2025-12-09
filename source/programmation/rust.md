---
title: Connexion à PostgreSQL en rust avec tokio-postgres
head:
  - - meta
    - name: 'keywords'
      content: 'rust, postgresql, tokio, cargo.toml, crate'
  - - meta
    - property: 'og:title'
      content: Connexion à PostgreSQL en rust avec tokio-postgres
  - - meta      
    - property: 'og:description'
      content: Etablissement d'une connexion à PostgreSQL en Rust
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Connexion à PostgreSQL en rust avec tokio-postgres
  - - meta      
    - property: 'twitter:description'
      content: Etablissement d'une connexion à PostgreSQL en Rust    
---

# Rust et PostgreSQL

Pour utiliser [Rust](https://rust-lang.org/ "Langage Rust") avec PostgreSQL, nous avons plusieurs bibliothèques disponibles.

Pour cette article, nous allons utiliser la crate [`postgres`](https://crates.io/crates/postgres) en mode synchrone 
(ou plus souvent [`tokio-postgres`](https://crates.io/crates/tokio-postgres) pour les applications asynchrones) 
en Rust pour interagir avec une base de données PostgreSQL.

Je ne détaille pas ici la création d'un nouveau projet, je vous laisse regarder la commande `cargo new` que vous trouverez 
dans la [documentation officielle](https://doc.rust-lang.org/cargo/getting-started/first-steps.html "cargo new")

## Configuration de base

Le premier point est de déclarer les dépendances dans le fichier `Cargo.toml`.

### Ajouter les dépendances

Dans votre `Cargo.toml`:

```toml
[dependencies]
tokio = { version = "1.0", features = ["full"] }
tokio-postgres = { version = "0.7", features = ["with-uuid-1"] }
```

::: tip Astuces
La liste des `features` activable est disponible dans la documentation.
:::

## Connexion à la base de données

ensuite dans le fichier `main.rs`

### Exemple synchrone (avec `postgres`)

```rust
use postgres::{Client, NoTls, Error};

fn main() -> Result<(), Error> {
    // Chaîne de connexion
    let conn_str = "host=localhost user=postgres dbname=mydb password=1234";
    let mut client = Client::connect(conn_str, NoTls)?;

    // Exécution d'une requête simple pour récupérer la PK et le nom de l'utilisateur
    for row in client.query("SELECT id, name FROM users", &[])? {
        let id: i32 = row.get(0);
        let name: String = row.get(1);
        println!("id: {}, name: {}", id, name);
    }

    Ok(())
}
```

::: tip Remarques
Ici les informations de connexion sont connectés en dur, vous pouvez par exemple les transmettre en variables d'environnement
et utiliser le [module standard](https://doc.rust-lang.org/std/env/index.html "std::env") `std::env`
:::

### Exemple asynchrone (avec `tokio-postgres`)

```rust
use tokio_postgres::{NoTls, Error};

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Chaîne de connexion
    let conn_str = "host=localhost user=postgres dbname=mydb password=1234";
    let (client, connection) = tokio_postgres::connect(conn_str, NoTls).await?;

    // Exécution de la connexion en arrière-plan
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Erreur de connexion: {}", e);
        }
    });

    // Exécution d'une requête simple
    let rows = client.query("SELECT id, name FROM users", &[]).await?;
    for row in rows {
        let id: i32 = row.get(0);
        let name: String = row.get(1);
        println!("id: {}, name: {}", id, name);
    }

    Ok(())
}
```

## Requêtes paramétrées

Les requêtes paramétrés sont el moyen le plus sur d'éviter les failles d'injections SQL.

### Insertion de données

```rust
let name = "Alice";
let age = 30;
client.execute(
    "INSERT INTO users (name, age) VALUES ($1, $2)",
    &[&name, &age],
).await?;
```

### Sélection avec filtre

```rust
let min_age = 25;
let rows = client.query(
    "SELECT name FROM users WHERE age > $1",
    &[&min_age],
).await?;
```


## Transactions

```rust
let transaction = client.transaction().await?;
transaction.execute("INSERT INTO users (name) VALUES ($1)", &[&"Bob"]).await?;
transaction.execute("UPDATE users SET age = $1 WHERE name = $2", &[&40, &"Bob"]).await?;
transaction.commit().await?;

// Ou utiliser transaction.rollback().await?; (ou savepoint)
```

::: tip Remarques
Pour plus d'informations concernant les transactions, vous pouvez consulter la [documentation](https://docs.rs/tokio-postgres/latest/tokio_postgres/struct.Transaction.html "Transaction PostgreSQL en Rust"). 
:::


## Gestion des erreurs

Il ne faut pas non plus oublier la gestion des erreurs.

```rust
match client.query_one("SELECT name FROM users WHERE id = $1", &[&1]).await {
    Ok(row) => {
        let name: String = row.get(0);
        println!("Nom: {}", name);
    }
    Err(e) => eprintln!("Erreur: {}", e),
}
```

## Utilisation de types personnalisés

Si vous utilisez des types PostgreSQL spécifiques (comme `UUID`), assurez-vous d'activer les features appropriées dans `Cargo.toml` :

```toml
tokio-postgres = { version = "0.7", features = ["with-uuid-1"] }
```

Exemple d'utilisation :

```rust
use uuid::Uuid;

let id = Uuid::new_v4();
client.execute(
    "INSERT INTO users (id, name) VALUES ($1, $2)",
    &[&id, &"Charlie"],
).await?;
```

## Pool de connexions (avec `bb8`)

Pour gérer un pool de connexions, nous allons ajouter les crates `bb8` et `bb8-postgres` à nos dépendances, ajouter ceci dans le fichier `Cargo.toml`

```toml
bb8 = "0.8"
bb8-postgres = "0.8"
```

Exemple :
```rust
use bb8_postgres::PostgresConnectionManager;
use bb8::Pool;

type PgPool = Pool<PostgresConnectionManager<NoTls>>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let manager = PostgresConnectionManager::new_from_stringlike(
        "host=localhost user=postgres dbname=mydb password=1234",
        NoTls,
    )?;
    let pool = Pool::builder().build(manager).await?;

    let conn = pool.get().await?;
    let rows = conn.query("SELECT id, name FROM users", &[]).await?;
    // ...
    Ok(())
}
```

## Exemple complet (asynchrone)

```rust
use tokio_postgres::{NoTls, Error};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let (client, connection) = tokio_postgres::connect(
        "host=localhost user=postgres dbname=mydb password=1234",
        NoTls,
    ).await?;

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Erreur de connexion: {}", e);
        }
    });

    // Création d'une table
    client.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            age INTEGER
        )",
        &[],
    ).await?;

    // Insertion
    client.execute(
        "INSERT INTO users (name, age) VALUES ($1, $2)",
        &[&"Alice", &30],
    ).await?;

    // Sélection
    let rows = client.query("SELECT id, name, age FROM users", &[]).await?;
    for row in rows {
        let id: i32 = row.get(0);
        let name: String = row.get(1);
        let age: i32 = row.get(2);
        println!("id: {}, name: {}, age: {}", id, name, age);
    }

    Ok(())
}
```

## Correspondance

Ci dessous vous trouverez un tableau de correspondance des types entre PostgreSQL et Rust (avec les crates `postgres`/`tokio-postgres`)

::: warning
Si vous utiliser d'autres bibliothèques, il se peut que certains type puisse différé légèrement
:::

| Type PostgreSQL       | Type Rust (crate `postgres`/`tokio-postgres`) | Remarques                                                                 |
|:---------------------:|:---------------------------------------------:|---------------------------------------------------------------------------|
| `SMALLINT`            | `i16`                                         | Entier 16 bits                                                            |
| `INTEGER`             | `i32`                                         | Entier 32 bits                                                            |
| `BIGINT`              | `i64`                                         | Entier 64 bits                                                            |
| `SERIAL`              | `i32`                                         | Auto-incrément (entier 32 bits)                                           |
| `BIGSERIAL`           | `i64`                                         | Auto-incrément (entier 64 bits)                                           |
| `REAL`                | `f32`                                         | Nombre à virgule flottante 32 bits                                        |
| `DOUBLE PRECISION`    | `f64`                                         | Nombre à virgule flottante 64 bits                                        |
| `NUMERIC`             | `rust_decimal::Decimal`                       | Requiert la crate `rust_decimal` pour une précision arbitraire            |
| `BOOLEAN`             | `bool`                                        | Vrai/Faux                                                                 |
| `CHAR(N)`/`VARCHAR(N)`| `String`                                      | Chaîne de caractères                                                      |
| `TEXT`                | `String`                                      | Chaîne de caractères de taille illimitée                                  |
| `BYTEA`               | `Vec<u8>`                                     | Tableau d'octets                                                          |
| `DATE`                | `chrono::NaiveDate`                           | Requiert la crate `chrono`                                                |
| `TIME`                | `chrono::NaiveTime`                           | Requiert la crate `chrono`                                                |
| `TIMESTAMP`           | `chrono::NaiveDateTime`                       | Requiert la crate `chrono`                                                |
| `TIMESTAMPTZ`         | `chrono::DateTime<Utc>`                       | Requiert la crate `chrono`                                                |
| `INTERVAL`            | `postgres_types::Interval`                    | Type spécifique à PostgreSQL                                              |
| `UUID`                | `uuid::Uuid`                                  | Requiert la feature `with-uuid-1` et la crate `uuid`                      |
| `JSON`/`JSONB`        | `serde_json::Value`                           | Requiert la feature `with-serde_json-1` et la crate `serde_json`          |
| `ARRAY`               | `Vec<T>`                                      | Où `T` est le type des éléments du tableau                                |
| `INET`/`CIDR`         | `std::net::IpAddr`/`std::net::IpNet`          | Pour les adresses IP et réseaux                                           |
| `POINT`               | `(f64, f64)` ou structure personnalisée       | Coordonnées géométriques                                                  |
| `ENUM`                | `String` ou enum Rust                         | Nécessite une conversion manuelle                                         |

---

### Remarques importantes :

* **Types temporels** : La crate `chrono` est couramment utilisée pour manipuler les dates et heures.
* **Types décimaux** : Pour `NUMERIC`, utilisez `rust_decimal::Decimal` pour éviter les problèmes de précision.
* **UUID** : Activez la feature `with-uuid-1` dans `tokio-postgres` pour supporter les UUID.
* **JSON** : Activez la feature `with-serde_json-1` pour manipuler les types JSON/JSONB.
* **Types géométriques** : Les types comme `POINT` peuvent être mappés à des tuples ou des structures Rust.



## Points clés à retenir

* **Sécurité** : Utiliser le plus fréquement possible des requêtes paramétrées pour éviter les injections SQL.
* **Asynchrone** : Préférez `tokio-postgres` pour les applications asynchrones.
* **Pool de connexions** : Utilisez `bb8` pour gérer efficacement les connexions en production.
* **Types personnalisés** : Activez les features nécessaires pour les types comme `UUID`.
