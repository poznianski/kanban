import React, { useContext, useState } from 'react'

import Button from '@/app/components/Button/Button'
import SearchInput from '@/app/components/SearchInput/SearchInput'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { fetchBoardById } = useContext(BoardContext)
  const buttonDisabled = searchQuery.length === 0

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <header className="container mx-auto">
      <div className="mb-5 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:gap-20">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <div className="w-[200px]">
          <Button
            onClick={() => fetchBoardById(searchQuery)}
            label="Load"
            disabled={buttonDisabled}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
