import Button from '@/app/components/Button/Button'
import SearchInput from '@/app/components/SearchInput/SearchInput'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import React, { useContext, useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { fetchBoardById } = useContext(BoardContext)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <header className="mb-10 flex gap-20">
      <SearchInput
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      <Button
        onClick={() => fetchBoardById(searchQuery)}
        label="Load"
      />
    </header>
  )
}

export default Header
