import { BoardContext } from '@/app/context/BoardContext'
import { useContext } from 'react'

const Button = ({ searchQuery }: { searchQuery: string }) => {
  const { fetchBoardById } = useContext(BoardContext)

  return (
    <button
      type="button"
      className="inline-flex h-[50px] w-[200px] items-center justify-center gap-2
       rounded transition-all ease-in-out bg-theme-main hover:bg-theme-secondary
       text-bg-secondary hover:text-text-main"
      onClick={() => fetchBoardById(searchQuery)}
    >
      Load
    </button>
  )
}

export default Button
