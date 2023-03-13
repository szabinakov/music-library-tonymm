# Music Library API:

The Music Library application is a key project from the Command Shift Software Engineering bootcamp (specifically, backend module). The project included the use of PostgreSQL, Docker, and Postman. The project used the Mocha library for database communication (integration) testing.
Learning objectives included, how to design and implement an API which can perform CRUD operations on a database.

The Music-Library is a Node.js Express API for managing artists and albums data. It provides HTTP endpoints for Creating, Reading, Updating, and Deleting (CRUD) artists and albums. The API uses the HTTP methods:

- POST for creating new artists and albums
- GET for retrieving artists and albums data
- PUT for updating an entire artist or album
- PATCH for partially updating an artist or album
- DELETE for deleting an artist or album

## Methods and Endpoints Used:

| Method | Endpoint            | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| POST   | /artists            | Creates a new artist                      |
| GET    | /artists            | Retrieves all artists                     |
| GET    | /artists/:id        | Retrieves a specific artist               |
| PUT    | /artists/:id        | Replaces a specific artist                |
| PATCH  | /artists/:id        | Updates a specific artist                 |
| DELETE | /artists/:id        | Deletes a specific artist                 |
| POST   | /artists/:id/albums | Creates a new album for a specific artist |
| GET    | /albums             | Retrieves all albums                      |
| GET    | /albums/:id         | Retrieves a specific album                |
| PUT    | /albums/:id         | Replaces a specific album                 |
| PATCH  | /albums/:id         | Updates a specific album                  |
| DELETE | /albums/:id         | Deletes a specific album                  |

## Contact me:

If you encounter any issues or bugs, or have any suggestions for improving this project, please feel free to contact me on [twitter](https://twitter.com/TonyMCodes).

Please submit an issue on this repository to report any bugs or suggest new features. Please provide as much detail as possible, including any error messages and steps to reproduce the issue.
