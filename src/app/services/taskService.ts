import httpClient from '@/app/services/httpClient'
import { ITask } from '@/types'

const addTask = async (boardId: string, task: ITask) => {
  const { data } = await httpClient.post(`/board/${boardId}/tasks`, task)

  return data
}

const deleteTask = async (boardId: string, taskId: string) => {
  await httpClient.delete(`/board/${boardId}/tasks/${taskId}`)
}

export const taskService = { addTask, deleteTask }
