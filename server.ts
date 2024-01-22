import initApp from './app';
import { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

initApp().then((app: Application) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Moview 2024 REST API',
                version: '1.0.0',
                description: 'REST server including authentication using JWT',
            },
            servers: [{ url: 'http://localhost:3003' }],
        },
        apis: ['./routes/*.ts'],
    };
    const specs = swaggerJsDoc(options);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`MovieRate APP is listening on port ${port}!`);
    });
});
