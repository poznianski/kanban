import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import SearchInput from '@/app/components/SearchInput/SearchInput'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { IBoardContext } from '@/types/types'

describe('SearchInput', () => {
  it('should call fetchBoardById when Enter key is pressed', () => {
    const fetchBoardByIdMock = jest.fn()

    const boardContextValue: Partial<IBoardContext> = {
      fetchBoardById: fetchBoardByIdMock,
    }

    render(
      <BoardContext.Provider value={boardContextValue as IBoardContext}>
        <SearchInput
          searchQuery=""
          handleSearchChange={() => {}}
        />
      </BoardContext.Provider>,
    )

    const inputElement = screen.getByRole('textbox')

    fireEvent.keyDown(inputElement, { key: 'Enter' })

    expect(fetchBoardByIdMock).toHaveBeenCalledWith('')
  })
})
