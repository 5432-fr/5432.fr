---
title: Descriptif des langages de procédures sous PostgreSQL
description: Listes des langages procéduraux utilisables avec la base de données PostgreSQL
head:
  - - meta
    - name: 'keywords'
      content: 'PL, PL/PgSQL, PL/Perl, PL/Python, PL/Rust, PL/Lua, PL/R'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0      
---

# Langages de procédures

## Introduction

Les langages de procédures permettent d’écrire des fonctions, des déclencheurs (triggers) et des procédures stockées directement dans la base de données.

Actuellement, la distribution standard de PostgreSQL inclut quatre langages de procédures par défaut : 

* [PL/pgSQL](https://docs.postgresql.fr/18/plpgsql.html "PL/pgSQL -- Langage de procédures SQL"), 
* [PL/Tcl](https://docs.postgresql.fr/18/pltcl.html "PL/Tcl -- Langage de procédures Tcl"), 
* [PL/Perl](https://docs.postgresql.fr/18/plperl.html "PL/Perl -- Langage de procédures Perl"),
* [PL/Python](https://docs.postgresql.fr/18/plpython.html "PL/Python -- Langage de procédures Python").

## PL/pgSQL

### Résumé

Langage procédural natif de PostgreSQL, inspiré de PL/SQL (Oracle). Il est le plus utilisé pour écrire des fonctions et des déclencheurs. PL/pgSQL permet de manipuler des données, de gérer des erreurs, et d’utiliser des structures de contrôle (boucles, conditions, etc.).

### Avantages

* Intégration parfaite avec PostgreSQL.
* Performant et optimisé.
* Support complet des fonctionnalités de PostgreSQL.

### Cas d’usage

* Logique métier complexe dans la base de données.
* Déclencheurs (triggers).
* Fonctions personnalisées.

## PL/Tcl

### Résumé

Permet d’utiliser le langage [Tcl](https://www.tcl-lang.org/ "Site web du langage TCL") (Tool Command Language) pour écrire des fonctions et des déclencheurs. Tcl est un langage de script dynamique, souvent utilisé pour des tâches d’automatisation ou de prototypage.

### Avantages

* Flexibilité et simplicité de TCL.
* Accès aux bibliothèques TCL.

### Cas d’usage

* Scripts d’automatisation.
* Traitements nécessitant des expressions régulières ou des manipulations de chaînes avancées.

## PL/Perl

### Résumé

Permet d’écrire des fonctions et des déclencheurs en [Perl](https://www.perl.org/ "Langage Perl"), un langage puissant pour le traitement de texte et les expressions régulières.

### Avantages

* Puissance de Perl pour le traitement de texte.
* Accès aux modules Perl (si autorisé).

### Cas d’usage

* Traitement de données textuelles complexes.
* Parsing et transformation de données.

## PL/Python

### Résumé

Permet d’utiliser [Python](https://www.python.org/ "Langage Python") pour écrire des fonctions et des déclencheurs. Python est un langage populaire pour sa lisibilité et sa richesse en bibliothèques.

### Avantages

* Lisibilité et simplicité de Python.
* Accès à des bibliothèques Python (si autorisé).

### Cas d’usage

* Traitements analytiques ou scientifiques.
* Intégration avec des outils externes en Python.

## PL/Lua

### Résumé

**PL/Lua** est une extension procédurale pour PostgreSQL qui permet d’écrire des **fonctions, procédures et déclencheurs (triggers) directement** en [Lua](https://www.lua.org/ "Langage Lua"). Lua est un langage de script léger, rapide et facile à intégrer, connu pour sa simplicité et sa petite empreinte mémoire.

### Avantages principaux

* **Simplicité et légèreté**: Lua est conçu pour être petit, rapide et facile à embarquer, ce qui en fait un bon choix pour des traitements légers et rapides dans la base de données.
* **Syntaxe claire**: Lua offre une syntaxe minimaliste et intuitive, avec des fonctions de première classe, une portée lexicale et des coroutines pour une gestion avancée du flux d’exécution.
* **Intégration native avec PostgreSQL**: PL/Lua permet d’accéder directement aux types de données PostgreSQL (TEXT, INT, NUMERIC, etc.) sans conversion forcée en chaîne de caractères, et supporte l’interface SPI (Server Programming Interface) pour exécuter des requêtes SQL depuis Lua.
* **Deux modes d’exécution**:
  * **pllua** (mode "trusted" ou sécurisé) : environnement restreint, idéal pour une utilisation sécurisée.
  * **plluau** (mode "untrusted" ou non sécurisé) : accès complet à l’environnement Lua, y compris le chargement de modules et l’accès à la table globale.

### Cas d’usage

* **Traitements légers et rapides**: Scripts simples, transformations de données, logiques métiers légères.
* **Utilisation de coroutines**: Pour gérer des flux d’exécution complexes ou asynchrones.
* **Prototypage rapide**: Grâce à la simplicité de Lua, idéal pour des tests ou des développements rapides.
* **Déclencheurs (triggers)**: Logique personnalisée déclenchée par des événements sur les tables.

## PL/Java

### Résumé

Permet d’écrire des fonctions et des déclencheurs en **Java**, offrant une intégration avec l’écosystème Java.

### Avantages

* Accès aux bibliothèques Java.
* Portabilité et performance.

### Cas d’usage

* Applications nécessitant une intégration avec des systèmes Java.
* Traitements lourds ou parallélisés.

## PL/R

### Résumé

Permet d’utiliser le langage [R](https://www.r-project.org/ "Langage R") pour écrire des fonctions et des déclencheurs, idéal pour l’analyse statistique et la visualisation de données.

### Avantages

* Puissance de R pour l’analyse statistique.
* Intégration avec des outils de data science.

### Cas d’usage

* Analyses statistiques avancées.
* Modélisation et visualisation de données.

## PL/V8 (JavaScript)

### Résumé

Permet d’écrire des fonctions et des déclencheurs en **JavaScript**, en utilisant le moteur V8 de Google.

### Avantages

* Familiarité de JavaScript pour les développeurs web.
* Accès à des fonctionnalités dynamiques.

### Cas d’usage

* Traitements nécessitant des logiques dynamiques ou asynchrones.
* Intégration avec des applications web.

## PL/LOLCODE

### Résumé

Langage procédural humoristique basé sur le [LOLCODE](http://www.lolcode.org/ "Langage LOLCODE"), un langage de programmation esoteric. Peu utilisé en production, mais disponible pour des démonstrations ou des projets ludiques.

### Avantages

* Originalité et aspect ludique.

### Cas d’usage

* Projets expérimentaux ou éducatifs.

## PL/Rust

### Résumé

**PL/Rust** est une extension procédurale pour PostgreSQL qui permet d’écrire des **fonctions, procédures et déclencheurs directement** en [Rust](https://rust-lang.org/fr/ "Langage Rust"). 

::: warning
Contrairement à la plupart des autres langages procéduraux (comme PL/pgSQL, PL/Python, etc.), les fonctions PL/Rust ne sont pas interprétées.

Elles sont **compilées en code machine natif**, ce qui offre des performances comparables à celles du C, tout en bénéficiant des **garanties de sécurité mémoire de Rust** (pas de fuites mémoire, pas de corruption de mémoire, etc.).
:::

### Avantages

* **Performance** : Les fonctions sont compilées en code natif, ce qui permet d’atteindre des performances optimales, proches de celles du C.
* **Sécurité** : Rust garantit la sécurité mémoire à la compilation, réduisant les risques de plantage ou de corruption de la base de données. PL/Rust est considéré comme un langage "trusted" (de confiance) sur les architectures x86_64 et aarch64, sous certaines conditions.
* **Accès à l’écosystème Rust** : Possibilité d’utiliser des bibliothèques (crates) Rust, sous réserve de compatibilité avec l’environnement PostgreSQL.
* **Intégration avec PostgreSQL** : Accès complet à l’interface de programmation serveur (SPI) de PostgreSQL, permettant d’exécuter des requêtes dynamiques, des requêtes préparées et des curseurs.

### Cas d’usage

* **Fonctions critiques en termes de performance** : Calculs intensifs, traitements de données complexes, où la vitesse d’exécution est cruciale.
* **Sécurité renforcée** : Environnements où la sécurité mémoire est une priorité (ex. : bases de données exposées à des utilisateurs non privilégiés).
* **Intégration avec des outils Rust** : Réutilisation de code Rust existant ou utilisation de bibliothèques Rust pour des traitements spécifiques.

## PL/Proxy

### Résumé

Permet de créer des fonctions qui appellent des procédures distantes, utile pour la répartition de charge ou l’appels de fonctions sur d’autres serveurs.

### Avantages

* Appels de procédures distantes.
* Partitionnement de données.

### Cas d’usage

* Architectures distribuées.
* Appels de fonctions sur des bases de données distantes.

## SQL (Langage de requête standard)

### Résumé

Bien que ce ne soit pas un langage procédural à part entière, PostgreSQL permet d’écrire des fonctions en **SQL pur**. Ces fonctions sont limitées aux requêtes SQL et ne supportent pas les structures de contrôle avancées.

### Avantages

* Simplicité pour des requêtes basiques.
* Portabilité.

### Cas d’usage

* Fonctions simples de requêtage.
* Agrégations ou calculs basiques.

## Comment activer un langage procédural ?

Pour utiliser un langage procédural, il faut d’abord l’activer dans la base de données avec la commande :

```sql
CREATE EXTENSION IF NOT EXISTS pl<langage>;
```

Exemple pour PL/pgSQL :

```sql
CREATE EXTENSION IF NOT EXISTS plpgsql;
```

## **Quel langage choisir ?**

* **PL/pgSQL**: Pour la plupart des cas, surtout si vous restez dans l’écosystème PostgreSQL.
* **PL/Python** ou **PL/Perl**: Pour des traitements textuels ou analytiques avancés.
* **PL/Java** ou **PL/R**: Pour des intégrations spécifiques avec Java ou R.
* **PL/V8**: Pour des développeurs familiers avec JavaScript.
* **PL/Rust**: Pour des besoins de performances maximales et de sécurité mémoire dans vos fonctions PostgreSQL.
