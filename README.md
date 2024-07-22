# immudb Accounting App

This is a monorepo containing a NestJS backend and a Vue.js frontend for an accounting application using immudb Vault.

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values.

3. Start the development servers:

- Backend: `npm run start:backend`
- Frontend: `npm run start:frontend`

## Deployment

To deploy using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system.
2. Run `docker-compose up --build` in the root directory.

The backend will be available at `http://localhost:3000` and the frontend at `http://localhost:8080`.
