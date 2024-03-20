import { useContext, useState } from 'react'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import useError from '@/app/hooks/useError/useError'
import { boardService } from '@/app/services/boardService'
import { IBoard } from '@/types/types'

const useBoard = () => {
  const { errorMessage, setErrorMessage } = useContext(BoardContext)
  const [board, setBoard] = useState<IBoard | null>(null)
  const [boardName, setBoardName] = useState(``)
  const [isLoading, setIsLoading] = useState(false)
  const handleError = useError()

  const fetchBoardById = async (boardId: string) => {
    setIsLoading(true)
    try {
      const { data } = await boardService.getBoardById(boardId)
      setBoard(data)
      setBoardName(data.name)
      setErrorMessage('')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      handleError(error)
    }
  }

  const createBoard = async () => {
    setIsLoading(true)
    try {
      const newBoard = await boardService.createBoard({ name: 'New Board' })

      setBoard(newBoard)
      setBoardName(newBoard.name)
      await fetchBoardById(newBoard.id)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      handleError(error)
    }
  }

  const updateBoard = async ({ id, name }: IBoard) => {
    const previousName = board?.name

    setBoardName(name)

    try {
      const updatedBoard = await boardService.updateBoard({ id, name })

      setBoardName(updatedBoard.name)
    } catch (error) {
      setBoardName(previousName || '')
      handleError(error)
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
