## Table of Contents

1. [Project Overview](#nx-monorepo-project-frontend--backend)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Project Structure](#project-structure)
5. [NX Project](#nx-project)
6. [Starting the Project](#starting-the-project)
   - [Frontend (Angular)](#1-frontend-angular)
   - [Backend (NestJS)](#2-backend-nestjs)
7. [Running Tests](#running-tests)
   - [Unit Tests](#1-unit-tests)
   - [End-to-End (E2E) Tests](#2-end-to-end-e2e-tests)
8. [Storybook for UI Components](#storybook-for-ui-components)
9. [Building the Project](#building-the-project)
   - [Build Frontend (Angular)](#1-build-frontend-angular)
   - [Build Backend (NestJS)](#2-build-backend-nestjs)
10. [Docker Setup](#docker-setup)
    - [Build Docker Images](#1-build-docker-images)
    - [Run Docker Containers](#2-run-docker-containers)
11. [CI/CD with GitHub Actions](#cicd-with-github-actions)
    - [Secrets Required](#secrets-required)
    - [How the GitHub Actions Workflow Works](#how-the-github-actions-workflow-works)
12. [Additional Commands](#additional-commands)
    - [Linting](#linting)
    - [Generate Code Coverage Reports](#generate-code-coverage-reports)
13. [Troubleshooting](#troubleshooting)
14. [Conclusion](#conclusion)
15. [Keycloak Integration](#keycloak-integration)
16. [Project Formatting and Commit Rules](#project-formatting-and-commit-rules)
    - [Code Formatting](#1-code-formatting)
    - [Linting Rules](#2-linting-rules)
    - [Commit Message Guidelines](#3-commit-message-guidelines)
    - [Setting Up Pre-commit Hook with Husky](#4-setting-up-pre-commit-hook-with-husky)

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
```

```bash
npm install -g nx@19
```

```bash
pnpm install
```

## NX Project

To show all projects in the workspace run this command:

```bash
nx show projects
```

it will out put these projects:

```bash
frontend-e2e
backend-e2e
components
frontend
backend
helpers
```

Opens a web browser to explore the configuration and commands that could be used of "frontend" project byt running this command:

```bash
nx show project frontend --web --open=true
```

## Project Structure

```markdown
│ .editorconfig
│ .gitattributes
│ .gitconfig
│ .gitignore
│ .prettierignore
│ .prettierrc
│ commitlint.config.cjs
│ czVinyl.config.cjs
│ eslint.config.js
│ jest.config.ts
│ jest.preset.js
│ nx.json
│ package-lock.json
│ package.json
│ pnpm-lock.yaml
│ README.md
│ tree.txt
│ tsconfig.base.json
├─apps
│ ├─backend
│ │ │ eslint.config.js
│ │ │ jest.config.ts
│ │ │ project.json
│ │ │ tsconfig.app.json
│ │ │ tsconfig.json
│ │ │ tsconfig.spec.json
│ │ │ webpack.config.js
│ │ │  
│ │ └───src
│ │ │ main.ts
│ │ │  
│ │ ├─app
│ │ │ │ app.controller.spec.ts
│ │ │ │ app.controller.ts
│ │ │ │ app.module.ts
│ │ │ │ app.service.spec.ts
│ │ │ │ app.service.ts
│ │ │ │  
│ │ │ ├───core
│ │ │ │ └───services
│ │ │ ├───grid
│ │ │ │ │ grid.controller.ts
│ │ │ │ │ grid.module.ts
│ │ │ │ │  
│ │ │ │ └───services
│ │ │ │ grid.service.spec.ts
│ │ │ │ grid.service.ts
│ │ │ │  
│ │ │ └───modules
│ │ │ └───grid
│ │ │ └───gateway
│ │ └───assets
│ │ .gitkeep
│ │  
│ ├───backend-e2e
│ │ │ eslint.config.js
│ │ │ jest.config.ts
│ │ │ project.json
│ │ │ tsconfig.json
│ │ │ tsconfig.spec.json
│ │ │  
│ │ └───src
│ │ ├───backend
│ │ │ │ backend.spec.ts
│ │ │  
│ │ └───grid
│ │ grid.spec.ts
│ │  
│ │ └───support
│ │ global-setup.ts
│ │ global-teardown.ts
│ │ test-setup.ts
│ │  
│ ├───frontend
│ │ │ eslint.config.js
│ │ │ jest.config.ts
│ │ │ project.json
│ │ │ proxy.conf.json
│ │ │ tsconfig.app.json
│ │ │ tsconfig.editor.json
│ │ │ tsconfig.json
│ │ │ tsconfig.spec.json
│ │ │  
│ │ ├───public
│ │ │ favicon.ico
│ │ │  
│ │ └───src
│ │ │ index.html
│ │ │ main.ts
│ │ │ styles.scss
│ │ │ test-setup.ts
│ │ │  
│ │ └───app
│ │ │ app.component.html
│ │ │ app.component.scss
│ │ │ app.component.ts
│ │ │ app.config.ts
│ │ │ app.routes.ts
│ │ │  
│ │ ├───core
│ │ │ ├───screens
│ │ │ │ screen.component.ts
│ │ │  
│ │ │ └───services
│ │ │ grid.service.ts
│ │ │  
│ │ ├───features
│ │ │ └───grid
│ │ │ grid.component.html
│ │ │ grid.component.scss
│ │ │ grid.component.spec.ts
│ │ │ grid.component.ts
│ │ │  
│ │ └───shared
│ │ shared.module.ts
│ │  
│ └───frontend-e2e
│ │ cypress.config.ts
│ │ eslint.config.js
│ │ project.json
│ │ tsconfig.json
│ │  
│ └───src
│ ├───e2e
│ │ grid.cy.ts
│ │  
│ ├───fixtures
│ │ example.json
│ │  
│ └───support
│ commands.ts
│ e2e.ts
│ grid.po.ts
├───libs
│ ├───components
│ │ │ eslint.config.js
│ │ │ jest.config.ts
│ │ │ project.json
│ │ │ README.md
│ │ │ tsconfig.json
│ │ │ tsconfig.lib.json
│ │ │ tsconfig.spec.json
│ │ │  
│ │ ├───.storybook
│ │ │ main.ts
│ │ │ preview.ts
│ │ │ tsconfig.json
│ │ │  
│ │ └───src
│ │ │ index.ts
│ │ │ test-setup.ts
│ │ │  
│ │ └───lib
│ │ └───components
│ │ └───live
│ │ live.component.html
│ │ live.component.scss
│ │ live.component.spec.ts
│ │ live.component.stories.ts
│ │ live.component.ts
│ │  
│ └───helpers
│ │ eslint.config.js
│ │ jest.config.ts
│ │ package.json
│ │ project.json
│ │ README.md
│ │ tsconfig.json
│ │ tsconfig.lib.json
│ │ tsconfig.spec.json
│ │  
│ └───src
│ │ index.ts
│ │  
│ └───lib
│ ├───models
│ │ grid.model.ts
│ │ index.ts
│ │  
│ └───utils
│ helpers.spec.ts
│ helpers.ts
│ index.ts
```

## Starting the Project

### 1. Frontend (Angular)

To serve the Angular frontend:

```bash
pnpm nx serve frontend
```

This will serve the app on http://localhost:4200.

### 2. Backend (NestJS)

To run the NestJS backend:

```bash
pnpm nx serve backend
```

This will run the API server on http://localhost:3000.

## Running Tests

The project includes unit and end-to-end tests for both the frontend and backend.

### 1. Unit Tests

#### Frontend:

```bash
pnpm nx run frontend:test
```

#### Backend:

```bash
pnpm nx run backend:test
```

#### Helpers Library:

```bash
pnpm nx run helpers:test
```

#### UI Components Library:

```bash
pnpm nx run components:test
```

### 2. End-to-End (E2E) Tests

#### Backend E2E:

```bash
pnpm nx run backend-e2e:e2e
```

#### Frontend E2E (Cypress):

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

### 1. Build Frontend (Angular)

```bash
pnpm nx run frontend:build
```

The built files will be located in dist/apps/frontend.

### 2. Build Backend (NestJS)

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

#### Backend:

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

## Project Formatting and Commit Rules

This project follows specific guidelines for code formatting, linting, and commit message conventions to maintain code quality and consistency across the repository.

### 1. Code Formatting

We use Prettier for code formatting. Prettier ensures that all code adheres to a consistent style.
To automatically format your code before committing, a pre-commit hook is configured. This means that any code you commit will be automatically formatted with Prettier.

### 2. Linting Rules

ESLint is used to analyze code for potential errors and enforce coding standards.

Linting rules are set up to ensure code quality and adherence to best practices.

You can manually run the linter with the following command:

```bash
pnpm nx run frontend:lint
pnpm nx run backend:lint
```

### 3. Commit Message Guidelines

This project follows the Conventional Commits specification, which provides a standardized way to write commit messages. This format includes:
A type (feat, fix, docs, style, refactor, perf, test, chore)
An optional scope (the part of the codebase affected)
A description that briefly summarizes the change
Example of a commit message:

```bash
feat(frontend): add new payment form validation
```

### 4. Setting Up Pre-commit Hook with Husky

The pre-commit hook is managed using Husky, which runs the Prettier formatting before each commit. Ensure you have Husky installed:

```bash
pnpm add husky --save-dev
npx husky install
```

Once installed, Husky will automatically set up the pre-commit and commit-msg hook to format the code using Prettier apply conventional commit message.
