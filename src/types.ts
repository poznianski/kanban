import {
  DragOverEvent,
  DragStartEvent,
  DraggableAttributes,
} from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
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

export interface IBoardContext {
  board: IBoard | null
  setBoard: React.Dispatch<React.SetStateAction<IBoard | null>>
  errorMessage: string | null
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  fetchBoardById: (boardId: string) => Promise<void>
  createBoard: () => Promise<void>
  updateBoard: (board: IBoard) => Promise<void>
  boardName: string
  setBoardName: React.Dispatch<React.SetStateAction<string>>
  tasks: ITask[]
  handleDragEnd: () => Promise<void>
  handleDragStart: (event: DragStartEvent) => void
  handleDragOver: (event: DragOverEvent) => void
  activeId: string | null
  updateTask: (task: ITask) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  addTask: () => Promise<void>
  isLoading: boolean
}

export interface ITaskInfo {
  title: string
  description: string
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes
}

export interface ITaskInfoEditMode {
  title: string
  handleInputKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  warning: boolean
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  maxTitleLength: number
}
