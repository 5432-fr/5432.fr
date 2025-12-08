---
title: Programmation PostgreSQL en langage C# et la bibliothèque Npgsql
description: Programmation PostgreSQL avec le langage C# en utilisant la Npgsql 
head:
  - - meta
    - name: 'keyword'
      content: postgresql c# csharp npgsql entity framework
    - name: 'author'
      content: Christophe CHAUVET
    - name: 'copyright'
      content: CC BY-SA 4.0
    - property: 'og:title'
      content: "Programmation langage C#"
    - property: 'og:description'
      content: " Programmation PostgreSQL en langage C#"
    - property: 'og:type'
      content: "article"
    - property: 'twitter:title'
      content: "Programmation PostgreSQL en langage C#"
    - property: 'twitter:description'
      content: "Programmation PostgreSQL avec le langage C#"
---

# Programmation PostgreSQL en langage C#

## Introduction à l’utilisation de PostgreSQL avec C#

PostgreSQL est un système de gestion de base de données relationnelle (SGBDR) open source, puissant et extensible. 

Pour interagir avec PostgreSQL en C#, deux approches principales sont couramment utilisées :
- **Npgsql** : Un pilote ADO.NET natif pour PostgreSQL, idéal pour des requêtes SQL directes et un contrôle fin.
- **Entity Framework Core** : Un ORM (Object-Relational Mapper) qui simplifie la manipulation des données en utilisant des objets C#.

## Utilisation de Npgsql (Pilote natif)

### Installation

Ajoutez le package NuGet **Npgsql** à votre projet:

```bash
dotnet add package Npgsql
```

### Connexion à la base de données

```csharp
using Npgsql;

string connectionString = "Host=localhost;Username=postgres;Password=monmotdepasse;Database=mabasededonnees";
using var connection = new NpgsqlConnection(connectionString);
connection.Open();
```

::: tip
Dans les exemples j'ai utilisé la forme courte de `using var`introduite à partir de 
[C# 8.0](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/statements/using)
pour simplifier la gestion des ressources qui implémentent `IDisposable`.

Si vous ne l'utilisez par encore elle se substitue à l'ancienne syntaxe suivante:

```csharp
using (var connection = new NpgsqlConnection(connectionString))
{
    connection.Open();
    // Code utilisant connection
} // connection est automatiquement "disposé" (fermé/libéré) ici

```

Pour plus de lisibilité dans les exemples suivants j'utiliserais également la nouvelle syntaxe,
et dans la mesure du possible je vous mettrais aussi l'ancienne syntaxe.
:::


### Exécution de requêtes SQL

#### Requête SELECT

::: code-group

```csharp [C# nouvelle syntaxe]
using var command = new NpgsqlCommand("SELECT * FROM clients WHERE id = @id", connection);
command.Parameters.AddWithValue("@id", 1);
using var reader = command.ExecuteReader();
while (reader.Read())
{
    Console.WriteLine(reader["nom"]);
}
```

```csharp [C# ancienne syntaxe]
using (var command = new NpgsqlCommand("SELECT * FROM clients WHERE id = @id", connection))
{
    command.Parameters.AddWithValue("@id", 1);
    using (var reader = command.ExecuteReader())
    {
        while (reader.Read())
        {
            Console.WriteLine(reader["nom"]);
        }
    }
}
```

:::

#### Requête INSERT/UPDATE/DELETE

::: code-group

```csharp [C# nouvelle syntaxe]
using var command = new NpgsqlCommand("INSERT INTO clients (nom, email) VALUES (@nom, @email)", connection);
command.Parameters.AddWithValue("@nom", "John Doe");
command.Parameters.AddWithValue("@email", "john.doe@example.com");
int rowsAffected = command.ExecuteNonQuery();
```

```csharp [C# ancienne syntaxe]
using (var command = new NpgsqlCommand("INSERT INTO clients (nom, email) VALUES (@nom, @email)", connection))
{
    command.Parameters.AddWithValue("@nom", "John Doe");
    command.Parameters.AddWithValue("@email", "john.doe@example.com");
    int rowsAffected = command.ExecuteNonQuery();
}
```

:::

### Transactions

::: code-group

```csharp [C# nouvelle syntaxe]
using var transaction = connection.BeginTransaction();
try
{
    // Exécutez vos requêtes ici
    transaction.Commit();
}
catch
{
    transaction.Rollback();
}
```

```csharp [C# ancienne syntaxe]
using (var transaction = connection.BeginTransaction())
{
    try
    {
        // Exécutez vos requêtes ici
        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
    }
}
```

:::

## Utilisation de Entity Framework Core (ORM)

### Installation

Ajoutez les packages NuGet suivants:

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Configuration du contexte de base de données

Créez une classe `AppDbContext` qui hérite de `DbContext`:

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Client> Clients { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Username=postgres;Password=monmotdepasse;Database=mabasededonnees");
    }
}

public class Client
{
    public int Id { get; set; }
    public string Nom { get; set; }
    public string Email { get; set; }
}
```

### Migration et création de la base de données

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Opérations CRUD avec Entity Framework

#### Ajouter un enregistrement

::: code-group

```csharp [C# nouvelle syntaxe]
using var context = new AppDbContext();
var client = new Client { Nom = "John doe", Email = "john.doe@example.com" };
context.Clients.Add(client);
context.SaveChanges();
```

```csharp [C# ancienne syntaxe]
using (var context = new AppDbContext())
{
    var client = new Client { Nom = "John doe", Email = "john.doe@example.com" };
    context.Clients.Add(client);
    context.SaveChanges();
}
```

:::

#### Lire des enregistrements

```csharp
var clients = context.Clients.Where(c => c.Nom.Contains("Doe")).ToList();
foreach (var c in clients)
{
    Console.WriteLine($"{c.Nom} - {c.Email}");
}
```

#### Mettre à jour un enregistrement

```csharp
var client = context.Clients.FirstOrDefault(c => c.Id == 1);
if (client != null)
{
    client.Email = "nouvel.email@example.com";
    context.SaveChanges();
}
```

#### Supprimer un enregistrement

```csharp
var client = context.Clients.FirstOrDefault(c => c.Id == 1);
if (client != null)
{
    context.Clients.Remove(client);
    context.SaveChanges();
}
```

## Comparaison : Npgsql vs Entity Framework Core

| **Critère**        | **Npgsql**                          | **Entity Framework Core**                |
|--------------------|-------------------------------------|------------------------------------------|
| **Contrôle**       | Requêtes SQL directes, contrôle fin | Abstraction via ORM, moins de contrôle   |
| **Productivité**   | Plus de code manuel                 | Moins de code, plus rapide à développer  |
| **Performance**    | Optimisé pour des requêtes complexes| Peut générer des requêtes moins optimales|
| **Maintenance**    | Plus complexe à maintenir           | Plus facile à maintenir                  |

## Bonnes pratiques

- **Sécurité** : Utilisez toujours des paramètres pour éviter les injections SQL.
- **Performance** : Avec Entity Framework, évitez le `ToList()` inutile et utilisez `AsNoTracking()` pour les lectures seules.
- **Transactions** : Utilisez des transactions pour garantir l’intégrité des données.


## Conclusion

- **Npgsql** est idéal pour des applications nécessitant un contrôle fin sur les requêtes SQL ou des optimisations spécifiques.
- **Entity Framework Core** est parfait pour des applications où la productivité et la maintenance sont prioritaires.
