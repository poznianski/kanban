import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { initialTasks } from '@/app/context/BoardContext/initialValue'
import { ITask } from '@/types'
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
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const initialColumns = [
  { id: 'ToDo', title: 'ToDo' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
]

const ColumnsList = () => {
  const { board, error } = useContext(BoardContext)
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTask = tasks.find((task) => task.id === activeId)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  if (error) {
    return <h1 className="text-center text-3xl">{error}</h1>
  }

  const addTask = () => {
    if (board) {
      const newTask: ITask = {
        id: uuidv4(),
        title: 'New Task',
        status: 'ToDo',
        boardId: board.id,
        description: 'description',
      }

      setTasks([...tasks, newTask])
    }

    //TODO: add backend
  }

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
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
        <section className="flex flex-col items-center gap-5 ">
          <div className="flex flex-col items-center justify-center">
            {error && <h1>{error}</h1>}
            <h1 className="mb-2 text-3xl">Name: {board.name}</h1>
            <h1 className="mb-2 text-2xl">ID: {board.id}</h1>
          </div>

          <div className="flex w-full">
            <div className="flex min-w-full gap-5 overflow-x-auto">
              <SortableContext items={initialColumns}>
                {initialColumns.map(({ title, id }, index) => (
                  <Column
                    key={index}
                    title={title}
                    tasks={tasks.filter((task) => task.status === id)}
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
