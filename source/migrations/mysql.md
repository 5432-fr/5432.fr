---
title: "Migration de MySQL vers PostgreSQL avec pgLoader"
description: "Article sur les possibilités de migration de MySQL vers une base PostgreSQL"
head:
  - - meta
    - name: 'keywords'
      content: 'MySQL, PostgreSQL, pgloader, migration, mariadb, myisam, innodb'
  - - meta
    - name: 'author'
      content: 'Christophe Chauvet'
  - - meta
    - name: 'copyright'
      content: 'CC BY-SA 4.0'
---

# Migration de MySQL vers PostgreSQL

## Pourquoi migrer de MySQL vers PostgreSQL ?

PostgreSQL offre plusieurs avantages par rapport à MySQL :

* **Fonctionnalités avancées** : Support natif des types JSON, des requêtes géospatiales, des CTE (Common Table Expressions), des fonctions fenêtrées, et des transactions avancées.
* **Extensibilité** : Possibilité de créer ses propres types de données, opérateurs, fonctions et index.
* **Conformité aux standards SQL** : PostgreSQL est plus proche du standard SQL que MySQL.
* **Performance** : Meilleure gestion des requêtes complexes et des charges lourdes.
* **Communauté et écosystème** : PostgreSQL est open source, avec une communauté très active et une documentation riche.
* **Sécurité** : Rôles et permissions plus granulaires, chiffrement natif, et audit avancé.

::: tip MISE AU POINT
On entend souvent que MySQL est plus rapide, il l'est mais dans un seul cas précis, celui ou l'on fait 
un select sur une seule table (pas de jointure) et en MyISAM (sans possibilité de modèle relationnel avec PK et FK)
ce qui bien sur n'est jamais le cas dans les situations réelles avec une modélisation de base de données qui assure l'a qualité et l'intégrité des données.

Le moteur MyISAM a également plusieurs défauts à mes yeux:

* MyISAM utilise le cache uniquement pour les indexes, ce qui pénalise les tables volumineuses et les recherches qui n'utilisent pas les index.
* en cas de crash serveur, il doit recronstruire toute la table (ce qui arrive aussi en cas de manque d'espace disque), ce qui peut être pénalisant en environnement virtualisé

Tableau récapitulatif des 2 moteurs disponibles sous MySQL

| Fonctionnalité | MyISAM | InnoDB |
| :------------: | :----- | :----- |
| Cache des données | Non (seulement les index) | Oui (Buffer Pool pour données + index) |
| Cache des index | Oui (Key Buffer) | Oui (dans le Buffer Pool) |
| Transactions | Non | Oui (ACID) |
| Verrouillage | Verrouillage de table | Verrouillage de ligne |
| Performances en lecture | Rapide (si indexés) | Rapide (même pour les données) |
| Performances en écriture | Lente (verrous de table) | Optimisée (Buffer Pool + Change Buffer) |
| Crash Recovery | Non (risque de corruption) | Oui (redo log) |
| Configuration clé | key_buffer_size | innodb_buffer_pool_size |
| Utilisation typique | Tables en lecture seule, reporting | Applications transactionnelles |

Si vous regardez ce tableau, vous voyez immédiatement que MyISAM ne devrait pas être utilisé en production
privilégié le format InnoDB 
:::

## Méthodes et outils de migration

### Export/Import via fichiers (CSV, SQL)

- **Exemple** :
  ```bash
  # Export depuis MySQL
  mysqldump -u utilisateur -p --no-create-info --skip-extended-insert base_de_donnees > donnees.sql
  # Import vers PostgreSQL (après adaptation manuelle du fichier)
  psql -U utilisateur -d base_de_donnees -f donnees_adaptees.sql
  ```
- **Adaptation nécessaire** :
  - Les types de données diffèrent (ex : `INT` → `INTEGER`, `DATETIME` → `TIMESTAMP`).
  - Les fonctions spécifiques à MySQL (comme `NOW()`) doivent être remplacées par leurs équivalents PostgreSQL (`CURRENT_TIMESTAMP`).
  - Les dates au format `0000-00-00` (MySQL) ne sont pas acceptées par PostgreSQL et doivent être corrigées par NULL.

### Utilisation d'outils dédiés

* **[pgloader](https://pgloader.io/)** : Outil puissant pour migrer des données depuis MySQL vers PostgreSQL. Exemple de commande :
  ```bash
  pgloader mysql://utilisateur:motdepasse@localhost/base_de_donnees postgresql://utilisateur:motdepasse@localhost/base_de_donnees
  ```
  - pgloader gère automatiquement la conversion des types et des schémas, et permet une migration incrémentale.
* **[Boîte à outils ESF](https://www.dbsofts.com/articles/mysql_to_postgresql/)** : Solution graphique pour une migration guidée, avec génération de rapports de validation.
* **[Ispirer Toolkit](https://www.ispirer.com/products/postgresql-migration#migrate-to-postgresql)** : Automatise la migration de grandes bases de données et du code applicatif.

### Migration via un ETL

* Utilisation d'outils comme Talend, Pentaho ou Apache NiFi pour extraire, transformer et charger les données entre les deux SGBD.

## Exemples de conversion

### Types de données
| MySQL          | PostgreSQL      |
|----------------|-----------------|
| `INT`          | `INTEGER`       |
| `VARCHAR(255)` | `VARCHAR(255)`  |
| `DATETIME`     | `TIMESTAMP`     |
| `TEXT`         | `TEXT`          |
| `ENUM`         | `CHECK` + `VARCHAR` ou `CREATE TYPE` |

### Fonctions SQL

| MySQL               | PostgreSQL               |
|---------------------|--------------------------|
| `NOW()`             | `CURRENT_TIMESTAMP`      |
| `IFNULL(col, val)`  | `COALESCE(col, val)`     |
| `LIMIT 10 OFFSET 5` | `LIMIT 5 OFFSET 10`      |
| `AUTO_INCREMENT`    | `SERIAL` ou `IDENTITY`   |


## Étapes clés d'une migration réussie

1. **Préparation** :
   - Vérifier la compatibilité des schémas et des données.
   - Adapter les types de données et les requêtes SQL.
   - Tester la migration sur un environnement de staging.
2. **Migration** :
   - Utiliser un outil comme pgloader pour transférer les données.
   - Vérifier l'intégrité des données après migration.
3. **Post-migration** :
   - Optimiser les performances (index, requêtes).
   - Former les équipes aux spécificités de PostgreSQL.

## Avantages concrets de PostgreSQL après migration

* **Meilleure gestion des données complexes** : Support natif des JSON, des tableaux, et des types personnalisés.
* **Requêtes avancées** : Possibilité d'utiliser des CTE, des fonctions fenêtrées, et des requêtes récursives.
* **Extensibilité** : Ajout de modules comme PostGIS pour la géolocalisation.
* **Fiabilité** : Transactions ACID robustes, réplication avancée, et sauvegardes point-in-time recovery (PITR).
* **Coût** : Pas de licence commerciale, réduction des coûts d'infrastructure et de maintenance.

## Ressources utiles

- [Documentation pgloader](https://pgloader.io/)
- [Wiki PostgreSQL : Conversion depuis d'autres bases](https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL)
