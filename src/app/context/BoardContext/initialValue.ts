import { IBoard } from '@/app/api/board/service'

export interface IBoardContext {
  board: IBoard | null
  error: string
  fetchBoardById: (boardId: string) => Promise<void>
}

export const initialValue: IBoardContext = {
  board: null,
  error: '',
  fetchBoardById: () => {
    throw new Error('fetchBoardById placeholder')
  },
}
