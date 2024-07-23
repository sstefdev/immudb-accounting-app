# immudb Accounting App

This is a monorepo containing a NestJS backend and a Next.js frontend for an accounting application using immudb Vault.

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

## Configuration

This application requires certain environment variables to be set. Create a `.env` file in the root directory of the project and add the following configuration:

```bash
IMMUDB_API_URL=<immudb.api>
IMMUDB_API_KEY=<api.key>
JWT_SECRET=<secret>
DATABASE_FILE=<sqlite>
```

### Environment Variables

- `IMMUDB_API_URL`: The URL of the immudb Vault API.
- `IMMUDB_API_KEY`: Your API key for accessing the immudb Vault.
- `JWT_SECRET`: A secret key used for JWT token generation and verification.
- `DATABASE_FILE`: The name of the SQLite database file used for local storage.

**Note**: Be cautious with your API keys and secrets. Never commit the `.env` file to version control. It's recommended to use different keys for development and production environments.

## Security Considerations

The configuration provided here is for demonstration purposes only. In a production environment, you should:

1. Use a strong, randomly generated string for `JWT_SECRET`.
2. Store sensitive information like API keys in a secure manner, such as using a secrets management service.
3. Use environment-specific configurations for different deployment stages (development, staging, production).

## Database Initialization

This application uses SQLite as its local database. The database file is automatically created in the root directory of the project on server start if it doesn't exist.

This approach ensures that:

- The application can be easily set up in new environments without manual database creation.
- The database file name can be configured via environment variables.
- The database schema is always in sync with the entity definitions in the code.

**Note**: The `synchronize: true` option in TypeORM configuration automatically updates the database schema. This is convenient for development but should be used cautiously in production as it can lead to data loss if not managed properly.

## Deployment

To deploy using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system.
2. Run `docker-compose up --build` in the root directory.

The backend will be available at `http://localhost:3000` and the frontend at `http://localhost:8080`.

## Design Decisions

### User Data Isolation

Initially, the plan was to create a separate collection for each user to ensure data isolation. However, due to limitations in the free plan of immudb Vault, this approach was not feasible.

Instead, I've implemented a solution where all user data is stored in a single collection. Each document includes a reference to the username of the user who created it. This allows me to filter and retrieve user-specific data while working within the constraints of the free plan.

## Implementation Details and Known Limitations

### Data Retrieval and Filtering

During the development of this application, I encountered significant limitations with the immudb Vault API's search functionality. Specifically, the search query feature did not work as expected, leading me to implement a custom solution for data retrieval and filtering.

My current approach is as follows:

1. **Data Retrieval**: The backend retrieves all documents from the immudb Vault.
2. **Filtering**: Filtering by username is performed in-memory using JavaScript.
3. **Pagination**: I implemented pagination on the filtered results to manage large datasets efficiently.

This approach is used for both fetching documents and counting them.

### Why This Approach?

The search query provided by the immudb Vault API consistently failed to return the expected results. Despite numerous attempts to structure the query correctly, I was unable to get it to filter documents as required. This led to the decision to fetch all documents and perform filtering on the application side.

### Limitations

This solution comes with several limitations:

1. **Scalability Issues**: Retrieving all documents from the immudb Vault may not be efficient for very large datasets. As the number of documents grows, this approach will become increasingly resource-intensive and slow.

2. **Limited Search Capabilities**: Complex search queries are not supported on the backend. All advanced filtering or sorting must be implemented on the frontend.

3. **Performance**: For large datasets, the in-memory filtering and pagination may cause performance issues, especially as the number of users and documents increases.

4. **Data Transfer**: This approach transfers more data than necessary between immudb Vault and our application, which could lead to increased latency and bandwidth usage.

### Future Improvements

Given more time and resources, the following improvements could be considered:

1. **API Enhancement**: Work with the immudb team to understand why the search query isn't functioning as expected and potentially contribute to improving the API.

2. **Caching Mechanism**: Implement a caching layer to reduce the frequency of full data retrievals from immudb Vault.

3. **Batch Processing**: Implement a batch processing system for large datasets to reduce memory usage and improve performance.

4. **Alternative Storage**: Consider using a database system that better supports our querying needs alongside immudb Vault.

5. **Hybrid Approach**: Explore ways to use immudb Vault's features more effectively, possibly combining its capabilities with our custom filtering for optimal performance.

## Conclusion

While the current implementation allows the application to function, it's important to note that it's not an ideal or scalable solution. It serves as a temporary workaround to the limitations encountered with the immudb Vault API's search functionality. Future development should prioritize finding a more efficient and scalable solution for data retrieval and filtering.

Author: [@sstefdev](https://github.com/sstefdev)
