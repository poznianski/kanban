import React from 'react'

export interface IBoard {
  id: string
  name: string
  tasks?: ITask[]
}

export interface ITask {
  id: string
  boardId: string
  title: string
  description: string
  status: string
  position: number
}

export interface ITaskProps extends ITask {
  deleteTask: (taskId: string) => void
  updateTask: (task: ITask) => void
}

export interface IBoardContext {
  board: IBoard | null
  setBoard: React.Dispatch<React.SetStateAction<IBoard | null>>
  errorMessage: string | null
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  fetchBoardById: (boardId: string) => Promise<void>
}
