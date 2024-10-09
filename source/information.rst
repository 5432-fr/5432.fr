Informations
============

Politique de versionnement
--------------------------

Le groupe de développement mondial de **PostgreSQL** publie une nouvelle version majeure contenant de nouvelles fonctionnalités environ une fois par an. Chaque version majeure reçoit des correctifs de bogues et, si nécessaire, des correctifs de sécurité qui sont publiés au moins une fois tous les trois mois dans ce que nous appelons une « version mineure ». 

Pour plus d'informations sur le calendrier des versions mineures, vous pouvez consulter la feuille de route des versions mineures.

Si l'équipe de publication détermine qu'un bogue critique ou un correctif de sécurité est trop important pour attendre la sortie de la version mineure régulièrement programmée, elle peut proposer une version en dehors de la feuille de route des versions mineures.

Le groupe de développement mondial de PostgreSQL prend en charge une version majeure pendant 5 ans après sa sortie initiale. Après cela, une version mineure finale sera publiée et le logiciel ne sera plus pris en charge (fin de vie).

Numérotation
------------

À partir de PostgreSQL 10, une version majeure est indiquée en augmentant la première partie du numéro de version, par exemple de 10 à 11. Avant PostgreSQL 10, une version majeure était indiquée en augmentant soit la première soit la deuxième partie du numéro de version, par exemple de 9.5 à 9.6.

Les versions mineures sont numérotées en augmentant la dernière partie du numéro de version. À partir de PostgreSQL 10, il s'agit de la deuxième partie du numéro de version, par exemple de 10.0 à 10.1 ; pour les versions plus anciennes, il s'agit de la troisième partie du numéro de version, par exemple de 9.5.3 à 9.5.4.

Mise à jour
-----------

Les versions majeures apportent des modifications complexes, de sorte que le contenu du répertoire de données ne peut pas être conservé de manière rétrocompatible. Un vidage/rechargement de la base de données ou l'utilisation de l'application pg_upgrade est nécessaire pour les mises à niveau majeures. 

Nous vous recommandons également de lire la section de mise à niveau de la version majeure vers laquelle vous envisagez de migrer. Vous pouvez effectuer une mise à niveau d'une version majeure vers une autre sans effectuer de mise à niveau vers les versions intermédiaires, mais nous vous recommandons de lire les notes de publication de toutes les versions majeures intermédiaires avant de le faire.

Les mises à niveau de versions mineures ne nécessitent pas de vidage et de restauration, vous arrêtez simplement le serveur de base de données, installez les binaires mis à jour et redémarrez le serveur. De telles mises à niveau peuvent nécessiter des étapes supplémentaires, lisez donc toujours les notes de publication en avant toute mise à jour.

Les versions mineures ne contiennent que des correctifs pour les bogues fréquemment rencontrés, les correctifs à faible risque, les problèmes de sécurité et les problèmes de corruption de données. 

La communauté considère que l'exécution de mises à niveau mineures est moins risquée que de continuer à exécuter une ancienne version mineure.

.. warning::

   Nous recommandons aux utilisateurs de toujours exécuter la version mineure actuelle associée à leur version majeure.

Cycle de vie
------------

.. csv-table::
   :file: eol.csv
   :delim: ;
   :header-rows: 1
