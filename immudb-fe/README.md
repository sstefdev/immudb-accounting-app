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

## Future Improvements

### Server-Side Rendering (SSR) and Cookie-Based Authentication

Due to time constraints, the current implementation uses client-side rendering and does not implement cookie-based authentication. However, for a production environment, the following improvements could be made:

1. **Server-Side Rendering (SSR)**: Implement SSR for the main pages, especially the accounts listing page. This would improve initial load times and SEO. The implementation could look like this:

   ```typescript
   export const getServerSideProps: GetServerSideProps = async (context) => {
     // Fetch data on the server
     const accounts = await fetchAccounts();

     return {
       props: { accounts },
     };
   };
   ```

2. Cookie-Based Authentication: Replace the current token storage method with HTTP-only cookies for enhanced security. This would involve:

   - Updating the login process to set a cookie
   - Modifying the API service to read the cookie and include it in requests
   - Adjusting server-side logic to validate the cookie on protected routes

   ```typescript
   Cookies.set("token", accessToken, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
   });
   ```

3. Authentication in SSR: Combine SSR with authentication to protect routes server-side:

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch data using the token
  const accounts = await fetchAccountsWithToken(token);

  return {
    props: { accounts },
  };
};
```

These improvements would enhance the application's performance, SEO, and security. They are recommended for a production-ready version of the application.

Author: [@sstefdev](https://github.com/sstefdev)
