import Button from '@/app/components/Button/Button'
import SearchInput from '@/app/components/SearchInput/SearchInput'
import React, { useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <header className="flex gap-20 mb-10">
      <SearchInput
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <Button searchQuery={searchQuery} />
    </header>
  )
}

export default Header
