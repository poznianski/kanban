import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Header from '@/app/components/Header/Header'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { IBoardContext } from '@/types/types'

describe('Header component', () => {
  it('should render header with search input and load button', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    const searchInput = screen.getByRole('textbox')
    const loadButton = screen.getByRole('button', { name: /load/i })

    expect(header).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(loadButton).toBeInTheDocument()
  })

  it('should disable load button when search input is cleared', async () => {
    render(<Header />)
    const searchInput = screen.getByRole('textbox')
    const loadButton = screen.getByRole('button', { name: /load/i })

    expect(loadButton).toBeDisabled()

    await userEvent.type(searchInput, 'test')
    await waitFor(() => expect(loadButton).toBeEnabled())

    await userEvent.clear(searchInput)
    await waitFor(() => expect(loadButton).toBeDisabled())
  })

  it('should call fetchBoardById with search query when load button is clicked', () => {
    const fetchBoardByIdMock = jest.fn()
    const boardContextValue: Partial<IBoardContext> = {
      fetchBoardById: fetchBoardByIdMock,
    }

    render(
      <BoardContext.Provider value={boardContextValue as IBoardContext}>
        <Header />
      </BoardContext.Provider>,
    )
    const loadButton = screen.getByRole('button', { name: /load/i })
    const searchInput = screen.getByRole('textbox')

    fireEvent.change(searchInput, { target: { value: 'example' } })
    fireEvent.click(loadButton)

    expect(fetchBoardByIdMock).toHaveBeenCalledWith('example')
  })
})
