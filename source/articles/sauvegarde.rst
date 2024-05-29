Sauvegarde et restauration
--------------------------

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
