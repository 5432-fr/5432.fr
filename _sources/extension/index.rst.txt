.. _extensions:

Extensions
==========

.. index:: extensions

Apache AGE
----------

.. index:: Apache AGE 

Apache AGE® est une extension PostgreSQL qui fournit des fonctionnalités de base de données graphiques.

L'objectif d'Apache AGE® est de fournir des capacités de traitement et d'analyse de données graphiques à toutes les bases de données relationnelles.

Grâce à Apache AGE, les utilisateurs de PostgreSQL auront accès à la modélisation de requêtes graphiques au sein de la base de données relationnelle existante.

Les utilisateurs peuvent lire et écrire des données graphiques dans les nœuds et les arêtes. Ils peuvent également utiliser divers algorithmes tels que la longueur variable et la traversée des bords lors de l'analyse des données.

Lien vers `Apache AGE <https://age.apache.org/>`_

Citus
-----

.. index:: Citus

Citus est une extension PostgreSQL qui transforme Postgres en une base de données distribuée afin que vous puissiez atteindre des performances élevées à n'importe quelle échelle.

Avec Citus, vous étendez votre base de données PostgreSQL avec de nouveaux super pouvoirs :

* **Les tables distribuées** sont réparties sur un cluster de nœuds PostgreSQL pour combiner leur capacité CPU, mémoire, stockage et E/S.
* **Les tables de références** sont répliquées sur tous les nœuds pour les jointures et les clés étrangères des tables distribuées et des performances de lecture maximales.
* **Le moteur de requête** distribué achemine et parallélise SELECT, DML et d'autres opérations sur les tables distribuées à travers le cluster.
* **Le stockage en colonnes** compresse les données, accélère les analyses et prend en charge des projections rapides, à la fois sur des tables régulières et distribuées.
* **Les requêtes** à partir de n'importe quel nœud vous permettent d'utiliser toute la capacité de votre cluster pour les requêtes distribuées

Lien vers `Citus <https://github.com/citusdata/citus>`_

PLpgSQL Checker
---------------

.. index:: PLpgSQL Checker, PLpgSQL

Cette extension est un linter complet pour plpgsql pour PostgreSQL.

Il exploite uniquement l'analyseur/évaluateur interne de PostgreSQL afin que vous voyiez exactement 
les erreurs qui se produiraient au moment de l'exécution. 
De plus, il analyse le SQL à l'intérieur de vos routines et trouve des erreurs que l'on ne trouve 
généralement pas lors de la commande **CREATE PROCEDURE/FUNCTION**.

Vous pouvez contrôler les niveaux de nombreux avertissements et astuces. 

Enfin, vous pouvez ajouter des marqueurs de type PRAGAMA pour activer/désactiver de nombreux aspects 
vous permettant de masquer les messages que vous connaissez déjà, ou pour vous rappeler de revenir 
pour un nettoyage plus approfondi plus tard.


Lien vers `PLpgSQL Checker <https://github.com/okbob/plpgsql_check/>`_

Orafce
------

.. index:: Orafce, Oracle, fonction, package

Ce module contient quelques fonctions utiles qui peuvent aider au portage de l'application Oracle vers PostgreSQL 
ou qui peuvent être généralement utiles.

Les fonctions de date Oracle intégrées ont été testées par rapport à Oracle 10 pour vérifier leur conformité. 

Les plages de dates de 1960 à 2070 fonctionnent correctement. 
Les dates antérieures au 01/03/1100 ne peuvent pas être vérifiées en raison d'un bug dans Oracle.

Toutes les fonctions sont entièrement compatibles avec Oracle et respectent toutes les chaînes de format connues. 

Des descriptions détaillées peuvent être trouvées sur Internet. Utilisez des mots-clés tels que: oracle round trunc date iyyy.

Lien vers `Orafce <https://github.com/orafce/orafce>`_

PostgreSQL semantic versioning extension
----------------------------------------

**pg_text_semver** est une extension Postgres qui implémente la spécification Semantic Versioning 2.0.0, 
ce qui distingue cette extension, c'est qu'elle offre un simple DOMAIN semver basé sur le type de texte intégré de Postgres.

Lien vers `pg_text_semver <https://github.com/bigsmoke/pg_text_semver>`_

pgTAP
-----

pgTAP est un framework de tests unitaires pour PostgreSQL écrit en PL/pgSQL et PL/SQL.

Il comprend une collection complète de fonctions d'assertion émettant des TAP, 
ainsi que la possibilité de s'intégrer à d'autres frameworks de tests émettant des TAP. 

Il peut également être utilisé dans le style de test xUnit

Lien vers `pgTAP <https://pgtap.org/>`_