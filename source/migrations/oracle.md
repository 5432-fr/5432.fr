---
title: "Migration d'Oracle vers PostgreSQL avec Ora2Pg ou IvorySQL"
description: "Article sur les possibilités de migration de Oracle vers une base PostgreSQL"
head:
  - - meta
    - name: 'keywords'
      content: 'Oracle, PostgreSQL, Ora2Pg, migration, ivorysql'
  - - meta
    - name: 'author'
      content: 'Christophe Chauvet'
  - - meta
    - name: 'copyright'
      content: 'CC BY-SA 4.0'           
---

# Migration de Oracle vers PostgreSQL

## Ora2Pg

### Qu'est-ce qu'Ora2Pg ?

[Ora2Pg](https://ora2pg.darold.net/ "Ora2Pg") est un outil open source (licence GPL), écrit en Perl, qui permet d'automatiser la migration des schémas, des données et du code PL/SQL d'une base de données Oracle vers PostgreSQL. Il analyse la base Oracle, génère des scripts SQL compatibles PostgreSQL, et peut même exporter les données. Ora2Pg est maintenu activement depuis 2001 et est aujourd'hui un standard pour les migrations Oracle → PostgreSQL.

### Fonctionnalités principales

* **Export du schéma** : Tables, vues, index, contraintes, séquences, utilisateurs et droits.
* **Conversion des types de données** : Oracle `VARCHAR2` → PostgreSQL `VARCHAR`, Oracle `NUMBER` → PostgreSQL `NUMERIC`, etc.
* **Conversion du code PL/SQL** : Ora2Pg convertit automatiquement une grande partie du code PL/SQL (fonctions, procédures, triggers) en PL/pgSQL, mais une relecture manuelle est souvent nécessaire pour les spécificités Oracle.
* **Export des données** : Possibilité d'exporter les données sous forme de fichiers plats (CSV, INSERT SQL) ou de les charger directement dans PostgreSQL.
* **Rapport d'évaluation** : Ora2Pg génère un rapport détaillant les objets non convertis automatiquement, ce qui permet d'estimer l'effort de migration restant.

### Exemples d'utilisation

#### 1. Installation et configuration
Ora2Pg nécessite une installation Perl et des connecteurs Oracle/PostgreSQL. Exemple de configuration minimale dans `ora2pg.conf` :
```ini
ORACLE_HOME /usr/lib/oracle/19.3/client64
ORACLE_DSN dbi:Oracle:host=localhost;sid=ORCL
ORACLE_USER scott
ORACLE_PWD tiger
SCHEMA scott
OUTPUT output.sql
TYPE TABLE,VIEW,SEQUENCE,INDEX,TRIGGER,FUNCTION,PROCEDURE,PACKAGE
```

#### 2. Export d'un schéma Oracle
```bash
ora2pg -c ora2pg.conf -t TABLE,VIEW,SEQUENCE -o schema.sql
```
→ Génère un fichier `schema.sql` avec la structure des tables, vues et séquences.

#### 3. Export des données
```bash
ora2pg -c ora2pg.conf --data_only --output data.sql
```
→ Exporte les données sous forme de requêtes `INSERT`.

#### 4. Conversion d'une fonction PL/SQL
Ora2Pg convertit automatiquement des fonctions comme :
```sql
-- Oracle
CREATE OR REPLACE FUNCTION get_salary(p_emp_id NUMBER)
RETURN NUMBER IS
  v_salary NUMBER;
BEGIN
  SELECT salary INTO v_salary FROM employees WHERE emp_id = p_emp_id;
  RETURN v_salary;
END;
```
→ En PL/pgSQL :
```sql
-- PostgreSQL
CREATE OR REPLACE FUNCTION get_salary(p_emp_id NUMERIC)
RETURNS NUMERIC AS $$
DECLARE
  v_salary NUMERIC;
BEGIN
  SELECT salary INTO v_salary FROM employees WHERE emp_id = p_emp_id;
  RETURN v_salary;
END;
$$ LANGUAGE plpgsql;
```

#### 5. Migration incrémentale
Ora2Pg peut être utilisé pour migrer les données en plusieurs étapes :
- Pré-migration des données statiques.
- Arrêt de la production Oracle le jour J.
- Migration des données restantes.
- Re-création des index et contraintes sur PostgreSQL.

### Points forts et limites

* **Points forts** :
  * Automatisation poussée, gain de temps.
  * Communauté active, documentation complète.
  * Flexibilité (export en fichiers ou chargement direct).
* **Limites** :
  * Certaines fonctionnalités Oracle avancées (comme les packages complexes) nécessitent une adaptation manuelle.
  * Ora2Pg ne modifie pas l'applicatif (seulement la base de données).

### Ressources utiles

* [Site officiel Ora2Pg](https://ora2pg.darold.net/)
* [Documentation Ora2Pg](https://ora2pg.darold.net/documentation.html)

---

## IvorySQL

IvorySQL est un moteur de base de données basé sur PostgreSQL et qui est compatible Oracle.

Vous trouverez plus d'information sur sa [page qui lui est consacré](/articles/ivorysql "Article sur IvorySQL")