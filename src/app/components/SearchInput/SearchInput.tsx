import React from 'react'

interface ISearchInput {
  searchQuery: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput = ({ searchQuery, handleSearchChange }: ISearchInput) => {
  return (
    <input
      type="text"
      placeholder="Enter a board ID here..."
      className="w-full rounded bg-bg-secondary px-5 py-2.5 pr-10
        text-text-main outline-none placeholder:text-text-main"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  )
}

export default SearchInput
