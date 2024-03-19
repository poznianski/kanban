import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}))
import { toast } from 'react-toastify'

import useError from '@/app/hooks/useError/useError'
import { MESSAGES } from '@/utils/constants'

describe('useError', () => {
  it('should call toast.error with the error message when error is provided', () => {
    const { result } = renderHook(() => useError())
    const error = new Error('Test error')

    act(() => {
      result.current(error)
    })

    expect(toast.error).toHaveBeenCalledWith(error.message)
  })

  it('should call toast.error with the provided message when message is provided', () => {
    const { result } = renderHook(() => useError())
    const message = 'Test message'

    act(() => {
      result.current(null, message)
    })

    expect(toast.error).toHaveBeenCalledWith(message)
  })

  it('should call toast.error with the default message when neither error nor message is provided', () => {
    const { result } = renderHook(() => useError())

    act(() => {
      result.current(null)
    })

    expect(toast.error).toHaveBeenCalledWith(MESSAGES.UNEXPECTED_ERROR)
  })

  it('should call toast.error with the default message when error is an object without a message property', () => {
    const { result } = renderHook(() => useError())
    const error = {}

    act(() => {
      result.current(error)
    })

    expect(toast.error).toHaveBeenCalledWith(MESSAGES.UNEXPECTED_ERROR)
  })

  it('should call toast.error with the error message when both error and message are provided', () => {
    const { result } = renderHook(() => useError())
    const error = new Error('Test error')
    const message = 'Test message'

    act(() => {
      result.current(error, message)
    })

    expect(toast.error).toHaveBeenCalledWith(error.message)
  })
})
