---
title: Programmation langage PLpgSQL
description: Programmation en langage procédural avec PLpgSQL
head:
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
  - - meta
    - name: 'keyword'
      content: plpgsql postgresql procedural
  - - meta
    - property: 'og:title'
      content: Programmation langage PLpgSQL
  - - meta      
    - property: 'og:description'
      content: Programmation en langage procédural avec PLpgSQL
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Programmation langage PLpgSQL
  - - meta      
    - property: 'twitter:description'
      content: Programmation en langage procédural avec PLpgSQL 
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
facilité d'utilisation.

Le langage peut être défini comme approuvé par le serveur.

[PL/pgSQL](https://docs.postgresql.fr/17/plpgsql.html) est l'un des
langages de programmation inclus dans la distribution standard de
PostgreSQL, les autres étant PL/Tcl, PL/Perl et PL/Python. De plus, de
nombreux autres sont disponibles auprès de tiers, notamment PL/Java,
PL/pgPSM, PL/php, PL/R, PL/Ruby, PL/sh, PL/Lua, Postmodern (basé sur
Common Lisp) et PL/v8.

PostgreSQL utilise Bison comme analyseur, ce qui facilite le portage de
nombreux langages open source, ainsi que la réutilisation du code.

## Avantages

- **Performance** : Réduction des allers-retours entre l’application et la base.
- **Modularité** : Encapsulation de la logique métier dans la base.
- **Sécurité** : Contrôle fin des droits d’accès.

## Structure de base d’un bloc PL/pgSQL

Un bloc PL/pgSQL est délimité par des mots-clés et peut contenir des déclarations, des instructions, et des exceptions.

```sql
[ <<étiquette>> ]
DECLARE
    -- Déclarations des variables, curseurs, etc.
BEGIN
    -- Instructions SQL et PL/pgSQL
EXCEPTION
    -- Gestion des erreurs
END;
```

## Déclarations

### Variables

Les variables sont déclarées dans la section `DECLARE` et peuvent être de n’importe quel type PostgreSQL.

```sql
DECLARE
    ma_variable INTEGER;
    mon_texte TEXT := 'Bonjour';
    mon_tableau INTEGER[] := '{1, 2, 3}';
    ma_date DATE := CURRENT_DATE;
```

### Constantes

Utilisez `CONSTANT` pour déclarer une constante.

```sql
DECLARE
    PI CONSTANT NUMERIC := 3.14159;
```

### C. Alias de type

Vous pouvez utiliser `%TYPE` pour déclarer une variable du même type qu’une colonne de table.

```sql
DECLARE
    nom_client clients.nom%TYPE;
```

## Expressions et instructions de base

### Affectation

L’affectation se fait avec `:=` ou `SELECT INTO`.

```sql
ma_variable := 42;
SELECT COUNT(*) INTO nombre_clients FROM clients;
```

### Instructions SQL

Toute instruction SQL valide peut être utilisée dans un bloc PL/pgSQL.

```sql
INSERT INTO clients (nom, email) VALUES ('Dupont', 'dupont@example.com');
UPDATE clients SET email = 'nouvel@example.com' WHERE id = 1;
DELETE FROM clients WHERE id = 1;
```

### Appel de fonction

```sql
resultat := ma_fonction(param1, param2);
```

## Structures de contrôle

### Conditionnelles (`IF/ELSE`)

```sql
IF condition THEN
    -- instructions
ELSIF autre_condition THEN
    -- instructions
ELSE
    -- instructions
END IF;
```

**Exemple :**

```sql
IF age >= 18 THEN
    statut := 'majeur';
ELSE
    statut := 'mineur';
END IF;
```

### Boucles (`LOOP`, `WHILE`, `FOR`)

#### `LOOP` (boucle infinie avec sortie conditionnelle)

```sql
LOOP
    -- instructions
    EXIT WHEN condition;
END LOOP;
```

#### `WHILE`

```sql
WHILE condition LOOP
    -- instructions
END LOOP;
```

#### `FOR` (itération sur un ensemble de résultats)

```sql
FOR ma_variable IN SELECT * FROM clients LOOP
    -- instructions
END LOOP;
```

**Exemple :**

```sql
FOR client IN SELECT * FROM clients WHERE age > 18 LOOP
    RAISE NOTICE 'Client majeur : %', client.nom;
END LOOP;
```

## Curseurs

Les curseurs permettent de parcourir les résultats d’une requête ligne par ligne.

### Déclaration et utilisation

```sql
DECLARE
    mon_curseur CURSOR FOR SELECT * FROM clients;
    client_record clients%ROWTYPE;
BEGIN
    OPEN mon_curseur;
    LOOP
        FETCH mon_curseur INTO client_record;
        EXIT WHEN NOT FOUND;
        -- Traitement de la ligne
        RAISE NOTICE 'Client : %', client_record.nom;
    END LOOP;
    CLOSE mon_curseur;
END;
```

### Curseurs avec paramètres

```sql
DECLARE
    mon_curseur CURSOR(age_min INTEGER) FOR
        SELECT * FROM clients WHERE age > age_min;
BEGIN
    OPEN mon_curseur(18);
    -- ...
END;
```

## Gestion des erreurs et messages

### Gestion des exceptions (`EXCEPTION`)

```sql
BEGIN
    -- instructions
EXCEPTION
    WHEN division_by_zero THEN
        RAISE NOTICE 'Division par zéro !';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Erreur inattendue : %', SQLERRM;
END;
```

### Messages (`RAISE`)

- `RAISE NOTICE` : Message informatif.
- `RAISE WARNING` : Avertissement.
- `RAISE EXCEPTION` : Erreur fatale.

**Exemple :**

```sql
RAISE NOTICE 'Le client % est majeur', nom_client;
RAISE EXCEPTION 'Le client % n''existe pas', id_client;
```

## Exemple complet : Fonction PL/pgSQL

```sql
CREATE OR REPLACE FUNCTION calculer_solde_moyen()
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
    nombre_clients INTEGER;
    moyenne NUMERIC;
BEGIN
    SELECT SUM(solde), COUNT(*) INTO total, nombre_clients FROM comptes;
    IF nombre_clients = 0 THEN
        RAISE EXCEPTION 'Aucun client trouvé !';
    END IF;
    moyenne := total / nombre_clients;
    RETURN moyenne;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Erreur : %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
```

## Bonnes pratiques

- **Commenter votre code** pour faciliter la maintenance.
- **Utiliser des transactions** pour les opérations critiques.
- **Limiter l’utilisation de `OTHERS`** dans les blocs `EXCEPTION` pour éviter de masquer des erreurs.
- **Préférer les curseurs** pour les traitements lourds sur de grands jeux de données.

## Ressources utiles

- [Documentation officielle PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html)
- [Tutoriel PL/pgSQL en anglais](https://www.postgresqltutorial.com/plpgsql/)

## Exemples de fonctions PL/pgSQL pour traitement

* [Dates](./plpgsql-date.md) Traitement sur les dates
