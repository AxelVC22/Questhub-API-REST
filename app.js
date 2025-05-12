const express = require('express');
const mongoose = require('mongoose');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger');
require('dotenv').config();

app.use(express.json());

const mongoDataBaseURI = 'mongodb://localhost:27017/questhubDB';
mongoose.connect(mongoDataBaseURI)
.then(() => console.log('Connecting to DataBase'))
.catch(error => console.error('Couldn`t connect database', error));

app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3033, () => {
    console.log('Server running in http://localhost:3033');
})