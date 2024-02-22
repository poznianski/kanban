import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import React, { useContext } from 'react'

interface ISearchInput {
  searchQuery: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput = ({ searchQuery, handleSearchChange }: ISearchInput) => {
  const { fetchBoardById } = useContext(BoardContext)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchBoardById(searchQuery)
    }
  }

  return (
    <input
      type="text"
      placeholder="Enter a board ID here..."
      className="w-full rounded bg-bg-secondary px-5 py-2.5 pr-10
        text-text-main outline-none placeholder:text-text-main"
      value={searchQuery}
      onChange={handleSearchChange}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  )
}

export default SearchInput
