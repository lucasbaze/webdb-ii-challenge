const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use('/cars', routes);

server.get('/', (req, res) => {
    res.send('Server up and running!');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => `Server is running on PORT: ${PORT}`);
