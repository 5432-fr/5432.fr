Langage C
=========

.. index:: langage c

Bibliothèque
------------

La bibliothèque pour le langage C se nomme `libpq <http://docs.postgresqlfr.org/9.5/libpq.html>`_ 

Il existe également un *Préprocesseur C pour le SQL embarqué* qui se nomme `ecpg <https://docs.postgresql.fr/9.6/ecpg.html>_

.. note::

     ecpg est le préprocesseur du SQL embarqué pour les programmes écrits en C. Il convertit des programmes écrits en C contenant des instructions SQL embarqué en code C normal.
     Pour se faire, les appels au SQL sont remplacés par des appels spéciaux de fonctions. Les fichiers en sortie peuvent être traités par n'importe quel compilateur C.

     ecpg convertit chaque fichier en entrée, donné sur la ligne de commande, en un fichier C correspondant. Les fichiers en entrée ont de préférence l'extension .pgc.
     L'extension sera remplacée par .c pour déterminer le nom du fichier en sortie. Ce nom peut aussi être surchargé en utilisant l'option -o. 


