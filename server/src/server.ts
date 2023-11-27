import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'

const app = fastify();
const prisma = new PrismaClient()

const PORT = 3333;

app.get('/users', async () => { 
    const users = await prisma.user.findMany()

    return users
 })

app
    .listen({
        port: PORT,
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