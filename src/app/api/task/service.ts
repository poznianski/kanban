import { ITask } from '@/types/types'

import prisma from '../../../../prisma/db'

export const getTasksByBoardId = (boardId: string) =>
  prisma.task.findMany({
    where: { boardId },
    orderBy: { position: 'asc' },
  })

export const getTaskById = (id: number) =>
  prisma.task.findUnique({
    where: {
      id,
    },
  })

export const createTask = async ({
  id,
  boardId,
  title,
  description,
  status = 'ToDo',
}: ITask) => {
  const lastTask = await prisma.task.aggregate({
    where: {
      boardId,
    },
    _max: {
      position: true,
    },
  })

  const newPosition =
    lastTask._max.position === null ? 0 : lastTask._max.position + 1

  return prisma.task.create({
    data: { id, boardId, title, description, status, position: newPosition },
  })
}

export const updateTask = async ({
  id,
  title,
  description,
  status,
  position,
}: ITask) =>
  await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      status,
      position,
    },
  })

export const updateTasksPositions = async (tasks: ITask[]) => {
  const updates = tasks.map((task) => {
    return prisma.task.update({
      where: { id: task.id },
      data: {
        position: task.position,
        status: task.status,
      },
    })
  })
  return prisma.$transaction(updates)
}

export const deleteTask = async (id: number) => {
  return prisma.task.delete({
    where: { id },
  })
}
