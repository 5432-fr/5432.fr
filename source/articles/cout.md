---
title: Coût d'acquisition de PostgreSQL
head:
  - - meta
    - name: 'keyword'
      content: cout acquisition hébergement auto-hebergement PostgreSQL ovh
  - - meta
    - property: 'og:title'
      content: Les différents coûts pour l'acquisition de PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Cette page décrit les couts d'acquisition de PostgreSQL quelle que soit le mode d'hébergement.
  - - meta      
    - property: 'og:type'
      content: 'article'
---
# Coûts

PostgreSQL est un système de gestion de base de données relationnelle open source, 
ce qui signifie que son acquisition et son utilisation de base sont gratuites. 

Vous pouvez télécharger, installer et utiliser PostgreSQL sans frais de licence, que ce soit pour un usage personnel, professionnel ou même à grande échelle.

Cependant, des coûts peuvent survenir si vous choisissez d’utiliser des services gérés (comme OVH, Amazon RDS for PostgreSQL, Google Cloud SQL, ou d’autres hébergeurs spécialisés). 

Dans ce cas, les coûts dépendent principalement de la consommation de ressources (vCPU, mémoire, stockage, transfert de données, etc.) et des options de support étendu pour les versions obsolètes. 

Par exemple, AWS facture environ 0,10 $ par vCPU-heure pour certaines configurations en 2025, et Google Cloud propose des calculateurs pour estimer vos coûts selon vos besoins.

En résumé :

* `PostgreSQL` lui-même est gratuit et open source.
* Les coûts proviennent de l’hébergement, de la gestion et des services associés si vous passez par un fournisseur cloud ou un hébergeur spécialisé.

## Auto hébergement (On Premise)

L’auto-hébergement (aussi appelé On Prémise dans les offres) de PostgreSQL implique que vous gérez vous-même l’infrastructure (serveur physique, machine virtuelle, ou conteneur) sur laquelle la base de données s’exécute. 

Voici les principaux coûts à prévoir dans ce cas :

### Coût du matériel

* **Serveur physique** : Achat ou location d’un serveur dédié (coût variable selon la puissance : de quelques centaines à plusieurs milliers d’euros).
* **Machine virtuelle (VPS/Cloud)** : Si vous utilisez un fournisseur comme OVH, DigitalOcean, Linode, AWS EC2, ou Google Compute Engine, les coûts dépendent de la taille de l’instance (vCPU, RAM, stockage). Par exemple, une petite instance peut coûter entre 5 € et 20 €/mois, tandis qu’une instance plus puissante peut atteindre 100 €/mois ou plus.

### Coût du stockage

* **Disques durs/SSD** : Le coût dépend de la capacité et du type de stockage (SSD plus cher mais plus performant). Comptez quelques euros à plusieurs dizaines d’euros par mois pour du stockage cloud, ou un investissement initial pour du stockage local.

### Coût du système d'exploitation

En fonction du système d'exploitation choisi, des coûts supplémentaires seront à prévoir comme:

* Licence de l'OS (Ex Windows)
* Contrat de maintenance et/ou de support

### Coût de la maintenance et de l’administration

* **Temps humain** : Si vous gérez vous-même l’administration (installation, mises à jour, sauvegardes, sécurité, monitoring), cela représente un coût en temps (ou en salaire si vous externalisez).
* **Outils de monitoring/sauvegarde** : Certains outils (comme pgBackRest, Prometheus, Grafana) sont gratuits, mais d’autres solutions professionnelles peuvent avoir un coût.

### Coût de la bande passante et de l’électricité

* **Bande passante** : Si vous hébergez chez un fournisseur cloud, la bande passante sortante peut être facturée (souvent quelques centimes par Go).
* **Électricité et refroidissement** : Pour un serveur physique en local, il faut compter le coût énergétique et éventuellement la climatisation.

### Coût des sauvegardes externes

* **Stockage externe** : Sauvegarder vos données sur un autre site ou dans le cloud (S3, Backblaze, etc.) peut engendrer des coûts supplémentaires (quelques euros à quelques dizaines d’euros par mois selon le volume).

### Exemple de budget mensuel pour un auto-hébergement cloud (VPS) :

| Poste de coût                   | Coût estimé (par mois) |
|---------------------------------|:----------------------:|
| Instance VPS (2 vCPU, 4 Go RAM) | 10 € – 30 €            |
| Stockage (50 Go SSD)            | 2 € – 10 €             |
| Bande passante                  | 0 € – 5 €              |
| Sauvegardes externes            | 2 € – 10 €             |
| **Total estimé**                | **14 € – 55 €**        |

### En résumé

* **PostgreSQL lui-même est gratuit** (pas de licence).
* **Les coûts viennent de l’infrastructure, de la maintenance et des services associés**.
* **L’auto-hébergement est souvent moins cher que les solutions gérées**, mais demande plus de compétences techniques.

## Hébergement distant

Pour un hébergement distant de PostgreSQL, les coûts à prévoir dépendent principalement du type d’hébergement choisi (cloud, dédié, managé) et des ressources nécessaires (stockage, RAM, CPU, trafic réseau).

Voici une synthèse des principaux postes de coûts et des fournisseurs populaires en 2025 :


### Hébergement Cloud (PaaS/DBaaS)

Les solutions cloud sont les plus flexibles et facturées à l’usage.

| Fournisseur         | Offre de base (2025)         | Coût mensuel estimé (EUR) | Remarques                                                                 |
|---------------------|------------------------------|:-------------------------:|---------------------------------------------------------------------------|
| **AWS RDS**         | db.t4g.micro (1 vCPU, 1 GiB) | ~15-25 €                  | Facturation à l’heure, stockage supplémentaire payant                     |
| **Google Cloud SQL**| 1 vCPU, 3.75 Go RAM          | ~20-30 €                  | Inclut 10 Go de stockage, sauvegardes automatiques                        |
| **Azure Database**  | Basic (1 vCPU, 2 Go RAM)     | ~25-35 €                  | Intégration avec l’écosystème Microsoft                                   |
| **DigitalOcean**    | 1 vCPU, 1 Go RAM, 10 Go SSD  | ~15 €                     | Simple, adapté aux petits projets                                         |
| **Scaleway**        | Startup (2 vCPU, 4 Go RAM)   | ~20 €                     | Prix compétitifs, hébergé en Europe                                       |

---

### Hébergement VPS/Dédié

Si vous préférez gérer vous-même l’instance PostgreSQL sur un serveur virtuel ou dédié:

| Fournisseur         | Offre de base (2025)         | Coût mensuel estimé (EUR) | Remarques                                                                 |
|---------------------|------------------------------|:-------------------------:|---------------------------------------------------------------------------|
| **OVHcloud**        | VPS (2 vCPU, 4 Go RAM)       | ~10-20 €                  | Installation manuelle de PostgreSQL, coût variable selon la configuration |
| **Hetzner**         | CX21 (2 vCPU, 4 Go RAM)      | ~5-10 €                   | Très économique, idéal pour les développeurs                              |
| **Linode**          | 2 vCPU, 4 Go RAM             | ~12-15 €                  | Bonne réputation pour la stabilité                                        |

---

### Coûts supplémentaires à prévoir

* **Stockage supplémentaire** : ~0,10-0,30 €/Go/mois selon le fournisseur.
* **Sauvegardes automatiques** : Souvent incluses, sinon ~5-10 €/mois.
* **Trafic réseau** : Généralement gratuit jusqu’à un certain seuil, puis ~0,05-0,10 €/Go.
* **Support technique** : Option payante chez certains fournisseurs (ex : AWS Support Business ~100 €/mois).


### Exemple de budget mensuel

* **Petit projet** : 10-20 €/mois (VPS ou DBaaS basique)
* **Projet moyen** : 30-60 €/mois (DBaaS avec sauvegardes et monitoring)
* **Gros projet** : 100 € et plus (instances dédiées, haute disponibilité)

### Conseils pour optimiser les coûts

* **Choisir un fournisseur européen** si vos utilisateurs sont en Europe (latence, RGPD).
* **Utiliser des instances “serverless”** (ex : AWS Aurora Serverless) pour des coûts proportionnels à l’usage.
* **Surveiller la consommation** et ajuster les ressources régulièrement.

## La licence

PostgreSQL est publié sous la licence PostgreSQL, une licence Open Source libérale, similaire aux licences BSD ou MIT.

PostgreSQL, Système de gestion de base de données (également connu sous le nom de Postgres, anciennement Postgres95).

* Des parties du logiciel protégées par le droit d'auteur © 1996-2025, The PostgreSQL Global Development Group
* Des parties du logiciel protégées par le droit d'auteur © 1994, The Regents of the University of California

L'utilisation, la copie, la modification et la distribution de ce logiciel et de sa documentation à quelque fin que ce soit, sans frais ni accord écrit, sont autorisées par les présentes, sous réserve que la mention de droit d'auteur ci-dessus, ce paragraphe et les deux paragraphes suivants figurent sur toutes les copies.

::: warning Avertissement
L'UNIVERSITÉ DE CALIFORNIE NE POURRA EN AUCUN CAS ÊTRE TENUE RESPONSABLE ENVERS QUICONQUE DES DOMMAGES DIRECTS, INDIRECTS, SPÉCIAUX, ACCESSOIRES OU CONSÉCUTIFS, Y COMPRIS LA PERTE DE PROFITS, DÉCOULANT DE L'UTILISATION DE CE LOGICIEL ET DE SA DOCUMENTATION, MÊME SI L'UNIVERSITÉ DE CALIFORNIE A ÉTÉ AVISÉE DE LA POSSIBILITÉ DE TELS DOMMAGES.

L'UNIVERSITÉ DE CALIFORNIE DÉCLINE EXPRESSÉMENT TOUTE GARANTIE, Y COMPRIS, MAIS SANS S'Y LIMITER, LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE ET D'ADÉQUATION À UN USAGE PARTICULIER. LE LOGICIEL FOURNI CI-DESSOUS EST « EN L'ÉTAT » ET L'UNIVERSITÉ DE CALIFORNIE N'A AUCUNE OBLIGATION DE FOURNIR DE LA MAINTENANCE, DU SUPPORT, DES MISES À JOUR, DES AMÉLIORATIONS OU DES MODIFICATIONS.
:::
