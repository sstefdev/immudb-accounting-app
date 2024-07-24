# immudb Accounting Frontend 🖼️

This is the Next.js frontend for the immudb Accounting application.

## Table of Contents

- [Technologies and Packages Used](#technologies-and-packages-used)
- [Getting started](#getting-started)
- [Building for Production](#building-for-production)
- [Configuration](#configuration)

## Technologies and Packages Used

- **Next.js**: A React framework for production-grade applications with server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

Development tools:

- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

The frontend development server will be available at http://localhost:8080 (You can always change it in the [package.json](./package.json) scripts and in the [Dockerfile](./Dockerfile) exposed port)

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Configuration

This application requires certain environment variables to be set. Create a .env file in the root directory of the backend project and add the following configuration:

```bash
NEXT_PUBLIC_API_URL=<backend.url>
```

Environment Variables

- NEXT_PUBLIC_API_URL: The URL of the Accounting Backend.

Author: [@sstefdev](https://github.com/sstefdev)
