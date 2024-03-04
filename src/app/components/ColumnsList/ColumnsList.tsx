import Button from '@/app/components/Button/Button'
import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import CopyIcon from '@/app/icons/CopyIcon'
import { boardService } from '@/app/services/boardService'
import { taskService } from '@/app/services/taskService'
import { IBoard, ITask } from '@/types'
import {
  COPY,
  TASK_CREATED,
  TASK_DELETED,
  TASK_POSITIONS_UPDATE,
  TASK_UPDATE,
} from '@/utils/constants'
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  { id: 'ToDo', title: 'ToDo' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
]

const ColumnsList = () => {
  const { board, setBoard, errorMessage, setErrorMessage } =
    useContext(BoardContext)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tasksToRevert, setTasksToRevert] = useState<ITask[]>([])
  const [tooltipMessage, setTooltipMessage] = useState(COPY)
  const [editMode, setEditMode] = useState(false)
  const [boardName, setBoardName] = useState('')
  const activeTask = tasks.find((task) => task.id === activeId)

  useEffect(() => {
    setTasks(board?.tasks || [])
    setBoardName(board?.name || '')
  }, [board?.name, board?.tasks])

  useEffect(() => {
    setBoard(board)
  }, [board, setBoard])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const updateBoard = async ({ id, name }: IBoard) => {
    const previousName = board?.name

    const updatedBoard: IBoard = {
      id,
      name,
    }

    setBoard(updatedBoard)

    try {
      const updatedBoard = await boardService.updateBoard({ id, name })

      setBoard(updatedBoard)
    } catch (error: any) {
      setBoardName(previousName || '')
      toast.error(error.message)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBoardNameUpdate()
    }
  }

  const handleBoardNameUpdate = () => {
    if (board) {
      updateBoard({ id: board.id, name: boardName })
      setEditMode(false)
    }
  }

  const createBoard = async () => {
    try {
      const newBoard = await boardService.createBoard({ name: 'New Board' })

      setBoard(newBoard)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (!board) {
    return (
      <>
        <h1 className="mb-2 text-center text-3xl">
          No data to display. Paste the ID and press Load <br />
          OR
        </h1>

        <div className="flex justify-center">
          <Button
            label="Create a Board"
            isAdd
            onClick={createBoard}
          />
        </div>
      </>
    )
  }

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

  const handleCopyId = () => {
    navigator.clipboard.writeText(board.id)
    setTooltipMessage('Copied!')
  }

  if (board) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <section className="flex flex-col gap-5 ">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <h1 className="mb-3 mr-2 text-center text-3xl">Name:</h1>

              <div className="w-[300px]">
                {!editMode ? (
                  <h1
                    onClick={() => setEditMode(true)}
                    className="mb-2 inline text-center text-3xl"
                  >
                    {boardName}
                  </h1>
                ) : (
                  <input
                    autoFocus
                    className="mb-2 border-2 border-text-main bg-bg-main text-left text-3xl outline-none"
                    value={boardName}
                    onBlur={() => handleBoardNameUpdate()}
                    onChange={(e) => setBoardName(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="mb-2 text-center text-2xl">
                ID: {board.id}
                <Tooltip
                  id="copy"
                  border="1px solid #00796B"
                />
              </p>

              <span
                data-tooltip-id="copy"
                data-tooltip-content={tooltipMessage}
                className="ml-2 cursor-pointer"
              >
                <span
                  onClick={handleCopyId}
                  className="inline-flex cursor-pointer text-theme-main"
                >
                  <CopyIcon />
                </span>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-5 overflow-x-auto">
              <SortableContext items={columns}>
                {columns.map(({ title, id }) => (
                  <Column
                    key={id}
                    title={title}
                    tasks={tasks.filter((task) => task?.status === id)}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          <DragOverlay>
            {activeTask && (
              <Task
                key={activeTask.id}
                title={activeTask.title}
                boardId={activeTask.boardId}
                id={activeTask.id}
                status={activeTask.status}
                description={activeTask.description}
                deleteTask={deleteTask}
                updateTask={updateTask}
                position={activeTask.position}
              />
            )}
          </DragOverlay>
        </section>
      </DndContext>
    )
  }
}

export default ColumnsList
