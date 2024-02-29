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
  await httpClient.put(`/task/${id}`, {
    title,
    description,
    status,
    position,
  })
}

export const taskService = { addTask, deleteTask, updateTask }
