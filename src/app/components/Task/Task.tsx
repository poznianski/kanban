import { ITask } from '@/app/api/task/service'

const Task = ({ title, description }: ITask) => {
  return (
    <div className="p-2 bg-theme-main mb-4 rounded cursor-grab">
      <h1 className="text-center text-xl font-bold">{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Task
