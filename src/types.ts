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
  position?: number
}

export interface ITaskProps extends ITask {
  deleteTask: (taskId: string) => void
}

export interface IBoardContext {
  board: IBoard | null
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  fetchBoardById: (boardId: string) => Promise<void>
}
