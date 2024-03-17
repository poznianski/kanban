import { useContext } from 'react'
import { toast } from 'react-toastify'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { MESSAGES } from '@/utils/constants'

const useError = () => {
  const { setErrorMessage } = useContext(BoardContext)

  return (error: any, message?: string) => {
    setErrorMessage(error.message || message || MESSAGES.UNEXPECTED_ERROR)
    toast.error(error.message || message || MESSAGES.UNEXPECTED_ERROR)
  }
}

export default useError
