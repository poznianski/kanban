import httpClient from '@/app/services/httpClient'

const getBoardById = async (id: string) => {
  return await httpClient.get(`/board/${id}`)
}

export const boardService = {
  getBoardById,
}
