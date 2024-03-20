import { IBoard } from '@/types/types'

import prisma from '../../../../prisma/db'

export const getAllBoards = async () => await prisma.board.findMany()

export const getBoardById = async (id: string) =>
  await prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      tasks: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

export const createBoard = async ({ name }: { name: string }) =>
  await prisma.board.create({
    data: {
      name,
    },
  })

export const updateBoard = async ({ id, name }: IBoard) =>
  await prisma.board.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })

export const deleteBoard = async ({ id }: { id: string }) =>
  await prisma.board.delete({
    where: {
      id,
    },
  })
