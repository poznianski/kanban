'use client'

import { initialState } from '@/app/context/BoardContext/initialValue'
import { IBoard, IBoardContext } from '@/types'
import { UNEXPECTED_ERROR } from '@/utils/constants'
import axios from 'axios'
import React, { ReactNode, useState } from 'react'

export const BoardContext = React.createContext<IBoardContext>(initialState)

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<IBoard | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchBoardById = async (boardId: string) => {
    try {
      if (boardId) {
        const { data } = await axios.get(`/api/board/${boardId}`)
        setBoard(data)
        setErrorMessage('')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(UNEXPECTED_ERROR)
      }
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
