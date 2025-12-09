---
title: Articles autour des opérations de la réplication de PostgreSQL
description: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la réplication de la base de données
head:
  - - meta
    - name: 'keywords'
      content: 'replication, slony, Londiste, Bucardo, wal, PostgreSQL'
  - - meta
    - property: 'og:title'
      content: Liste d'articles autour des opérations de la réplication de la base de données PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la réplication de la base de données
  - - meta      
    - property: 'og:type'
      content: 'article'
---
# Réplication

## Introduction

La réplication de base de données consiste à copier électroniquement et
fréquemment des données d'une base de données d'un ordinateur ou d'un
serveur vers une base de données d'un autre, de sorte que tous les
utilisateurs partagent le même niveau d'informations.

Le résultat est une base de données distribuée dans laquelle les
utilisateurs peuvent accéder r apidement aux données pertinentes pour
leurs tâches sans interférer avec le travail des autres. De nombreux
éléments contribuent au processus global de création et de gestion de la
réplication de base de données.

Voici les principales méthodes de **réplication** disponibles sous **PostgreSQL**, classées par type et usage :

## Réplication Physique (binaire)

- **Fonctionnement** : Copie exacte des fichiers de données (WAL - Write-Ahead Log).
- **Méthodes** :
  - **Réplication continue (Streaming Replication)** :
    - Le serveur principal envoie les WAL en temps réel aux réplicas.
    - Utilisé pour la haute disponibilité et la tolérance aux pannes.
  - **Réplication par archive (Log Shipping)** :
    - Les WAL sont archivés et restaurés sur le réplica.
    - Moins temps réel, mais plus simple à mettre en place.

## Réplication Logique

- **Fonctionnement** : Copie des données au niveau logique (tables, lignes).
- **Méthodes** :
  - **Publication/Souscription (Publishing/Subscribing)** :
    - Permet de répliquer des tables spécifiques entre bases, même de versions différentes.
    - Idéal pour la synchronisation partielle ou la migration.
  - **Extensions tierces** :
    - `pglogical`, `Londiste`, `Bucardo` : pour des besoins avancés ou multi-maîtres.

## Réplication Multi-Maître

- **Fonctionnement** : Plusieurs nœuds acceptent les écritures.
- **Solutions** :
  - **PostgreSQL natif** : Limité, nécessite des outils externes.
  - **Extensions** : `BDR`, `Citus` (pour le sharding et la réplication distribuée).
  - **Solutions externes** : `pgpool-II` (avec gestion de conflit).

## Réplication par Trigger

- **Fonctionnement** : Utilisation de triggers pour copier les modifications vers une autre base.
- **Avantages/Inconvénients** : Flexible mais complexe et moins performant.

## Réplication via Outils Externes

- **Exemples** :
  - `pgpool-II` : Gestion de pool de connexions et réplication.
  - `Slony` : Réplication asynchrone multi-maître.
  - `Barman` : Sauvegarde et restauration, utile pour la réplication de secours.

## Résumé des cas d’usage

| Type de réplication         | Cas d’usage principal                       | Complexité |
|-----------------------------|---------------------------------------------|------------|
| Streaming Replication       | Haute disponibilité, failover               | Moyenne    |
| Log Shipping                | Sauvegarde à distance, PRA                  | Faible     |
| Publication/Souscription    | Synchronisation partielle, migration        | Faible     |
| Multi-Maître                | Écritures distribuées, tolérance aux pannes | Élevée     |
| Trigger                     | Synchronisation personnalisée               | Élevée     |


## Articles DIvers

- [PostgreSQL 10 et la réplication logique -- Fonctionnement](https://blog.anayrat.info/2017/07/29/postgresql-10-et-la-replication-logique-fonctionnement/)
- [PostgreSQL 10 et la réplication logique -- Mise en oeuvre](https://blog.anayrat.info/2017/08/05/postgresql-10-et-la-replication-logique-mise-en-oeuvre/)
- [PostgreSQL 10 et la réplication logique -- Restrictions](https://blog.anayrat.info/2017/08/27/postgresql-10-et-la-replication-logique-restrictions/)
- [PostgreSQL et la réplication logique](http://www.loxodata.com/post/replicationlogique/)
