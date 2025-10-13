---
title: Cookbook - psql
head:
  - - meta
    - name: 'keyword'
      content:  psql postgresql pg
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
---

# psql

Petit rappel de ce qu'est psql 

::: info
psql est une interface en mode texte pour PostgreSQL. Il vous permet de saisir des requêtes de façon interactive, 
de les exécuter sur PostgreSQL et de voir les résultats de ces requêtes. 

Alternativement, les entrées peuvent être lues à partir d'un fichier ou à partir des arguments de la ligne de commande. 

De plus, il fournit un certain nombre de métacommandes et plusieurs fonctionnalités style shell pour faciliter l'écriture des scripts 
et automatiser une grande variété de tâches. 
:::

## Pagination

Que vous utilisiez `psql` quotidiennement, ou seulement quand c'est votre dernier espoir de pouvoir vous connecter à votre base de données,
il peut être utile de définir un `pager` surtout si votre requête retourne beaucoup de colonnes.

Vous pouvez utiliser `more` ou `less`, mais le rendu des colonnes est illisible, pour cela un nouvel outil a été développé.

Le développeur [Pavel Stehule](https://github.com/okbob "Pavel Stehule Github profile") nous as écrit [pspg](https://github.com/okbob/pspg "PostgreSQL Pager")
pour résoudre cette problématique.

### Installation

`pspg` est deja packagé pour les distributions les plus utilisés, vous pouvez utiliser vos gestionnaires de paquet pour procéder à l'installation

```shell
# Debian (Ubuntu)
sudo apt-get install pspg

# RedHat (Fedora)
sudo dnf install pspg
```

Ensuite avant de lancer `psql` il suffira d'indiquer quel pager vous souhaitez utiliser

```shell
export PSQL_PAGER='pspg'
```

ou dans votre fichier `~/psqlrc`

```text
\setenv PAGER pspg
\pset border 2
\pset format aligned
```

Ensuite lancer `psql` et écriver une requêtes SQL que vous aller executer.

### Navigation de base

| Commande | Description |
|:-:| - |
| **Flèches haut/bas** | Déplacer le curseur ligne par ligne |
| **Page Up / Page Down** | Déplacer d’une page à la fois |
| **Home / End** | Aller au début/à la fin du résultat |
| **g** | Aller à la première ligne |
| **G** | Aller à la dernière ligne |

### Recherche et filtrage

| Commande | Description |
|:-:| - |
| **/** | Rechercher vers l’avant |
| **?** | Rechercher vers l’arrière |
| **n** | Aller à l’occurrence suivante |
| **N** | Aller à l’occurrence précédente |
| **\** | Filtrer les lignes (ex: `\d+` pour afficher seulement les lignes contenant "d") |

### Affichage et formatage

| Commande | Description |
|:-:| - |
| **w** | Basculer l’affichage en mode large (sans retour à la ligne) |
| **e** | Exporter les résultats vers un fichier |
| **s** | Changer l’ordre de tri des colonnes |
| **o** | Changer l’ordre des colonnes |
| **c** | Changer la couleur du thème |

### Autres commandes utiles

| Commande | Description |
|:-:| - |
| **q** | Quitter pspg |
| **h** | Afficher l’aide |
| **!** | Exécuter une commande shell |
| **Ctrl+L** | Rafraîchir l’écran |




