---
title:  Descriptif des principes généraux implémentés dans PostgreSQL
description: Explication des clés primaires, clé étrangères, et contrainte unique dans PostgreSQL
head:
  - - meta
    - name: 'keywords'
      content: 'primary, foreign, key, constraint, PostgreSQL, identity, serial, bigserial'
  - - meta
    - property: 'og:title'
      content: Descriptif des primary key, foreign key contrainte unique sous PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Explication des clés primaires, clé étrangères, et contrainte unique dans PostgreSQL
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Descriptif des primary key, foreign key contrainte unique sous PostgreSQL
  - - meta      
    - property: 'twitter:description'
      content: Explication des clés primaires, clé étrangères, et contrainte unique dans PostgreSQL   
---

# Généralité 

## Base de données Relationnelle

PostgreSQL est une base de données relationnelle, mais qu'est ce que cela veut dire concrètement ?

### Définition et Concepts Clés

#### Qu’est-ce qu’une base de données relationnelle ?

Une **base de données relationnelle** organise les données en **tables** (ou relations), composées de **lignes** (tuples) et de **colonnes** (attributs). 

Les relations entre les tables sont établies via des **clés** (primaires, étrangères).

**Exemple :**

- Table `Clients` (id_client, nom, email)
- Table `Commandes` (id_commande, id_client, date, montant)

#### Modèle Relationnel

- **Théorie** : Proposé par Edgar F. Codd en 1970.
- **Objectifs** : Éviter la redondance, garantir l’intégrité des données, et permettre des requêtes complexes.


### Principes Fondamentaux

#### ACID

Les SGBDR respectent les propriétés **ACID**:

* **Atomicité** : Une transaction est soit entièrement exécutée, soit pas du tout.
* **Cohérence** : Les données respectent les contraintes définies (ex : clés étrangères).
* **Isolation** : Les transactions concurrentes ne s’interfèrent pas.
* **Durabilité** : Les données validées persistent même en cas de panne.

#### Langage SQL

* **SQL** (Structured Query Language) est le langage standard pour interagir avec les bases relationnelles.
* **PostgreSQL** étend SQL avec des fonctionnalités avancées (JSON, requêtes récursives, etc.).

### PostgreSQL : Spécificités et Avantages

#### Pourquoi PostgreSQL ?

- **Open Source** : Gratuit et communauté active.
- **Extensible** : Support des types de données personnalisés, extensions (ex : PostGIS pour la géolocalisation).
- **Robuste** : Gestion avancée des transactions, réplication, et haute disponibilité.
- **Standard** : Très conforme à la norme SQL.


#### Fonctionnalités Clés

* **Types de données** : Texte, numérique, date/heure, JSON, réseaux (inet), géométrique, etc.
* **Index** : B-tree, Hash, GiST, GIN, BRIN pour optimiser les requêtes.
* **Partitionnement** : Améliore les performances sur de gros volumes de données.
* **Sécurité** : RBAC (rôles et permissions), chiffrement, audit.

## Clé primaire (Primary key)

### Définition

Une **clé primaire** est une colonne (ou un ensemble de colonnes) qui identifie de manière unique chaque ligne d'une table. 

Elle garantit que chaque valeur est unique et non nulle.

### Caractéristiques principales

* **Unicité** : Aucune valeur dupliquée n'est autorisée.
* **Non-nullité** : La clé primaire ne peut pas contenir de valeurs NULL.
* **Une seule par table** : Une table ne peut avoir qu'une seule clé primaire (mais celle-ci peut être composée de plusieurs colonnes).


### Utilisations courantes

* **Identification unique** : Permet de distinguer chaque ligne de manière unique.
* **Relations entre tables** : Utilisée comme référence pour les clés étrangères (foreign keys) dans d'autres tables.
* **Optimisation des requêtes** : Accélère les recherches, les jointures et les tris.
* **Intégrité des données** : Empêche les doublons et les valeurs nulles, assurant la cohérence des données.

### Types de clés primaires

* **Clé primaire simple** : Une seule colonne (ex: `id` de type SERIAL ou INTEGER).
* **Clé primaire composite** : Plusieurs colonnes combinées (ex: `pays` + `code_postal`).


### Syntaxe de création

- **Lors de la création de la table** :
  ```sql
  CREATE TABLE utilisateurs (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(100),
      email VARCHAR(100) UNIQUE
  );
  ```
- **Ajout après la création de la table** :
  ```sql
  ALTER TABLE utilisateurs ADD PRIMARY KEY (id);
  ```

::: info remarques
le type `SERIAL` est composé d'un type integer et d'un séquence.

si l'on sait utiliser un `bigint` il faut utiliser `BIGSERIAL`
:::


### Bonnes pratiques

* Utiliser des colonnes de type `SERIAL` ou `BIGSERIAL` pour les clés primaires auto-incrémentées.
* Les [colonnes identités](https://docs.postgresql.fr/18/ddl-identity-columns.html "Colonne identité") peuvent être utilisées comme clé primaire
* Avec PostgreSQL 18, il est possible d'utiliser `UUID7` comme [clé primaire](https://docs.postgresql.fr/18/functions-uuid.html "UUID7")
* Éviter d'utiliser des données sensibles ou sujettes à modification comme clé primaire.
* Privilégier des clés primaires courtes et simples pour optimiser les performances.

### Exemple concret

```sql
-- Table avec une clé primaire simple
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- Table avec une clé primaire composite
CREATE TABLE commandes (
    client_id INTEGER,
    numero_commande INTEGER,
    date_commande DATE,
    PRIMARY KEY (client_id, numero_commande),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);
```

En utilisant un colonne identité:

```sql
CREATE TABLE clients (
    client_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
```

## Clé étrangère (Foreign Key)

Après les clés primaires, les clés étrangères sont l'autre élement essentiel d'une base de données relationnelle.

### Définition

Une **clé étrangère** est une colonne (ou un ensemble de colonnes) qui établit un lien entre les données de deux tables. 

Elle fait référence à une clé primaire (ou unique) d'une autre table, assurant ainsi **l'intégrité référentielle** entre les tables.

### Caractéristiques principales

* **Intégrité référentielle** : Garantit que la valeur de la clé étrangère correspond à une valeur existante dans la table référencée.
* **Non-unicité** : Contrairement à une clé primaire, une clé étrangère peut contenir des doublons et des valeurs NULL (sauf si spécifié autrement).
* **Relations entre tables** : Permet de créer des associations entre les tables (un-à-plusieurs, plusieurs-à-plusieurs, etc.).

### Utilisations courantes

* **Lier des tables** : Établir des relations logiques entre les données de différentes tables.
* **Assurer la cohérence** : Empêcher les suppressions ou modifications qui violeraient l'intégrité des données.
* **Simplifier les jointures** : Faciliter les requêtes SQL utilisant des jointures (`JOIN`).
* **Modéliser des hiérarchies** : Représenter des structures complexes (ex: catégories et sous-catégories).

### Syntaxe de création

- **Lors de la création de la table** :
  ```sql
  CREATE TABLE commandes (
      commande_id SERIAL PRIMARY KEY,
      client_id INTEGER,
      date_commande DATE,
      FOREIGN KEY (client_id) REFERENCES clients(client_id)
  );
  ```
- **Ajout après la création de la table** :
  ```sql
  ALTER TABLE commandes ADD FOREIGN KEY (client_id) REFERENCES clients(client_id);
  ```

### Comportements en cas de suppression/mise à jour

* **`ON DELETE CASCADE`** : Supprime automatiquement les lignes dépendantes.
* **`ON DELETE SET NULL`** : Définit la clé étrangère à NULL si la ligne référencée est supprimée.
* **`ON DELETE RESTRICT`** (par défaut) : Empêche la suppression si des lignes dépendantes existent.

::: tip remarques
Il existe aussi le comportement sur le `ON UPDATE` qui permet de définir le comportement lors d'un `UPDATE` sur la primary key en lien avec la Foreign Key concernée.
:::

### Exemple concret

```sql
-- Table référencée (clé primaire)
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(100)
);

-- Table avec clé étrangère
CREATE TABLE commandes (
    commande_id SERIAL PRIMARY KEY,
    client_id INTEGER,
    date_commande DATE,
    FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE CASCADE
);
```

### Bonnes pratiques

* **Nommage clair** : Utiliser des noms de colonnes explicites pour les clés étrangères (ex: `client_id` plutôt que `id_client`).
* **Indexation** : Créer un index sur les colonnes de clé étrangère pour améliorer les performances des jointures.
* **Gestion des contraintes** : Choisir le comportement (`CASCADE`, `SET NULL`, etc.) en fonction des besoins métiers.

## Contrainte unique

### Définition

Une **contrainte UNIQUE** garantit que toutes les valeurs d'une colonne (ou d'un groupe de colonnes) sont distinctes dans une table. 

Elle empêche les doublons, mais autorise les valeurs NULL (sauf si la colonne est aussi marquée `NOT NULL`).

### Caractéristiques principales

* **Unicité** : Aucune valeur dupliquée n'est autorisée (sauf NULL).
* **Applicable à une ou plusieurs colonnes** : Peut être définie sur une seule colonne ou sur un groupe de colonnes.
* **Différence avec une clé primaire** : Une table peut avoir plusieurs contraintes UNIQUE, mais une seule clé primaire.

### Utilisations courantes

* **Éviter les doublons** : Par exemple, pour des adresses e-mail, des numéros de téléphone ou des identifiants utilisateur.
* **Garantir l'intégrité des données** : Assurer que certaines valeurs restent uniques dans la base de données.
* **Améliorer les performances** : Les colonnes avec une contrainte UNIQUE sont souvent indexées automatiquement, ce qui accélère les recherches.

### Syntaxe de création

- **Lors de la création de la table** :
  ```sql
  CREATE TABLE utilisateurs (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE,  -- Contrainte UNIQUE sur une colonne
      nom_utilisateur VARCHAR(50)
  );
  ```
- **Sur un groupe de colonnes** :
  ```sql
  CREATE TABLE inscriptions (
      id SERIAL PRIMARY KEY,
      utilisateur_id INTEGER,
      evenement_id INTEGER,
      UNIQUE (utilisateur_id, evenement_id)  -- Contrainte UNIQUE sur plusieurs colonnes
  );
  ```
- **Ajout après la création de la table** :
  ```sql
  ALTER TABLE utilisateurs ADD UNIQUE (email);
  ```

### Exemple concret

```sql
-- Table avec une contrainte UNIQUE sur une colonne
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    telephone VARCHAR(20)
);

-- Table avec une contrainte UNIQUE sur plusieurs colonnes
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    client_id INTEGER,
    chambre_id INTEGER,
    date_debut DATE,
    date_fin DATE,
    UNIQUE (chambre_id, date_debut, date_fin)  -- Empêche les réservations en double pour la même chambre aux mêmes dates
);
```

::: warning
Ceci est un exemple très simpliste, qui ne tient pas compte des chevauchements de dates, si vous souhaitez traiter les chevauchements,
il faudra utiliser l'opérateur [OVERLAPS](https://docs.postgresql.fr/18/functions-datetime.html#FUNCTIONS-DATETIME "Opérateur OVERLAPS")
:::

### Bonnes pratiques

* **Utiliser des noms explicites** : Pour les contraintes UNIQUE, surtout si elles sont définies sur plusieurs colonnes.
* **Éviter les contraintes redondantes** : Si une colonne est déjà une clé primaire, elle est implicitement UNIQUE.
* **Indexation automatique** : PostgreSQL crée automatiquement un index pour chaque contrainte UNIQUE, ce qui améliore les performances des requêtes.



## Articles divers

- [Les processus de PostgreSQL](http://www.dalibo.org/glmf112_les_processus_de_postgresql)
- [PostgreSQL et ses journaux de transactions](https://public.dalibo.com/archives/publications/glmf108_postgresql_et_ses_journaux_de_transactions.pdf)
- [Utilisation de Psql](http://laetitia-avrot.blogspot.fr/2011/04/psql.html)
