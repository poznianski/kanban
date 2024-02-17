import { ITask } from '@/app/api/task/service'
import Task from '@/app/components/Task/Task'

interface IColumn {
  title: string
  tasks?: ITask[]
}

const Column = ({ title, tasks }: IColumn) => {
  return (
    <div className="flex-1 p-4 shadow-md shadow-theme-secondary bg-bg-secondary">
      <h1 className="mb-4 text-xl font-bold text-center">{title}</h1>

      {tasks?.map(({ id, title, boardId, description }) => (
        <Task
          key={id}
          title={title}
          boardId={boardId}
          id={boardId}
          description={description}
        />
      ))}
    </div>
  )
}

export default Column
