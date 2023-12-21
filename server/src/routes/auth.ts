import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"
import axios from "axios"

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth', async (request) => {
        const bodySchema = z.object({
            code: z.string(),
        })

        console.log('oi');

        const { code } = bodySchema.parse(request.body);

        const accessTokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: 'application/json',
                },
            }
        )

        const { access_token } = accessTokenResponse.data

        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })

        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatar_url: z.string().url(),
        })

        const userInfo = userSchema.parse(userResponse.data)

        let user = await prisma.user.findUnique({
            where: {
                githubId: userInfo.id,
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    githubId: userInfo.id,
                    login: userInfo.login,
                    name: userInfo.name,
                    avatarUrl: userInfo.avatar_url,
                }
            })
        }

        return {
            user
        }
    })
}