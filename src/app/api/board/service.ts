import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Board {
  id: string
  name: string
}

export const getAllBoards = () => prisma.board.findMany()

export const createBoard = ({ name }: { name: string }) =>
  prisma.board.create({
    data: {
      name,
    },
  })

export const updateBoard = ({ id, name }: Board) =>
  prisma.board.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })

export const deleteBoard = ({ id }: { id: string }) =>
  prisma.board.delete({
    where: {
      id,
    },
  })
