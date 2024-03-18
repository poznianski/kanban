import React, { useContext, useState } from 'react'

import Button from '@/app/components/Button/Button'
import SearchInput from '@/app/components/SearchInput/SearchInput'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { InputChangeEvent } from '@/types/types'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { fetchBoardById } = useContext(BoardContext)
  const buttonDisabled = !searchQuery

  const handleSearchChange = (event: InputChangeEvent) => {
    setSearchQuery(event.target.value)
  }

  const handleClick = () => {
    fetchBoardById(searchQuery)
  }

  return (
    <header className="container mx-auto">
      <form className="mb-5 flex flex-col items-center gap-4 sm:mb-10 sm:flex-row  sm:gap-20">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <div className="w-[200px]">
          <Button
            onClick={handleClick}
            label="Load"
            disabled={buttonDisabled}
          />
        </div>
      </form>
    </header>
  )
}

export default Header
