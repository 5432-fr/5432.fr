---
title: Politique de versionnement de PostgreSQL
description: Informations sur la politique de versionnement, les mises à jours et du cycle de vie
head:
  - - meta
    - name: 'keywords'
      content: 'politique, versionnement, postgresql, fin de vie'
  - - meta
    - property: 'og:title'
      content: Politique de versionnement de PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Informations sur la politique de versionnement, les mises à jours et du cycle de vie
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - name: 'twitter:title'
      content: Politique de versionnement de PostgreSQL
  - - meta      
    - name: 'twitter:description'
      content: Informations sur la politique de versionnement, les mises à jours et du cycle de vie
---

# Informations

## Politique de versionnement

Le groupe de développement mondial de **PostgreSQL** publie une nouvelle
version majeure contenant de nouvelles fonctionnalités environ une fois
par an. Chaque version majeure reçoit des correctifs de bogues et, si
nécessaire, des correctifs de sécurité qui sont publiés au moins une
fois tous les trois mois dans ce que nous appelons une « version mineure
».

Pour plus d'informations sur le calendrier des versions mineures, vous
pouvez consulter la feuille de route des versions mineures.

Si l'équipe de publication détermine qu'un bogue critique ou un
correctif de sécurité est trop important pour attendre la sortie de la
version mineure régulièrement programmée, elle peut proposer une version
en dehors de la feuille de route des versions mineures.

Le groupe de développement mondial de PostgreSQL prend en charge une
version majeure pendant 5 ans après sa sortie initiale. Après cela, une
version mineure finale sera publiée et le logiciel ne sera plus pris en
charge (fin de vie).

## Numérotation

À partir de PostgreSQL 10, une version majeure est indiquée en
augmentant la première partie du numéro de version, par exemple de 10 à
11. Avant PostgreSQL 10, une version majeure était indiquée en
augmentant soit la première soit la deuxième partie du numéro de
version, par exemple de 9.5 à 9.6.

Les versions mineures sont numérotées en augmentant la dernière partie
du numéro de version. À partir de PostgreSQL 10, il s'agit de la
deuxième partie du numéro de version, par exemple de 10.0 à 10.1 ; pour
les versions plus anciennes, il s'agit de la troisième partie du numéro
de version, par exemple de 9.5.3 à 9.5.4.

## Mise à jour

Les versions majeures apportent des modifications complexes, de sorte
que le contenu du répertoire de données ne peut pas être conservé de
manière rétrocompatible. Un vidage/rechargement de la base de données ou
l'utilisation de l'application pg_upgrade est nécessaire pour les
mises à niveau majeures.

Nous vous recommandons également de lire la section de mise à niveau de
la version majeure vers laquelle vous envisagez de migrer. Vous pouvez
effectuer une mise à niveau d'une version majeure vers une autre sans
effectuer de mise à niveau vers les versions intermédiaires, mais nous
vous recommandons de lire les notes de publication de toutes les
versions majeures intermédiaires avant de le faire.

Les mises à niveau de versions mineures ne nécessitent pas de vidage et
de restauration, vous arrêtez simplement le serveur de base de données,
installez les binaires mis à jour et redémarrez le serveur. De telles
mises à niveau peuvent nécessiter des étapes supplémentaires, lisez donc
toujours les notes de publication en avant toute mise à jour.

Les versions mineures ne contiennent que des correctifs pour les bogues
fréquemment rencontrés, les correctifs à faible risque, les problèmes de
sécurité et les problèmes de corruption de données.

La communauté considère que l'exécution de mises à niveau mineures est
moins risquée que de continuer à exécuter une ancienne version mineure.

::: warning Avertissement
Nous recommandons aux utilisateurs de toujours exécuter la version
mineure actuelle associée à leur version majeure.
:::

## Cycle de vie

|  Version  | Supportée | Date apparition | Fin de vie |
| :-------: | :-------: | :-------------: | :--------: |
| PostgreSQL 18  | Oui | 09/2025 | 11/2030 |
| PostgreSQL 17  | Oui | 09/2024 | 11/2029 |
| PostgreSQL 16  | Oui | 09/2023 | 11/2028 |
| PostgreSQL 15  | Oui | 10/2022 | 11/2027 |
| PostgreSQL 14  | Oui | 09/2021 | 11/2026 |
| PostgreSQL 13  | Non | 09/2020 | 11/2025 |
| PostgreSQL 12  | Non | 10/2019 | 11/2024 |
| PostgreSQL 11  | Non | 10/2017 | 11/2023 |
| PostgreSQL 10  | Non | 10/2017 | 11/2022 |
| PostgreSQL 9.6 | Non | 09/2016 | 11/2021 |
| PostgreSQL 9.5 | Non | 01/2016 | 02/2021 |
| PostgreSQL 9.4 | Non | 12/2014 | 02/2020 |
| PostgreSQL 9.3 | Non | 09/2013 | 11/2018 |
| PostgreSQL 9.2 | Non | 09/2012 | 09/2017 |
| PostgreSQL 9.1 | Non | 09/2011 | 09/2016 |
| PostgreSQL 9.0 | Non | 09/2010 | 09/2015 |
| PostgreSQL 8.4 | Non | 07/2009 | 07/2014 |
| PostgreSQL 8.3 | Non | 02/2008 | 02/2013 |
| PostgreSQL 8.2 | Non | 12/2006 | 12/2011 |
| PostgreSQL 8.1 | Non | 11/2005 | 11/2010 |
| PostgreSQL 8.0 | Non | 01/2005 | 10/2010 |
| PostgreSQL 7.4 | Non | 11/2003 | 10/2010 |
| PostgreSQL 7.3 | Non | 11/2002 | 11/2007 |
| PostgreSQL 7.2 | Non | 02/2002 | 02/2007 |
| PostgreSQL 7.1 | Non | 04/2001 | 04/2006 |
| PostgreSQL 7.0 | Non | 05/2000 | 05/2005 |
| PostgreSQL 6.5 | Non | 06/1999 | 06/2004 |
| PostgreSQL 6.4 | Non | 10/1998 | 10/2003 |
| PostgreSQL 6.3 | Non | 03/1998 | 03/2003 |
