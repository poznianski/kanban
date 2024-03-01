import httpClient from '@/app/services/httpClient'

const getBoardById = async (id: string) => {
  return await httpClient.get(`/board/${id}`)
}

const createBoard = async (name: string) => {
  const { data } = await httpClient.post('/board', name)

  return data
}

export const boardService = {
  getBoardById,
  createBoard,
}
