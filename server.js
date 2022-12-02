require("dotenv").config();

const express = require('express');
//const connectDB = require('./db');

const app = express();

// Connect Database
//connectDB();

// Init Middleware
app.use(express.json());

// To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // to allow all client we use *
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS,GET,POST,PUT,PATCH,DELETE"
    ); //these are the allowed methods
    res.setHeader("Access-Control-Allow-Headers", "*"); // allowed headers (Auth for extra data related to authoriaztion)
    next();
});

const connectDB = require('./db')

connectDB();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res, ) => {
    res.send('Backend of Health app is Working Fine.');
});

//Auth routes
app.use('/api/v1/auth', require('./routes/auth'));

app.use('/api/v1', require('./routes/index'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));