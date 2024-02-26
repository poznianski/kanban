'use client'

import { initialState } from '@/app/context/BoardContext/initialValue'
import { IBoard, IBoardContext } from '@/types'
import { UNEXPECTED_ERROR } from '@/utils/constants'
import axios from 'axios'
import React, { ReactNode, useState } from 'react'

export const BoardContext = React.createContext<IBoardContext>(initialState)

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
  // const updateTaskTitle = () => {}

  // const updateTaskClient = async ({
  //   id,
  //   title,
  //   description,
  //   status,
  //   position,
  // }: ITask) => {
  //   try {
  //     const newTasks = tasks?.map((task) => {
  //       if (task.id !== id) return task
  //
  //       return { ...task, title, description }
  //     })
  //
  //     setTasks(newTasks)
  //
  //     // await axios.put(`/api/task/${id}`, {
  //     //   title,
  //     //   description,
  //     //   status,
  //     //   position,
  //     // })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const value = {
    fetchBoardById,
    board,
    error,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
