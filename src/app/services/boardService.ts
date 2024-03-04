import httpClient from '@/app/services/httpClient'
import { IBoard } from '@/types'

const getBoardById = async (id: IBoard) => {
  return await httpClient.get(`/board/${id}`)
}

const createBoard = async ({ name }: { name: string }) => {
  const { data } = await httpClient.post('/board', { name })

  return data
}

const updateBoard = async ({ name, id }: IBoard) => {
  const { data } = await httpClient.put(`/board`, { name, id })

  return data
}

export const boardService = {
  getBoardById,
  createBoard,
  updateBoard,
}
