import prisma from '../../../../prisma/db'

export interface ITask {
  id: string
  boardId: string
  title: string
  description?: string
  status?: 'ToDo' | 'In Progress' | 'Done'
  position?: number
}

export const getTasksByBoardId = (boardId: string) =>
  prisma.task.findMany({
    where: { boardId },
    orderBy: { position: 'asc' },
  })

export const getTaskById = (id: string) =>
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

  const newPosition = (lastTask._max.position ?? 0) + 1

  return prisma.task.create({
    data: { id, boardId, title, description, status, position: newPosition },
  })
}

export const updateTask = ({
  id,
  title,
  description,
  status,
  position,
}: ITask) =>
  prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      status,
      position,
    },
  })

export const deleteTask = (id: string) =>
  prisma.task.delete({
    where: { id },
  })