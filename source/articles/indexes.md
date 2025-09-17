---
title: Utilisation des diffénrets index sous PostgreSQL
head:
  - - meta
    - name: 'keyword'
      content: index PostgreSQL pg_dump btree hash gist
  - - meta
    - property: 'og:title'
      content: 
  - - meta      
    - property: 'og:description'
      content: Cette page regroupe des informations sur les index dans PostgreSQL en français
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

## Exemple de création d’un index B-tree

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

* CREATE INDEX idx_utilisateurs_email ON utilisateurs (email); crée un index B-tree sur la colonne email.
* PostgreSQL utilise B-tree par défaut, donc tu n’as pas besoin de préciser USING btree.
* Les index composites (sur plusieurs colonnes) sont utiles pour les requêtes qui filtrent sur plusieurs champs.


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
