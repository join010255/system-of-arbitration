# System of Arbitration

## Overview

**System of Arbitration** (package name: `referee-api`) is a REST API built with Express.js and Sequelize (PostgreSQL) for managing football match officiating. It allows an organization to register referees ("arbitres"), schedule matches, and assign referees to matches in specific officiating roles (central referee, assistant, VAR, AVAR, 4th official). The API implements JWT-based authentication and role-based access control so that only authorized users (e.g. admins or commissioners) can create, update, or delete sensitive data.

## Features

Based on the implemented code, the API currently supports:

- **User registration and login** with hashed passwords (bcrypt) and JWT issuance.
- **Role-based user accounts**: `admin`, `commissaire` (commissioner), `arbitre` (referee), `consultation` (read-only/viewer).
- **Referee ("Arbitre") management**: create, list, retrieve, update, and delete referees, including nationality, confederation, category, years of experience, and status.
- **Match management**: create, list, retrieve, update, and delete matches, including teams, stadium, host city, date, and competition phase.
- **Affectation (assignment) management**: assign a referee to a match with a specific officiating role, and list/retrieve/update/delete these assignments, including nested match and referee details.
- **Request validation** on all write operations using Zod schemas.
- **JWT authentication middleware** to protect routes.
- **Role-based authorization middleware** to restrict specific actions to specific roles.
- **Relational data modeling** between Referees, Matches, and Affectations via Sequelize associations.

## Tech Stack

- **Runtime**: Node.js (ES Modules — `"type": "module"`)
- **Framework**: [Express.js](https://expressjs.com/) 5
- **Database**: PostgreSQL
- **ORM**: [Sequelize](https://sequelize.org/) 6 (with `pg` and `pg-hstore` drivers)
- **Authentication**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT)
- **Password hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Validation**: [Zod](https://zod.dev/)
- **Configuration**: [dotenv](https://www.npmjs.com/package/dotenv)

## Project Structure

```
system-of-arbitration/
├── config/
│   └── database.js              # Sequelize instance & PostgreSQL connection config
├── controllers/
│   ├── affectation.controller.js  # CRUD logic for referee-match assignments
│   ├── arbitre.controller.js      # CRUD logic for referees
│   ├── match.controller.js        # CRUD logic for matches
│   └── user.controllers.js        # Login, registration, password change logic
├── middlewares/
│   ├── authenticate.middleware.js # Verifies JWT access token
│   ├── authorize.middleware.js    # Restricts access by user role
│   └── validate.middleware.js     # Zod-based request body validation
├── models/
│   ├── User.model.js              # User Sequelize model
│   ├── arbitre.model.js           # Arbitre (referee) Sequelize model
│   ├── match.model.js             # Match Sequelize model
│   ├── affectation.model.js       # Affectation (assignment) Sequelize model
│   └── index.js                   # Model associations
├── routes/
│   ├── affectation.routes.js      # Routes mounted at /affextaion
│   ├── arbitre.routes.js          # Routes mounted at /arbite
│   ├── match.routes.js            # Routes mounted at /match
│   └── user.routes.js             # Routes mounted at /
├── server.js                      # App entry point (Express setup + DB sync)
├── package.json
└── .gitignore
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/join010255/system-of-arbitration.git
   cd system-of-arbitration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root (see [Environment Variables](#environment-variables) below).

4. **Set up a PostgreSQL database** (see [Database Setup](#database-setup) below).

5. **Run the server**
   ```bash
   npm start
   ```

## Environment Variables

The application loads configuration from a `.env` file (via `dotenv`). Create a `.env` file in the project root with the following variables:

| Variable             | Description                                              | Used In                                             |
|----------------------|------------------------------------------------------------|------------------------------------------------------|
| `DB_NAME`            | Name of the PostgreSQL database                            | `config/database.js`                                  |
| `DB_USER`            | PostgreSQL username                                         | `config/database.js`                                  |
| `DB_PASSWORD`        | PostgreSQL password                                         | `config/database.js`                                  |
| `DB_HOST`            | PostgreSQL host (e.g. `localhost`)                          | `config/database.js`                                  |
| `DB_PORT`            | PostgreSQL port (e.g. `5432`)                               | `config/database.js`                                  |
| `JWT_SECRET`         | Secret key used to sign/verify access tokens                | `controllers/user.controllers.js`, `middlewares/authenticate.middleware.js` |
| `JWT_REFRESH_SECRET` | Secret key used to sign the refresh token issued at login    | `controllers/user.controllers.js`                     |

Example `.env`:

```env
DB_NAME=arbitration_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

> **Note:** The HTTP server port is currently hardcoded to `20514` in `server.js` and is not read from an environment variable.

## Database Setup

The project uses PostgreSQL with Sequelize as the ORM.

1. **Install PostgreSQL** locally, or use a hosted/managed instance.

2. **Create the database** referenced by `DB_NAME`:
   ```sql
   CREATE DATABASE arbitration_db;
   ```

3. **Configure credentials** in `.env` (`DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`) to match your PostgreSQL setup.

4. **Table creation**: Tables are **not** created via migration files. Instead, `server.js` calls `sequelize.sync()` on startup, which automatically creates the `user`, `arbitres`, `matchs`, and `affectation` tables (and their ENUM types) from the Sequelize model definitions if they don't already exist.

   > A commented-out `sequelize.sync({ force: true })` call also exists in `server.js`. Uncommenting it would **drop and recreate all tables** on every restart — use with caution, only in development.

## Running the Project

The project currently defines a single script in `package.json`:

```bash
# Start the server (used for both development and production)
npm start
```

This runs `node server.js`, which connects to PostgreSQL, synchronizes the Sequelize models, and starts the Express server on port `20514`.

> There is no `dev` script or file-watcher (e.g. `nodemon`) configured in `package.json`; the server must be restarted manually after code changes.

## API Endpoints

### Authentication Endpoints (mounted at `/`)

| Method | URL         | Description                                  | Auth Required |
|--------|-------------|-----------------------------------------------|----------------|
| POST   | `/login`      | Authenticates a user and issues JWT tokens   | No             |
| POST   | `/regester`   | Registers a new user account                 | No             |

**POST `/login`**
- **Description**: Looks up a user by username or email and verifies the password, returning an access token and refresh token.
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "login": "johndoe",
    "password": "P@ssword123"
  }
  ```
- **Response Example** (200):
  ```json
  {
    "acessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

**POST `/regester`**
- **Description**: Creates a new user with a hashed password. Rejects duplicate usernames/emails and blocks registering a second `admin` account.
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "P@ssword123",
    "role": "arbitre"
  }
  ```
  Allowed `role` values: `admin`, `commissaire`, `arbitre`, `consultation`.
- **Response Example** (201):
  ```json
  {
    "message": "regester ok"
  }
  ```

---

### Referee (Arbitre) Endpoints (mounted at `/arbite`)

| Method | URL           | Description                     | Auth Required |
|--------|---------------|----------------------------------|----------------|
| GET    | `/arbite/`      | List all referees               | Yes (authorized user) |
| GET    | `/arbite/:id`   | Get a referee by ID             | Yes (authorized user) |
| POST   | `/arbite/`      | Create a new referee            | Yes — roles: `commissaire`, `admin` |
| PUT    | `/arbite/:id`   | Update a referee                | Yes — roles: `commissaire`, `admin` |
| DELETE | `/arbite/:id`   | Delete a referee                | Yes — role: `admin` |

**GET `/arbite/`**
- **Response Example** (201):
  ```json
  [
    {
      "id": 1,
      "nom": "Benali",
      "prenom": "Karim",
      "nationalite": "Morocco",
      "confedeation": "caf",
      "categorie": "central",
      "experience": 8,
      "statut": "actif"
    }
  ]
  ```

**POST `/arbite/`**
- **Request Body**:
  ```json
  {
    "nom": "Benali",
    "prenom": "Karim",
    "nationalite": "Morocco",
    "confedeation": "caf",
    "categorie": "central",
    "experience": 8,
    "statut": "actif"
  }
  ```
  Allowed `confedeation` values: `uefa`, `caf`, `afc`, `conmebol`, `concacaf`, `ofc`.
  Allowed `categorie` values: `central`, `assistant`, `var`, `avar`, `fourth official`.
  Allowed `statut` values: `actif`, `suspendu`, `blesse`, `retraite` (defaults to `actif`).
- **Response Example** (201): the created referee object.

**PUT `/arbite/:id`** — same body shape as POST (partial updates accepted).
- **Response Example** (201):
  ```json
  { "message": "ok" }
  ```

**DELETE `/arbite/:id`**
- **Response Example** (201):
  ```json
  { "message": "3 is delete" }
  ```

---

### Match Endpoints (mounted at `/match`)

| Method | URL          | Description               | Auth Required |
|--------|--------------|-----------------------------|----------------|
| GET    | `/match/`      | List all matches          | No             |
| GET    | `/match/:id`   | Get a match by ID         | No             |
| POST   | `/match/`      | Create a new match        | Yes — roles: `commissaire`, `admin` |
| PUT    | `/match/:id`   | Update a match            | Yes — roles: `commissaire`, `admin` |
| DELETE | `/match/:id`   | Delete a match             | Yes — role: `admin` |

**POST `/match/`**
- **Request Body**:
  ```json
  {
    "equipeDomicile": "Morocco",
    "equipeExterieur": "Algeria",
    "stade": "Stade Mohammed V",
    "villeHote": "Casablanca",
    "dateMatch": "2026-08-15T18:00:00Z",
    "phase": "groupes"
  }
  ```
  Allowed `phase` values (model): `groupes`, `8e`, `4e`, `demi`, `finale`.
- **Response Example** (201):
  ```json
  { "message": "ok" }
  ```

**GET `/match/`**
- **Response Example** (201):
  ```json
  [
    {
      "id": 1,
      "equipeDomicile": "Morocco",
      "equipeExterieur": "Algeria",
      "stade": "Stade Mohammed V",
      "villeHote": "Casablanca",
      "dateMatch": "2026-08-15T18:00:00.000Z",
      "phase": "groupes"
    }
  ]
  ```

**DELETE `/match/:id`**
- **Response Example** (201):
  ```json
  { "message": "5 is delete" }
  ```

---

### Affectation (Assignment) Endpoints (mounted at `/affextaion`)

| Method | URL                | Description                                     | Auth Required |
|--------|--------------------|---------------------------------------------------|----------------|
| GET    | `/affextaion/`       | List all assignments, including match & referee details | Yes (authorized user) |
| GET    | `/affextaion/:id`    | Get an assignment by ID                          | Yes (authorized user) |
| POST   | `/affextaion/`       | Assign a referee to a match                      | Yes — roles: `admin`, `commissaire` |
| PUT    | `/affextaion/:id`    | Update an assignment                             | Yes — roles: `admin`, `commissaire` |
| DELETE | `/affextaion/:id`    | Delete an assignment                             | Yes — role: `admin` |

**POST `/affextaion/`**
- **Request Body**:
  ```json
  {
    "arbitreId": 1,
    "matchId": 2,
    "role": "central"
  }
  ```
  Allowed `role` values: `central`, `assistant`, `var`, `avar`, `4e`.
  The controller verifies that both `arbitreId` and `matchId` reference existing records before creating the assignment.
- **Response Example** (201):
  ```json
  { "message": "ok" }
  ```

**GET `/affextaion/`**
- **Response Example** (201):
  ```json
  [
    {
      "id": 1,
      "arbitreId": 1,
      "matchId": 2,
      "role": "central",
      "Match": {
        "equipeDomicile": "Morocco",
        "equipeExterieur": "Algeria",
        "stade": "Stade Mohammed V",
        "villeHote": "Casablanca",
        "dateMatch": "2026-08-15T18:00:00.000Z"
      },
      "Arbitre": {
        "nom": "Benali",
        "prenom": "Karim",
        "nationalite": "Morocco",
        "categorie": "central",
        "statut": "actif"
      }
    }
  ]
  ```

## Authentication

The API uses a stateless **JWT (JSON Web Token)** authentication scheme:

1. **Login** (`POST /login`): the user submits a `login` (username or email) and `password`. The server looks up the user with Sequelize (`Op.or` on `username`/`email`), compares the submitted password against the stored bcrypt hash, and — if valid — issues two signed tokens:
   - An **access token**, signed with `JWT_SECRET`, valid for **15 minutes**, containing the user's `id`.
   - A **refresh token**, signed with `JWT_REFRESH_SECRET`, valid for **7 days**, containing the user's `id`.

2. **Access Token**: returned to the client in the login response body (`acessToken`). Clients must send it on protected routes as:
   ```
   Authorization: Bearer <access_token>
   ```

3. **Refresh Token**: returned alongside the access token at login (`refreshToken`), intended to allow issuing a new access token once the current one expires. (No dedicated `/refresh` endpoint currently exists in the routes.)

4. **Authorization Middleware** (`middlewares/authenticate.middleware.js`): reads the `Authorization` header, extracts the bearer token, and verifies it against `JWT_SECRET` using `jsonwebtoken`. On success, the decoded payload (`{ id }`) is attached to `req.user`; on failure, it responds with `401`/`500`.

5. **Role-Based Access Control** (`middlewares/authorize.middleware.js`): a higher-order middleware — `authorize(...roles)` — that looks up the authenticated user (via `req.user.id`) in the database and checks whether their `role` is included in the list of roles allowed for that route. If not, it responds `403 Access denied`. Routes that don't need role restriction call `authorize` without pre-listed roles for a basic existence/authorization check.

   User roles defined in the `User` model: `admin`, `commissaire`, `arbitre`, `consultation`.

## Database Models

### User (`tableName: "user"`)

| Field      | Type                                                | Validations         |
|------------|------------------------------------------------------|----------------------|
| `id`       | INTEGER, primary key, auto-increment                  | —                     |
| `username` | STRING                                                | `allowNull: false`    |
| `email`    | STRING                                                | `allowNull: false`    |
| `password` | STRING (bcrypt hash)                                  | `allowNull: false`    |
| `role`     | ENUM(`admin`, `commissaire`, `arbitre`, `consultation`) | `allowNull: false`    |

### Arbitre — Referee (`tableName: "arbitres"`)

| Field          | Type                                                                          | Validations                     |
|----------------|--------------------------------------------------------------------------------|-----------------------------------|
| `id`           | INTEGER, primary key, auto-increment                                            | —                                  |
| `nom`          | STRING (last name)                                                              | `allowNull: false`                |
| `prenom`       | STRING (first name)                                                             | `allowNull: false`                |
| `nationalite`  | STRING                                                                          | `allowNull: false`                |
| `confedeation` | ENUM(`uefa`, `caf`, `afc`, `conmebol`, `concacaf`, `ofc`)                        | `allowNull: false`                |
| `categorie`    | ENUM(`central`, `assistant`, `var`, `avar`, `fourth official`)                   | `allowNull: false`                |
| `experience`   | INTEGER (years of experience)                                                    | `allowNull: false`                |
| `statut`       | ENUM(`actif`, `suspendu`, `blesse`, `retraite`)                                  | `allowNull: false`, default `"actif"` |

**Relationships**: `Arbitre.hasMany(Affectation, { foreignKey: "arbitreId" })`

### Match (`tableName: "matchs"`)

| Field             | Type                                                    | Validations         |
|-------------------|------------------------------------------------------------|-----------------------|
| `id`              | INTEGER, primary key, auto-increment                         | —                      |
| `equipeDomicile`  | STRING (home team)                                          | `allowNull: false`     |
| `equipeExterieur` | STRING (away team)                                          | `allowNull: false`     |
| `stade`           | STRING (stadium)                                            | `allowNull: false`     |
| `villeHote`       | STRING (host city)                                          | `allowNull: false`     |
| `dateMatch`       | DATE                                                        | `allowNull: false`     |
| `phase`           | ENUM(`groupes`, `8e`, `4e`, `demi`, `finale`)                | `allowNull: false`     |

**Relationships**: `Match.hasMany(Affectation, { foreignKey: "matchId" })`

### Affectation — Assignment (`tableName: "affectation"`)

| Field       | Type                                                        | Validations         |
|-------------|----------------------------------------------------------------|-----------------------|
| `id`        | INTEGER, primary key, auto-increment                              | —                      |
| `arbitreId` | INTEGER (foreign key → Arbitre)                                    | `allowNull: false`     |
| `matchId`   | INTEGER (foreign key → Match)                                      | `allowNull: false`     |
| `role`      | ENUM(`central`, `assistant`, `VAR`, `AVAR`, `4e`)                   | `allowNull: false`     |

**Relationships**:
- `Affectation.belongsTo(Arbitre, { foreignKey: "arbitreId" })`
- `Affectation.belongsTo(Match, { foreignKey: "matchId" })`

## Error Handling

Error handling is implemented at the controller level using `try/catch` blocks around all database operations:

- On success, controllers return the relevant HTTP status code (`200`/`201`) with a JSON payload (data or a `message`).
- On a "not found" condition (e.g. empty result set, missing ID), controllers respond with `404` and a descriptive `message`.
- On unexpected/server errors, controllers catch the exception, log it to the console (`console.log(error)`), and respond with `500` (or, in some `POST` handlers, `401`) and a JSON `message`/`error` field describing the failure.
- The `authenticate` middleware returns `401` when no token is supplied and `500` when token verification fails.
- The `authorize` middleware returns `403 Access denied` when the authenticated user's role isn't in the allowed list.
- Request body validation errors from Zod schemas (in `validate.middleware.js`) result in a `400` response with a `message` before the request ever reaches a controller.

There is currently no centralized/global Express error-handling middleware; each controller method handles its own errors independently.

## Security

Security practices currently implemented in the codebase:

- **Password hashing**: user passwords are hashed with `bcrypt` (10 salt rounds) before being stored; plaintext passwords are never persisted.
- **JWT-based authentication**: access is controlled via signed, time-limited JWTs (15-minute access tokens, 7-day refresh tokens) rather than server-side sessions.
- **Secrets via environment variables**: `JWT_SECRET`, `JWT_REFRESH_SECRET`, and database credentials are loaded from a `.env` file (excluded from version control via `.gitignore`) rather than hardcoded.
- **Role-based access control**: write and delete operations on referees, matches, and assignments are restricted to specific roles (`admin`, `commissaire`) via the `authorize` middleware, and destructive operations (`DELETE`) are further restricted to `admin` only.
- **Input validation**: all `POST`/`PUT` request bodies are validated against Zod schemas before reaching business logic, reducing the risk of malformed or unexpected data reaching the database layer.
- **Duplicate/privilege-escalation checks at registration**: the registration controller checks for existing usernames/emails and blocks the creation of more than one `admin` account.

## Future Improvements

Based on gaps observed in the current implementation, potential improvements include:

- Add a dedicated `POST /refresh-token` endpoint to actually make use of the issued refresh token to obtain a new access token.
- Wire up the existing `changePasswords` controller logic to a route (`PUT`/`POST /change-password`), as it is currently defined but not exposed via any router.
- Introduce a centralized Express error-handling middleware to standardize error responses across all controllers.
- Move the hardcoded server port (`20514`) into an environment variable (e.g. `PORT`) for configurability across environments.
- Add automated tests (the `test` script currently only exits with an error) and CI validation.
- Add database migrations (e.g. via `sequelize-cli`) instead of relying on `sequelize.sync()` for schema management in production.
- Add pagination and filtering to list endpoints (`GET /arbite/`, `GET /match/`, `GET /affextaion/`).
- Add consistent, standard HTTP status codes for successful creation responses (several `POST` routes currently return `201` on validation-triggered failure paths as well).

## License

This project is licensed under the **ISC License**, as declared in `package.json`.