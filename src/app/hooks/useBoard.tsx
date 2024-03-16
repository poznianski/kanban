import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { boardService } from '@/app/services/boardService'
import { IBoard } from '@/types/types'

const useBoard = () => {
  const { errorMessage, setErrorMessage } = useContext(BoardContext)
  const [board, setBoard] = useState<IBoard | null>(null)
  const [boardName, setBoardName] = useState(``)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBoardById = async (boardId: string) => {
    setIsLoading(true)
    try {
      const { data } = await boardService.getBoardById(boardId)
      setBoard(data)
      setErrorMessage('')
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      setErrorMessage(error.response.data)
      toast.error(errorMessage)
    }
  }

  const createBoard = async () => {
    setIsLoading(true)
    try {
      const newBoard = await boardService.createBoard({ name: 'New Board' })

      setBoard(newBoard)
      await fetchBoardById(newBoard.id)
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const updateBoard = async ({ id, name }: IBoard) => {
    const previousName = board?.name

    const updatedBoard: IBoard = {
      id,
      name,
    }

    setBoard(updatedBoard)

    try {
      const updatedBoard = await boardService.updateBoard({ id, name })

      setBoard(updatedBoard)
    } catch (error: any) {
      setBoardName(previousName || '')
      toast.error(error.message)
    }
  }

  return {
    board,
    setBoard,
    boardName,
    setBoardName,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
    fetchBoardById,
    createBoard,
    updateBoard,
  }
}

export default useBoard
