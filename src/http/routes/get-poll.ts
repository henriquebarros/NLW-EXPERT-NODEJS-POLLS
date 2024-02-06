import { z } from 'zod'
import { prisma } from '../../prisma/prisma'
import { FastifyInstance } from 'fastify'

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const createSchemaPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = createSchemaPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return reply.send({ poll })
  })
}
