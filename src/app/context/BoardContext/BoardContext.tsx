'use client'

import { initialState } from '@/app/context/BoardContext/initialValue'
import { boardService } from '@/app/services/boardService'
import { IBoard, IBoardContext } from '@/types'
import React, { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

export const BoardContext = React.createContext<IBoardContext>(initialState)

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<IBoard | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchBoardById = async (boardId: string) => {
    try {
      const { data } = await boardService.getBoardById(boardId)
      setBoard(data)
      setErrorMessage('')
    } catch (error: any) {
      setErrorMessage(error.response.data)
      toast.error(errorMessage)
    }
  }

  const value = {
    fetchBoardById,
    board,
    errorMessage,
    setErrorMessage,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
