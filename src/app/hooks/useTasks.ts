import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { taskService } from '@/app/services/taskService'
import { IBoard, ITask } from '@/types'
import {
  TASK_CREATED,
  TASK_DELETED,
  TASK_POSITIONS_UPDATE,
  TASK_UPDATE,
} from '@/utils/constants'
import { DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

export const useTask = (board: IBoard | null) => {
  const { errorMessage, setErrorMessage } = useContext(BoardContext)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])

  useEffect(() => {
    setTasks(board?.tasks || [])
  }, [board?.tasks])

  const addTask = async () => {
    if (!board) return

    const newTask: ITask = {
      id: uuidv4(),
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

  const deleteTask = async (taskId: string) => {
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

  const handleDragEnd = async () => {
    setActiveId(null)

    const newTasksPositions = tasks.map((task, index) => ({
      ...task,
      status: task.status,
      position: index,
    }))

    try {
      const updatedTasks =
        await taskService.updateTasksPositions(newTasksPositions)
      setTasks(updatedTasks)
      toast.success(TASK_POSITIONS_UPDATE)
    } catch (error: any) {
      setTasks(tasksToRevert)
      setErrorMessage(error.message || 'position update failed')
      toast.error(errorMessage)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    setTasksToRevert(tasks)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const isOverATask = over.data.current?.type === 'Task'

    if (isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id)
        const overIndex = tasks.findIndex((task) => task.id === over.id)

        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          tasks[activeIndex].status = tasks[overIndex].status
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id)

        tasks[activeIndex].status = over.id as string

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    updateTask,
    activeId,
    handleDragOver,
    handleDragEnd,
    handleDragStart,
  }
}
