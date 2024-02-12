import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  try {
    const board = await prisma.board.create({
      data: {
        name: 'Board 1',
        tasks: {
          create: [
            {
              title: 'Task 1',
              description: 'This is task 1',
              status: 'To Do',
              position: 1,
            },
            {
              title: 'Task 2',
              description: 'This is task 2',
              status: 'In Progress',
              position: 2,
            },
            {
              title: 'Task 3',
              description: 'This is task 3',
              status: 'In Progress',
              position: 3,
            },
          ],
        },
      },
    })
    console.log(`Created board with id: ${board.id}`)
  } catch (e) {
    console.error('Error during seeding:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
