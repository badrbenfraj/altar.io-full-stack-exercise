# Nx Monorepo Project (Frontend + Backend)

This project is a monorepo setup using **Nx** that includes an **Angular** frontend (`frontend`), a **NestJS** backend (`backend`), and shared libraries. The project also uses **Storybook** to showcase components and **Cypress** for end-to-end testing.

## Prerequisites

- **Node.js**: Ensure that you have **Node.js (v18 or later)** installed.
- **pnpm**: We use **pnpm** as the package manager.
- **Docker**: Docker is required for building and running the containerized versions of the frontend and backend.

## Setup

Clone the repository:

```bash
git clone <repository_url>
cd <repository_folder>
```

Install dependencies:

```bash
npm install -g pnpm
pnpm install
```

## Starting the Project

1. Frontend (Angular)

   To serve the Angular frontend:

```bash
pnpm nx serve frontend
```

This will serve the app on http://localhost:4200.

2. Backend (NestJS)

   To run the NestJS backend:

```bash
pnpm nx serve backend
```

This will run the API server on http://localhost:3000.

## Running Tests

The project includes unit and end-to-end tests for both the frontend and backend.

1. Unit Tests

#### Frontend:

```bash
pnpm nx run frontend:test
```

Backend:

```bash
pnpm nx run backend:test
```

Helpers Library:

```bash
pnpm nx run helpers:test
```

UI Components Library:

```bash
pnpm nx run components:test
```

2. End-to-End (E2E) Tests
   Backend E2E:

```bash
pnpm nx run backend-e2e:e2e
```

Frontend E2E (Cypress):

```bash
pnpm nx run frontend-e2e:e2e
```

## Storybook for UI Components

Storybook is used to showcase and develop UI components in isolation. To start Storybook for the project:

```bash
pnpm nx run components:storybook
```

This will run Storybook on http://localhost:6006.

## Building the Project

Before deploying the project, ensure you build both the backend and frontend.

1. Build Frontend (Angular)

   ```bash
   pnpm nx run frontend:build
   ```

   The built files will be located in dist/apps/frontend.

2. Build Backend (NestJS)

   ```bash
   pnpm nx run backend:build
   ```

   The built files will be located in dist/apps/backend.

## CI/CD with GitHub Actions

This project is configured with GitHub Actions for CI/CD. The workflow runs on every push or pull request to the main branch and performs the following tasks:

- Lints the code (both frontend and backend).
- Runs unit tests (both frontend and backend).
- Runs end-to-end tests.
- Builds the frontend and backend.
- Builds Docker images for both frontend and backend and pushes them to Docker Hub (or any other registry).

## Additional Commands

### Linting

To lint the code, run:

#### Frontend:

```bash
pnpm nx run frontend:lint
```

Backend:

```bash
pnpm nx run backend:lint
```

### Generate Code Coverage Reports

#### Frontend:

```bash
pnpm nx run frontend:test --code-coverage
```

Backend:

```bash
pnpm nx run backend:test --code-coverage
```

The coverage reports will be generated in the coverage directory.

## Keycloak Integration

This project uses Keycloak for authentication and authorization. Keycloak provides centralized identity management with features such as Single Sign-On (SSO), user federation, and role-based access control.

The backend (NestJS) is secured using Keycloak, and the frontend (Angular) uses the Keycloak Angular adapter for managing authentication tokens and securing routes.
You can manage users, roles, and permissions directly in the Keycloak Admin Console.
For local development, Keycloak runs as a Docker container using Docker Compose.

Docker Compose
The project uses Docker Compose to orchestrate multiple services, including the frontend (Angular), backend (NestJS), PostgreSQL, Adminer, and Keycloak.

PostgreSQL is used as the database service and runs on the default port 5432.
Adminer is a simple web-based database management tool and is available at port 8090 for easy database management.
You can run all these services using the following command:

```bash
docker-compose up --build
```

This command will:

- Build and start the frontend on http://localhost.
- Start the backend on http://localhost:3000.
- Run PostgreSQL on its default port (5432).
- Make Adminer available at http://localhost:8090 for managing the PostgreSQL database.
- Run Keycloak on http://localhost:8080, where you can access the Keycloak Admin Console.
