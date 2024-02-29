import httpClient from '@/app/services/httpClient'
import { ITask } from '@/types'

const addTask = async (boardId: string, task: ITask) => {
  const { data } = await httpClient.post(`/board/${boardId}/tasks`, task)

  return data
}

const deleteTask = async (taskId: string) => {
  await httpClient.delete(`/task/${taskId}`)
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

export const taskService = { addTask, deleteTask, updateTask }
