# immudb Accounting App ![accounting-icon](./immudb-fe/public/favicon-32x32.png)

This is a monorepo containing a NestJS backend and a Next.js frontend for an accounting application using immudb Vault.

## Project Structure

- `immudb-be/`: NestJS backend application
- `immudb-fe/`: Next.js frontend application

For detailed setup and running instructions, please refer to the README files in each project directory.

## Deployment

To deploy using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system.
2. Run `docker-compose up --build` in the root directory.

The backend will be available at `http://localhost:3000` and the frontend at `http://localhost:8080`.

## Design Decisions and Limitations

For information about design decisions, implementation details, and known limitations, please refer to the backend [README](./immudb-be/README.md).

Author: [@sstefdev](https://github.com/sstefdev)
