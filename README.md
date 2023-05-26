## Game Library Web Application (Back-End Project)

This is a web application made as the Semester project of a Back-End Web Dev. and Tools class. It uses Node.js and Express to connect to a SQL database and perform REST API functionalities alongside displaying a functional, albeit basic, web interface.

### Current Working

| Web | Postman "Soon":tm: |
|:--:|:--:|
| Login | N/A |
| Dashboard | N/A |
| Registration | N/A |
| Logout | N/A |
| Add Game | N/A |
| N/A | N/A |

### JSON-Returning Routes Documentation

| Route | Method | Description | Parameters | Example Usage |
|:------|:-------|:------------|:-----------|:--------------|
|/findAll|GET|Retrieve all games|None|`http://localhost:3000/findAll`|
|/findOne|GET|Find a game by column value|`column` (string): Name of the column to search<br />`value` (string): Value to search for|`http://localhost:3000/findOne?column=title&value=Deep`|
|/update|GET|Updates a game entry by column value|`id` (number): ID of the game to update<br>`column` (string): Column to update<br>`value` (string): Updated Value|`http://localhost:3000/update?id=1&column=price&value=19.99`|
|/create|POST|Create a new game|None (request body should contain game data)|`http://localhost:3000/create` (with request body containing new game data)|
|/delete|DELETE|Delete a game by ID|`id` (number): ID of the game to delete|`http://localhost:3000/delete?id=1`|
