---
title: article sur la fonction generate_series sous PostgreSQL
description: Différentes cas d'utilisations de la fonction generate_series avec nombre, date, date heure
head:
  - - meta
    - name: 'keyword'
      content: generate_series date datetime PostgreSQL coalesce
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0          
  - - meta
    - property: 'og:title'
      content: article sur la fonction generate_series sous PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Différentes cas d'utilisations de la fonction generate_series avec nombre, date, date heure
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: article sur la fonction generate_series sous PostgreSQL
  - - meta      
    - property: 'twitter:description'
      content: Différentes cas d'utilisations de la fonction generate_series avec nombre, date, date heure     
---

# Fonction generate_series

## Introduction

Cette fonction est très polyvalente et permet de générer des séries de valeurs, ce qui est utile dans de nombreux scénarios

* Générateur de ligne avec incrément de 1 ou au choix,
* Générateur de plage de dates, mois, années, en spécifiant un interval (jours, mois, année, etc.),
* Générateur de date / heure, en spécifiant un interval (heure, minutes, seondes, etc.)

## Générer une série de nombres entiers

La forme la plus courante de `generate_series` permet de génèrer une série de nombres entiers.

### Syntaxe:

```sql
generate_series(start, stop[, step])
```

::: tip
Par defaut si le pas (step) n'est pas renseigné, celui-ci vaut `1` 
:::

### Exemple:

Nous voulons un générateur de nombre impair, ci-dessous la requête de génération

```sql
SELECT * FROM generate_series(1, 10, 2);
```

### Résultat:

```
1
3
5
7
9
```

on peut également utilisé un pas négatif, dans ce cas il faut aboslument sur le `start`soit plus grand que le `stop`

```sql
SELECT * FROM generate_series(10, 1, -2);
```

### Résultat:

```
10
8
6
4
2
```

Vous remarquez dans ce cas que les nombres sont pairs, cela est du au fait que la valeur de `start` est pair.

## Générer une série de dates

`generate_series` peut aussi générer une série de dates, ce qui est utile pour créer des calendriers ou des rapports temporels.

### Syntaxe:

```sql
generate_series(start_date, end_date, interval)
```

### Exemple:

```sql
SELECT generate_series(
    '2025-10-01'::date,
    '2025-10-10'::date,
    '1 day'::interval
)::date AS date;
```

### Résultat:

```
2025-10-01
2025-10-02
2025-10-03
...
2025-10-10
```

## Générer une série de timestamps

Vous pouvez également générer des séries de timestamps, par exemple pour des analyses temporelles précises.

### Exemple:

```sql
SELECT generate_series(
    '2025-10-01 00:00:00'::timestamp,
    '2025-10-01 12:00:00'::timestamp,
    '1 hour'::interval
)::timestamp AS timestamp;
```

### Résultat:

```
2025-10-01 00:00:00
2025-10-01 01:00:00
...
2025-10-01 11:00:00
2025-10-01 12:00:00
```

## Utilisation avec une clause WITH (CTE)

`generate_series` est souvent utilisé dans une Common Table Expression (CTE) pour créer des jeux de données temporaires.

### Exemple:

```sql
WITH series AS (
    SELECT generate_series(1, 5) AS num
)
SELECT num as nombre, num * 2 AS double FROM series;
```

### Résultat:

```
nombre | double
-------|-------
1      | 2
2      | 4
3      | 6
4      | 8
5      | 10
```

## Générer des lignes manquantes dans un jeu de données

Si vous avez un jeu de données avec des valeurs manquantes, `generate_series` peut être utilisé pour combler les trous.

Pour cela nous allons utiliser le resultat du `generate_series` comme table principal, puis faire un `LEFT JOIN` pour récupérer
les données de ventes, le montant retourne `NULL` quand il n'y a pas de valeur, mais ici on utilise la fonction `COALESCE` 
pour mettre  `0` si `NULL`

### Exemple:

Supposons une table `ventes` avec des dates manquantes:

```sql
WITH all_dates AS (
    SELECT generate_series(
        '2025-10-01'::date,
        '2025-10-05'::date,
        '1 day'::interval
    )::date AS date
)
SELECT
    a.date,
    COALESCE(v.montant, 0) AS montant
FROM all_dates a
LEFT JOIN ventes v ON a.date = v.date;
```

## Générer des séries personnalisées avec des fonctions

Vous pouvez combiner `generate_series` avec d'autres fonctions pour créer des séries personnalisées.

### Exemple:

```sql
SELECT
    generate_series(1, 5) AS num,
    chr(64 + generate_series(1, 5)) AS lettre;
```

### Résultat:

```
num | lettre
----|-------
1   | A
2   | B
3   | C
4   | D
5   | E
```

::: info

La requête ci-dessus peut également s'écrire

```sql
  SELECT
    generate_series(1, 5) AS num,
    chr(generate_series(65, 69)) AS lettre;
```
:::

La fonction `chr` permet d'obtenir la caractère à partir de la valeur décimale de la table `ASCII`


## Utilisation avec des jointures

`generate_series` peut être utilisé pour créer des jointures avec des tables existantes, par exemple pour générer des rapports par période.

### Exemple:

```sql
SELECT
    d.date,
    COUNT(o.id) AS nombre_commandes
FROM generate_series(
    '2025-10-01'::date,
    '2025-10-07'::date,
    '1 day'::interval
) AS d(date)
LEFT JOIN commandes o ON d.date = o.date_commande::date
GROUP BY d.date;
```

## Générer des séries de nombres décimaux

Vous pouvez aussi générer des séries de nombres décimaux en utilisant des valeurs de type `numeric`.

### Exemple:

```sql
SELECT generate_series(0.1, 1.0, 0.1) AS decimal_value;
```

### Résultat:

```
0.1
0.2
0.3
...
1.0
```

## Résumé des cas d'utilisation

| Cas d'utilisation                     | Exemple de syntaxe                                                                   |
|:--------------------------------------|:-------------------------------------------------------------------------------------|
| Série d'entiers                       | `SELECT * FROM generate_series(1, 10);`                                              |
| Série de dates                        | `SELECT generate_series('2025-10-01'::date, '2025-10-10'::date, '1 day'::interval);` |
| Série de timestamps                   | `SELECT generate_series('2025-10-01 00:00:00'::timestamp, ...);`                     |
| Combler des valeurs manquantes        | Utilisation avec `LEFT JOIN` et `COALESCE`                                           |
| Générer des séries personnalisées     | Combinaison avec d'autres fonctions                                                  |

