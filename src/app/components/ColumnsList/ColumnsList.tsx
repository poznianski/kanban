import Column from '@/app/components/Column/Column'
import { BoardContext } from '@/app/context/BoardContext'
import { useContext } from 'react'

const ColumnsList = () => {
  const { board, error } = useContext(BoardContext)

  const columns = [
    { title: 'ToDo' },
    { title: 'In Progress' },
    { title: 'Done' },
  ]

  if (error) {
    return <h1>{error}</h1>
  }

  if (board) {
    return (
      <section className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          {error && <h1>{error}</h1>}
          <h1 className="mb-2 text-3xl">Name: {board?.name}</h1>
          <h1 className="mb-2 text-2xl">ID: {board?.id}</h1>
        </div>

        <div className="flex gap-5">
          {columns.map(({ title }, index) => (
            <Column
              key={index}
              title={title}
            />
          ))}
        </div>
      </section>
    )
  }
}

export default ColumnsList
