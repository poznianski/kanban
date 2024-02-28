import { IBoardContext } from '@/types'

export const initialState: IBoardContext = {
  board: null,
  error: '',
  setError: () => {},
  fetchBoardById: () => {
    throw new Error('fetchBoardById placeholder')
  },
  // updateTaskClient: () => {
  //   throw new Error('updateTaskClient placeholder')
  // },
  // updateTaskTitle: () => {
  //   throw new Error('updateTaskTitle placeholder')
  // },
}
