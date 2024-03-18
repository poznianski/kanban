import { ITask } from '@/types/types'

export const findTaskIndexById = (tasks: ITask[], id: number) => {
  return tasks.findIndex((task) => task.id === id)
}
