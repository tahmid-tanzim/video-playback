const express = require('express');
const path = require('path');
const server = express();

server.use('/', express.static(path.join(__dirname, 'app')));

/* $ PORT=3000 npm run start */
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log("Server listening on 'http://localhost:" + port + "'");
    console.log("Press Ctrl+C to Exit.");
});