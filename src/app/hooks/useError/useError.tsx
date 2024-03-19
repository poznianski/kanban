import { useContext } from 'react'
import { toast } from 'react-toastify'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { MESSAGES } from '@/utils/constants'

const useError = () => {
  const { setErrorMessage } = useContext(BoardContext)

  return (error: any, message?: string) => {
    const errorMessage =
      (error && error.message) || message || MESSAGES.UNEXPECTED_ERROR
    setErrorMessage(errorMessage)
    toast.error(errorMessage)
  }
}

export default useError
