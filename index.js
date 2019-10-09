const express = require('express');
const carRoutes = require('./routes/cars');
const salesRoutes = require('./routes/sales');

const server = express();

server.use(express.json());
server.use('/cars', carRoutes);
server.use('/sales', salesRoutes);

server.get('/', (req, res) => {
    res.send('Server up and running!');
});

server.use((err, req, res, next) => {
    res.status(400).json(err);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => `Server is running on PORT: ${PORT}`);
