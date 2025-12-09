---
title: Cookbook - Modelisation
description: Livre de recettes sur la modélisation sous POstgreSQL
head:
  - - meta
    - name: 'keywords'
      content:  'modelisation, clé primaire, postgresql, primary, key, uuidv7'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
---

# Modélisation

Lors de la modélisation 

## Clé primaire int ou bigint

Lors de la création d'un table, il est préférable d'utiliser un entier en tant que clé primaire.

::: info 
Vous pouvez utiliser d'autres types comme UUID par exemple, et en particulier UUIDv7 qui est apparu dans PostgreSQL 18. 
:::

PostgreSQL possède 3 types d'entier :

* `smallint`: 2 octets soit de **-32 768** to **+32 767**
* `integer`: 4 octets soit **-2 147 483 648** to **+2 147 483 647**
* `bigint`: 8 octets soit **-9 223 372 036 854 775 808** to **+9 223 372 036 854 775 807**

::: tip Remarques
les types `smallint`, `integer`, `bigint` sous PostgreSQL n'existe qu'en version signé.

il n'est donc pas possible d'utiliser une version non signé pour doubler la valeur à stocker.
:::

## Longueur champ Email

Lorsque l'on veut stocker le champ email (courriel pour les français), on se pose toujours la question de la longueur maximale du champ.

La réponse se trouve dans la [RFC 3696 Section 3](https://datatracker.ietf.org/doc/html/rfc3696#section-3 "RFC3996 Section 3")

> That limit is a maximum of 64 characters (octets) in the "local part" (before the "@")
> and a maximum of 255 characters (octets) in the domain part (after the "@")
> for a total length of 320 characters.

Donc un champ email est composé comme suit:

* partie local (avant le @) est composée de 64 caractères au maximum
* le caractère @ qui compte pour 1 caractère
* partie domaine (après le @) est composée de 255 caractères au maximum

Ce qui nous donne une longueur de 64 + 1 + 255 soit 320 caractères.

Ci-dessous un exemple d'utilisation lors de la création d'une table.

```sql
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR,
    email VARCHAR(320) UNIQUE,
    passwd VARCHAR
);
```

::: tip Remarques
Lors de la création de la table sur l'exemple ci-dessus, j'ai par exemple utilisé pour les champs `nom` et `passwd`
un `VARCHAR` sans indiqué de longueur, si vous souhaitez en savoir plus sur le pourquoi du comment, 
je vous invite a lire la partie [Don't do this](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don't_use_varchar(n)_by_default "Wiki PostgreSQL don't do this") 
du wiki de PostgreSQL.
:::



