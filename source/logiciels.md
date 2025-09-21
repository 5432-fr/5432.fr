---
title: Logiciel basé sur PostgreSQL
head:
  - - meta
    - name: 'keyword'
      content: dolibarr odoo erpnext tryton xtuple
  - - meta
    - property: 'og:title'
      content: Liste de logiciels utilisant PostgreSQL comme base de données
  - - meta      
    - property: 'og:description'
      content: Liste de logiciels utilisant PostgreSQL comme base de données 
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Liste de logiciels utilisant PostgreSQL comme base de données
  - - meta      
    - property: 'twitter:description'
      content: Liste de logiciels utilisant PostgreSQL comme base de données         
---

# Logiciels

## Dolibarr

### Résumé détaillé de Dolibarr

**Qu’est-ce que Dolibarr ?**

Dolibarr est un logiciel open source de gestion d’entreprise (ERP) et de relation client (CRM), conçu pour les TPE, PME, grandes entreprises, freelancers et associations. Il permet de centraliser et d’automatiser la gestion des activités professionnelles : devis, commandes, factures, stocks, agenda, contacts, projets, comptabilité, etc. Dolibarr est particulièrement apprécié pour sa flexibilité, sa simplicité d’utilisation et son approche modulaire, qui permet d’activer uniquement les fonctionnalités nécessaires à chaque entreprise.

**Origine et communauté**

Créé en 2003, Dolibarr est développé et maintenu par une large communauté internationale de bénévoles et de partenaires. Le logiciel est distribué sous licence GNU GPL v3, garantissant sa gratuité et sa liberté d’utilisation, de modification et de redistribution.

**Fonctionnalités principales**

* Gestion commerciale (devis, commandes, factures)
* Gestion des stocks et des produits
* Gestion des contacts et des relations clients (CRM)
* Gestion de projets et des tâches
* Gestion comptable et financière
* Agenda partagé et gestion des ressources humaines
* Point de vente (POS)
* Intégration avec d’autres outils via API
* Multi-utilisateurs avec différents niveaux de permissions
* Multi-devises et multi-langues

**Avantages**

* **Open Source** : Gratuit, personnalisable, indépendant des éditeurs propriétaires.
* **Modulaire** : Activation des fonctionnalités selon les besoins.
* **Web-based** : Accessible depuis n’importe quel navigateur, sans installation lourde.
* **Communauté active** : Support, documentation, modules complémentaires.
* **Intégration** : API pour connecter Dolibarr à d’autres logiciels.
* **Conformité légale** : En cours de certification pour la loi française sur les logiciels de caisse (2025).

**Inconvénients**

* Courbe d’apprentissage pour les utilisateurs non techniques.
* Certaines fonctionnalités avancées nécessitent des modules payants ou l’intervention d’un prestataire.
* Performances à surveiller en cas de bases de données très volumineuses ou de nombreux modules activés.

### Technologies utilisées par Dolibarr

#### Langages et frameworks

* **PHP** : Dolibarr est développé en PHP natif, sans framework lourd, ce qui facilite la prise en main par les développeurs et la personnalisation.
* **JavaScript** : Utilisé pour les interactions côté client (AJAX, interfaces dynamiques).
* **HTML/CSS** : Pour la structure et le style des interfaces web.

#### Base de données

* **MySQL** ou **PostgreSQL** : Dolibarr supporte ces deux systèmes de gestion de base de données, offrant ainsi une grande flexibilité selon l’infrastructure existante.

#### Architecture

* **Application web** : Fonctionne sur un serveur web (Apache, Nginx) avec PHP.
* **Auto-installation** : Des packages sont disponibles pour Windows, Mac, Linux, Docker et Cloud, simplifiant le déploiement.

#### Intégrations et API

* Dolibarr propose une API REST pour l’intégration avec d’autres logiciels (comptabilité, e-commerce, etc.).
* Possibilité de connecter des modules tiers pour étendre les fonctionnalités.

#### Environnement de développement

* Développement collaboratif via GitHub.
* Documentation et wiki officiels pour les développeurs et utilisateurs.

### **Conclusion et perspectives**

Dolibarr s’impose comme une solution ERP/CRM open source mature, adaptée aux besoins variés des entreprises, avec une communauté active et une roadmap d’évolution régulière. Son approche modulaire, sa simplicité et son indépendance technologique en font un choix privilégié pour les organisations cherchant à maîtriser leurs coûts et leur infrastructure.

## Odoo

### Résumé détaillé d’Odoo

#### Qu’est-ce qu’Odoo ?

[Odoo](https://www.odoo.com "ERP Odoo") est une suite logicielle open source de gestion d’entreprise (ERP) et de relation client (CRM), conçue pour répondre aux besoins des entreprises de toutes tailles, des TPE aux grands groupes. Il se distingue par son approche modulaire, permettant d’activer uniquement les fonctionnalités nécessaires, et par son évolutivité, s’adaptant à la croissance et aux besoins changeants des organisations.

#### Origine et modèle économique

Développé initialement en Belgique sous le nom de TinyERP puis d’OpenERP, Odoo a été renommé en 2014. Le logiciel est disponible en deux éditions :

* **Community** : Open source, gratuite, idéale pour les utilisateurs autonomes.
* **Enterprise** : Payante (à partir de ~25 €/utilisateur/mois), avec support officiel, hébergement cloud, fonctionnalités avancées et mises à jour simplifiées.

#### Fonctionnalités principales

Odoo couvre un large éventail de besoins métiers grâce à ses applications intégrées :

* Gestion commerciale (CRM, ventes, facturation, e-commerce)
* Gestion des stocks et de la logistique
* Comptabilité et finance
* Gestion de projets et des tâches
* Ressources humaines (recrutement, congés, évaluations)
* Fabrication et gestion de la production
* Site web et CMS (création de sites vitrines ou e-commerce)
* Point de vente (POS)
* Marketing automation et emailing
* Gestion de la flotte automobile et des services sur le terrain
* Intégration avec des outils tiers via API.

#### Avantages

* **Modularité** : Activation des modules selon les besoins, sans surcharge inutile.
* **Intégration totale** : Tous les modules communiquent entre eux, assurant une circulation fluide des données.
* **Personnalisation** : Interface intuitive, constructeur glisser-déposer, et possibilité de développement sur mesure.
* **Communauté active** : Plus de 100 000 développeurs collaborent à l’évolution du logiciel.
* **Localisation** : Adapté à plus de 70 pays, avec des règles comptables et fiscales spécifiques.
* **Innovation continue** : Mises à jour annuelles, intégration de l’IA et du machine learning pour automatiser les tâches et améliorer la prise de décision.

#### Inconvénients

* La version Community nécessite des compétences techniques pour l’installation et la maintenance.
* Certains modules avancés ou spécifiques sont réservés à la version Enterprise.
* Le coût peut augmenter avec le nombre d’utilisateurs et de modules activés.

#### Adoption et marché

Odoo est utilisé par plus de 8 millions d’utilisateurs dans le monde, dans des secteurs variés (industrie, services, retail, etc.). La société Odoo S.A. connaît une forte croissance, avec une valorisation atteignant 7 milliards d’euros en 2025 et une présence internationale (États-Unis, Inde, Moyen-Orient, etc.).

### Technologies utilisées par Odoo

#### Langages et frameworks

* **Python** : Langage principal pour le développement du cœur d’Odoo, réputé pour sa sécurité et sa stabilité.
* **JavaScript** : Utilisé pour les interfaces utilisateur dynamiques (framework Owl, successeurs de Backbone.js).
* **XML** : Pour la définition des vues et des rapports.
* **HTML/CSS** : Pour la structure et le style des interfaces web.

#### Base de données

* **PostgreSQL** : Système de gestion de base de données relationnelle open source, garantissant la pérennité et l’indépendance des données.
  PostgreSQL etant le seul moteur possible, on peut exploiter toute sa puissance et fonctionnalité native.

#### Architecture

* **Application web** : Fonctionne sur un serveur web (Nginx, Apache) avec un backend Python et un frontend JavaScript.
* **Modèle MVVM** (Model-View-ViewModel) : Pour une séparation claire entre la logique métier et l’interface utilisateur.
* **API REST** : Permet l’intégration avec d’autres logiciels et services externes.

#### Environnement de développement

* **Open source** : Code source disponible sur GitHub, encourageant les contributions de la communauté.
* **Odoo Studio** : Outil intégré pour personnaliser les applications sans coder.
* **Docker** : Support pour le déploiement conteneurisé.
* **Cloud et on-premise** : Hébergement possible sur les serveurs d’Odoo ou en interne.

#### Innovations récentes (2025)

* Intégration poussée de l’**intelligence artificielle** et du **machine learning** pour l’automatisation des processus, l’analyse prédictive et l’aide à la décision.
* Amélioration de l’interface utilisateur et des performances.
* Renforcement de la sécurité et des fonctionnalités collaboratives.

### Conclusion et perspectives

Odoo s’impose comme l’un des ERP/CRM les plus complets et flexibles du marché, grâce à son modèle open source, sa modularité et son écosystème dynamique. Son adoption croissante et son évolution technologique constante en font un choix privilégié pour les entreprises cherchant une solution tout-en-un, évolutive et personnalisable.


## ErpNext

### Résumé détaillé d’ERPNext

#### Qu’est-ce qu’ERPNext ?

[ERPNext](https://frappe.io/erpnext) est un logiciel de gestion d’entreprise (ERP) 100% open source, conçu pour répondre aux besoins des PME, des grandes entreprises, des associations, des écoles et des organisations de divers secteurs (industrie, distribution, retail, services, santé, éducation, etc.). Il se distingue par sa gratuité, son absence de fonctionnalités cachées derrière des paywalls, et son approche modulaire et intégrée.

#### Origine et communauté

Développé par la société indienne Frappe Technologies, ERPNext est distribué sous licence GPL-3.0, garantissant une totale liberté d’utilisation, de modification et de redistribution. Le projet bénéficie d’une communauté active de développeurs et d’utilisateurs, ainsi que d’un réseau de partenaires certifiés pour l’implantation, la personnalisation et le support.

#### Fonctionnalités principales

ERPNext couvre l’ensemble des processus métiers grâce à ses modules intégrés :

* **Comptabilité** (grand livre, facturation, taxes, rapports financiers)
* **Ventes et CRM** (devis, commandes, pipeline commercial, gestion des contacts)
* **Achats et gestion des stocks** (bon de commande, réception, inventaire, entrepôts)
* **Fabrication** (ordonnancement, nomenclature, suivi de production)
* **Ressources humaines** (paie, recrutement, congés, évaluations)
* **Gestion de projets** (tâches, Gantt, temps passé, facturation)
* **Site web et e-commerce** (CMS, blog, boutique en ligne)
* **Point de vente (POS)**
* **Support et helpdesk**
* **Gestion des actifs**
* **Intégration avec des services tiers** (PayPal, Stripe, Shopify, Google Drive, etc.).

#### Avantages

* **Open source et gratuit** : Pas de frais de licence, code source accessible.
* **Modulaire et personnalisable** : Activation des modules selon les besoins, développement de fonctionnalités spécifiques.
* **Interface moderne et intuitive** : Tableau de bord centralisé, navigation simple, formes cohérentes entre modules.
* **Multi-entreprises, multi-devises, multi-langues** : Adapté aux groupes internationaux.
* **Conformité fiscale** : Prise en charge des réglementations de nombreux pays.
* **Hébergement flexible** : Cloud (Frappe Cloud) ou on-premise.
* **Communauté et écosystème** : Documentation complète, forums, partenaires certifiés.

#### Inconvénients

* Courbe d’apprentissage initiale pour les non-techniciens.
* Certaines fonctionnalités avancées ou intégrations tierces peuvent nécessiter l’intervention d’un partenaire ou développeur.
* Les rapports et tableaux peuvent parfois manquer de convivialité.
* Support limité en version gratuite (nécessite un abonnement pour un support prioritaire).

#### Adoption et marché

ERPNext est utilisé par des milliers d’entreprises dans le monde, dans des secteurs variés. Il est souvent choisi pour son rapport qualité-prix, sa flexibilité et son indépendance technologique. La société Frappe Technologies continue d’investir dans son développement, avec des mises à jour régulières et une roadmap ambitieuse.

### Technologies utilisées par ERPNext

#### Langages et frameworks
* **Python** : Langage principal pour le backend, via le framework **Frappe**, développé spécifiquement pour ERPNext. Frappe fournit une architecture modulaire, des outils de développement rapides et une API REST intégrée.
* **JavaScript** : Pour le frontend, avec une interface réactive et moderne.
* **HTML/CSS** : Pour la structure et le style des interfaces utilisateur.

#### Base de données

* **PostgreSQL** : à Partir de la version 14 (sortie en 2023) il est possible d'utiliser PostgreSQL en remplacement de MariaDB.
* **MariaDB** : Système de gestion de base de données relationnelle open source, optimisé pour les performances et la fiabilité.

#### Architecture

* **Application web** : Fonctionne sur un serveur web (Nginx, Apache) avec un backend Python et un frontend JavaScript.
* **Modèle MVC** (Modèle-Vue-Contrôleur) : Pour une séparation claire entre la logique métier, l’interface et les données.
* **API REST** : Permet l’intégration avec d’autres logiciels et services externes.
* **Docker** : Support pour le déploiement conteneurisé, facilitant l’installation et la mise à jour.

#### Environnement de développement

* **Open source** : Code source disponible sur GitHub, encourageant les contributions de la communauté.
* **Frappe School** : Plateforme de formation pour apprendre à développer et personnaliser ERPNext.
* **Frappe Cloud** : Solution d’hébergement managé, avec mises à jour automatiques, sauvegardes et support technique.

#### Innovations récentes (2025)

- Amélioration de l’interface utilisateur et de l’expérience mobile.
- Renforcement des fonctionnalités de fabrication et de gestion de projets.
- Développement de l’écosystème de partenaires pour des solutions sectorielles sur mesure.

### Conclusion et perspectives

ERPNext s’impose comme une solution ERP open source mature, flexible et économique, adaptée aux entreprises de toutes tailles et de tous secteurs. Son approche modulaire, sa communauté active et son indépendance technologique en font un choix de plus en plus populaire, notamment pour les organisations cherchant à éviter les coûts élevés des solutions propriétaires.

## Tryton

### Résumé détaillé de Tryton

#### Qu’est-ce que Tryton ?

[Tryton](https://www.tryton.org/ "ERP tryton") est un ERP (Enterprise Resource Planning) open source, modulaire et puissant, conçu pour les entreprises de toutes tailles et de tous secteurs (industrie, distribution, retail, services, construction, etc.). Il se distingue par son architecture trois tiers, sa flexibilité, sa sécurité et son absence de verrouillage propriétaire (no vendor lock-in).

#### Origine et gouvernance

Tryton est développé et maintenu par la Tryton Foundation, une organisation à but non lucratif basée en Allemagne. Le projet est soutenu par une communauté internationale de développeurs et d’entreprises, et son code est entièrement open source (licence GPL-3.0), garantissant transparence et indépendance.

#### Fonctionnalités principales

`Tryton` couvre l’ensemble des processus métiers grâce à ses modules intégrés et extensibles :

* **Gestion financière** (comptabilité, facturation, multi-devises, multi-sociétés)
* **Ventes et CRM** (devis, commandes, pipeline commercial, gestion des contacts)
* **Achats et gestion des stocks** (bon de commande, réception, inventaire, entrepôts)
* **Fabrication** (ordonnancement, nomenclature, suivi de production)
* **Gestion de projets** (tâches, Gantt, temps passé, facturation)
* **Ressources humaines** (paie, recrutement, congés, évaluations)
* **Analytique et reporting**
* **Intégration avec des services tiers** via API
* **Sécurité** : chiffrement TLS/HTTPS, contrôles d’accès, politiques de mots de passe, journaux d’audit.

#### Avantages

* **Open source et gratuit** : Pas de frais de licence, code source accessible et modifiable.
* **Architecture trois tiers** : Client, serveur et base de données séparés, facilitant la maintenance et l’évolutivité.
* **Modularité** : Activation des modules selon les besoins, sans surcharge inutile.
* **Multi-plateforme** : Compatible avec Linux, Windows et macOS.
* **Interfaces utilisateur** : Version desktop (GTK+) et web (SAO).
* **Communauté active** : Documentation complète, forums, partenaires certifiés pour le support et la personnalisation.
* **Sécurité et conformité** : Respect des standards industriels, auditabilité du code.

#### Inconvénients

* Courbe d’apprentissage pour les utilisateurs non techniques, notamment pour la personnalisation avancée.
* Certaines fonctionnalités ou intégrations peuvent nécessiter l’intervention d’un développeur ou d’un partenaire.

#### Adoption et marché

Tryton est utilisé par des entreprises de divers secteurs et tailles, notamment en Europe et en Amérique latine. 
Il est souvent choisi pour sa flexibilité, sa sécurité et son modèle économique transparent. 
La fondation et la communauté organisent régulièrement des événements et des mises à jour pour faire évoluer le logiciel.

### Technologies utilisées par Tryton

#### Langages et frameworks

* **Python** : Langage principal pour le développement du serveur et de la logique métier. Tryton utilise la librairie **python-sql**, développée par la communauté, pour écrire des requêtes SQL en Python, ce qui permet une compatibilité avec plusieurs systèmes de gestion de base de données.
* **GTK+** : Pour l’interface desktop.
* **JavaScript/HTML/CSS** : Pour l’interface web (SAO) et les interactions utilisateur.

#### Base de données

* **PostgreSQL** : Système de gestion de base de données relationnelle open source, recommandé pour ses performances et sa fiabilité. L’architecture de Tryton permet théoriquement d’utiliser d’autres SGBD, mais PostgreSQL est le plus couramment utilisé et supporté.

#### Architecture

* **Trois tiers** : Client (desktop ou web), serveur (Python), base de données (PostgreSQL). Cette séparation permet une grande flexibilité, une maintenance simplifiée et une évolutivité accrue.
* **API REST** : Pour l’intégration avec d’autres logiciels et services externes.
* **Modularité** : Chaque fonctionnalité est un module indépendant, facile à activer, désactiver ou personnaliser.

#### Environnement de développement

* **Open source** : Code source disponible sur des plateformes comme GitHub, encourageant les contributions de la communauté.
* **Outils de développement** : Utilisation de technologies libres et d’outils modernes pour le développement, le test et le déploiement.
* **Documentation** : Très complète, avec des sections dédiées à l’architecture, l’API, et chaque module métier.

#### Sécurité

* Chiffrement des données (TLS/HTTPS), contrôles d’accès granulaires, politiques de mots de passe, journaux d’audit.
* Transparence du code source, permettant des audits de sécurité indépendants.


### Conclusion et perspectives

Tryton est un ERP open source mature, sécurisé et modulaire, idéal pour les entreprises recherchant une solution flexible, indépendante et évolutive. Son architecture trois tiers, son utilisation de Python et PostgreSQL, et sa gouvernance communautaire en font un choix robuste pour une gestion d’entreprise sans verrouillage propriétaire.

## xTuple

### Résumé détaillé de xTuple

#### Qu’est-ce que xTuple ?

[xTuple](https://www.xtuple.com/solutions "ERP xTuple") est un logiciel ERP (Enterprise Resource Planning) spécialement conçu pour les entreprises de fabrication, de distribution et de gestion d’inventaire. Il se distingue par son approche open source, son coût abordable et sa capacité à répondre aux besoins des PME en croissance, ainsi que des entreprises plus grandes cherchant une solution flexible et évolutive.

#### Origine et modèle économique

Fondée en 2001 et basée à Raleigh (Caroline du Nord, États-Unis), xTuple propose une solution ERP open source, avec des options de déploiement cloud ou on-premise. Le modèle économique repose sur une version open source gratuite et des versions payantes (xTuple Essentials, xTuple Standard, xTuple Manufacturing) offrant des fonctionnalités avancées, un support professionnel et des services cloud.

#### Fonctionnalités principales

xTuple couvre l’ensemble des processus métiers grâce à ses modules intégrés :

* **Gestion de la production** (planification, ordonnancement, MRP, gestion des ateliers)
* **Gestion des stocks et entrepôts** (multi-entrepôts, suivi en temps réel, gestion des lots et numéros de série)
* **Comptabilité et finance** (grand livre, comptes clients/fournisseurs, rapports financiers)
* **Ventes et CRM** (devis, commandes, pipeline commercial, gestion des contacts)
* **Achats et gestion de la chaîne logistique**
* **Analytique et reporting** (tableaux de bord, rapports personnalisables, automatisation)
* **Gestion de projets**
* **Intégration avec des outils tiers** (via API)
* **Support multi-devises et multi-sites**.

#### Avantages

* **Open source** : Code source accessible, personnalisable, sans frais de licence pour la version de base.
* **Modularité** : Activation des modules selon les besoins, évolutivité.
* **Flexibilité de déploiement** : Cloud ou on-premise, compatible Windows, macOS, Linux.
* **Coût total de possession réduit** : L’un des plus bas du marché pour un ERP complet.
* **Support et communauté** : Documentation, formation, support technique, communauté active.
* **Adapté aux fabricants** : Support natif pour la fabrication hybride, discrète, sur commande, etc.
* **Automatisation** : Réduction des tâches manuelles, amélioration de la productivité.

#### Inconvénients

* Interface utilisateur parfois jugée peu intuitive, surtout pour les nouveaux utilisateurs.
* Courbe d’apprentissage pour la configuration et la personnalisation avancée.
* Certaines fonctionnalités avancées ou intégrations nécessitent des compétences techniques ou l’intervention d’un partenaire.

#### Adoption et marché

xTuple est particulièrement populaire auprès des PME et des entreprises de taille moyenne dans les secteurs de la fabrication et de la distribution. Il est souvent choisi pour son rapport qualité-prix, sa flexibilité et sa capacité à s’adapter aux besoins spécifiques des entreprises en croissance.

### Technologies utilisées par xTuple

#### Langages et frameworks

* **C++/Qt** : Pour le cœur de l’application et l’interface utilisateur native (Windows, macOS, Linux).
* **JavaScript/HTML/CSS** : Pour les interfaces web et les interactions utilisateur.
* **SQL** : Pour les requêtes et la gestion des données.

#### Base de données

* **PostgreSQL** : Système de gestion de base de données relationnelle open source, réputé pour sa robustesse et sa compatibilité avec les applications ERP.

#### Architecture

* **Client-serveur** : Architecture modulaire, permettant une séparation claire entre la logique métier, l’interface et la base de données.
* **API REST** : Pour l’intégration avec d’autres logiciels et services externes.
* **Cloud et on-premise** : Déploiement flexible selon les besoins de l’entreprise.

#### Environnement de développement

* **Open source** : Code source disponible, encourageant les contributions de la communauté et les personnalisations.
* **Outils de développement** : Environnements de développement modernes, documentation complète, support pour les intégrations tierces.
* **Mises à jour régulières** : Améliorations continues de l’interface, des performances et des fonctionnalités.

#### Innovations récentes (2025)

* Amélioration de l’interface utilisateur et de l’expérience mobile.
* Renforcement des outils d’analytique et de reporting (tableaux de bord, graphiques, automatisation).
* Optimisation des performances et de la sécurité, notamment pour le déploiement cloud.

### Conclusion et perspectives

`xTuple` s’impose comme une solution ERP open source mature, flexible et économique, particulièrement adaptée aux entreprises de fabrication et de distribution. 
Son approche modulaire, son coût réduit et sa communauté active en font un choix privilégié pour les organisations cherchant une alternative aux ERP propriétaires, 
sans sacrifier la puissance ou la personnalisation.