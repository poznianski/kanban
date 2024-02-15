import Button from '@/app/components/Button/Button'
import SearchInput from '@/app/components/SearchInput/SearchInput'

const Header = () => {
  return (
    <header className="flex gap-20 mb-10">
      <SearchInput />
      <Button />
    </header>
  )
}

export default Header
