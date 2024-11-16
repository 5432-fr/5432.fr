:og:title: Liste d'articles autour des opérations de sauvegarde et de restauration de la base de données PostgreSQL
:og:description: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la sauvegarde et la restauration de la base de données
:og:type: article   

.. title:: Liste d'articles autour des opérations de sauvegarde et de restauration de la base de données PostgreSQL

.. meta::
   :description: Cette page regroupe des séries d'article sur PostgreSQL en français concernant la sauvegarde et la restauration de la base de données
   :keywords: sauvegarde, restauration, pg_dump

Sauvegarde et restauration
==========================

Introduction
------------

La sauvegarde et la restauration font référence aux technologies et pratiques permettant de réaliser des copies périodiques 
de données et d'applications sur un périphérique secondaire distinct, puis d'utiliser ces copies pour récupérer les données 
et les applications, ainsi que les opérations commerciales dont elles dépendent.

La sauvegarde et la restauration sont utilisées si les données et les applications d'origine sont perdues ou endommagées 
en raison d'une panne de courant, d'une cyberattaque, d'une erreur humaine, d'une catastrophe ou de tout autre événement imprévu.

Sous PostgreSQL
---------------

Sous PostgreSQL par défaut il existe 3 type de sauvegarde.

* Sauvegarde de type SQL (Dump)
* Sauvegarde au niveau du système de fichier
* Sauvegarde en archivage continue

Sauvegarde SQL
^^^^^^^^^^^^^^

La sauvegarde SQL (également appelé Dump) se réalise avec le programme founit en standard `pg_dump <https://docs.postgresql.fr/current/app-pgdump.html>`_.

la restauration de cette sauvegarde se fera avec le programme `pg_restore <https://docs.postgresql.fr/current/app-pgrestore.html>`_

Articles
--------

Sauvegarde
^^^^^^^^^^

* `Faire une sauvegarde avec pgBackRest <http://laetitia-avrot.blogspot.fr/2017/02/faire-une-sauvegarde-avec-pgbackrest.html>`_

Restauration
^^^^^^^^^^^^

* `Restaurer avec pgBackRest <http://laetitia-avrot.blogspot.fr/2017/02/restaurer-avec-pgbackrest.html>`_
