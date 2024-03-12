.. title:: Programmation langage C

.. meta::
   :description: Programmation en langage C
   :keywords: c, langage, postgresql, c++

.. _langage_c:

Langage C
=========

.. index:: langage c

PostgreSQL était écrit en **C**, il existe par conséquent une bibliothèque native qui se nomme `libpq <https://docs.postgresql.fr/current/libpq.html>`_

.. _language_c_libpq:

Bibliothèque libpq
------------------

.. index:: libpq

La bibliothèque pour le language C se nomme `libpq <https://doc.postgresql.fr/16/libpq.html>`_ .

D'autres langages de programmation on également leur bibliothèque mais les principales s'appuie sur la libpq

Bibiothèque ECPG 
________________

ECPG est un préprocesseur, qui vous permet d'embarquer du SQL directement dans votre programme en C

vos fichiers C embraquant du SQL auront pour extension **pgc**.

Chaque instructions utilisants du SQL commencera par **EXEC SQL**. 

Ci-dessous un exemple tiré de la documentation utilisant de multiples connexions

.. literalinclude:: c/exemple1.pgc
   :language: c



