import { useState } from 'react'
import { toast } from 'react-toastify'

import useError from '@/app/hooks/useError'
import { taskService } from '@/app/services/taskService'
import { IBoard, ITask } from '@/types/types'
import { MESSAGES } from '@/utils/constants'
import { generateId } from '@/utils/generateId'

const useTask = (board: IBoard | null) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])
  const handleError = useError()

  const addTask = async () => {
    if (!board) return

    const newTask: ITask = {
      id: generateId(),
      title: `New Task ${tasks.length + 1}`,
      status: 'ToDo',
      boardId: board.id,
      description: 'description',
      position:
        tasks.length === 0
          ? 0
          : Math.max(...tasks.map((task) => task.position)),
    }

    setTasks((prev) => [...prev, newTask])

    try {
      const createdTask = await taskService.addTask(board.id, newTask)

      setTasks((prev) => {
        return prev.map((task) => (task.id === newTask.id ? createdTask : task))
      })
      toast.success(MESSAGES.TASK_CREATED)
    } catch (error) {
      setTasks((prev) => prev.filter((task) => task.id !== newTask.id))
      handleError(error)
    }
  }

  const deleteTask = async (taskId: number) => {
    if (!board) return

    const previousTasks = [...tasks]

    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)

    try {
      await taskService.deleteTask(taskId)
      toast.success(MESSAGES.TASK_DELETED)
    } catch (error) {
      setTasks(previousTasks)
      handleError(error)
    }
  }

  const updateTask = async ({
    id,
    title,
    description,
    status,
    position,
  }: ITask) => {
    const prevTasks = [...tasks]

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title, description, status, position }
          : task,
      ),
    )

    try {
      if (board) {
        const updatedTask = await taskService.updateTask({
          id,
          title,
          description,
          status,
          position,
          boardId: board.id,
        })
        setTasks((prev) => {
          return prev.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          )
        })

        toast.success(MESSAGES.TASK_UPDATED)
      }
    } catch (error: any) {
      setTasks(prevTasks)
      handleError(error)
    }
  }

  return {
    tasks,
    setTasks,
    activeId,
    setActiveId,
    tasksToRevert,
    setTasksToRevert,
    addTask,
    deleteTask,
    updateTask,
  }
}

export default useTask
