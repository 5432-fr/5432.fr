---
title: Programmation en langage PHP avec PostgreSQL
description: Etablissement d'une connexion à PostgreSQL en PHP et le driver PDO PgSQL
head:
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
  - - meta
    - name: 'keyword'
      content: php postgresql pdo
  - - meta
    - property: 'og:title'
      content: Programmation en langage PHP avec PostgreSQL
  - - meta      
    - property: 'og:description'
      content: Etablissement d'une connexion à PostgreSQL en PHP et PDO
  - - meta      
    - property: 'og:type'
      content: 'article'
  - - meta
    - property: 'twitter:title'
      content: Programmation en langage PHP avec PostgreSQL
  - - meta      
    - property: 'twitter:description'
      content: Etablissement d'une connexion à PostgreSQL en PHP et PDO   
---

# Langage PHP

## Bibliothèques

- [Librairie officiel
  native](https://www.php.net/manual/fr/book.pgsql.php)
- [Librairie PDO](https://php.net/manual/fr/book.pdo.php)

## Gestionnaire de modèle

- [POMM](https://github.com/chanmix51/Pomm)

## Configuration

Pour activer l'extension PDO pour PostgreSQL, il faut editer le fichier php.ini, trouver la ligne ci-dessous

```ini
extension=php_pdo_pgsql.dll
```

enlever le **;** qui est un commentaire pour activer l'extension.



Une fois l'extension activée (vérifiable avec un **phpinfo()** ), nous pouvons commencer à utiliser PostgreSQL avec PHP et PDO

## Pourquoi utiliser PDO avec PostgreSQL ?

PDO (PHP Data Objects) est une extension PHP qui offre une interface unifiée pour interagir avec différentes bases de données, dont PostgreSQL. Ses avantages :
- **Sécurité** : Protection contre les injections SQL via les requêtes préparées.
- **Portabilité** : Code facilement adaptable à d’autres SGBD (MySQL, SQLite, etc.).
- **Performance** : Gestion optimisée des connexions et des requêtes.

### Prérequis

- Un serveur web avec PHP (version 7.4 ou supérieure recommandée).
- L’extension PDO et le driver PDO_PGSQL activés dans `php.ini` :
  ```ini
  extension=pdo
  extension=pdo_pgsql
  ```
- Un serveur PostgreSQL accessible (local ou distant).

## Connexion à PostgreSQL avec PDO

### Exemple de connexion

```php
<?php
// Paramètres de connexion
$host = 'localhost';      // Adresse du serveur PostgreSQL
$dbname = 'nom_base';     // Nom de la base de données
$user = 'utilisateur';    // Nom d'utilisateur
$password = 'motdepasse'; // Mot de passe

try {
    // Chaîne de connexion PDO
    $dsn = "pgsql:host=$host;dbname=$dbname;port=5432";

    // Création de la connexion
    $pdo = new PDO($dsn, $user, $password);

    // Configuration pour afficher les erreurs PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Connexion à PostgreSQL réussie !";
} catch (PDOException $e) {
    // Gestion des erreurs
    die("Erreur de connexion : " . $e->getMessage());
}
?>
```

## Exécution de requêtes

### Requête simple (SELECT)

```php
try {
    $sql = "SELECT * FROM clients WHERE age > :age";
    $stmt = $pdo->prepare($sql);

    // Liaison des paramètres
    $age_min = 18;
    $stmt->bindParam(':age', $age_min, PDO::PARAM_INT);

    // Exécution
    $stmt->execute();

    // Récupération des résultats
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Affichage
    foreach ($clients as $client) {
        echo "Nom : " . $client['nom'] . ", Âge : " . $client['age'] . "<br>";
    }
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
```

### Insertion de données (INSERT)

```php
try {
    $sql = "INSERT INTO clients (nom, email, age) VALUES (:nom, :email, :age)";
    $stmt = $pdo->prepare($sql);

    // Données à insérer
    $nom = "Dupont";
    $email = "dupont@example.com";
    $age = 30;

    // Liaison des paramètres
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':age', $age);

    // Exécution
    $stmt->execute();

    echo "Client ajouté avec succès !";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
```

### Mise à jour (UPDATE)

```php
try {
    $sql = "UPDATE clients SET email = :email WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    // Données à mettre à jour
    $id = 1;
    $nouvel_email = "nouvel_email@example.com";

    // Liaison des paramètres
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':email', $nouvel_email);

    // Exécution
    $stmt->execute();

    echo "Email mis à jour !";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
```

### Suppression (DELETE)

```php
try {
    $sql = "DELETE FROM clients WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    // ID du client à supprimer
    $id = 1;
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Exécution
    $stmt->execute();

    echo "Client supprimé !";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
```

## Transactions

Les transactions permettent de regrouper plusieurs requêtes en un bloc atomique (tout est exécuté ou rien).

```php
try {
    $pdo->beginTransaction();

    // Exemple : Transfert d'argent entre deux comptes
    $sql1 = "UPDATE comptes SET solde = solde - 100 WHERE id = 1";
    $sql2 = "UPDATE comptes SET solde = solde + 100 WHERE id = 2";

    $pdo->exec($sql1);
    $pdo->exec($sql2);

    // Validation de la transaction
    $pdo->commit();
    echo "Transaction effectuée avec succès !";
} catch (PDOException $e) {
    // Annulation en cas d'erreur
    $pdo->rollBack();
    echo "Erreur : " . $e->getMessage();
}
```

## Bonnes pratiques

- **Toujours utiliser des requêtes préparées** pour éviter les injections SQL.
- **Gérer les erreurs** avec des blocs `try/catch`.
- **Fermer les connexions** : PDO ferme automatiquement la connexion à la fin du script, mais vous pouvez forcer la fermeture avec `$pdo = null;`.
- **Utiliser des transactions** pour les opérations critiques.

## Ressources utiles

- [Documentation officielle PDO](https://www.php.net/manual/fr/book.pdo.php)
- [PostgreSQL + PHP : Guide complet](https://www.postgresql.org/docs/current/libpq-connect.html)


