import SearchInput from '@/app/components/SearchInput/SearchInput'
import { renderBoardContext } from '@/utils/renderBoardContext'
import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

describe('SearchInput', () => {
  const mockHandleSearchChange = vi.fn()
  const mockFetchBoardById = vi.fn()

  beforeEach(() => {
    mockHandleSearchChange.mockClear()
    mockFetchBoardById.mockClear()
  })

  test('calls fetchBoardById on Enter key press', () => {
    renderBoardContext(
      <SearchInput
        searchQuery="test"
        handleSearchChange={mockHandleSearchChange}
      />,
      {
        providerProps: { fetchBoardById: mockFetchBoardById },
      },
    )

    const input = screen.getByPlaceholderText('Enter a board ID here...')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(mockFetchBoardById).toHaveBeenCalledWith('test')
  })

  test('does not call fetchBoardById on other key press', () => {
    renderBoardContext(
      <SearchInput
        searchQuery="test"
        handleSearchChange={mockHandleSearchChange}
      />,
      {
        providerProps: { fetchBoardById: mockFetchBoardById },
      },
    )

    const input = screen.getByPlaceholderText('Enter a board ID here...')
    fireEvent.keyDown(input, { key: 'a' })
    expect(mockFetchBoardById).not.toHaveBeenCalled()
  })
})
