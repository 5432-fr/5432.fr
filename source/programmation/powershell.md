---
title: Connexion à PostgreSQL en powershell
description: Connexion à une base de données PostgreSQL en powershell
head:
  - - meta
    - name: 'keywords'
      content: 'powershell, dotnet, postgresql, npgsql, windows, forms, datagridview, pgpass, posh'
  - - meta
    - name: 'author'
      content: 'Christophe Chauvet'
  - - meta
    - name: 'copyright'
      content: 'CC BY-SA 4.0'  
---

# Powershell avec PostgreSQL

## Qu’est-ce que PowerShell ?

Avant d'attaquer avec des exemples en Powershell, il convient de faire un explication rapide
sur ce qu'est PowerShell

### Introduction

**PowerShell** est un **shell de ligne de commande** et un **langage de script** développé par Microsoft, principalement utilisé pour l’automatisation des tâches, 
la gestion des systèmes et l’administration des environnements Windows (mais aussi Linux et macOS depuis 2016). 

Il permet aux administrateurs et aux développeurs d’automatiser des processus répétitifs, de gérer des configurations, et d’interagir avec le système d’exploitation, les applications et les services de manière efficace.

#### Version de PowerShell

| Version,Plateforme | Basé sur | Multiplateforme | Compatibilité modules Windows |
| :----------------: | :---: | :---: | :---: |
|1.0 à 5.1|Windows|.NET Framework|Non|Oui|
|Core 6.0+|Windows/Linux/mac|.NET Core|Oui|Partielle|
|7.0+|Windows/Linux/mac|.NET 5/6/7/8|Oui|Très bonne|


::: info Quelle version utiliser ?
* Pour les environnements Windows traditionnels : PowerShell 5.1 (stable et complet).
* Pour les environnements multiplateformes ou modernes : PowerShell 7.4 (ou la dernière version disponible).
:::

#### Points clés

* **Shell interactif** : Permet d’exécuter des commandes en temps réel.
* **Langage de script** : Permet d’écrire des scripts (.ps1) pour automatiser des tâches complexes.
* **Basé sur des objets** : Contrairement aux shells traditionnels (comme cmd.exe) qui manipulent du texte, PowerShell manipule des **objets** (instances de classes .NET), 
  ce qui facilite la gestion des données et l’intégration avec d’autres technologies Microsoft.
* **Extensible** : Grâce à des **modules** et des **cmdlets** (commandes spécialisées), il est possible d’étendre ses fonctionnalités.

### Briques technologiques de PowerShell

PowerShell repose sur plusieurs technologies clés:

| Brique technologique                  | Rôle                                                                                           |
|---------------------------------------|------------------------------------------------------------------------------------------------|
| **.NET Framework/.NET Core**          | PowerShell est construit sur .NET, ce qui lui permet de manipuler des objets .NET directement. |
| **Cmdlets**                           | Commandes spécialisées (ex: `Get-Process`, `Set-Service`) écrites en .NET.                     |
| **Modules**                           | Regroupent des cmdlets et des fonctions pour étendre PowerShell.                               |
| **Pipeline**                          | Permet de chaîner des commandes et de transmettre des objets entre elles.                      |
| **WS-Management (WinRM)**             | Protocole utilisé pour la gestion à distance des machines.                                     |
| **PowerShell Remoting**               | Permet d’exécuter des commandes sur des machines distantes.                                    |
| **Desired State Configuration (DSC)** | Outil de gestion de configuration basé sur PowerShell.                                         |


### En résumé

PowerShell est un outil puissant pour l’automatisation et l’administration système, 
construit sur **.NET** et enrichi par des **cmdlets**, 
des **modules** et des protocoles de gestion à distance. 

Il est largement utilisé par les administrateurs système, les DevOps et les développeurs pour gérer des infrastructures locales ou cloud.

Et comme il est basé sur **.NET** on peut utiliser le driver ODBC ou tout autre bibliothèque qui permet de se connecter à PostgreSQL comme [Npgsql](https://www.npgsql.org/ ".NET Access to PostgreSQL")

## Accès avec le driver ODBC

Pour notre exemple de script PowerShell qui utilise le driver `ODBC` officiel pour se connecter à une base de données PostgreSQL. Ce script suppose que le driver ODBC pour PostgreSQL est déjà installé sur votre machine (par exemple, [psqlODBC](https://odbc.postgresql.org/ "Driver ODBC for Windows") en version 32 ou 64 bits).

La documentation d'installation en français se trouve dans [cette partie](../installation/odbc-windows.md "Installation driver ODBC").

### Prérequis

* PowerShell 5.1 et 7.0+
* Le driver ODBC pour PostgreSQL doit être installé (de préférence utiliser la version 64 bits). 
* Une source de données ODBC (DSN) doit être configurée, ou vous pouvez utiliser une chaîne de connexion directe.

### Exemple de script PowerShell

```powershell
# Paramètres de connexion
$server = "localhost"          # ou l'adresse IP/nom du serveur PostgreSQL
$port = "5432"                 # port par défaut de PostgreSQL
$database = "nom_de_votre_base"
$username = "votre_utilisateur"
$password = "votre_mot_de_passe"

# Chaîne de connexion ODBC (sans DSN)
$connectionString = "Driver={PostgreSQL Unicode};Server=$server;Port=$port;Database=$database;Uid=$username;Pwd=$password;"

try {
    # Création de l'objet de connexion ODBC
    $connection = New-Object System.Data.Odbc.OdbcConnection($connectionString)

    # Ouverture de la connexion
    $connection.Open()

    Write-Host "Connexion à PostgreSQL réussie !" -ForegroundColor Green

    # Récupération de la version de PostgreSQL
    $query = "SELECT version();"
    $command = New-Object System.Data.Odbc.OdbcCommand($query, $connection)
    $reader = $command.ExecuteReader()

    # Affichage du résultat
    while ($reader.Read()) {
        Write-Host "Version de PostgreSQL : " $reader[0]
    }

    # Fermeture de la connexion
    $reader.Close()
    $connection.Close()
}
catch {
    Write-Host "Erreur lors de la connexion ou de l'exécution de la requête : $_" -ForegroundColor Red
}
finally {
    # Même si c'est un script, on ferme la connexion pour que les ressources cotés serveur soient récupérées
    if ($connection.State -eq 'Open') {
        $connection.Close()
    }
}
```

### Explications

* **Driver={PostgreSQL Unicode}** : Spécifie le driver ODBC à utiliser. Assurez-vous que le nom correspond exactement à celui installé sur votre système.
* **Server, Port, Database, Uid, Pwd** : Remplacez par vos informations de connexion.
* **System.Data.Odbc** : Utilise la classe .NET pour les connexions ODBC.

### Configuration du DSN (optionnel)

Si vous préférez utiliser un DSN, configurez-le via l'outil "ODBC Data Source Administrator" (version 32 ou 64 bits), puis remplacez la chaîne de connexion par :

```powershell
$connectionString = "DSN=nom_de_votre_dsn;Uid=$username;Pwd=$password;"
```

### Remarques

* Assurez-vous que le module .NET `System.Data` est disponible (il l'est par défaut sous Windows).
* Pour tester, exécutez le script dans une session PowerShell avec les droits nécessaires.

## Accès avec Npgsql

Voici un exemple complet d’utilisation de **Npgsql** avec **PowerShell** pour interagir avec une base de données PostgreSQL, incluant l’installation de la bibliothèque.

### Prérequis

* PowerShell >= 7.0+
* Driver Npgsql et toute ses dépendances.

### Installation de Npgsql

Pour utiliser Npgsql dans PowerShell, il faut d’abord installer le package NuGet. Celui-ci n'est pas disponible pour PowerShell directement, 
quelques manipulations supplémentaires vont être nécessaire.

#### Méthode 1 : Creation d'un projet Dotnet

Je vous ai préparé un dépôt contenant un projet minimal, pour la génération et le test de la librairie.

::: warning

Pour pouvoir compiler le projet il faut que vous ayez installer le SDK dotnet, pour cela utiliser winget dans un terminal.

La commande ci-dessous installera la version 8.0 de dotnet

```shell
winget install --id Microsoft.DotNet.SDK.8 -e
```
:::

```shell
git clone https://github.com/5432-fr/powershell-npgsql.git
```

puis executer les commandes suivantes

```shell
dotnet restore
dotnet build
dotnet publish -c Release --sc true -o .\build
Compress-Archive -Path .\build\*.dll -DestinationPath .\PowerShell-Npgsql-9.0.4.zip
```

Tous le nécessaire est disponible dans le fichier ZIP `PowerShell-Npgsql-9.0.4.zip`


#### Méthode 2 : Téléchargement fichier ZIp

La méthode 1 nécessite quelques connaissances en programmation Dotnet, 
je vous ai donc préparé un fichier ZIP disponible à cette [adresse](https://github.com/5432-fr/powershell-npgsql/releases)

### Exemple d’utilisation de Npgsql avec PowerShell

Voici un script PowerShell qui se connecte à une base PostgreSQL, exécute une requête et affiche les résultats :

```powershell
# Charger l'assembly Npgsql
Add-Type -Path "C:\Chemin\Vers\Npgsql.dll"  # Remplacez par le chemin réel

# Paramètres de connexion
$connectionString = "Host=localhost;Username=postgres;Password=votre_mot_de_passe;Database=nom_de_votre_base"

# Créer et ouvrir la connexion
$connection = New-Object Npgsql.NpgsqlConnection($connectionString)
$connection.Open()

# Créer une commande SQL
$command = $connection.CreateCommand()
$command.CommandText = "SELECT version();"

# Exécuter la commande et récupérer les résultats
$reader = $command.ExecuteReader()

# Afficher les résultats
while ($reader.Read()) {
    Write-Host "Version de PostgreSQL : " $reader[0]
}

# Fermer la connexion
$reader.Close()
if ($connection.State -eq 'Open') {
    $connection.Close()
}
```

### Exemple complet avec gestion des erreurs

```powershell
try {
    Add-Type -Path "C:\Chemin\Vers\Npgsql.dll"

    $connectionString = "Host=localhost;Username=postgres;Password=votre_mot_de_passe;Database=nom_de_votre_base"
    $connection = New-Object Npgsql.NpgsqlConnection($connectionString)
    $connection.Open()

    $command = $connection.CreateCommand()
    $command.CommandText = "SELECT version();"

    $reader = $command.ExecuteReader()

    while ($reader.Read()) {
        Write-Host "Version de PostgreSQL : " $reader[0]
    }

    $reader.Close()
    $connection.Close()
}
catch {
    Write-Error "Une erreur est survenue : $_"
}
finally {
    if ($connection.State -eq 'Open') {
        $connection.Close()
    }
}
```

### Remarques importantes

* Remplacez `Host`, `Username`, `Password` et `Database` par vos propres valeurs.
* Si vous utilisez PowerShell 7+, vous pouvez aussi installer Npgsql via `dotnet add package Npgsql` dans un projet .NET et référencer la DLL générée.


## Affichage d'une fenêtre de saisie

Si l'on souhaite afficher une fenêtre demandant de saisir un login et un mot de passe avant d'établir la connexion, 
nous pouvons utiliser les Windows Forms

```powershell
# Chargement de Windows Forms 
Add-Type -AssemblyName System.Windows.Forms

# Création du formulaire
$form = New-Object System.Windows.Forms.Form
$form.Text = "Authentification"
$form.Size = New-Object System.Drawing.Size(300,200)
$form.StartPosition = "CenterScreen"

# Label et TextBox pour le login
$labelLogin = New-Object System.Windows.Forms.Label
$labelLogin.Location = New-Object System.Drawing.Point(10,20)
$labelLogin.Size = New-Object System.Drawing.Size(80,20)
$labelLogin.Text = "Login :"
$form.Controls.Add($labelLogin)

$textBoxLogin = New-Object System.Windows.Forms.TextBox
$textBoxLogin.Location = New-Object System.Drawing.Point(100,20)
$textBoxLogin.Size = New-Object System.Drawing.Size(150,20)
$form.Controls.Add($textBoxLogin)

# Label et TextBox pour le mot de passe
$labelPass = New-Object System.Windows.Forms.Label
$labelPass.Location = New-Object System.Drawing.Point(10,50)
$labelPass.Size = New-Object System.Drawing.Size(80,20)
$labelPass.Text = "Mot de passe :"
$form.Controls.Add($labelPass)

$textBoxPass = New-Object System.Windows.Forms.TextBox
$textBoxPass.Location = New-Object System.Drawing.Point(100,50)
$textBoxPass.Size = New-Object System.Drawing.Size(150,20)
$textBoxPass.PasswordChar = "*"
$form.Controls.Add($textBoxPass)

# Bouton de validation
$buttonOK = New-Object System.Windows.Forms.Button
$buttonOK.Location = New-Object System.Drawing.Point(100,90)
$buttonOK.Size = New-Object System.Drawing.Size(75,23)
$buttonOK.Text = "OK"
$buttonOK.DialogResult = [System.Windows.Forms.DialogResult]::OK
$form.AcceptButton = $buttonOK
$form.Controls.Add($buttonOK)

# Affichage du formulaire
$result = $form.ShowDialog()

# Récupération des valeurs saisies
if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
    $login = $textBoxLogin.Text
    $password = $textBoxPass.Text
    Write-Host "Login : $login"
    Write-Host "Mot de passe : $password"
}
```

**Explications :**

* Ce script crée une fenêtre avec deux champs (login et mot de passe).
* Le champ mot de passe masque les caractères saisis.
* Le bouton "OK" valide la saisie et affiche les valeurs dans la console PowerShell.

## Affichage des données

Pour afficher les données, nous avons la possibilité d'utiliser le composant `DataGridView` de `Windows.Forms` 
Ci dessous le script permet de créer une fenêtre contenant un tableau modifiable, idéal pour visualiser et éditer des données.

```powershell
Add-Type -AssemblyName System.Windows.Forms

# Création du formulaire
$form = New-Object System.Windows.Forms.Form
$form.Text = "Tableau de données"
$form.Size = New-Object System.Drawing.Size(600, 400)
$form.StartPosition = "CenterScreen"

# Création du DataGridView
$dataGridView = New-Object System.Windows.Forms.DataGridView
$dataGridView.Location = New-Object System.Drawing.Point(10, 10)
$dataGridView.Size = New-Object System.Drawing.Size(560, 300)
$dataGridView.AutoSizeColumnsMode = [System.Windows.Forms.DataGridViewAutoSizeColumnsMode]::Fill
$form.Controls.Add($dataGridView)

# Exemple de données
$data = @(
    [PSCustomObject]@{ Nom = "Alice"; Âge = 30; Ville = "Paris" },
    [PSCustomObject]@{ Nom = "Bob"; Âge = 25; Ville = "Lyon" },
    [PSCustomObject]@{ Nom = "Charlie"; Âge = 35; Ville = "Marseille" }
)

# Ajout des données au DataGridView
$dataGridView.DataSource = $data

# Bouton de fermeture
$buttonClose = New-Object System.Windows.Forms.Button
$buttonClose.Location = New-Object System.Drawing.Point(250, 330)
$buttonClose.Size = New-Object System.Drawing.Size(100, 30)
$buttonClose.Text = "Fermer"
$buttonClose.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
$form.CancelButton = $buttonClose
$form.Controls.Add($buttonClose)

# Affichage du formulaire
$form.ShowDialog()
```

**Explications :**

* Ce script crée une fenêtre avec un contrôle `DataGridView`.
* Les données sont définies sous forme de tableau d’objets PowerShell.
* Le tableau est automatiquement rempli et les colonnes s’adaptent à la taille de la fenêtre.
* Les données directement dans la table sont modifiables.

**Personnalisation :**

* Remplace `$data` par les données récupérés.
* Tu peux ajouter des colonnes, changer les titres, ou ajouter des boutons pour exporter les données.

## Sécurisation

Il n'est pas conseillé de stocker les identifiants en clair dans les scripts, nous pouvons soit:

* Demander les identifiants à l'utilisateur lors du lancement du script
* Récupérer les informations dans le fichier `pgpass`

### Méthode interactive

Lors de l'exécution d'un script, la fonction 
[Get-Credential](https://learn.microsoft.com/fr-fr/powershell/module/microsoft.powershell.security/get-credential?view=powershell-7.5 "PowerShell Get-Credential") 
permet de demander un identifiant et mot de passe à l'utilisateur.

```powershell
# Demander les identifiants à l'utilisateur
$credential = Get-Credential -Message "Veuillez entrer vos identifiants PostgreSQL"

# Paramètres de connexion
$server = "localhost"  # ou l'adresse IP/nom du serveur
$port = "5432"        # port par défaut de PostgreSQL
$database = "nom_de_ta_base"  # remplace par le nom de ta base

# Créer la chaîne de connexion
$connectionString = "Server=$server;Port=$port;Database=$database;UserId=$($credential.UserName);Password=$($credential.GetNetworkCredential().Password);"
```

### Méthode automatique

Pour la méthode automatique, il est préférable d'utiliser des solutions qui ont fait leurs preuves

PostgreSQL possèdent un fichier spécial (pgpass) qui permet de stocker les informations de connexions aux différentes serveurs bases de données

::: tip
Sous windows ce fichier est stocké dans le dossier utilisateur APPDATA sous le chemin `%APPDATA%\postgresql\pgpass.conf`

il s'agit d'un fichier dont le séparateur entre les champs est le `:` et les colonnes suivantes

* Nom hôte ou IP
* Port d'écoute
* base de données
* Nom d'utilisateur
* Mot de passe
:::

Un exemple de fichier `pgpass.conf`

```ini [pgpass.conf]
# Première connexion
localhost:5432:postgres:demo:demo1234
```

::: warning Avertissement
Si vous lancez le script avec un autre utilisateur, il faudra que le fichier `pgpass` se trouve dans son `APPDATA`
:::

Pour l'utiliser dans vos scripts, laisser le mot de passe vide
