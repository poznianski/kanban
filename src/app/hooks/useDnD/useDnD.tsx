import { DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import useError from '@/app/hooks/useError/useError'
import { taskService } from '@/app/services/taskService'
import { ITask } from '@/types/types'
import { MESSAGES } from '@/utils/constants'
import { findTaskIndexById } from '@/utils/findTaskIndexById'

export const useDnD = (
  tasks: ITask[],
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  setActiveId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])
  const handleError = useError()

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
      toast.success(MESSAGES.TASK_POSITIONS_UPDATE)
    } catch (error) {
      setTasks(tasksToRevert)
      handleError(error)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const isOverATask = over.data.current?.type === 'Task'

    if (isOverATask) {
      setTasks((tasks) => {
        const activeIndex = findTaskIndexById(tasks, +active.id)
        const overIndex = findTaskIndexById(tasks, +over.id)
        let activeTaskStatus = tasks[activeIndex].status
        const overTaskStatus = tasks[overIndex].status

        if (activeTaskStatus !== overTaskStatus) {
          activeTaskStatus = overTaskStatus
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = findTaskIndexById(tasks, +active.id)

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
