---
title: Programmation langage PLpgSQL
---
# Langage PLpgSQL {#langage_plpgsql}

[PL/pgSQL](https://docs.postgresql.fr/17/plpgsql.html) (Procedural
Language/PostgreSQL) est un langage de programmation procédural pris en
charge par le SGBDR **PostgreSQL**.

Il ressemble beaucoup au langage PL/SQL d'Oracle. Implémenté par Jan
Wieck, PL/pgSQL est apparu pour la première fois avec PostgreSQL 6.4,
publié le 30 octobre 1998.

La version 9 implémente également certaines fonctionnalités ISO SQL/PSM,
comme la surcharge des fonctions et procédures invoquées par SQL.

PL/pgSQL, en tant que langage de programmation complet, permet un
contrôle procédural beaucoup plus important que SQL, y compris la
possibilité d'utiliser des boucles et d'autres structures de contrôle.

Les instructions et déclencheurs SQL peuvent appeler des fonctions
créées dans le langage [PL/pgSQL](https://docs.postgresql.fr/17/plpgsql.html).

La conception de [PL/pgSQL](https://docs.postgresql.fr/17/plpgsql.html)
visait à permettre aux utilisateurs de PostgreSQL d\'effectuer des
opérations et des calculs plus complexes que SQL, tout en offrant une
facilité d\'utilisation.

Le langage peut être défini comme approuvé par le serveur.

[PL/pgSQL](https://docs.postgresql.fr/17/plpgsql.html) est l\'un des
langages de programmation inclus dans la distribution standard de
PostgreSQL, les autres étant PL/Tcl, PL/Perl et PL/Python. De plus, de
nombreux autres sont disponibles auprès de tiers, notamment PL/Java,
PL/pgPSM, PL/php, PL/R, PL/Ruby, PL/sh, PL/Lua, Postmodern (basé sur
Common Lisp) et PL/v8.

PostgreSQL utilise Bison comme analyseur, ce qui facilite le portage de
nombreux langages open source, ainsi que la réutilisation du code.

* [Dates](./plpgsql-date.md) Traitement sur les dates
