# 🪳 HelloWorld Backend

```
                          ___
                       .-'   `'.
                      /         \
                      |         |
                      |,  .-.  ,|
                      | )(_o_)( |
                      |/  ___  \|
                      (_'/   \'_)
                       //     \\
                      / |     | \
                    _/   \   /   \_
                   / \_   `-'   _/ \
                  |   \         /   |
                   \   `-.___.-'   /
                    `-._       _.-'
                        `-----'
        Roach was here. Bugs happen. Ship it anyway.
```

## À propos

Une API REST Express/TypeScript/Postgres pour gérer des étudiants — CRUD complet, authentification JWT, gestion d'erreurs centralisée. Née d'un simple "Hello world", devenue increvable comme son mascotte.

## Stack

- 🟢 Node.js 20 + Express + TypeScript
- 🐘 PostgreSQL (via `pg`)
- 🔐 JWT + bcrypt pour l'authentification
- ⚡ `tsx` + `nodemon` pour le dev

## Lancer le projet

```bash
npm install
npm run dev
```

Configure d'abord ton `.env` (port, identifiants Postgres, `JWT_SECRET`).

## Endpoints

| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Se connecter (renvoie un JWT) |
| GET | `/students` | Liste des étudiants 🔒 |
| GET | `/students/:id` | Un étudiant 🔒 |
| POST | `/students` | Créer un étudiant 🔒 |
| PUT | `/students/:id` | Modifier (complet) 🔒 |
| PATCH | `/students/:id` | Modifier (partiel) 🔒 |
| DELETE | `/students/:id` | Supprimer 🔒 |

🔒 = nécessite un token JWT (`Authorization: Bearer <token>`)

## Architecture

MVC : `routes/` → `controllers/` → `models/`, avec une gestion d'erreurs centralisée via `ApiError` + `errorHandler`.

## Note de survie

Ce backend a survécu à :
- Un `nvm` capricieux et un `ts-node` qui refusait de coopérer (remplacé par `tsx`)
- Un `node_modules` accidentellement commité (17 Mo d'honte, nettoyés depuis)
- Des droits Postgres refusés sur la table *et* la séquence
- Un `.env` égaré dans le mauvais dossier
- Un renommage complet français → anglais, puis PascalCase → camelCase
- Un `g` en trop planqué à côté d'un `async`

Comme le cafard : ça plie, mais ça casse pas (trop).

---

*Fait avec 🪳 par Roach Killjoy.*
