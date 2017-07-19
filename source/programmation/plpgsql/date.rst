Traitement sur les dates
------------------------

Convertir une date Access en type date
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sous Access et historiquement Lotus 1-2-3 (Explication `ici <https://stackoverflow.com/a/3963650>`_) la date est stockée
sous forme d'un entier, Dans PostgreSQL nosu allons utiliser le type interval pour retrouver le type date.

.. literalinclude:: sql/access_to_date.sql
   :language: postgres
   :linenos:
   :emphasize-lines: 15

.. only:: builder_html

    Télécharger le fichier :download:`access_to_date.sql<sql/access_to_date.sql>`

Pour l'utiliser  

.. code-block:: sql

    SELECT access_to_date(42821)
    -- on obtient 27/03/2017

La fonction inverse, qui permet de retrouver la valeur à stocker

.. literalinclude:: sql/date_to_access.sql
   :language: postgres
   :linenos:
   :emphasize-lines: 15

.. only:: builder_html

    Télécharger le fichier :download:`date_to_access.sql<sql/date_to_access.sql>`

.. code-block:: sql

    SELECT date_to_access('2017-03-27'::date)
    -- on obtient 42821
