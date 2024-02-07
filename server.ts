import initApp from './app';
import { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import http from 'http';
import fs from 'fs';
import https from 'https';
import { Server } from 'socket.io'; // Import Server from socket.io
import { handleClient } from './socket';

const startServer = async () => {
    try {
        const app: Application = await initApp();

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
        const options2= {
            key: fs.readFileSync('client-key.pem'),
            cert: fs.readFileSync('client-cert.pem')
        }
        const server = https.createServer(options2, app);
        const io = new Server(server); // Initialize Socket.io server
        handleClient(io);

        server.listen(port, () => {
            console.log(`MovieRate APP is listening on port ${port}!`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
