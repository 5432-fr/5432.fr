---
title: Programmation langage PHP
---

# Langage PHP

## Bibliothèques

- [Librairie officiel
  native](https://www.php.net/manual/fr/book.pgsql.php)
- [Librairie PDO](https://php.net/manual/fr/book.pdo.php)

## Gestionnaire de modèle

- [POMM](https://github.com/chanmix51/Pomm)

## Configuration

Pour activer l'extension PDO pour PostgreSQL, il faut editer le fichier php.in, trouver la ligne ci-dessous

```ini
extension=php_pdo_pgsql.dll
```

enlever le **;** qui est un commentaire pour activer l'extension.


## Tutoriel

Une fois l'extension activée (vérifiable avec un **phpinfo()** ), nous pouvons commencer à utiliser PostgreSQL avec PHP

La première chose a faire est de se connecter à la base de données

```php
<?php

try {
	$dsn = "pgsql:host=localhost;port=5432;dbname=test;";
  $user = "mon_user";
  $password = "passw0rd";

	$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

	if ($pdo) {
		echo "La connexion a été établie avec succès!";
	}
} catch (PDOException $e) {
	die($e->getMessage());
} finally {
	if ($pdo) {
		$pdo = null;
	}
}

?>
```



