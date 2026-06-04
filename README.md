# Learning Chinese App 学中文

Application web complète pour apprendre la langue chinoise — leçons, vocabulaire, quiz, et suivi de progression. Interface multilingue (français / anglais / arabe).

> Données stockées en mémoire (mock) : aucune base de données nécessaire pour démarrer.

## Stack

- **Frontend** : Angular 17 (composants standalone, signals, lazy routes)
- **Backend** : Node.js + Express (JWT, bcrypt, mock data en mémoire)
- **i18n** : FR / EN / AR avec support RTL automatique

## Structure du projet

```
learning-chinese-app/
├── backend/
│   ├── controllers/   # logique métier
│   ├── data/          # mock data (users, lessons, vocabulary, quizzes, progress)
│   ├── middleware/    # auth JWT
│   ├── routes/        # endpoints REST
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # navbar
│   │   │   ├── pages/        # home, login, register, dashboard, lessons, lesson-detail, vocabulary, quiz, profile, admin
│   │   │   ├── services/     # auth, lesson, vocabulary, quiz, progress, admin, i18n, interceptor
│   │   │   ├── guards/       # authGuard, adminGuard
│   │   │   ├── pipes/        # t (translate), localized
│   │   │   ├── models/       # types TS
│   │   │   ├── assets-inline/translations.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

## Installation et lancement

### Prérequis
- Node.js 18+
- npm

### 1) Backend

```bash
cd backend
npm install
npm start
```
API disponible sur `http://localhost:5000`. Endpoint santé : `GET /api/health`.

### 2) Frontend

Ouvrir un **second terminal** :

```bash
cd frontend
npm install
npm start
```
Application disponible sur `http://localhost:4200`.

## Comptes de test

Tous les comptes utilisent le mot de passe : **`password123`**

| Email                  | Rôle  | Langue | Niveau         |
|------------------------|-------|--------|----------------|
| admin@chinese.app      | admin | fr     | advanced       |
| khalil@chinese.app     | user  | fr     | beginner       |
| sara@chinese.app       | user  | ar     | intermediate   |
| john@chinese.app       | user  | en     | beginner       |

## Fonctionnalités

### Authentification
- Inscription, connexion, déconnexion (JWT)
- Mise à jour du profil (nom, langue d'interface, niveau)
- Choix de la langue : FR / EN / AR

### Tableau de bord
- Progression globale (pourcentage de leçons terminées)
- Score moyen des quiz passés
- Niveau actuel
- Dernière leçon consultée
- Recommandation de la prochaine leçon

### Modules de cours
- Leçons par niveau (beginner / intermediate / advanced) et catégorie
- Chaque leçon contient : titre, description, mots chinois, pinyin, traduction multilingue, exemple de phrase, audio (lien optionnel)
- Bouton "Marquer comme terminée"

### Vocabulaire
- Liste complète avec recherche
- Filtres par catégorie : greetings, family, food, travel, numbers, time
- Affichage : caractère chinois, pinyin, traduction, exemple

### Quiz
- QCM avec correction automatique
- Sauvegarde du score dans la progression utilisateur
- Affichage du résultat avec pourcentage

### Administration (rôle `admin`)
- Stats globales (utilisateurs, leçons, mots, tentatives de quiz)
- Liste des utilisateurs
- Suppression de leçons / mots de vocabulaire

## Routes API

### Authentification
- `POST /api/auth/register` — `{ name, email, password, language }`
- `POST /api/auth/login` — `{ email, password }`
- `GET  /api/auth/me` *(auth)*
- `PUT  /api/auth/me` *(auth)* — `{ name?, language?, level? }`
- `POST /api/auth/logout`

### Leçons
- `GET    /api/lessons?level=&category=&q=`
- `GET    /api/lessons/:id`
- `POST   /api/lessons` *(admin)*
- `PUT    /api/lessons/:id` *(admin)*
- `DELETE /api/lessons/:id` *(admin)*

### Vocabulaire
- `GET    /api/vocabulary?category=&q=`
- `GET    /api/vocabulary/categories`
- `POST/PUT/DELETE /api/vocabulary[/:id]` *(admin)*

### Quiz
- `GET  /api/quizzes`
- `GET  /api/quizzes/:id`
- `GET  /api/quizzes/by-lesson/:lessonId`
- `POST /api/quizzes/:id/submit` *(auth)* — `{ answers: number[] }`

### Progression
- `GET  /api/progress` *(auth)*
- `POST /api/progress/complete/:lessonId` *(auth)*

### Admin
- `GET /api/admin/users` *(admin)*
- `GET /api/admin/stats` *(admin)*

## Modèles de données (mock)

Les "modèles" sont des objets JS en mémoire (modules dans `backend/data/`) qui exposent les méthodes `list / findById / add / update / remove`. Cela imite l'API d'un ORM/ODM (Mongoose, Sequelize…) pour faciliter le remplacement futur par MongoDB ou MySQL.

Pour brancher MongoDB plus tard :
1. `npm install mongoose` dans `backend`
2. Remplacer chaque fichier de `backend/data/*` par un schéma Mongoose équivalent
3. Aucun changement nécessaire dans les controllers / routes — l'interface reste la même.

## Données d'exemple

L'application est livrée avec :
- **4 utilisateurs** (1 admin, 3 users multilingues)
- **6 leçons** réparties en 3 niveaux : salutations, famille, chiffres, nourriture, voyage, météo
- **18 mots de vocabulaire** dans 6 catégories
- **3 quiz** prêts à passer
- **Progression pré-remplie** pour les utilisateurs sara@ et khalil@


## Étapes par étape (résumé)

1. **`cd backend && npm install && npm start`** — démarre l'API sur :5000
2. **`cd frontend && npm install && npm start`** — démarre l'app Angular sur :4200
3. Ouvrir `http://localhost:4200`
4. Se connecter avec `admin@chinese.app` / `password123`
5. Explorer le dashboard, les leçons, le vocabulaire, passer un quiz
6. Pour les fonctions admin, utiliser le compte admin (lien "Admin" dans la navbar)
7. Changer la langue via le menu déroulant en haut à droite (FR / EN / AR)

## Notes

- Les données ne sont **pas persistées** : un redémarrage du backend remet tout à l'état initial (sauf nouvelle progression écrite à l'exécution).
- Pour activer la persistance, brancher MongoDB ou MySQL en remplaçant les modules `backend/data/*.js`.
