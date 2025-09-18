---
title: Les différents types de données de PostgreSQL
head:
  - - meta
    - name: 'keyword'
      content: types datatypes PostgreSQL varchar enum datetime uuid composite
  - - meta
    - property: 'og:title'
      content: Les différents types de données de PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Descriptif des types de données géré par de PostgreSQL
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Les différents types de données de PostgreSQL
  - - meta      
    - property: 'twitter:description'
      content: Descriptif des types de données géré par de PostgreSQL      
---

# Types de données PostgreSQL

PostgreSQL propose une grande variété de types de données. Voici une liste exhaustive des principaux types disponibles, classés par catégorie.

## 1. Types numériques

| Type                | Description                                                                          | Exemple de valeur         |
|---------------------|--------------------------------------------------------------------------------------|---------------------------|
| `smallint`          | Entier sur 2 octets (plage : -32 768 à 32 767)                                       | `42`                      |
| `integer`           | Entier sur 4 octets (plage : -2 147 483 648 à 2 147 483 647)                         | `42`                      |
| `bigint`            | Entier sur 8 octets (plage : -9 223 372 036 854 775 808 à 9 223 372 036 854 775 807) | `9223372036854775807`     |
| `decimal`           | Nombre décimal exact, précision variable (ex: `decimal(10,2)`)                       | `12345678.90`             |
| `numeric`           | Équivalent à `decimal`                                                               | `12345678.90`             |
| `real`              | Nombre à virgule flottante sur 4 octets                                              | `3.14159`                 |
| `double precision`  | Nombre à virgule flottante sur 8 octets                                              | `3.141592653589793`       |
| `smallserial`       | Auto-incrément sur 2 octets (1 à 32 767)                                             | `42`                      |
| `serial`            | Auto-incrément sur 4 octets (1 à 2 147 483 647)                                      | `42`                      |
| `bigserial`         | Auto-incrément sur 8 octets (1 à 9 223 372 036 854 775 807)                          | `9223372036854775807`     |

::: tip
* serial est un type integer associé à une séquence
* bigserial est un type bigint associé à une séquence

La séquence associé est créé automatiquement lors de la création ou modification de la table
:::

## 2. Types monétaires

| Type      | Description                                      | Exemple de valeur |
|-----------|--------------------------------------------------|-------------------|
| `money`   | Montant monétaire (avec symbole de devise)       | `$1234.56`        |

::: warning
Attention ce type est fortement dépendant de la locale du serveur de base de données.

Si vous utilsier ce type, et que vous avez besoin de faire une sauvegarde et restauration, il faut vous assurer que
lc_monetary est la même entre le serveur ou a été faite la sauvegarde et celui ou la base de données est restaurée.
:::

## 3. Types de caractères

| Type               | Description                                                                 | Exemple de valeur         |
|--------------------|-----------------------------------------------------------------------------|---------------------------|
| `character(n)`     | Chaîne de longueur fixe (rempli d'espaces si nécessaire)                    | `'PostgreSQL'`            |
| `varchar(n)`       | Chaîne de longueur variable (limite `n`)                                    | `'PostgreSQL'`            |
| `text`             | Chaîne de longueur illimitée                                                | `'PostgreSQL'`            |
| `char(n)`          | Équivalent à `character(n)`                                                 | `'SQL'`                   |
| `character varying`| Équivalent à `varchar`                                                      | `'PostgreSQL'`            |

## 4. Types binaires

| Type          | Description                                      | Exemple de valeur         |
|---------------|--------------------------------------------------|---------------------------|
| `bytea`       | Chaîne binaire (octets bruts)                    | `'\xDEADBEEF'`            |


## 5. Types date/heure

| Type                      | Description                                                                 | Exemple de valeur         |
|---------------------------|-----------------------------------------------------------------------------|---------------------------|
| `date`                    | Date (sans heure)                                                           | `'2025-09-12'`            |
| `time`                    | Heure (sans date)                                                           | `'14:30:00'`              |
| `time with time zone`     | Heure avec fuseau horaire                                                   | `'14:30:00+02'`           |
| `timestamp`               | Date et heure (sans fuseau horaire)                                         | `'2025-09-12 14:30:00'`   |
| `timestamp with time zone`| Date et heure avec fuseau horaire                                           | `'2025-09-12 14:30:00+02'`|
| `interval`                | Durée ou intervalle de temps                                                | `'1 day 2 hours'`         |

## 6. Types booléens

| Type      | Description                                      | Exemple de valeur         |
|-----------|--------------------------------------------------|---------------------------|
| `boolean` | Vrai ou faux                                     | `true`, `false`, `1`, `0` |

### Valeur vrai

Vrai peut être représenté avec les valeurs suivantes

* true 
* yes
* on
* t
* 1

``` sql
SELECT 'true'::boolean as true_boolean, 'yes'::boolean as yes_boolean, 
       'on'::boolean as on_boolean, 1::boolean as int_boolean, 
       't'::boolean as t_boolean;
```

Résultat

|true_boolean|yes_boolean|on_boolean|int_boolean|t_boolean|
|:----------:|:---------:|:--------:|:---------:|:-------:|
|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|


### Valeur faux

Faux peut être représenté avec les valeurs suivantes

* false
* no
* off
* f
* 0

``` sql
SELECT 'false'::boolean as false_boolean, 'no'::boolean as no_boolean, 
       'off'::boolean as off_boolean, 0::boolean as int_boolean,
       'f'::boolean as f_boolean;
```

Résultat

|false_boolean|no_boolean|off_boolean|int_boolean|f_boolean|
|:-----------:|:--------:|:---------:|:---------:|:-------:|
|:x:|:x:|:x:|:x:|:x:|


## 7. Types énumérés

| Type      | Description                                       | Exemple de valeur         |
|-----------|---------------------------------------------------|---------------------------|
| `enum`    | Type personnalisé avec valeurs prédéfinies        | `'rouge'`, `'vert'`       |

## 8. Types géométriques

| Type         | Description                                      | Exemple de valeur          |
|--------------|--------------------------------------------------|----------------------------|
| `point`      | Point géométrique (x, y)                         | `(10.0, 20.0)`             |
| `line`       | Ligne infinie                                    | `{(10.0,20.0),(30.0,40.0)}`|
| `lseg`       | Segment de ligne                                 | `[(10.0,20.0),(30.0,40.0)]`|
| `box`        | Rectangle                                        | `((10.0,20.0),(30.0,40.0))`|
| `path`       | Chemin (ligne brisée)                            | `[(10.0,20.0),(30.0,40.0)]`|
| `polygon`    | Polygone                                         | `((10.0,20.0),(30.0,40.0))`|
| `circle`     | Cercle                                           | `<(10.0,20.0),5.0>`        |

## 9. Types réseau

| Type         | Description                                      | Exemple de valeur           |
|--------------|--------------------------------------------------|-----------------------------|
| `cidr`       | Adresse IP réseau (CIDR)                         | `'192.168.1.0/24'`          |
| `inet`       | Adresse IP (IPv4 ou IPv6)                        | `'192.168.1.1'`             |
| `macaddr`    | Adresse MAC                                      | `'08:00:2b:01:02:03'`       |
| `macaddr8`   | Adresse MAC  (format EUI-64)                     | `'00:00:08:00:2b:01:02:03'` |

## 10. Types de bits

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `bit(n)`     | Chaîne de bits de longueur fixe                  | `B'1010'`                 |
| `bit varying`| Chaîne de bits de longueur variable              | `B'101010'`               |

## 11. Types de texte et recherche

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `tsvector`   | Vecteur de texte pour recherche full-text        | `'fat' 'cat' 'rat'`       |
| `tsquery`    | Requête de recherche full-text                   | `'fat & cat'`             |

## 12. Types UUID

| Type         | Description                                      | Exemple de valeur                        |
|--------------|--------------------------------------------------|------------------------------------------|
| `uuid`       | Identifiant unique universel                     | `'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'` |

## 13. Types JSON

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `json`       | Données JSON (texte brut)                        | `'{"nom": "PostgreSQL"}'` |
| `jsonb`      | Données JSON binaires (indexables)               | `'{"nom": "PostgreSQL"}'` |

## 14. Types XML

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `xml`        | Données XML                                      | `'<nom>PostgreSQL</nom>'` |

## 15. Types composites

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `composite`  | Type personnalisé (créé avec `CREATE TYPE`)      | `(valeur1, valeur2)`      |

### Création d’un type composite

Supposons que l'on veut créer un type pour représenter une adresse, et stocker:

* le nom de la rue
* la ville
* le code postal
* le pays
* le numéro de la rue

Nous allons donc créer le type ci-dessous

``` sql
CREATE TYPE adresse_type AS (
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal CHAR(5),
    pays VARCHAR(50),
    numero INTEGER
);
```

### Utilisation dans une table

 On peut utiliser ce type comme colonne d’une table

 ``` sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse adresse_type
);
```

### Insertion de données

Pour insérer une valeur de type composite, on utilise la syntaxe (val1, val2, ...):

``` sql
INSERT INTO clients (nom, adresse)
VALUES (
    'Jean Dupont',
    ('Rue de Paris', 'Paris', '75000', 'France', 123)::adresse_type
);
```

### Accès aux champs d’un type composite

Pour accéder à un champ spécifique:

``` sql
SELECT nom, (adresse).ville FROM clients;
```

Résultat

|id|nom|adresse|
|--|---|-------|
|1|Jean Dupont|(Rue de Paris,Paris,75000,France,123)|


### Mise à jour d’un champ composite

Pour mettre à jour un seul champ de la colonne du type composite :

``` sql
UPDATE clients
SET adresse.pays = 'Espagne'
WHERE nom = 'Jean Dupont';
```

::: tip
Vous remarquerez que dans le cas de l'UPDATE, nous n'avons pas mis de parenthèse à adresse
:::

Nous avons maintenant le résultat dans la table

|id|nom|adresse|
|--|---|-------|
|1|Jean Dupont|(Rue de Paris,Paris,75000,Espagne,123)|


par contre si l'on avait besoin de faire une incrémentation d'un élement du type composite par exemple, nous aurions du utiliser la syntaxe suivante.

``` sql
UPDATE clients
SET adresse.numero = (adresse).numero + 1
WHERE nom = 'Jean Dupont';
```

::: tip
Dans la partie gauche du SET (entre le SET et le =), nous avons la colonne de la table donc les parenthères ne sont pas nécéssaire, 
par contre dans la partie nous pourrions avoir le nom d'un table (Voir UPDATE ... FROM ...), donc il faut indiquer 
que l'on est sur une colonne
:::

Nous avons maintenant le résultat dans la table

|id|nom|adresse|
|--|---|-------|
|1|Jean Dupont|(Rue de Paris,Paris,75000,Espagne,124)|

## 16. Types de plage

| Type         | Description                                      | Exemple de valeur              |
|--------------|--------------------------------------------------|--------------------------------|
| `int4range`  | Plage d'entiers                                  | `[1, 10]`                      |
| `int8range`  | Plage de bigint                                  | `[1, 10000000000]`             |
| `numrange`   | Plage de nombres                                 | `[1.0, 10.0]`                  |
| `tsrange`    | Plage de timestamp (sans fuseau horaire)         | `['2025-01-01', '2025-12-31']` |
| `tstzrange`  | Plage de timestamp avec fuseau horaire           | `['2025-01-01', '2025-12-31']` |
| `daterange`  | Plage de dates                                   | `['2025-01-01', '2025-12-31']` |

## 17. Types d'identifiants d'objet

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `oid`        | Identifiant d'objet PostgreSQL                   | `12345`                   |
| `regproc`    | Nom de fonction (avec surcharge)                 | `'foobar(integer)'`       |
| `regclass`   | Nom de table                                     | `'ma_table'`              |

## 18. Types pseudo-types

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `any`        | Peut correspondre à n'importe quel type          | (utilisé dans les fonctions) |
| `anyarray`   | Peut correspondre à n'importe quel tableau       | (utilisé dans les fonctions) |
| `anyelement` | Peut correspondre à n'importe quel élément       | (utilisé dans les fonctions) |

## 19. Types de tableau

| Type         | Description                                      | Exemple de valeur         |
|--------------|--------------------------------------------------|---------------------------|
| `array`      | Tableau d'un type de base                        | `ARRAY[1, 2, 3]`          |


## 20. Types spécifiques à PostgreSQL

| Type            | Description                                      | Exemple de valeur         |
|-----------------|--------------------------------------------------|---------------------------|
| `pg_lsn`        | Position dans le journal de transactions (WAL)   | `'0/16B19F8'`             |
| `txid_snapshot` | Instantané de transaction                        | `'100:101:...'`           |


::: warning Informations complémentaires
- Certains types nécessitent des extensions (`uuid-ossp`, `pgcrypto`, etc.).
- PostgreSQL permet de créer des **types personnalisés** avec `CREATE TYPE`.
- Pour plus de détails, consultez la [documentation officielle de PostgreSQL](https://docs.postgresql.fr/17/datatype.html type de données).
:::

## Articles sur le net

- [PostgreSQL - JSONB et
  Statistiques](https://blog.anayrat.info/2017/11/26/postgresql-jsonb-et-statistiques/ PostgreSQL jsonb et statistiques)
