import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

export async function memoryRoutes(app: FastifyInstance) {
    app.get('/memory', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })

        return memories.map(memory => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                expert: memory.content.substring(0, 115).concat('...'),
            }
        })
    })

    app.get('/memory/:id', async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramSchema.parse(request.params);

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

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
                userId: 'ac066c30-5e64-41aa-ba8a-69e0b13b0148',
                content,
                coverUrl,
                isPublic,
            }
        })

        return memory
    })

    app.put('/memory/:id', async (request) => {
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

        const memory = await prisma.memory.update({
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

    app.delete('/memory/:id', async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramSchema.parse(request.params);

        await prisma.memory.delete({
            where: {
                id,
            }
        })
    })
}