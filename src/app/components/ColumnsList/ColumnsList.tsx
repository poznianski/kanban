import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { taskService } from '@/app/services/taskService'
import { ITask } from '@/types'
import { UNEXPECTED_ERROR } from '@/utils/constants'
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
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  { id: 'ToDo', title: 'ToDo' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
]

const ColumnsList = () => {
  const { board, errorMessage, setErrorMessage } = useContext(BoardContext)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setTasks(board?.tasks || [])
  }, [board?.tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  if (!tasks) {
    return <div>Loading</div>
  }

  const activeTask = tasks.find((task) => task.id === activeId)

  if (!board) {
    return (
      <h1 className="text-center text-3xl">
        No data to display. Paste the ID and press the button
      </h1>
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
    }

    setTasks((prev) => [...prev, newTask])

    try {
      const createdTask = await taskService.addTask(board.id, newTask)

      setTasks((prev) => {
        return prev.map((task) => (task.id === newTask.id ? createdTask : task))
      })
      toast.success('Task successfully created')
    } catch (error: unknown) {
      setTasks((prev) => prev.filter((task) => task.id !== newTask.id))
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(UNEXPECTED_ERROR)
      }
      toast.error(errorMessage)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!board) return

    const previousTasks = tasks

    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)

    try {
      await taskService.deleteTask(board.id, taskId)
    } catch (error: unknown) {
      setTasks(previousTasks)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(UNEXPECTED_ERROR)
      }
      toast(errorMessage)
    }
  }

  const handleDragEnd = () => {
    setActiveId(null)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const isOverATask = over.data.current?.type === 'Task'

    // dropping a Task over another Task
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

    // dropping a Task over a Column
    const isOverAColumn = over.data.current?.type === 'Column'

    if (isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id)

        tasks[activeIndex].status = over.id as string

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
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
            <h1 className="mb-2 text-center text-3xl">Name: {board.name}</h1>
            <h1 className="mb-2 text-center text-2xl">ID: {board.id}</h1>
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
              />
            )}
          </DragOverlay>
        </section>
      </DndContext>
    )
  }
}

export default ColumnsList
