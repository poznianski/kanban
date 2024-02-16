'use client'

import { IBoard } from '@/app/api/board/service'
import { UNEXPECTED_ERROR } from '@/utils/constants'
import axios from 'axios'
import React, { ReactNode, useState } from 'react'

interface IBoardContext {
  board: IBoard | null
  error: string
  fetchBoardById: (boardId: string) => Promise<void>
}

const initialValue: IBoardContext = {
  board: null,
  error: '',
  fetchBoardById: () => {
    throw new Error('fetchBoardById placeholder')
  },
}

export const BoardContext = React.createContext<IBoardContext>(initialValue)

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<IBoard | null>(null)
  const [error, setError] = useState('')

  const fetchBoardById = async (boardId: string) => {
    try {
      if (boardId) {
        const { data } = await axios.get(`/api/board/${boardId}`)
        setBoard(data)
        setError('')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error)
      } else {
        setError(UNEXPECTED_ERROR)
      }
    }
  }

  const value = {
    fetchBoardById,
    board,
    error,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
