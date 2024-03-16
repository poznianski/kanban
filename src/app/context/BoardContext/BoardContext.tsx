'use client'

import React, { createContext, ReactNode, useState } from 'react'

import { initialState } from '@/app/context/BoardContext/initialValue'
import useBoard from '@/app/hooks/useBoard'
import { useDnD } from '@/app/hooks/useDnD'
import useTask from '@/app/hooks/useTask'
import { IBoardContext } from '@/types/types'

export const BoardContext = createContext<IBoardContext>(initialState)

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    board,
    setBoard,
    boardName,
    setBoardName,
    isLoading,
    setIsLoading,
    fetchBoardById,
    createBoard,
    updateBoard,
  } = useBoard()

  const {
    tasks,
    setTasks,
    activeId,
    setActiveId,
    tasksToRevert,
    setTasksToRevert,
    addTask,
    deleteTask,
    updateTask,
  } = useTask(board)

  const { handleDragStart, handleDragEnd, handleDragOver } = useDnD(
    tasks,
    setTasks,
    setActiveId,
  )

  const value = {
    errorMessage,
    setErrorMessage,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    board,
    setBoard,
    boardName,
    setBoardName,
    isLoading,
    setIsLoading,
    fetchBoardById,
    createBoard,
    updateBoard,
    tasksToRevert,
    setTasksToRevert,
    addTask,
    deleteTask,
    updateTask,
    tasks,
    setTasks,
    activeId,
    setActiveId,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
