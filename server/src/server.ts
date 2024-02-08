import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoryRoutes } from './routes/memory';

import { authRoutes } from './routes/auth';

const app = fastify();

const PORT = process.env.PORT || 3333;

app.register(cors, {
    origin: true,
})

const secret =  process.env.JWT_SECRET || 'JWT'
app.register(jwt, {
    secret,
})

app.register(memoryRoutes)
app.register(authRoutes)

app
    .listen({
        port: +PORT,
        host: '0.0.0.0',
    })
    .then(() => {
        const brightCode = '\x1b[1m';
        const greenCode = '\x1b[32m';
        const resetCode = '\x1b[0m';

        console.log(
            brightCode + greenCode +
            '[SUCCESS] ' + resetCode + greenCode +
            `Server is running: http://localhost:${PORT}/` + resetCode
        )
    })