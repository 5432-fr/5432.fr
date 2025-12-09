---
title: Programmation en langage Python
description : Programmation en langage python avec diverses bibliothèques
head:
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
  - - meta
    - name: 'keywords'
      content: 'python, postgresql, psycopg2, psycopg3, asyncpg'
  - - meta
    - property: 'og:title'
      content: Programmation en langage Python
  - - meta      
    - property: 'og:description'
      content: Programmation en langage python avec diverses bibliothèques
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Programmation en langage Python
  - - meta      
    - property: 'twitter:description'
      content: Programmation en langage python avec diverses bibliothèques  
---

# Langage Python {#langage_python}

## Pourquoi utiliser Python avec PostgreSQL ?

Python est un langage populaire pour interagir avec PostgreSQL grâce à sa simplicité et à ses bibliothèques dédiées. Les principales bibliothèques sont :

- **psycopg2** : La plus utilisée, stable et mature.
- **psycopg3** : Nouvelle version, plus rapide et moderne.
- **asyncpg** : Pour les applications asynchrones (avec `async/await`).


## Installation des bibliothèques

```bash
pip install psycopg2-binary  # psycopg2 (version binaire pour simplifier l'installation)
pip install psycopg          # psycopg3
pip install asyncpg          # asyncpg
```

::: tip
Depuis quelques temps il n'est plus necessaire de préciser binary dans l'installation de psycopg2
:::

## Utilisation de psycopg2

### Connexion à la base de données

```python
import psycopg2

# Paramètres de connexion
conn_params = {
    "host": "localhost",
    "database": "nom_base",
    "user": "utilisateur",
    "password": "motdepasse",
    "port": "5432"
}

try:
    # Établir la connexion
    conn = psycopg2.connect(**conn_params)
    print("Connexion réussie à PostgreSQL !")

    # Créer un curseur
    cur = conn.cursor()

    # Exemple de requête
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print("Version de PostgreSQL :", version)

except psycopg2.Error as e:
    print("Erreur de connexion :", e)

finally:
    # Fermer le curseur et la connexion
    if 'cur' in locals():
        cur.close()
    if 'conn' in locals():
        conn.close()
```

### Requêtes paramétrées (éviter les injections SQL)

```python
def ajouter_client(nom, email, age):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Requête paramétrée
        query = "INSERT INTO clients (nom, email, age) VALUES (%s, %s, %s) RETURNING id;"
        cur.execute(query, (nom, email, age))

        # Récupérer l'ID du client inséré
        client_id = cur.fetchone()[0]
        conn.commit()
        print(f"Client ajouté avec l'ID : {client_id}")

    except psycopg2.Error as e:
        conn.rollback()
        print("Erreur :", e)
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

ajouter_client("Dupont", "dupont@example.com", 30)
```

### Récupération de données

```python
def lister_clients():
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute("SELECT id, nom, email FROM clients;")
        clients = cur.fetchall()

        for client in clients:
            print(f"ID: {client[0]}, Nom: {client[1]}, Email: {client[2]}")

    except psycopg2.Error as e:
        print("Erreur :", e)
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

lister_clients()
```

## Utilisation de psycopg3

**psycopg3** est une réécriture moderne de psycopg2, plus rapide et avec une API plus intuitive.

### Connexion et requête simple

```python
import psycopg

conn_params = "host=localhost dbname=nom_base user=utilisateur password=motdepasse"

try:
    # Connexion et création d'un curseur
    with psycopg.connect(conn_params) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            version = cur.fetchone()
            print("Version de PostgreSQL :", version)

except psycopg.Error as e:
    print("Erreur :", e)
```

### Requête paramétrée et transaction

```python
def ajouter_client_psycopg3(nom, email, age):
    try:
        with psycopg.connect(conn_params) as conn:
            with conn.cursor() as cur:
                query = "INSERT INTO clients (nom, email, age) VALUES (%s, %s, %s) RETURNING id;"
                cur.execute(query, (nom, email, age))
                client_id = cur.fetchone()[0]
                conn.commit()
                print(f"Client ajouté avec l'ID : {client_id}")

    except psycopg.Error as e:
        print("Erreur :", e)

ajouter_client_psycopg3("Martin", "martin@example.com", 25)
```

## Utilisation de asyncpg (asynchrone)

**asyncpg** est conçu pour les applications asynchrones, utilisant `async/await`.

### Connexion et requête asynchrone

```python
import asyncio
import asyncpg

async def test_connexion():
    conn_params = {
        "host": "localhost",
        "database": "nom_base",
        "user": "utilisateur",
        "password": "motdepasse",
        "port": "5432"
    }

    try:
        # Connexion asynchrone
        conn = await asyncpg.connect(**conn_params)
        print("Connexion asynchrone réussie !")

        # Exécution d'une requête
        version = await conn.fetchval("SELECT version();")
        print("Version de PostgreSQL :", version)

    except asyncpg.PostgresError as e:
        print("Erreur :", e)
    finally:
        if 'conn' in locals():
            await conn.close()

# Exécuter la fonction asynchrone
asyncio.run(test_connexion())
```

### Insertion asynchrone

```python
async def ajouter_client_async(nom, email, age):
    conn_params = {
        "host": "localhost",
        "database": "nom_base",
        "user": "utilisateur",
        "password": "motdepasse",
        "port": "5432"
    }

    try:
        conn = await asyncpg.connect(**conn_params)
        query = "INSERT INTO clients (nom, email, age) VALUES ($1, $2, $3) RETURNING id;"
        client_id = await conn.fetchval(query, nom, email, age)
        print(f"Client ajouté avec l'ID : {client_id}")

    except asyncpg.PostgresError as e:
        print("Erreur :", e)
    finally:
        if 'conn' in locals():
            await conn.close()

# Exécuter
asyncio.run(ajouter_client_async("Bernard", "bernard@example.com", 40))
```

### Récupération asynchrone de données

```python
async def lister_clients_async():
    conn_params = {
        "host": "localhost",
        "database": "nom_base",
        "user": "utilisateur",
        "password": "motdepasse",
        "port": "5432"
    }

    try:
        conn = await asyncpg.connect(**conn_params)
        clients = await conn.fetch("SELECT id, nom, email FROM clients;")

        for client in clients:
            print(f"ID: {client['id']}, Nom: {client['nom']}, Email: {client['email']}")

    except asyncpg.PostgresError as e:
        print("Erreur :", e)
    finally:
        if 'conn' in locals():
            await conn.close()

# Exécuter
asyncio.run(lister_clients_async())
```

## Comparatif des bibliothèques

| Fonctionnalité          | psycopg2               | psycopg3               | asyncpg                |
|-------------------------|------------------------|------------------------|------------------------|
| **Type**                | Synchrone              | Synchrone              | Asynchrone             |
| **Performance**         | Bonne                  | Meilleure              | Excellente (async)     |
| **API**                 | Classique              | Moderne                | Asynchrone             |
| **Transactions**        | Oui                    | Oui                    | Oui                    |
| **Requêtes paramétrées**| Oui (`%s`)             | Oui (`%s`)             | Oui (`$1`, `$2`)       |
| **Pool de connexions**  | Non (nécessite un module externe) | Oui (intégré) | Oui (intégré) |

## Bonnes pratiques

- **Toujours utiliser des requêtes paramétrées** pour éviter les injections SQL.
- **Gérer les exceptions** pour éviter les plantages silencieux.
- **Fermer les connexions** après utilisation (ou utiliser `with` pour psycopg3).
- **Pour les applications web asynchrones**, privilégier `asyncpg`.
- **Pour les scripts synchrones**, `psycopg3` est un excellent choix moderne.

## Ressources utiles

- [Documentation psycopg2](https://www.psycopg.org/docs/)
- [Documentation psycopg3](https://www.psycopg.org/psycopg3/docs/)
- [Documentation asyncpg](https://magic.io/blog/asyncpg-1m-row/)
