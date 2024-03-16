import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { taskService } from '@/app/services/taskService'
import { IBoard, ITask } from '@/types/types'
import { TASK_CREATED, TASK_DELETED, TASK_UPDATE } from '@/utils/constants'
import { generateId } from '@/utils/generateId'

const useTask = (board: IBoard | null) => {
  const { errorMessage, setErrorMessage } = useContext(BoardContext)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])

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
      toast.success(TASK_CREATED)
    } catch (error: any) {
      setTasks((prev) => prev.filter((task) => task.id !== newTask.id))
      setErrorMessage(error.message)
      toast.error(errorMessage)
    }
  }

  const deleteTask = async (taskId: number) => {
    if (!board) return

    const previousTasks = [...tasks]

    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)

    try {
      await taskService.deleteTask(taskId)
      toast.success(TASK_DELETED)
    } catch (error: any) {
      setTasks(previousTasks)
      setErrorMessage(error.message)
      toast.error(errorMessage)
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

        toast.success(TASK_UPDATE)
      }
    } catch (error: any) {
      setTasks(prevTasks)
      setErrorMessage(error.message)
      toast.error(errorMessage)
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
