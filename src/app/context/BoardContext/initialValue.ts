import { DragOverEvent, DragStartEvent } from '@dnd-kit/core'

import { IBoard, IBoardContext, ITask } from '@/types/types'

export const initialState: IBoardContext = {
  board: null,
  setBoard: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  fetchBoardById: async (_boardId: string) => {
    throw new Error('fetchBoardById not implemented')
  },
  createBoard: async () => {
    throw new Error('createBoard not implemented')
  },
  updateBoard: async (_board: IBoard) => {
    throw new Error('updateBoard not implemented')
  },
  boardName: '',
  setBoardName: () => {},
  tasks: [],
  handleDragEnd: async () => {
    throw new Error('handleDragEnd not implemented')
  },
  handleDragStart: (_event: DragStartEvent) => {
    throw new Error('handleDragStart not implemented')
  },
  handleDragOver: (_event: DragOverEvent) => {
    throw new Error('handleDragOver not implemented')
  },
  activeId: null,
  updateTask: async (_task: ITask) => {
    throw new Error('updateTask not implemented')
  },
  deleteTask: async (_taskId: string) => {
    throw new Error('deleteTask not implemented')
  },
  addTask: async () => {
    throw new Error('addTask not implemented')
  },
  isLoading: false,
}
