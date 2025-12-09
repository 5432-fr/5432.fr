---
title: Article sur la sauvegarde et restauration de PostgreSQL
description: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la sauvegarde et la restauration de la base de données
head:
  - - meta
    - name: 'keywords'
      content: 'sauvegarde, restauration, PostgreSQL, pg_dump, pg_restore, pgbackrest, psql'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0      
  - - meta
    - property: 'og:title'
      content: Article décrivant les possibilités des opérations de sauvegarde et de restauration de la base de données PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la sauvegarde et la restauration de la base de données
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - name: 'twitter:title'
      content: Article décrivant les possibilités des opérations de sauvegarde et de restauration de la base de données PostgreSQL
  - - meta      
    - name: 'twitter:description'
      content: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la sauvegarde et la restauration de la base de données      
---

# Sauvegarde et restauration

## Introduction

La sauvegarde et la restauration font référence aux technologies et
pratiques permettant de réaliser des copies périodiques de données et
d'applications sur un périphérique secondaire distinct, puis
d'utiliser ces copies pour récupérer les données et les applications,
ainsi que les opérations commerciales dont elles dépendent.

La sauvegarde et la restauration sont utilisées si les données et les
applications d'origine sont perdues ou endommagées en raison d'une
panne de courant, d'une cyberattaque, d'une erreur humaine, d'une
catastrophe ou de tout autre événement imprévu.

## Sous PostgreSQL

Sous PostgreSQL par défaut il existe 3 type de sauvegarde.

- Sauvegarde de type SQL (Dump)
- Sauvegarde au niveau du système de fichier
- Sauvegarde en archivage continue

### Sauvegarde

La sauvegarde SQL (également appelé Dump) se réalise avec le programme
founit en standard
[pg_dump](https://docs.postgresql.fr/current/app-pgdump.html).

### Restauration

la restauration de cette sauvegarde se fera avec le programme
[pg_restore](https://docs.postgresql.fr/current/app-pgrestore.html)

## pg_dump – Sauvegarde de bases PostgreSQL

### Description

pg_dump est un outil en ligne de commande qui permet de sauvegarder une base de données PostgreSQL.

Avantages :

* Ne bloque pas les autres connexions.
* Plusieurs formats de sortie possibles.
* Permet de sauvegarder tout ou partie d’une base.

### Formats de sorties

| Format | Description | Extension |
|:------:|:------------|:---------:|
| SQL | Script SQL lisible et portable. | .sql |
| Custom | Format binaire optimisé pour pg_restore. | .dump |
| Directory | Un fichier par table, idéal pour les grosses BDD. | /dir/ |
| Tar | Format binaire compressé, compatible avec tar. | .tar |

### Options courantes

| Option | Description |
|--------|-------------|
| -U utilisateur | Nom de l’utilisateur PostgreSQL |
| -h hôte | Adresse du serveur PostgreSQL |
| -p port | Port de connexion (par défaut : 5432) |
| -d base | Nom de la base à sauvegarder |
| -F format | Format de sortie (p, c, d, t) |
| -f fichier | Fichier de sortie |
| -W | Demande le mot de passe |
| --clean | Nettoie les objets avant recréation |
| --if-exists | Utilise IF EXISTS pour éviter les erreurs |

### Exemples d’utilisation

####  Sauvegarde complète en SQL

``` shell
pg_dump -U mon_user -h localhost -p 5432 -d ma_base -F p -f sauvegarde.sql
```
#### Sauvegarde en format custom (binaire)

``` shell
pg_dump -U mon_user -d ma_base -F c -f sauvegarde.dump
```

#### Sauvegarde en format directory

``` shell
pg_dump -U mon_user -d ma_base -F d -f sauvegarde_dir/
```

#### Sauvegarde avec compression


``` shell
pg_dump -U mon_user -d ma_base -F c -f - | gzip > sauvegarde.dump.gz
```

#### Sauvegarde d’un schéma spécifique


``` shell
pg_dump -U mon_user -d ma_base -n mon_schema -f schema.sql
```

#### Sauvegarde des données uniquement


``` shell
pg_dump -U mon_user -d ma_base -a -f données.sql
```


## pg_restore – Restauration de bases PostgreSQL

### Description

pg_restore permet de restaurer une base de données PostgreSQL à partir d’un fichier créé par pg_dump (surtout en formats custom, directory ou tar).

Avantages :

* Restauration sélective (tables, schémas, etc.).
* Contrôle fin sur les options de restauration.
* Optimisé pour les gros volumes.

#### Formats supportés

| Format | Description |
|:------:|-------------|
| Custom | Format binaire optimisé pour pg_restore |
| Directory | Un fichier par table, idéal pour les grosses BDD |
| Tar | Format binaire compressé, compatible avec tar |

::: warning
Ne fonctionne pas avec les sauvegardes en format SQL pur (.sql)

utiliser la commande [psql](https://docs.postgresql.fr/17/app-psql.html  "terminal interactif PostgreSQL") dans ce cas
:::

#### Options courantes

| Option | Description |
|:------:|-------------|
| -U utilisateur | Nom de l’utilisateur PostgreSQL |
| -h hôte | Adresse du serveur PostgreSQL |
| -p port | Port de connexion (par défaut : 5432) |
| -d base | Base cible pour la restauration |
| -F format | Format de la sauvegarde (c, d, t) |
| -j nombre | Nombre de jobs parallèles (accélère la restauration) |
| --clean | Nettoie les objets avant recréation |
| --if-exists | Utilise IF EXISTS pour éviter les erreurs |
| --no-owner | Ignore les propriétaires des objets |
| --no-privileges | Ne restaure pas les permissions |
| -v | Mode verbeux |
| -l | Liste le contenu de la sauvegarde |


### Exemples d’utilisation

#### Restauration complète (format custom)

``` shell
pg_restore -U mon_user -d ma_base -F c sauvegarde.dump
```

#### Restauration avec jobs parallèles (4 jobs)

``` shell
pg_restore -U mon_user -d ma_base -j 4 -F c sauvegarde.dump
```

#### Restauration sélective (une seule table)

``` shell
pg_restore -U mon_user -d ma_base -t ma_table -F c sauvegarde.dump
```

#### Restauration en mode "clean" (nettoyage avant)

``` shell
pg_restore -U mon_user -d ma_base --clean --if-exists -F c sauvegarde.dump
```

#### Lister le contenu d’une sauvegarde

``` shell
pg_restore -l -F c sauvegarde.dump
```

#### Restauration depuis un format directory

``` shell
pg_restore -U mon_user -d ma_base -F d sauvegarde_dir/
```

#### Depuis un script SQL

``` shell
psql -U mon_user -d ma_base -f sauvegarde.sql
```

::: warning

Dans cet exemple on utilise [psql](https://docs.postgresql.fr/17/app-psql.html  "terminal interactif PostgreSQL") au lieu de [pg_restore](https://docs.postgresql.fr/17/app-pgrestore.html "terminal de restauration")
:::

## pgBackRest – Sauvegarde et Restauration PostgreSQL

### Description

[pgBackRest](https://pgbackrest.org/ "Sauvegarde et restauration PostgreSQL fiables") est un outil open source conçu pour gérer les sauvegardes fiables, performantes et automatisées des bases de données PostgreSQL.

Avantages :

* Sauvegardes incrémentielles et différentielles.
* Compression et chiffrement natifs.
* Restauration rapide et flexible (PITR, tablespaces, etc.).
* Intégration facile avec les environnements de production.
* Support des clusters et réplications.

### Concepts clés

| Concept | Description |
|:-------:|:------------|
| Full Backup | Sauvegarde complète de la base | 
| Incremental Backup | Sauvegarde uniquement les changements depuis la dernière sauvegarde | 
| Differential Backup | Sauvegarde les changements depuis la dernière sauvegarde complète | 
| PITR | Restauration à un point précis dans le temps (Point-In-Time Recovery) |
| Stanza | Configuration logique d’une base ou d’un cluster à sauvegarder |
| Repository | Emplacement de stockage des sauvegardes (local, S3, SFTP, etc.) |

### Installation

Sur Debian/Ubuntu

``` shell
sudo apt-get install pgbackrest
```

Sur RHEL/CentOS

``` shell
sudo yum install pgbackrest
```

### Configuration minimale

``` ini
[global]
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
log-level-console=info

[ma_stanza]
pg1-path=/var/lib/postgresql/17/main
```

### Commandes de base

####  Initialiser une stanza

``` shell
pgbackrest --stanza=ma_stanza stanza-create
```

#### Sauvegarde complète

``` shell
pgbackrest --stanza=ma_stanza --type=full backup
```

#### Sauvegarde incrémentielle

``` shell
pgbackrest --stanza=ma_stanza --type=incr backup
```

#### Vérifier l’état des sauvegardes

``` shell
pgbackrest info
```

#### Restauration complète

``` shell
pgbackrest --stanza=ma_stanza restore
```

#### Restauration PITR (Point-In-Time Recovery)

``` shell
pgbackrest --stanza=ma_stanza --type=time --target="2025-09-13 12:00:00+00" restore
```

### Exemples avancés

#### Sauvegarde avec compression et chiffrement

``` ini
[global]
repo1-cipher-type=aes-256-cbc
repo1-cipher-pass=mon_mot_de_passe
compress-level=3
```

#### Sauvegarde vers un repository distant (S3)

``` ini
[global]
repo1-type=s3
repo1-s3-bucket=mon-bucket-pgbackrest
repo1-s3-endpoint=s3.eu-west-3.amazonaws.com
repo1-s3-region=eu-west-3
repo1-s3-key=ma_clé
repo1-s3-key-secret=ma_clé_secrète
```

#### Restauration vers un nouvel emplacement

``` shell
pgbackrest --stanza=ma_stanza --pg1-path=/nouveau/chemin/data restore
```

### Documentation officielle

* [Site officiel pgBackRest](https://pgbackrest.org/ "Site officiel")
* [Guide utilisateur](https://pgbackrest.org/user-guide-index.html "Guide utilisateur en Anglais")
* [Guide des commandes en ligne](https://pgbackrest.org/command.html "Liste des commandes")
* [Guide de la configuration](https://pgbackrest.org/configuration.html "Guide de la configuration")

## Articles divers

### Sauvegarde

- [Faire une sauvegarde avec
  pgBackRest](http://laetitia-avrot.blogspot.fr/2017/02/faire-une-sauvegarde-avec-pgbackrest.html)

### Restauration

- [Restaurer avec
  pgBackRest](http://laetitia-avrot.blogspot.fr/2017/02/restaurer-avec-pgbackrest.html)
