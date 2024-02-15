import Column from '@/app/components/Column/Column'

const ColumnsList = () => {
  const columns = [
    { title: 'ToDo' },
    { title: 'In Progress' },
    { title: 'Done' },
  ]

  return (
    <section className="flex gap-5">
      <h1 className="mb-2"></h1>

      {columns.map(({ title }, index) => (
        <Column
          key={index}
          title={title}
        />
      ))}
    </section>
  )
}

export default ColumnsList
