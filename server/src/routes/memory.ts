import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

export async function memoryRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify()
    })

    app.get('/memories', async (request) => {
        const memories = await prisma.memory.findMany({
            where: {
                userId: request.user.sub,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return memories.map(memory => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                expert: memory.content,
                createdAt: memory.createdAt,
            }
        })
    })

    app.get('/memory/:id', async (request, reply) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramSchema.parse(request.params);

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (!memory.isPublic && memory.userId !== request.user.sub) {
            return reply.status(401).send()
        }

        return memory
    })

    app.post('/memory', async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })
        const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

        const memory = await prisma.memory.create({
            data: {
                userId: request.user.sub,
                content,
                coverUrl,
                isPublic,
            }
        })

        return memory
    })

    app.put('/memory/:id', async (request, reply) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramSchema.parse(request.params);

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })
        const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (memory.userId !== request.user.sub) {
            return reply.status(401).send()
        }

        memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content,
                coverUrl,
                isPublic,
            }
        })

        return memory
    })

    app.delete('/memory/:id', async (request, reply) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramSchema.parse(request.params);

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (memory.userId !== request.user.sub) {
            return reply.status(401).send()
        }

        await prisma.memory.delete({
            where: {
                id,
            }
        })
    })
}