import { IBoard } from '@/types'

import prisma from '../../../../prisma/db'

export const getAllBoards = () => prisma.board.findMany()

export const getBoardById = (id: string) =>
  prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  })

export const createBoard = ({ name }: { name: string }) =>
  prisma.board.create({
    data: {
      name,
    },
  })

export const updateBoard = ({ id, name }: IBoard) =>
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
