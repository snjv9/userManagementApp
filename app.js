const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
app.use(express.json({
    limit: '10kb'
}))

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A simple Express User Management API',
        },
    },
    apis: ['./swagger.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan('dev'));


app.use('/api/v1/users', userRouter)

module.exports = app;