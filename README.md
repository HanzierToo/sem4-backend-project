## Game Library Web Application (Back-End Project)

This is a web application made as the Semester project of a Back-End Web Dev. and Tools class. It uses Node.js and Express to connect to a SQL database and perform REST API functionalities alongside displaying a functional, albeit basic, web interface.

### GUI / Web Interface

The website is fully functional and is self-linking and self-explanatory. Start the program using `npm run dev` (or your preferred deployment method) and then begin navigation / interaction. Users will need to register and log in before using the game dashboard.

### JSON-Returning Routes Documentation

| Route | Method | Description | Parameters | Example Usage |
|:------|:-------|:------------|:-----------|:--------------|
|/findAll|GET|Retrieve all games|None|`http://localhost:3000/findAll`|
|/findOne|GET|Find a game by column value|`column` (string): Name of the column to search<br />`value` (string): Value to search for|`http://localhost:3000/findOne?column=title&value=Deep`|
|/update|GET|Updates a game entry by column value|`id` (number): ID of the game to update<br>`column` (string): Name of the column to update<br>`value` (string): Updated Value|`http://localhost:3000/update?id=1&column=price&value=139999`|
|/create|GET|Creates a new game entry|`userId` (numeric): User ID of the game entry<br>`title` (string): Title of the game entry<br>`developer` (string): Developer of the game entry<br>`publisher` (string): Publisher of the game entry<br>`price` (numeric): Price of the game entry<br>`description` (string): Description of the game entry<br>|`http://localhost:3000/create?userId=1&title=New Game&developer=GameDev&publisher=PublisherX&price=139999&description=Awesome Game`|
|/delete|DELETE|Delete a game entry by column value|`column` (string): Name of the column to delete<br />`value` (string): Value to search for|`http://localhost:3000/delete?column=title&value=Old`|
