import Header from '@/app/components/Header/Header'
import { renderBoardContext } from '@/utils/renderBoardContext'
import '@testing-library/jest-dom/vitest'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const mockFetchBoardById = vi.fn()

describe('Header', () => {
  beforeEach(() => {
    mockFetchBoardById.mockClear()
  })

  test('updates search query on input change', () => {
    const providerProps = {
      fetchBoardById: mockFetchBoardById,
    }
    renderBoardContext(<Header />, { providerProps })

    const input = screen.getByPlaceholderText(
      'Enter a board ID here...',
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'new board' } })
    expect(input.value).toBe('new board')
  })

  test('calls fetchBoardById with the search query when load button is clicked', () => {
    const providerProps = { fetchBoardById: mockFetchBoardById }
    renderBoardContext(<Header />, { providerProps })

    const input = screen.getByPlaceholderText('Enter a board ID here...')
    fireEvent.change(input, { target: { value: 'new board' } })

    const loadButton = screen.getByRole('button')
    fireEvent.click(loadButton)
    expect(mockFetchBoardById).toHaveBeenCalledWith('new board')
  })

  test('fetchBoardById should not be called when searchInput is empty and button should be disabled', () => {
    const providerProps = { fetchBoardById: mockFetchBoardById }
    renderBoardContext(<Header />, { providerProps })

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(mockFetchBoardById).not.toHaveBeenCalled()
  })
})
