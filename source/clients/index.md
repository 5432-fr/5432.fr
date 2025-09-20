---
title: Clients graphiques et ligne de commande
---

# Clients graphiques et ligne de commande

`PostgreSQL` possède une multitude de clients graphique ou en ligne de commande. Parmi ces clients, certains sont davantage des outils d’administration, 
tandis que d’autres offrent des fonctionnalités utiles aux développeurs, certains proposent un mix des deux.


Voici une liste des principaux clients pour interagir avec PostgreSQL, classés en deux catégories : **clients graphiques** et **clients en ligne de commande**.


## Clients Graphiques (GUI)

| Nom | Description | Plateformes supportées |
|:---:|:------------|:----------------------:|
| [pgAdmin 4](https://www.pgadmin.org) | L’outil officiel, riche en fonctionnalités, idéal pour l’administration. | Windows, macOS, Linux, Web |
| [DBeaver](https://dbeaver.io) | Client universel supportant PostgreSQL et bien d’autres bases de données. | Windows, macOS, Linux  |
| [TablePlus](https://tableplus.com/)  | Interface moderne, légère et intuitive. | Windows, macOS, Linux |
| [DataGrip](https://www.jetbrains.com/fr-fr/datagrip/) | IDE puissant de JetBrains pour les bases de données. | Windows, macOS, Linux  |
| **OmniDB**                | Client open source, orienté développement et administration. | Windows, macOS, Linux |
| [SQLPro for PostgreSQL](https://macpostgresclient.com/) | Client natif pour macOS, simple et efficace. | macOS |
| [pgweb](https://sosedoff.github.io/pgweb/) | Client web mais compilé poru les différentes plateformes | Windows, macOS, Linux, Web     |
| [Adminer](https://www.adminer.org) | Gestionnaire de base de données pour administation à distance | Web |
| [Navicat for PostgreSQL](https://www.navicat.com/en/products/navicat-for-postgresql) | Outil de gestion de base de données facile à utiliser conçu pour simplifier les complexités de la gestion des serveurs PostgreSQL |  Windows macOS Linux iOS |
| [PostgreSQL Maestro](https://www.sqlmaestro.com/products/postgresql/maestro/) | PostgreSQL Tools Family contient des outils d'interface graphique pour l'administration et le développement du serveur PostgreSQL | Windows |


## Clients en Ligne de Commande (CLI)

| Nom  | Description                                                                 | Plateformes supportées         |
|:----:|-----------------------------------------------------------------------------|--------------------------------|
| [psql](https://docs.postgresql.fr/17/app-psql.html) | Client officiel de PostgreSQL, puissant et scriptable. | Windows, macOS, Linux  |
| [pgcli](https://www.pgcli.com/) | Alternative à psql avec autocomplétion et syntaxe colorée. | Windows, macOS, Linux  |
| [usql](https://github.com/xo/usql) | universal command-line interface for PostgreSQL and other databases | Windows, macOS, Linux |


::: info Remarque
* **psql** est installé par défaut avec PostgreSQL.
* Pour les outils tiers, vérifie toujours la compatibilité avec ta version de PostgreSQL.
:::


## Outil de modélisation

| Nom  | Description | Plateformes supportées |
|:----:|-------------|:----------------------:|
| [pgModeler](http://www.pgmodeler.com.br/) | pgModeler est un modeleur de base de données open source et multiplateforme conçu spécifiquement pour PostgreSQL | Linux, macOS, Windows |
| [DbVisualizer](https://www.dbvis.com/database/postgresql/features/) | DbVisualizer a été conçu pour vous offrir un contrôle maximal sur votre base de données PostgreSQL | Linux, macOS, Windows |

## Monitoring

| Nom  | Description | Plateformes supportées |
|:----:|-------------|:----------------------:|
| [temBoard](https://github.com/dalibo/temboard) | PostgreSQL Remote Control | |
| [pgwatch](https://github.com/cybertec-postgresql/pgwatch/) | Monitoring / tableau de bord pour PostgreSQL | |

## Agent

| Nom  | Description | Plateformes supportées |
|:----:|-------------|:----------------------:|
| [pg_listen](https://github.com/begriffs/pg_listen) | Utilise Listen/Notify pour executer des commandes shell | Linux, macOS, Windows |
| [pgAgent](https://www.pgadmin.org/docs/pgadmin4/development/pgagent.html) | Planificateur de tâche sous PostgreSQL | Linux, macOS, Windows |