---
title: Utilisation des diffénrets index sous PostgreSQL
head:
  - - meta
    - name: 'keyword'
      content: index PostgreSQL pg_dump btree hash gist gin brin
  - - meta
    - property: 'og:title'
      content: 
  - - meta      
    - property: 'og:description'
      content: Cette page décrit l'utilisation des index dans PostgreSQL en français
  - - meta      
    - property: 'og:type'
      content: 'article'
---

# Les Index

## Les types d'index

| Type d’index   | Description | Cas d’usage typique |
|----------------|-------------|---------------------|
| B-tree | Structure équilibrée par défaut, idéale pour les requêtes d’égalité et de plage. | Clés primaires, colonnes fréquemment interrogées avec `=`, `>`, `<`, `BETWEEN`. |
| Hash | Basé sur une fonction de hachage, très rapide pour les recherches d’égalité exacte. | Colonnes utilisées uniquement avec `=` (pas de tri ou de plage). |
| GiST | Index généralisé pour les recherches, supporte les opérateurs personnalisés. | Données géométriques, texte en plein texte, types personnalisés.                  |
| SP-GiST | Variante de GiST pour les données non équilibrées (arbres de suffixes, etc.). | Données hiérarchiques, adresses IP, types de données non structurées.              |
| GIN | Inversé par rapport à GiST, efficace pour les valeurs composites (tableaux, JSON, texte). | Colonnes contenant des tableaux, documents JSON, recherche de mots-clés. |
| BRIN | Index minimaliste pour les tables très grandes et ordonnées physiquement. | Tables volumineuses avec un ordre naturel (ex : données temporelles). |
| Bloom | Filtre probabiliste pour réduire le nombre de lignes à scanner. | Tables avec de nombreuses colonnes interrogées de manière aléatoire. |

## Index B-tree

``` sql
-- Création d'une table utilisateurs
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100),
    date_inscription TIMESTAMP
);

-- Création d'un index B-tree sur la colonne 'email'
CREATE INDEX idx_utilisateurs_email ON utilisateurs (email);

-- Création d'un index B-tree sur plusieurs colonnes (index composite)
CREATE INDEX idx_utilisateurs_nom_email ON utilisateurs (nom, email);
```

Explications:

* `CREATE INDEX idx_utilisateurs_email ON utilisateurs (email);` crée un index B-tree sur la colonne email.
* PostgreSQL utilise B-tree par défaut, donc tu n’as pas besoin de préciser USING btree.
* Les index composites (sur plusieurs colonnes) sont utiles pour les requêtes qui filtrent sur plusieurs champs.

## Index Hash

Ci dessous quelques exemples d’utilisation des **index HASH** sous PostgreSQL, avec des cas concrets et des bonnes pratiques:


### Création d’un index HASH sur une colonne simple
Supposons une table `clients` avec une colonne `email` souvent utilisée dans des requêtes de type `WHERE email = '...'`.

```sql
CREATE INDEX idx_clients_email_hash ON clients USING HASH (email);
```

::: tip Utilité
L’index HASH est très efficace pour les recherches d’égalité (`=`), mais pas pour les comparaisons de plage (`>`, `<`, `BETWEEN`).
:::


### Utilisation dans une requête
L’index sera automatiquement utilisé par le planificateur de requêtes si la condition est une égalité.

```sql
SELECT * FROM clients WHERE email = 'client@example.com';
```

::: tip Remarque
PostgreSQL utilise l’index HASH uniquement pour les opérateurs `=` et `IN` (si les valeurs sont constantes).
:::

### Index HASH sur plusieurs colonnes

Vous pouvez créer un index HASH sur plusieurs colonnes, mais il ne sera utilisé que si toutes les colonnes sont spécifiées dans la condition.

```sql
CREATE INDEX idx_clients_nom_prenom_hash ON clients USING HASH (nom, prenom);
```

**Exemple de requête utilisant l’index** :

```sql
SELECT * FROM clients WHERE nom = 'Dupont' AND prenom = 'Jean';
```


### Cas d’usage typique : tables de jointure

Les index HASH sont souvent utilisés pour les colonnes de jointure, surtout si les valeurs sont uniformément distribuées.

```sql
CREATE INDEX idx_commandes_client_id_hash ON commandes USING HASH (client_id);
```

**Exemple de jointure** :

```sql
SELECT c.nom, co.montant
FROM clients c
JOIN commandes co ON c.id = co.client_id
WHERE co.client_id = 123;
```

### Limites et bonnes pratiques

- **Pas de tri** : Les index HASH ne permettent pas de trier les résultats (`ORDER BY`).
- **Pas de recherche de plage** : Ils ne sont pas adaptés pour `>`, `<`, `BETWEEN`.
- **Maintenance** : Les index HASH doivent être recréés après un `VACUUM FULL` ou une réorganisation majeure de la table.
- **PostgreSQL 10+** : Avant PostgreSQL 10, les index HASH n’étaient pas persistants après un redémarrage du serveur.


### Vérification de l’utilisation de l’index

Pour vérifier si PostgreSQL utilise bien votre index HASH, utilisez `EXPLAIN ANALYZE` :

```sql
EXPLAIN ANALYZE SELECT * FROM clients WHERE email = 'client@example.com';
```

::: tip Résultat attendu
Si l’index est utilisé, vous verrez une ligne comme `Index Scan using idx_clients_email_hash on clients`.
:::


### Quand ne pas utiliser un index HASH ?

- Si vous avez besoin de recherches de plage ou de tri.
- Si la colonne a une faible cardinalité (peu de valeurs distinctes).
- Si vous utilisez souvent des opérateurs autres que `=`.



## Index GIST

Ci-dessous des exemples concrets d’utilisation des **index GiST** (Generalized Search Tree) sous PostgreSQL, avec des cas d’usage typiques et des bonnes pratiques.

### Index GiST pour les types géométriques (PostGIS)

L’usage le plus courant des index GiST est pour les requêtes spatiales avec l’extension **PostGIS**.

### Exemple : Table avec des points géographiques

```sql
CREATE EXTENSION postgis;
CREATE TABLE lieux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    position GEOMETRY(Point, 4326)
);

-- Création d'un index GiST sur la colonne géométrique
CREATE INDEX idx_lieux_position_gist ON lieux USING GIST(position);
```

**Requête utilisant l’index** :

```sql
-- Trouver les lieux à moins de 10 km d'un point donné
SELECT nom
FROM lieux
WHERE ST_DWithin(position, ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326), 10000);
```

::: info
L’index GiST accélère les calculs de distance et les intersections spatiales.
:::


### Index GiST pour les types de données textuels (recherche full-text)

GiST peut aussi être utilisé pour la recherche full-text, bien que GIN soit souvent plus efficace.

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    contenu TEXT
);
-- Création d'un index GiST pour la recherche full-text
CREATE INDEX idx_documents_contenu_gist ON documents USING GIST(to_tsvector('french', contenu));
```

**Requête utilisant l’index** :

```sql
SELECT id, contenu
FROM documents
WHERE to_tsvector('french', contenu) @@ to_tsquery('french', 'PostgreSQL & index');
```

::: info
L’index GiST permet d’accélérer les recherches de mots-clés.
:::


### Index GiST pour les types de données personnalisés

GiST permet d’indexer des types de données personnalisés, comme des intervalles, des réseaux, etc.

#### Exemple : Index sur des intervalles de dates

```sql
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    periode TSRANGE
);
-- Création d'un index GiST sur un type intervalle
CREATE INDEX idx_reservations_periode_gist ON reservations USING GIST(periode);
```

**Requête utilisant l’index** :

```sql
-- Trouver les réservations qui chevauchent une période donnée
SELECT id
FROM reservations
WHERE periode && '[2025-09-01, 2025-09-30]'::TSRANGE;
```

::: info
L’index GiST accélère les tests de chevauchement (`&&`), de contenu (`@>`), etc.
:::


### Index GiST pour les types de données géométriques natifs

Même sans PostGIS, PostgreSQL supporte des types géométriques de base.

```sql
CREATE TABLE formes (
    id SERIAL PRIMARY KEY,
    rectangle BOX
);
-- Création d'un index GiST sur un type BOX
CREATE INDEX idx_formes_rectangle_gist ON formes USING GIST(rectangle);
```

**Requête utilisant l’index** :

```sql
-- Trouver les rectangles qui contiennent un point donné
SELECT id
FROM formes
WHERE rectangle @> '(10,10)'::POINT;
```

### Vérification de l’utilisation de l’index GiST

Pour vérifier si PostgreSQL utilise bien votre index GiST, utilisez `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE
SELECT * FROM lieux
WHERE ST_DWithin(position, ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326), 10000);
```

::: info
Cherchez `Index Scan using idx_lieux_position_gist` dans le plan d’exécution.
:::

### Quand utiliser GiST plutôt que GIN ou SP-GiST ?

- `GiST` : Idéal pour les données géométriques, les intervalles, les recherches de chevauchement.
- `GIN` : Mieux adapté pour les recherches full-text, les tableaux, les données composites.
- `SP-GiST` : Utile pour les données hiérarchiques ou les recherches de préfixe.




## Index GIN

Voici des exemples concrets d’utilisation des **index GIN** (Generalized Inverted Index) sous PostgreSQL, avec des cas d’usage typiques et des bonnes pratiques.

### Index GIN pour les colonnes de type tableau (ARRAY)

Les index GIN sont très efficaces pour rechercher des valeurs dans des colonnes de type tableau.

#### Exemple : Table avec un tableau de tags

```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    tags TEXT[]
);
-- Création d'un index GIN sur la colonne tags
CREATE INDEX idx_articles_tags_gin ON articles USING GIN(tags);
```

**Requêtes utilisant l’index** :

```sql
-- Trouver les articles qui ont le tag 'postgresql'
SELECT * FROM articles WHERE 'postgresql' = ANY(tags);

-- Trouver les articles qui ont tous les tags 'postgresql' ET 'index'
SELECT * FROM articles WHERE tags @> ARRAY['postgresql', 'index'];

-- Trouver les articles qui ont au moins un des tags 'postgresql' OU 'base de données'
SELECT * FROM articles WHERE tags && ARRAY['postgresql', 'base de données'];
```

::: info
L’index GIN accélère les recherches de valeurs dans les tableaux, surtout pour les opérateurs `@>`, `&&` et `= ANY`.
:::


### Index GIN pour la recherche full-text

GIN est souvent utilisé pour la recherche full-text, car il est plus rapide que GiST pour ce type de requête.

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    contenu TEXT
);
-- Création d'un index GIN pour la recherche full-text
CREATE INDEX idx_documents_contenu_gin ON documents USING GIN(to_tsvector('french', contenu));
```

**Requêtes utilisant l’index** :

```sql
-- Trouver les documents contenant les mots 'postgresql' ET 'index'
SELECT id, contenu
FROM documents
WHERE to_tsvector('french', contenu) @@ to_tsquery('french', 'postgresql & index');

-- Trouver les documents contenant la phrase 'optimisation des requêtes'
SELECT id, contenu
FROM documents
WHERE to_tsvector('french', contenu) @@ plainto_tsquery('french', 'optimisation des requêtes');
```

::: info
L’index GIN est très efficace pour les recherches de mots-clés et les requêtes booléennes.
:::

### Index GIN pour les colonnes de type JSON/JSONB

GIN est le type d’index le plus performant pour les requêtes sur des colonnes JSONB, surtout pour rechercher des clés ou des valeurs imbriquées.

```sql
CREATE TABLE produits (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    attributs JSONB
);
-- Création d'un index GIN sur la colonne JSONB
CREATE INDEX idx_produits_attributs_gin ON produits USING GIN(attributs);
```

**Requêtes utilisant l’index** :
```sql
-- Trouver les produits dont l'attribut 'couleur' est 'bleu'
SELECT * FROM produits WHERE attributs @> '{"couleur": "bleu"}';

-- Trouver les produits qui ont une clé 'prix' dans leurs attributs
SELECT * FROM produits WHERE attributs ? 'prix';

-- Trouver les produits dont la valeur de la clé 'prix' est supérieure à 100
SELECT * FROM produits WHERE attributs->>'prix'::NUMERIC > 100;
```

::: info
→ L’index GIN accélère les recherches de clés, de valeurs et les tests de contenu dans les JSONB.
:::


### Index GIN pour les colonnes de type composite ou personnalisé

GIN peut aussi être utilisé pour des types de données composites ou personnalisés, comme les `hstore` ou les `ltree`.

#### Exemple avec hstore

```sql
CREATE EXTENSION hstore;
CREATE TABLE profils (
    id SERIAL PRIMARY KEY,
    infos HSTORE
);
-- Création d'un index GIN sur la colonne hstore
CREATE INDEX idx_profils_infos_gin ON profils USING GIN(infos);
```

**Requêtes utilisant l’index** :

```sql
-- Trouver les profils dont la clé 'langue' a la valeur 'français'
SELECT * FROM profils WHERE infos @> 'langue=>français';

-- Trouver les profils qui ont une clé 'pays'
SELECT * FROM profils WHERE infos ? 'pays';
```

### Vérification de l’utilisation de l’index GIN

Pour vérifier si PostgreSQL utilise bien votre index GIN, utilisez `EXPLAIN ANALYZE` :

```sql
EXPLAIN ANALYZE
SELECT * FROM articles WHERE tags @> ARRAY['postgresql', 'index'];
```

::: tip
Cherchez `Bitmap Heap Scan` ou `Index Scan` avec le nom de votre index GIN dans le plan d’exécution.
:::

### Quand utiliser GIN plutôt que GiST ou SP-GiST ?

- `GIN` : Idéal pour les tableaux, les JSONB, la recherche full-text, les données composites.
- `GiST` : Mieux adapté pour les données géométriques, les intervalles, les recherches de chevauchement.
- `SP-GiST` : Utile pour les données hiérarchiques ou les recherches de préfixe.


## Index BRIN

Voici des exemples concrets d’utilisation des **index BRIN** (Block Range INdex) sous PostgreSQL, avec des cas d’usage typiques, des bonnes pratiques et des exemples de requêtes.


### Qu’est-ce qu’un index BRIN ?

- **BRIN** est un type d’index conçu pour les **très grandes tables** où les données sont **physiquement ordonnées** selon une colonne (par exemple, une colonne de type date, timestamp, ou série numérique).
- Il est **très compact** et **rapide à maintenir**, mais moins précis qu’un B-tree pour les recherches ponctuelles.
- Idéal pour les tables où les données sont **insérées dans l’ordre** (logs, séries temporelles, etc.).

### Création d’un index BRIN sur une colonne de type timestamp

Supposons une table de logs où les entrées sont toujours insérées par ordre chronologique :

```sql
CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,
    date_log TIMESTAMPTZ NOT NULL,
    message TEXT
);

-- Création d'un index BRIN sur la colonne date_log
CREATE INDEX idx_logs_date_brin ON logs USING BRIN(date_log);
```

::: tip Pourquoi BRIN ?
- Les logs sont toujours insérés par ordre chronologique.
- La table peut devenir très volumineuse.
- BRIN est très efficace pour les requêtes de plage sur `date_log`.
:::


### Requêtes utilisant l’index BRIN

#### Exemple 1 : Recherche de plage de dates

```sql
-- Trouver tous les logs entre deux dates
SELECT * FROM logs WHERE date_log BETWEEN '2025-09-01' AND '2025-09-16';
```

::: info
L’index BRIN permet de sauter rapidement les blocs de données qui ne contiennent pas de logs dans cette plage.
:::

#### Exemple 2 : Recherche de logs récents

```sql
-- Trouver les logs des dernières 24 heures
SELECT * FROM logs WHERE date_log > NOW() - INTERVAL '24 hours';
```

::: info
BRIN est très efficace pour ce type de requête sur des données ordonnées.
:::

### Création d’un index BRIN sur une colonne numérique ordonnée

Exemple avec une table de mesures de capteurs, où les données sont insérées par ordre de `timestamp` et de `valeur` :

```sql
CREATE TABLE mesures (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    valeur DOUBLE PRECISION NOT NULL
);
-- Création d'un index BRIN sur la colonne timestamp
CREATE INDEX idx_mesures_timestamp_brin ON mesures USING BRIN(timestamp);
```

**Requête utilisant l’index** :

```sql
-- Trouver les mesures entre deux timestamps
SELECT * FROM mesures
WHERE timestamp BETWEEN '2025-09-01 00:00:00' AND '2025-09-01 12:00:00';
```

### Création d’un index BRIN multi-colonnes

Vous pouvez créer un index BRIN sur plusieurs colonnes, si elles sont corrélées et ordonnées ensemble.

```sql
-- Création d'un index BRIN sur deux colonnes
CREATE INDEX idx_mesures_timestamp_valeur_brin ON mesures USING BRIN(timestamp, valeur);
```

::: warning Remarque
BRIN est surtout efficace si les colonnes sont **physiquement corrélées** dans l’ordre d’insertion.
:::


### Vérification de l’utilisation de l’index BRIN

Pour vérifier si PostgreSQL utilise bien votre index BRIN, utilisez `EXPLAIN ANALYZE` :

```sql
EXPLAIN ANALYZE
SELECT * FROM logs
WHERE date_log BETWEEN '2025-09-01' AND '2025-09-16';
```

::: info
Cherchez `Index Scan using idx_logs_date_brin` dans le plan d’exécution.
:::


### Quand utiliser BRIN plutôt que B-tree ou GiST ?

| Critère                | BRIN           | B-tree          | GiST          |
|------------------------|----------------|-----------------|---------------|
| Données ordonnées      | ✅ Idéal       | ⚠️ Possible    | ❌ Non        |
| Taille de l’index      | Très compact   | Volumineux      | Compact       |
| Recherche ponctuelle   | ❌ Peu précis  | ✅ Très précis | ⚠️ Variable   |
| Recherche de plage     | ✅ Très rapide | ✅ Rapide      | ⚠️ Variable   |
| Maintenance            | Très rapide     | Lente          | Rapide        |

::: info Cas d’usage typiques pour BRIN
- Tables de logs, séries temporelles, données IoT.
- Tables où les données sont toujours insérées dans l’ordre (par exemple, par date).
- Tables très volumineuses où la taille de l’index est un critère important.
:::


### Bonnes pratiques avec BRIN

- **Ordonner les données** : BRIN est efficace si les données sont physiquement ordonnées selon la colonne indexée.
- **Éviter les mises à jour aléatoires** : BRIN est optimisé pour les insertions séquentielles.
- **Utiliser `pages_per_range`** : Vous pouvez ajuster la taille des blocs indexés pour optimiser les performances (par défaut, 128 pages par bloc).

```sql
CREATE INDEX idx_logs_date_brin ON logs USING BRIN(date_log) WITH (pages_per_range = 64);
```

## Use the index Luke 

Le site [Use the index,
Luke](http://use-the-index-luke.com/fr/sql/preface) décrit les
problématiques du SQL, et vous donnent des pistes pour créer des indexes
efficaces en fonctions de vos cas de figures.

## Articles divers

- [Retarder la vérification des
  contraintes](https://blog.anayrat.info/2016/08/13/postgresql-retarder-la-verification-des-contraintes/)
- [Index BRIN --
  Performances](https://blog.anayrat.info/2016/04/21/index-brin-performances/)
