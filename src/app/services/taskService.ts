import httpClient from '@/app/services/httpClient'
import { ITask } from '@/types/types'

const addTask = async (boardId: string, task: ITask) => {
  const { data } = await httpClient.post(`/board/${boardId}/tasks`, task)

  return data
}

const deleteTask = async (id: number) => {
  await httpClient.delete(`/task/${id}`)
}

const updateTask = async ({
  id,
  title,
  description,
  status,
  position,
}: ITask) => {
  const { data } = await httpClient.put(`/task/${id}`, {
    title,
    description,
    status,
    position,
  })

  return data
}

const updateTasksPositions = async (tasks: ITask[]) => {
  const { data } = await httpClient.post(`/task/update-positions`, tasks)

  return data
}

export const taskService = {
  addTask,
  deleteTask,
  updateTask,
  updateTasksPositions,
}
