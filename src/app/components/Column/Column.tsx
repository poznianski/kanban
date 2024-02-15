import { ITask } from '@/app/api/task/service'
import Task from '@/app/components/Task/Task'

interface IColumn {
  title: string
  tasks?: ITask[]
}

const Column = ({ title }: IColumn) => {
  return (
    <div className="flex-1 p-4 shadow-md shadow-theme-secondary bg-bg-secondary">
      <h1>{title}</h1>
      <Task
        title="Finish test"
        boardId={'123'}
        id={'123'}
      />
    </div>
  )
}

export default Column
