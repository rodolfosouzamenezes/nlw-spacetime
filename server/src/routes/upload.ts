import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { createWriteStream } from "node:fs"
import { extname, resolve } from "node:path"
import { pipeline } from "node:stream"
import { promisify } from "node:util"

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        const upload = await request.file({
            limits: {
                fieldSize: 5_242_880, //5mb
            }
        })

        if (!upload) {
            return reply.status(400).send()
        }

        
        const fileExtension = extname(upload.filename); 
        
        const isValidFileFormat = fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.gif'
        
        if (!isValidFileFormat) {
            return reply.status(400).send()
        }
        
        const fileId = randomUUID()
        const fileName = fileId.concat(fileExtension)

        const writeStream = createWriteStream(
            resolve(__dirname, '../../uploads/', fileName)
        )

        await pump(upload.file, writeStream)

        const fullUrl = request.protocol.concat('://').concat(request.hostname)
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl)

        return { fileUrl }
    })
}