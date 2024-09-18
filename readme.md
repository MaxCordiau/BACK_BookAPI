# BookApi
**Lien Utile :**
front de l'application: https://github.com/MaxCordiau/FRONT_BookAPI



|**Introduction**|
|:---:|
Dans ce cours, nous allons apprendre à concevoir un back office en utilisant une architecture API REST avec Node.js, Express, MySQL et Sequelize. Nous allons construire un mini-projet de gestion de bibliothèque pour illustrer les concepts clés.

## Projet : Système de gestion de bibliothèque
Notre système permettra de :
* Gérer les livres (ajouter, lister, mettre à jour, supprimer)
* Gérer les auteurs (ajouter, lister, mettre à jour, supprimer)
* Associer des livres à des auteurs
> [!NOTE]
> # Configuration de l'environnement de travail
> test

### Installation des dépendances
Dans le terminal, vous allez entrer les commandes :

```bash
npm init -y
npm install express mysql2 sequelize dotenv
npm install --save-dev nodemon
```

### Strucrure du projet
```bash
BookAPI
├── src/
│   ├── config/
│   │   └── database.js
│   ├──models/
│   │   ├── index.js
│   │   ├── book.js
│   │   └── author.js
│   ├── controllers/
│   │   ├── bookController.js
│   │   └── authorController.js
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   └── authorRoutes.js
│   ├── middlewears/
│   │   └── errorHandler.js
│   ├── config/
│   └── app.js
├── package.json
├── .env
└── readme.md
```

### Détails de la Nomenclature

#### `src/`
C'est le répertoire principal contenant tout le code source de l'application.

#### `config/`
- **`database.js`** : Contient la configuration pour la connexion à la base de données. Il inclut les informations de connexion (via `process.env`) et la configuration Sequelize.

#### `models/`
Contient les définitions des modèles Sequelize et leurs associations.

- **`index.js`** : Fichier d'initialisation pour Sequelize. Il rassemble tous les modèles et configure les associations entre eux.
- **`book.js`** : Modèle Sequelize pour la table `Books`. Définit les champs (`title`, `description`, `isbn`, etc.) et leurs types.
- **`author.js`** : Modèle Sequelize pour la table `Authors`. Définit les champs (`name`, `birthyear`) et leurs types.

#### `controllers/`
Contient la logique métier (Business Logic) pour gérer les requêtes HTTP.

- **`bookController.js`** : Implémente les fonctions CRUD pour les livres (créer, lire, mettre à jour, supprimer des livres).
- **`authorController.js`** : Implémente les fonctions CRUD pour les auteurs, y compris la récupération des livres d'un auteur spécifique (`getAuthorBooks`).

#### `routes/`
Contient les définitions des routes Express qui mappent les requêtes HTTP aux fonctions des contrôleurs.

- **`bookRoutes.js`** : Définit les routes pour les opérations sur les livres (`/api/books`).
- **`authorRoutes.js`** : Définit les routes pour les opérations sur les auteurs (`/api/authors`), y compris les livres d'un auteur (`/api/authors/:id/books`).

#### `middlewares/`
Contient les middlewares personnalisés pour l'application.

- **`errorHandler.js`** : Middleware pour gérer les erreurs. Il capture et gère les erreurs non capturées ou génère des réponses d'erreur personnalisées.

#### `app.js`
Fichier principal où le serveur Express est initialisé, les middlewares appliqués, et les routes configurées. C'est ici que tu connectes la base de données, utilises les middlewares comme `errorHandler`, et montes les routes (`/api/books`, `/api/authors`, etc.).

#### `package.json`
Fichier de configuration npm, contenant les dépendances (comme Express, Sequelize, etc.) et les scripts pour démarrer l'application.

#### `.env`
Fichier pour stocker les variables d'environnement (comme les informations de connexion à la base de données). **Il ne doit jamais être partagé ou versionné dans un dépôt public** pour des raisons de sécurité.

#### `readme.md`
Documentation du projet, expliquant comment installer et exécuter l'application, et d'autres détails utiles pour les développeurs ou utilisateurs.


### Modèles
#### Qu'est-ce qu'un modèle ?
Un modèle dans le contexte de Sequelize représente une table dans votre base de données.  
Il définit la structure des données, les types de champs, et les relations entre différentes tables.  
Les modèles permettent d'interagir avec la base de données de manière orientée objet, sans avoir à écrire de requête SQL directement.

### Contrôleurs
#### Qu'est-ce qu'un contrôleur ?
Un contrôleur est responsable de la logique métier de votre application.  
Il reçoit les requêtes de l'utilisateur via les routes, interagit avec les modèles pour accéder ou modifier les données, et prépare la réponse à renvoyer.  
Les contrôleurs agissent comme des intermédiaires entre les routes (qui définissent les points d'entrée de l'API) et les modèles (qui représentent les données).

## Comprendre req, res et next
Dans les fonctions de contrôleur, vous rencontrerez souvent trois paramètres importants :

1. `req` (Request) :
   * Objet représentant la requête HTTP entrante
   * Contient des informations sur la requête, comme les paramètres d'URL, les en-têtes, le corps de la requête
   * Exemples : `req.params`, `req.query`, `req.body`, `req.headers`

2. `res` (Response) :
   * Objet représentant la réponse HTTP que votre serveur va envoyer
   * Fournit des méthodes pour contrôler la réponse (définir le statut, les en-têtes, envoyer des données)
   * Exemples : `res.status()`, `res.json()`, `res.send()`, `res.sendFile()`

3. `next` :
   * Fonction qui passe le contrôle au middleware suivant
   * Utilisée pour la gestion des erreurs quand appelée avec un argument
   * Exemples : `next()` (passe au middleware suivant), `next(error)` (passe à un gestionnaire d'erreurs)

### Routes
#### Qu'est-ce qu'une route ?
Les routes définissent les points d'entrée de votre API. Elles spécifient comment votre application répond à différentes requêtes HTTP (GET, POST, PUT, DELETE, CREATE, UPDATE, PATCH, ect..) sur différentes URL. Les routes agissent comme des "aiguilleurs", dirigeant les requêtes vers les contrôleurs appropriés. 

### Middlewears
#### Qu'est-ce qu'un middlewear ?
Un middleware est une fonction qui a accès aux objets de requête (req), de réponse (res), et à la fonction suivante (next) dans le cycle de requête-résponse de l'application. 
Les middlewares peuvent : 
 * Exécuter du code 
 * Apporter des modifications aux objets de requête et de réponse 
 * Terminer le cycle requête-réponse 
 * Appeler le prochain middleware dans la pile
Les middlewares sont utilisés pour des tâches telles que la journalisation, la gestion des erreurs, l'authentification, etc. 
Exemple d'un middleware : 
```js 
loggerMiddleware = (req, res, next) => { 
    console.logfl(new Date().toISOString() - ${req.method} $freq.url) 
}
app.use(loggerMiddleware) 
```
