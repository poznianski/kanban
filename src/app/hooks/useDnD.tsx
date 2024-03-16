import { DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { taskService } from '@/app/services/taskService'
import { ITask } from '@/types/types'
import { TASK_POSITIONS_UPDATE } from '@/utils/constants'

export const useDnD = (
  tasks: ITask[],
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  setActiveId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const { errorMessage, setErrorMessage } = useContext(BoardContext)
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(+active.id)

    setTasksToRevert(tasks)
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

        tasks[activeIndex].status = String(over.id)

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  }
}
