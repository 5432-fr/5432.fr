---
title: Programmation en langage Java avec JDBC
description: Utilisation de Java pour se connecter à une base de données PostgreSQL
head:
  - - meta
    - name: 'keywords'
      content: 'java, jdbc, postgresql, HikariCP, jvm'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0          
  - - meta
    - property: 'og:title'
      content: Programmation en langage Java avec JDBC
  - - meta      
    - property: 'og:description'
      content: Utilisation de Java pour se connecter à une base de données PostgreSQL
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Programmation en langage Java avec JDBC
  - - meta      
    - property: 'twitter:description'
      content: Utilisation de Java pour se connecter à une base de données PostgreSQL
---

# Langage Java

## Introduction

Java est un langage de programmation **orienté objet**, **portable** et **sécurisé**, 
créé en 1995 par Sun Microsystems (aujourd’hui propriété d’Oracle). 

Il repose sur le principe **"Write Once, Run Anywhere"** (WORA), grâce à la **Java Virtual Machine (JVM)**, 
qui permet d’exécuter du code compilé (bytecode) sur n’importe quel système d’exploitation.

Java est largement utilisé pour développer des **applications d’entreprise**, des **applications web** (avec Spring, Jakarta EE), 
des **applications mobiles** (Android), et des **systèmes embarqués**. Ses principales caractéristiques incluent :

* **La syntaxe simple et structurée**, inspirée du C++ mais sans sa complexité (pas de pointeurs, gestion automatique de la mémoire via le **garbage collector**).
* **La robustesse** : gestion stricte des types, exceptions, et vérifications à la compilation/exécution.
* **La sécurité** : sandboxing, gestion des permissions, et absence de vulnérabilités liées à la gestion manuelle de la mémoire.
* **Une riche bibliothèque standard** (Java API) pour les E/S, réseaux, collections, concurrency, etc.

Java est aussi un écosystème mature avec des outils comme `Maven` ou `Gradle` (ou plus ancien comme `ANT`) pour la gestion des dépendances,
et des frameworks comme **Spring** ou **Hibernate** pour simplifier le développement.

## Connexion au base de données

Pour se connecter au base de données, Java a implémenté la spécification `JDBC` pour la conception de driver.
Plusieurs version sont apparus au fil des années suivant l'évolution du langage.

### Résumé des versions de JDBC

| Version | Année | Java SE | Principales nouveautés |
|:-------:|:-----:|:-------:|------------------------|
| **JDBC 1.0** | 1997 | JDK 1.1 | Première version, API de base pour la connexion aux bases de données, `DriverManager`, `Connection`, `Statement`, `ResultSet`. |
| **JDBC 2.0** | 1999 | JDK 1.2/1.3 | Ajout des **ResultSet scrollables** (navigation bidirectionnelle), **ResultSet updatable**, **Batch Updates**, et introduction de l’API `javax.sql` (DataSource, Connection Pooling, RowSet). |
| **JDBC 3.0** | 2002 | JDK 1.4 | **Savepoints** (pour les transactions imbriquées), amélioration des `PreparedStatement`, support des **BLOB/CLOB**, et métadonnées étendues. |
| **JDBC 4.0** | 2006 | Java SE 6 | **Auto-loading des pilotes** (plus besoin de `Class.forName`), support des **SQL XML**, amélioration des `RowSet`, et intégration avec Java EE. |
| **JDBC 4.1** | 2011 | Java SE 7 | Support des **try-with-resources** (AutoCloseable), amélioration des `RowSet`, et gestion simplifiée des exceptions. |
| **JDBC 4.2** | 2014 | Java SE 8 | Support des **REF_CURSOR** (Oracle), amélioration des `RowSet`, et compatibilité avec les nouvelles fonctionnalités de Java 8 (comme les streams pour `ResultSet`). |
| **JDBC 4.3** | 2017 | Java SE 9 | Support des **nouvelles API de date/heure** (`java.time`), méthodes `getObject` avec mapping automatique vers les types Java 8, et amélioration de la gestion des shards (bases de données partitionnées). |
| **JDBC 4.4** | 2021 | Java SE 17 (LTS) | Support des **SQL:2016**, amélioration des **mappages de types**, et optimisations pour les applications cloud/natives. |

### Points clés à retenir

* **JDBC 4.0** a marqué un tournant avec l’auto-chargement des pilotes et une meilleure intégration avec Java SE.
* **JDBC 4.2/4.3** ont apporté des améliorations pour les applications modernes, notamment avec Java 8 et les API de date/heure.
* **JDBC 4.4** est la version la plus récente (inclus dans Java 17+), avec un focus sur la compatibilité avec les bases de données cloud et les standards SQL récents.

## JDBC et PostgreSQL

Pour se connecter à `PostgreSQL` en Java nous utiliseront le driver
[JDBC](https://fr.wikipedia.org/wiki/Java_Database_Connectivity) qui
fournit une interface de programmation standard, et est developpé par la communauté PostgreSQL.

- [driver JDBC pour PostgreSQL](https://jdbc.postgresql.org/download/)

:::: warning
Il faut sélectionner le driver [JDBC](https://fr.wikipedia.org/wiki/Java_Database_Connectivity) 
qui correspond a votre version de PostgreSQL mais aussi à votre version de Java.
::::


## Configuration de la connexion à PostgreSQL en Java

Pour interagir avec PostgreSQL, utilisez le **pilote JDBC** officiel.

### Déclarer la dépendance

#### Avec Maven (`pom.xml`)

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version> <!-- Vérifiez la dernière version -->
</dependency>
```

#### Avec Gradle (`build.gradle`)

```groovy
dependencies {
    implementation 'org.postgresql:postgresql:42.6.0'
}
```

## Exemple de code Java pour se connecter et exécuter des requêtes

### Connexion à la base de données

```java
import java.sql.*;

public class PostgreSQLExample {
    private static final String URL = "jdbc:postgresql://localhost:5432/nom_de_la_base";
    private static final String USER = "utilisateur";
    private static final String PASSWORD = "mot_de_passe";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            System.out.println("Connexion réussie à PostgreSQL!");

            // Exemple de requête SELECT
            String sql = "SELECT * FROM clients";
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {

                while (rs.next()) {
                    System.out.println("ID: " + rs.getInt("id") +
                                       ", Nom: " + rs.getString("nom"));
                }
            }

            // Exemple de requête INSERT
            String insertSql = "INSERT INTO clients (nom, email) VALUES (?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(insertSql)) {
                pstmt.setString(1, "Dupont");
                pstmt.setString(2, "dupont@example.com");
                pstmt.executeUpdate();
                System.out.println("Nouveau client ajouté!");
            }

        } catch (SQLException e) {
            System.err.println("Erreur de connexion: " + e.getMessage());
        }
    }
}
```

## Bonnes pratiques

* **Gestion des ressources**: Utilisez `try-with-resources` pour fermer automatiquement les connexions, statements et resultsets.
* **Requêtes préparées**: Préférez `PreparedStatement` pour éviter les injections SQL.
* **Pool de connexions**: Pour les applications web, utilisez un pool de connexions comme **HikariCP** (intégré à Spring Boot par défaut).

## Pool de connexion (HikariCP)

**HikariCP** est un **pool de connexions JDBC** ultra-rapide, léger et conçu pour les applications Java modernes. 
Il est devenu le standard de facto pour la gestion des connexions à une base de données, notamment avec **PostgreSQL**, 
grâce à sa performance, sa simplicité et sa fiabilité.


### Pourquoi utiliser HikariCP ?

* **Performance** : HikariCP est jusqu’à **10 fois plus rapide** que d’autres pools comme Apache DBCP ou C3P0.
* **Léger** : Moins de 130 Ko, sans dépendances lourdes.
* **Optimisé pour la production** : Gestion intelligente des connexions, des timeouts, et des fuites de mémoire.
* **Intégré par défaut** dans Spring Boot, Quarkus, et d’autres frameworks modernes.

### Ajouter la dépendance

#### Avec Maven (`pom.xml`)

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.0.1</version> <!-- Vérifiez la dernière version -->
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version> <!-- Pilote JDBC pour PostgreSQL -->
</dependency>
```

#### Avec Gradle (`build.gradle`)

```groovy
implementation 'com.zaxxer:HikariCP:5.0.1'
implementation 'org.postgresql:postgresql:42.6.0'
```

### Code Java

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class PostgreSQLPoolExample {
    public static void main(String[] args) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/nom_de_la_base");
        config.setUsername("utilisateur");
        config.setPassword("mot_de_passe");
        config.setMaximumPoolSize(10);

        try (HikariDataSource ds = new HikariDataSource(config);
             Connection conn = ds.getConnection()) {

            // Utilisez la connexion comme avant
            String sql = "SELECT * FROM clients";
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                while (rs.next()) {
                    System.out.println("ID: " + rs.getInt("id"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### Bonnes pratiques avec HikariCP

* **Taille du pool** :
  - `maximumPoolSize` : Dépend de votre charge. Pour la plupart des applications, **10 à 20** connexions suffisent.
  - Évitez de surdimensionner le pool (risque de surcharge du serveur PostgreSQL).
* **Timeouts** :
  - `connectionTimeout` : Temps max pour obtenir une connexion (évite les attentes infinies).
  - `maxLifetime` : Limite la durée de vie d’une connexion pour éviter les problèmes de stagnation.
* **Validation des connexions** :
  - Activez `connectionTestQuery` pour vérifier la validité des connexions avant utilisation :
    ```java
    config.setConnectionTestQuery("SELECT 1");
    ```
* **Journalisation** :
  - HikariCP fournit des métriques détaillées (nombre de connexions actives, temps d’attente, etc.). Activez les logs pour le débogage :
    ```java
    config.setLeakDetectionThreshold(60000); // Détection des fuites après 60s

### Avantages spécifiques avec PostgreSQL

* **Compatibilité totale** : HikariCP fonctionne parfaitement avec le pilote JDBC de PostgreSQL.
* **Gestion des transactions** : Intègre naturellement avec les transactions JDBC et les frameworks comme Spring Transaction.
* **Support des fonctionnalités avancées** : Comme les `PreparedStatement` en cache, les requêtes batch, et les types de données spécifiques à PostgreSQL (JSONB, UUID, etc.).

### Résumé des paramètres clés

| Paramètre | Description | Valeur recommandée |
|:----------|-------------|:-----------------:|
| `maximumPoolSize` | Nombre max de connexions | 10-20 |
| `minimumIdle` | Nombre min de connexions inactives | 5 |
| `idleTimeout` | Temps max d’inactivité (ms) | 30000 |
| `connectionTimeout` | Timeout pour obtenir une connexion (ms) | 30000 |
| `maxLifetime` | Durée de vie max d’une connexion (ms) | 1800000 (30 min) |
| `connectionTestQuery` | Requête de validation | `SELECT 1` |


### Configuration avec Spring Boot

Si vous utilisez **Spring Boot**, HikariCP est le pool par défaut. Il suffit de configurer `application.properties` :

```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/ma_base
spring.datasource.username=utilisateur
spring.datasource.password=mot_de_passe
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP (paramètres optionnels)
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.max-lifetime=1800000
```

### Quand utiliser HikariCP ?

* **Applications web** (Spring Boot, Jakarta EE, Micronaut, Quarkus).
* **Microservices** nécessitant des connexions rapides et fiables.
* **Environnements cloud** où la latence et la scalabilité sont critiques.

## Intégration avec Spring Boot

Si vous utilisez **Spring Boot**, la configuration est simplifiée via `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nom_de_la_base
spring.datasource.username=utilisateur
spring.datasource.password=mot_de_passe
spring.datasource.driver-class-name=org.postgresql.Driver
```

Spring Boot gère automatiquement le pool de connexions avec HikariCP.

## Résumé des étapes clés

| Étape | Action |
|:-----:|:-------|
| **1** | Ajouter la dépendance PostgreSQL (Maven/Gradle) |
| **2** | Charger le pilote JDBC et établir la connexion |
| **3** | Exécuter des requêtes (SELECT, INSERT, UPDATE, DELETE) |
| **4** | Utiliser des requêtes préparées pour la sécurité |
| **5** | Gérer les ressources avec `try-with-resources` |
| **6** | (Optionnel) Configurer un pool de connexions (HikariCP) |
