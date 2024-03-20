import {
  DraggableAttributes,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IBoard {
  id: string
  name: string
  tasks?: ITask[]
}

export interface ITask {
  id: number
  boardId: string
  title: string
  description: string
  status: string
  position?: number
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
  setTasks: React.Dispatch<SetStateAction<ITask[]>>
  handleDragEnd: () => Promise<void>
  handleDragStart: (event: DragStartEvent) => void
  handleDragOver: (event: DragOverEvent) => void
  activeId: number | null
  setActiveId: Dispatch<SetStateAction<number | null>>
  updateTask: (task: ITask) => Promise<void>
  deleteTask: (taskId: number) => Promise<void>
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
}

export interface ITaskActions {
  editMode: boolean
  onSave: () => void
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}

export interface IModalWrapper {
  children: ReactNode
  onClose: () => void
}

export interface IConfirmDelete {
  onClose: () => void
  onConfirm: () => void
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type InputKeyEvent = React.KeyboardEvent<HTMLInputElement>
export type KeyboardEvent = React.KeyboardEvent<
  HTMLInputElement | HTMLTextAreaElement
>
