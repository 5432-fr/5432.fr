---
title: IvorySQL base PostgreSQL compatible oracle
description: 'IvorySQL, une base de données open source compatible Oracle basée sur PostgreSQL'
head:
  - - meta
    - name: 'keywords'
      content: 'IvorySQL, PostgreSQL, oracle, to_date, compatible'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0   
---

### Qu'est-ce qu'IvorySQL ?

IvorySQL est une version modifiée de PostgreSQL, conçue pour être compatible avec Oracle. Elle permet aux entreprises de migrer leurs applications Oracle vers une solution open source sans avoir à tout réécrire. 

IvorySQL est basée sur la dernière version de PostgreSQL et offre un mécanisme de bascule ("compatible_db") pour passer facilement entre les modes de compatibilité Oracle et PostgreSQL natif.

### Fonctionnalités clés

* **Compatibilité Oracle** : IvorySQL prend en charge la syntaxe SQL Oracle, les types de données, et le langage procédural PL/SQL, ce qui facilite la migration des applications existantes.
* **Bascule entre modes** : Grâce à la commande `SET compatible_db = oracle;`, les utilisateurs peuvent activer ou désactiver la compatibilité Oracle selon leurs besoins.
* **Open Source** : IvorySQL est entièrement open source, ce qui permet de réduire les coûts de licence et de maintenance par rapport à Oracle.
* **Basé sur PostgreSQL** : IvorySQL hérite de toutes les fonctionnalités de PostgreSQL (performance, extensibilité, sécurité) tout en ajoutant la couche de compatibilité Oracle.

### Exemples de transition Oracle → IvorySQL

1. **Syntaxe SQL** :
   - Oracle : `SELECT * FROM employees WHERE hiredate = TO_DATE('01-JAN-2020', 'DD-MON-YYYY');`
   - IvorySQL : La même requête fonctionne sans modification, car IvorySQL supporte la fonction `TO_DATE` et le format de date Oracle.

2. **Procédures stockées (PL/SQL)** :
   - Oracle :
     ```sql
     CREATE OR REPLACE PROCEDURE add_employee(
         p_name VARCHAR2,
         p_salary NUMBER
     ) AS
     BEGIN
         INSERT INTO employees(name, salary) VALUES(p_name, p_salary);
     END;
     ```
   - IvorySQL : La même procédure peut être créée et exécutée sans modification, car IvorySQL supporte la syntaxe PL/SQL.

3. **Types de données** :
   - Oracle : `VARCHAR2`, `NUMBER`, `DATE`
   - IvorySQL : Ces types sont reconnus et mappés automatiquement vers les types PostgreSQL équivalents.

4. **Fonctions Oracle** :
   - Oracle : `NVL`, `DECODE`, `TO_CHAR`
   - IvorySQL : Ces fonctions sont disponibles et fonctionnent comme en Oracle.

### Pourquoi migrer vers IvorySQL ?

* **Réduction des coûts** : Pas de licence Oracle, maintenance et support moins coûteux.
* **Flexibilité** : Possibilité de basculer entre les modes Oracle et PostgreSQL natif.
* **Communauté open source** : Accès à une communauté active et à des mises à jour régulières.
* **Migration simplifiée** : Pas besoin de réécrire entièrement les applications existantes.

### Limites

* La compatibilité n'est pas à 100 % : certaines fonctionnalités avancées d'Oracle peuvent ne pas être encore supportées.
* Les très grosses entreprises déjà investies dans Oracle peuvent hésiter à migrer en raison des risques perçus.

### Ressources utiles

* [Site officiel IvorySQL](https://www.ivorysql.org/en/)
* [Documentation IvorySQL](https://www.ivorysql.org/en/docs/intro/)
* [GitHub IvorySQL](https://github.com/IvorySQL/IvorySQL)
