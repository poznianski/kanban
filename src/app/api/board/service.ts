import { ITask } from '@/app/api/task/service'

import prisma from '../../../../prisma/db'

export interface IBoard {
  id: string
  name: string
  tasks?: ITask[]
}

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
