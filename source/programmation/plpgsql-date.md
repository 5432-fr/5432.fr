---
title: PL/pgSQL et les dates
description: Traitement sur les dates en PL/pgSQL
---

# Traitement sur les dates {#plpgsql_date_converter}

## Convertir une date Access en type date

Sous Access et historiquement Lotus 1-2-3 (Explication
[ici](https://stackoverflow.com/a/3963650)) la date est stockée sous
forme d\'un entier, Dans PostgreSQL nous allons utiliser le type
interval pour retrouver le type date.

``` sql
--
-- Fonction qui converti un entier en date
-- Dans Lotus 1-2-3 et Access, le jour 0 est égal au 30/12/1899
-- Auteur: Christophe CHAUVET
-- License: Creative commons BY-SA
--   https://creativecommons.org/licenses/by-sa/4.0/
--
CREATE OR REPLACE FUNCTION access_to_date(
   a_num INTEGER)
RETURNS date AS
$BODY$

BEGIN

  RETURN ('1899-12-30'::date + (a_num||' day')::interval)::date;

END;

$BODY$
LANGUAGE plpgsql;

```

Pour l\'utiliser

``` sql
SELECT access_to_date(42821)
-- on obtient 27/03/2017
```

## Convertir un type date en date Access

La fonction inverse, qui permet de retrouver la valeur à stocker

``` sql
--
-- Fonction qui converti une date en entier
-- Dans Lotus 1-2-3 et Access, le jour 0 est égal au 30/12/1899
-- Auteur: Christophe CHAUVET
-- License: Creative commons BY-SA
--   https://creativecommons.org/licenses/by-sa/4.0/
--
CREATE OR REPLACE FUNCTION date_to_access(
   a_date DATE)
RETURNS integer AS
$BODY$

BEGIN

  RETURN (a_date - '1899-12-30'::date)::integer;

END;

$BODY$
LANGUAGE plpgsql;
```

``` sql
SELECT date_to_access('2017-03-27'::date)
-- on obtient 42821
```
