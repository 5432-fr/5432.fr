---
title: "Migration de SQL Server vers PostgreSQL"
description: "Article sur les possibilités de migration de SQL Server vers une base PostgreSQL"
head:
  - - meta
    - name: 'keywords'
      content: 'SQL Server, microsoft, PostgreSQL, Ora2Pg, migration, SQLWays'
  - - meta
    - name: 'author'
      content: 'Christophe Chauvet'
  - - meta
    - name: 'copyright'
      content: 'CC BY-SA 4.0'             
---

# Migration de SQL Server vers PostgreSQL

## Préparation et analyse

* **Évaluation des différences** : PostgreSQL et SQL Server ont des types de données, des syntaxes SQL et des fonctionnalités différentes (ex : gestion des majuscules/minuscules, procédures stockées, types de données comme `NVARCHAR` vs `TEXT`).
* **Exemple** : Les procédures stockées SQL Server doivent souvent être converties en fonctions PostgreSQL, car les versions antérieures à PostgreSQL 11 ne supportent pas les procédures stockées de la même manière.
* **Transact SQL**: SQL Server (et Sybase dont il partage le même héritage) utilise du Transact SQL au lieu du SQL standard

## le Transact-SQL (aka T-SQL)

### Origine et Portée

* **SQL standard** :
  * Langage normalisé par l’ANSI et l’ISO pour interagir avec les bases de données relationnelles.
  * Utilisé par la plupart des SGBD (PostgreSQL, MySQL, Oracle, etc.).
  * Se concentre sur les requêtes de données (SELECT, INSERT, UPDATE, DELETE).

* **Transact-SQL (T-SQL)** :
  * Extension propriétaire Sybase, également utilisé par Microsoft pour SQL Server.
  * Ajoute des fonctionnalités procédurales (boucles, conditions, gestion des erreurs).
  * Utilisé uniquement dans l’écosystème Microsoft (SQL Server, Azure SQL, Sybase).

### Fonctionnalités Procédurales

* **SQL standard** :
  * Ne supporte pas nativement les boucles, conditions ou variables.
  * Les opérations complexes nécessitent souvent des requêtes imbriquées ou des scripts externes.

* **T-SQL** :
  * Supporte les **variables** (`DECLARE @var INT`), les **boucles** (`WHILE`, `FOR`), les **conditions** (`IF...ELSE`), et les **blocs de code** (`BEGIN...END`).
  * Permet la création de **procédures stockées**, **fonctions**, et **triggers** avec une logique complexe.

### Gestion des Erreurs

* **SQL standard** :
  * Pas de gestion des erreurs intégrée. Les erreurs doivent être gérées par l’application cliente.

* **T-SQL** :
  * Utilise `TRY...CATCH` pour capturer et traiter les erreurs directement dans le code SQL:
    ```sql
    BEGIN TRY
        -- Code susceptible de générer une erreur
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS Error;
    END CATCH
    ```


### Fonctions et Procédures Stockées

* **SQL standard** :
  * Les fonctions sont limitées et ne peuvent pas modifier l’état de la base (pas d’INSERT/UPDATE/DELETE dans une fonction).

* **T-SQL** :
  * Permet de créer des **procédures stockées** avec des paramètres d’entrée/sortie et des opérations de modification de données.
  * Exemple :
    ```sql
    CREATE PROCEDURE GetCustomer @CustomerID INT
    AS
    BEGIN
        SELECT * FROM Customers WHERE CustomerID = @CustomerID;
    END
    ```

### Syntaxe et Extensions

* **SQL standard** :
  * Syntaxe basique pour les requêtes (ex : `SELECT * FROM table WHERE condition`).

* **T-SQL** :
  * Extensions spécifiques :
    * `TOP` pour limiter le nombre de lignes : `SELECT TOP 10 * FROM table`.
    * `WITH` pour les Common Table Expressions (CTE) avancées.
    * `OUTPUT` pour retourner les lignes affectées par une requête DML.
    * `SET ROWCOUNT` pour limiter le nombre de lignes traitées.

### Transactions

* **SQL standard** :
  * Supporte les transactions basiques (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`).

* **T-SQL** :
  * Offre un contrôle plus fin avec des niveaux d’isolation (`READ UNCOMMITTED`, `REPEATABLE READ`, etc.) et des verrous explicites.

### Types de Données

* **SQL standard** :
  * Types de données standardisés (`INT`, `VARCHAR`, `DATE`).

* **T-SQL** :
  * Types spécifiques à SQL Server (`NVARCHAR`, `DATETIME2`, `UNIQUEIDENTIFIER`, `MONEY`).

### Exemples de Différences de Syntaxe

| Opération               | SQL Standard                     | T-SQL (SQL Server)               |
|-------------------------|----------------------------------|----------------------------------|
| Limiter les résultats   | `SELECT * FROM table LIMIT 10`   | `SELECT TOP 10 * FROM table`     |
| Concaténation           | `SELECT col1 || col2 FROM table` | `SELECT col1 + col2 FROM table`  |
| Gestion des dates       | `CURRENT_DATE`                   | `GETDATE()`                      |
| Commentaires            | `--` ou `/* */`                  | Idem, mais aussi `/*...*/`       |

### Compatibilité

* **T-SQL** n’est pas portable : un script T-SQL doit souvent être réécrit pour fonctionner sur PostgreSQL, MySQL ou Oracle.
* **SQL standard** est conçu pour être portable, mais chaque SGBD ajoute ses propres extensions.

## Outils de migration populaires

### AWS Schema Conversion Tool (SCT)

* **Fonctionnalités** : Convertit le schéma (tables, vues, procédures) et les données. Intègre avec AWS Database Migration Service (DMS) pour une migration fluide.
* **Exemple** : Permet de configurer des paramètres de conversion spécifiques (ex : utiliser `CITEXT` pour gérer l’insensibilité à la casse).

### pgloader

* **Fonctionnalités** : Outil open source pour charger des données depuis SQL Server vers PostgreSQL. Supporte la conversion des types de données et des contraintes.
* **Exemple** : Commande typique :
  ```bash
  pgloader mssql://utilisateur:motdepasse@serveur/basededonnées postgresql://utilisateur:motdepasse@serveur/basededonnées
  ```
* **Avantage** : Rapide et flexible pour les migrations de données massives.

### ESF Database Migration Toolkit

* **Fonctionnalités** : Interface graphique pour migrer schémas et données en 3 étapes (connexion, mappage, exécution).
* **Exemple** : Permet de sélectionner les schémas source et cible, et de lancer la migration en un clic.

### SQLWays (Ispirer)

* **Fonctionnalités** : Convertit les scripts Transact-SQL en PL/pgSQL, gère les dépendances entre objets.
* **Exemple** : Peut convertir des fonctions SQL Server en fonctions PostgreSQL équivalentes.

### Ora2pg

* **Fonctionnalités** : Bien que conçu pour Oracle, il peut aussi aider pour SQL Server, notamment pour la conversion de schémas et de données.

## Étapes clés de la migration

1. **Conversion du schéma** : Adapter les types de données (ex : `DATETIME` → `TIMESTAMP`), les contraintes, et les index.
2. **Migration des données** : Utiliser un outil comme pgloader ou AWS DMS pour transférer les données.
3. **Conversion du code** : Réécrire les procédures stockées, triggers et fonctions en PL/pgSQL.
4. **Tests** : Vérifier l’intégrité des données, les performances et la compatibilité des requêtes.

## Exemples concrets

* **Gestion des majuscules/minuscules** : Utiliser l’extension `CITEXT` dans PostgreSQL pour émuler le comportement de SQL Server.
* **Migration de procédures** : Convertir une procédure SQL Server en fonction PostgreSQL :
  ```sql
  -- SQL Server
  CREATE PROCEDURE GetCustomer @id INT AS SELECT * FROM Customers WHERE id = @id;
  -- PostgreSQL
  CREATE FUNCTION get_customer(id INT) RETURNS SETOF Customers AS $$ SELECT * FROM Customers WHERE id = $1; $$ LANGUAGE SQL;
  ```

## Bonnes pratiques et pièges à éviter

* **Sauvegardes** : Toujours sauvegarder les bases source et cible avant la migration.
* **Downtime** : Prévoir une fenêtre de maintenance pour les migrations de grandes bases.
* **Compatibilité** : Tester les applications clientes avec la nouvelle base PostgreSQL.

## Ressources utiles

* [AWS SCT Documentation](https://docs.aws.amazon.com/fr_fr/SchemaConversionTool/latest/userguide/CHAP_Source.SQLServer.ToPostgreSQL.html)
* [pgloader Documentation](https://pgloader.io/)
* [ESF Database Migration Toolkit](https://www.dbsofts.com/fr/articles/mssql_a_postgresql/)
