const express = require('express')
const app = express()
const port = 3001;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const options = {
        swaggerDefinition: {
            info: {
             title: 'ITIS 6177',
             version: '1.0.0',
             description: 'SI API'
                },
            host: '142.93.126.145:3001',
            basePath: '/',
            },
            apis:['./routes/users.js'],
};
const specs = swaggerJsdoc(options);

app.use('/docs',swaggerUI.serve,swaggerUI.setup(specs));
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send("hello")
})

const userRouter = require('./routes/users');
app.use('/api.v1.ITIS6177',userRouter);

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
  })