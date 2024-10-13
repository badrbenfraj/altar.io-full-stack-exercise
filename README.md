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

Running Tests
The project includes unit and end-to-end tests for both the frontend and backend.

1. Unit Tests

   Frontend:

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

Storybook for UI Components
Storybook is used to showcase and develop UI components in isolation. To start Storybook for your project:

```bash
pnpm nx run components:storybook
```

This will run Storybook on http://localhost:6006.

Building the Project
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

Docker Setup
The project can be containerized using Docker. To build and run the containers:

1. Build Docker Images
   Run the following command to build the Docker images for both the frontend and backend:

```bash
docker build -t your_dockerhub_username/frontend:latest -f ./apps/frontend/Dockerfile .
docker build -t your_dockerhub_username/backend:latest -f ./apps/backend/Dockerfile .
```

2. Run Docker Containers
   Once the images are built, you can run the containers:

```bash
docker run -d -p 80:80 your_dockerhub_username/frontend:latest
docker run -d -p 3000:3000 your_dockerhub_username/backend:latest
```

The frontend will be available at http://localhost and the backend at http://localhost:3000.

CI/CD with GitHub Actions
This project is configured with GitHub Actions for CI/CD. The workflow runs on every push or pull request to the main branch and performs the following tasks:

Lints the code (both frontend and backend).
Runs unit tests (both frontend and backend).
Runs end-to-end tests.
Builds the frontend and backend.
Builds Docker images for both frontend and backend and pushes them to Docker Hub (or any other registry).
Optionally, you can set up deployment to a server or cloud.
Secrets Required
To enable Docker image pushing, you need to set up the following secrets in your GitHub repository:

DOCKER_USERNAME: Your Docker Hub username.
DOCKER_PASSWORD: Your Docker Hub password (or an access token).
To add these secrets:

Go to your GitHub repository.
Click on Settings.
In the left sidebar, click Secrets > Actions.
Click New repository secret and add the above secrets.
How the GitHub Actions Workflow Works:
The workflow performs the following steps:

Checkout Code: Retrieves the latest code from the repository.
Install Dependencies: Installs all project dependencies using pnpm.
Linting: Lints both frontend and backend.
Testing: Runs unit tests for frontend, backend, and libraries, and E2E tests for both frontend and backend.
Builds: Builds both the backend and frontend.
Docker: Logs into Docker Hub, builds Docker images for frontend and backend, and pushes them to Docker Hub.
(Optional) Deployment step to your server or cloud environment.
Additional Commands
Linting
To lint your code, run:

Frontend:

```bash
pnpm nx run frontend:lint
```

Backend:

```bash
pnpm nx run backend:lint
```

Generate Code Coverage Reports
Frontend:

```bash
pnpm nx run frontend:test --code-coverage
```

Backend:

```bash
pnpm nx run backend:test --code-coverage
```

The coverage reports will be generated in the coverage directory.
