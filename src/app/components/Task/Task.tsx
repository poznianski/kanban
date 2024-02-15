import { ITask } from '@/app/api/task/service'

const Task = ({ title, description }: ITask) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Task
