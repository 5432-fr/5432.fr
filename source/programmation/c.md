---
title: Programmation PostgreSQL en langage C et la bibliothèque libpq
description: Programmation PostgreSQL avec le langage C en utilisant la libpq et ecpg
head:
  - - meta
    - name: 'keywords'
      content: 'postgresql, c, gcc, libpq, pqexec, ecpg'
  - - meta
    - name: 'author'
      content: Christophe Chauvet
  - - meta
    - name: 'copyright'
      content: CC BY-SA 4.0
  - - meta
    - property: 'og:title'
      content: "Programmation langage C"
  - - meta
    - property: 'og:description'
      content: " Programmation PostgreSQL en langage C"
  - - meta
    - property: 'og:type'
      content: "article"
  - - meta
    - property: 'twitter:title'
      content: "Programmation PostgreSQL en langage C"
  - - meta
    - property: 'twitter:description'
      content: "Programmation PostgreSQL avec le langage C"
---

# Langage C {#langage_c}

PostgreSQL étant écrit en **C**, il existe par conséquent une bibliothèque native qui se nomme
[libpq](https://docs.postgresql.fr/current/libpq.html)

## Bibliothèque libpq {#language_c_libpq}

La bibliothèque pour le language C se nomme
[libpq](https://docs.postgresql.fr/current/libpq.html) .

D\'autres langages de programmation on également leur bibliothèque mais
les principales s\'appuie sur la libpq via des wrappers

Pour commencer à travailler avec libpq dans votre programme C, vous
devez importer les bibliothèques nécessaires.

Ouvrez votre fichier de programme C et incluez les bibliothèques
suivantes en haut du fichier

``` C
#include <stdio.h>
#include <stdlib.h>
#include <libpq-fe.h>
```

### Etablir une connexion

Pour établir une connexion à la base de données PostgreSQL à l\'aide de
libpq, nous utiliserons la fonction PQconnectdb().

Cette fonction ouvre une nouvelle connexion à la base de données en
fonction des paramètres fournis dans la chaîne **conninfo**.

La chaîne **conninfo** contient un ou plusieurs paramètres au format
**keyword=value**, séparés par des espaces. Vous pouvez utiliser des
paramètres par défaut en transmettant une chaîne vide ou spécifier des
paramètres personnalisés selon vos besoins.

Pour inclure une valeur nulle ou une valeur avec des espaces, placez-la
entre guillemets simples (keyword=\'value\'). Si nécessaire, échappez
les guillemets simples dans la valeur à l\'aide d\'une barre oblique
inverse (\'). Les espaces autour du signe égal sont facultatifs.

Il est important de noter que la fonction PQconnectdb() renvoie toujours
un pointeur d\'objet PGconn non nul, sauf si la mémoire est insuffisante
pour allouer l\'objet.

Pendant le processus de connexion, vous pouvez vérifier l\'état de la
connexion à l\'aide de la fonction PQstatus(). 

Si l\'état est **CONNECTION_BAD**, la procédure de connexion a échoué. 

A l\'inverse, si le statut est **CONNECTION_OK**, la connexion est prête.

Pour fermer correctement la connexion et libérer la mémoire utilisée par
l\'objet PGconn, appelez la fonction [PQfinish()](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PQFINISH).

Même si la tentative de connexion au backend échoue (comme indiqué par
PQstatus), il est essentiel d\'appeler [PQfinish()](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PQFINISH)
pour libérer la mémoire allouée. Après avoir appelé [PQfinish()](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PQFINISH),
le pointeur **PGconn** ne doit plus être utilisé.

Ci-dessous un exemple de programme qui se connect au serveur de base de
données, et affiche les informations de connexions

``` c
#include <stdio.h>
#include <stdlib.h>
#include <libpq-fe.h>

int main(int argc, char *argv[]) {
   printf("Tuto utilisation de la libpq \n");

   // Connexion à la base de données
   // la chaine conninfo contient les mots clés et les valeurs séparés par des espaces.
   char *conninfo = "dbname=votre_nom_db user=utilisateur password=mot_de_passe host=localhost port=5432";

   // Creation de la connexion
   PGconn *conn = PQconnectdb(conninfo);

   // Vérification si la connexion s'est faite correctement
   if (PQstatus(conn) != CONNECTION_OK) {
      // Si echec de connxion, nous imprimons les messages d'erreur et liberont les ressources
      printf("Erreur lors de la connexion au serveur de base de données: %s\n", PQerrorMessage(conn));

      // On ferme la connexion
      PQfinish(conn);

      // On sort du programme avec un code 1 pour indiquer une erreur
      exit(1);
   }

   // La connexion a été établie avec succès, nous affichons les informations du serveur de base de données
   printf("Connection établie\n");
   printf("Port: %s\n", PQport(conn));
   printf("Hote: %s\n", PQhost(conn));
   printf("Nom de la DB: %s\n", PQdb(conn));

   // Fermeture de la connexion et libération de la mémoire
   PQfinish(conn);

   return 0;
}
```

Dans ce code, remplacez votre_nom_dn, utilisateur et mot_de_passe par
les valeurs appropriées pour votre configuration PostgreSQL. Le
programme imprime les détails de la connexion, tels que le port, l\'hôte
et le nom de la base de données, pour confirmer la connexion réussie.

Enfin, la connexion est fermée à l\'aide de [PQfinish()](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PQFINISH)
pour libérer la mémoire allouée à l\'objet PGconn.

### Executer une requête SQL

Une fois la connexion à la base de données établie, nous pouvons
procéder à l\'exécution des requêtes à l\'aide de libpq.

La fonction principale que nous utiliserons pour l\'exécution des
requêtes est [PQexec()](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-EXEC-MAIN).

La fonction [PQexec()](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-EXEC-MAIN)
est utilisée pour soumettre une requête à PostgreSQL et attendre le résultat.

Elle renvoie un pointeur PGresult, qui encapsule le résultat de la requête renvoyé par le backend de la base de données.

Dans la plupart des cas, un pointeur non nul est renvoyé, sauf dans des
situations telles que des conditions de manque de mémoire ou des erreurs
critiques empêchant l\'envoi de la requête au backend.

Si un pointeur nul est renvoyé, il doit être traité comme un résultat **PGRES_FATAL_ERROR**. 

Pour obtenir plus d\'informations sur l\'erreur, vous pouvez utiliser la fonction
[PQerrorMessage()](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-PQRESULTERRORMESSAGE).

La structure PGresult doit être conservée comme une abstraction lors de
l\'utilisation du résultat de la requête. Il est recommandé d\'utiliser
des fonctions d\'accès au lieu de référencer directement les champs de
la structure **PGresult**, car les champs peuvent changer dans les
futures versions de libpq.

Après avoir exécuté une requête à l\'aide de [PQexec()](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-EXEC-MAIN),
vous pouvez vérifier l\'état du résultat à l\'aide de PQresultStatus().

Les états de résultat possibles incluent:

- **PGRES_EMPTY_QUERY**: la chaîne de requête envoyée par le backend était vide.
- **PGRES_COMMAND_OK**: la commande s\'est terminée avec succès, mais aucune donnée n\'a été renvoyée.
- **PGRES_TUPLES_OK**: la requête s\'est exécutée avec succès et a renvoyé des tuples (lignes).
- **PGRES_COPY_OUT**: le transfert de données (copie sortante) depuis le serveur a commencé.
- **PGRES_COPY_IN**: le transfert de données (copie entrante) vers le serveur a commencé.
- **PGRES_BAD_RESPONSE**: la réponse du serveur n\'a pas été comprise.
- **PGRES_NONFATAL_ERROR**: une erreur non fatale s\'est produite lors de l\'exécution de la requête.
- **PGRES_FATAL_ERROR**: une erreur fatale s\'est produite lors de l\'exécution de la requête.

Si le statut du résultat de la requête est **PGRES_TUPLES_OK**, vous pouvez utiliser 
diverses fonctions pour récupérer des informations sur les tuples renvoyés.

Voici quelques fonctions utiles:

- **PQntuples()** : renvoie le nombre de tuples (lignes) dans le résultat de la requête.
- **PQnfields()** : renvoie le nombre de champs (attributs) dans chaque tuple du résultat de la requête.
- **PQfname()** : renvoie le nom du champ (attribut) associé à l\'index de champ donné. Les indices de champ commencent à 0.
- **PQftype()** : renvoie le type de champ associé à l\'index de champ donné. 
  L\'entier renvoyé représente un codage interne du type. Les indices de champ commencent à 0.
- **PQgetvalue()** : renvoie la valeur d\'un champ spécifique (attribut)
  dans un tuple du résultat de la requête. Les indices de tuple et de
  champ commencent à 0.

Ces fonctions fournissent des fonctionnalités essentielles pour
récupérer et travailler avec les résultats de la requête.

``` C
// Requête a exécuter
char *query = "SELECT * FROM ma_table";

// Envoyer la requête et récupérer les résultats
PGresult *res = PQexec(conn, query);

// Vérifier l'état de résultat de la requête
ExecStatusType resStatus = PQresultStatus(res);

// Convertir l'état en message texte et 'l'afficher
printf("Etat requete: %s\n", PQresStatus(resStatus));
```

Vérification de ce que retourne la requête

``` c
if (resStatus != PGRES_TUPLES_OK) {
    //Si on ne récupère pas de ligne, on affiche et un message et on termine la connexion
    printf("Erreur lors de l'execution de la requête: %s\n", PQerrorMessage(conn));

    PQclear(res);

    PQfinish(conn);

    exit(1);
}

// On recupère des données, on affiche un message
printf("Requête exécutée avec succès\n");
```

Ensuite on affiche le résultat sur la console.

``` c
// On récupère le nombre de lignes et de colonne
int rows = PQntuples(res);
int cols = PQnfields(res);
printf("Nombre de lignes: %d\n", rows);
printf("Nombre de colonnes: %d\n", cols);

// On affiche les noms de colonnes
for (int i = 0; i < cols; i++) {
    printf("%s\t", PQfname(res, i));
}
printf("\n");

// On affiche le contenue des lignes
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        printf("%s\t", PQgetvalue(res, i, j));
    }
    printf("\n");
}
```

On n\'oublie pas de liberer les ressources et de fermer la connexion

``` c
PQclear(res);

PQfinish(conn);

return 0;
```

Pour compiler et exécuter votre code, suivez les étapes ci-dessou:

1.  Assurez-vous que le répertoire bin de PostgreSQL est inclus dans le
    chemin de vos variables d\'environnement. Cela permet au compilateur
    de localiser les bibliothèques et exécutables PostgreSQL
    nécessaires.
2.  Ouvrez le terminal ou l\'invite de commande et accédez au répertoire
    où se trouve votre fichier C.
3.  Utilisez la commande suivante pour compiler votre code:

``` shell
gcc monprogramme.c -o monprogramme -I "path/to/postgres/include" -L "path/to/postgres/lib" -lpq
```

Si la compilation s\'est déroulé correctement, vous devriez avoir un
executable **monprogramme** dans votre dossier

Que vous pourrez lancer comme ceci:

``` shell
./monprogramme
```

Pour plus de maintenabilité, vous pourrez privilégié la creation d\'un fichier [Makefile](https://fr.wikipedia.org/wiki/Make).

## Bibiothèque ECPG

[ECPG](https://www.postgresql.org/docs/current/app-ecpg.html) est un préprocesseur, qui vous permet d\'embarquer du SQL
directement dans votre programme en C

Vos fichiers C embarquant du SQL auront pour extension **pgc**.

Chaque instructions utilisants du SQL commencera par **EXEC SQL**.

Lors de la compilation, les fichiers ayant l\'extension pgc seront
traduit en fichier C et seront ensuite compilés

Ci-dessous un exemple tiré de la documentation utilisant de multiples
connexions

``` c
#include <stdio.h>

EXEC SQL BEGIN DECLARE SECTION;
    char nomdb[1024];
EXEC SQL END DECLARE SECTION;

int
main()
{
    EXEC SQL CONNECT TO basetest1 AS con1 USER utilisateurtest;
    EXEC SQL SELECT pg_catalog.set_config('search_path', '', false); EXEC SQL COMMIT;
    EXEC SQL CONNECT TO basetest2 AS con2 USER utilisateurtest;
    EXEC SQL SELECT pg_catalog.set_config('search_path', '', false); EXEC SQL COMMIT;
    EXEC SQL CONNECT TO basetest3 AS con3 USER utilisateurtest;
    EXEC SQL SELECT pg_catalog.set_config('search_path', '', false); EXEC SQL COMMIT;

    /* Cette requête serait exécuté dans la dernière base ouverte "basetest3". */
    EXEC SQL SELECT current_database() INTO :nomdb;
    printf("courante=%s (devrait être basetest3)\n", nomdb);

    /* Utiliser "AT" pour exécuter une requête dans "basetest2" */
    EXEC SQL AT con2 SELECT current_database() INTO :nomdb;
    printf("courante=%s (devrait être basetest2)\n", nomdb);

    /* Basculer la connexion courante à "basetest1". */
    EXEC SQL SET CONNECTION con1;

    EXEC SQL SELECT current_database() INTO :nomdb;
    printf("courante=%s (devrait être basetest1)\n", nomdb);

    EXEC SQL DISCONNECT ALL;
    return 0;
}
```


