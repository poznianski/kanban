import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useContext, useState } from 'react'

const ColumnsList = () => {
  const { board, error, tasks, setTasks } = useContext(BoardContext)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const activeTask = tasks.find((task) => task.id === activeId)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const columns = [
    { title: 'ToDo', status: 'ToDo' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Done', status: 'Done' },
  ]

  if (error) {
    return <h1 className="text-center text-3xl">{error}</h1>
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      return
    }

    const activeTask = tasks.find((task) => task.id === active.id)
    const overTask = tasks.find((task) => task.id === over.id)

    if (!activeTask) {
      return
    }

    if (!overTask) {
      const overColumn = columns.find((column) => column.title === over.id)
      if (overColumn) {
        const newTasks = tasks.map((task) => {
          if (task.id === active.id) {
            return { ...task, status: overColumn.status }
          }
          return task
        })
        setTasks(newTasks)
        //TODO: add backend
      }
    } else if (activeTask.status === overTask.status) {
      // Moving within the same column
      const activeIndex = tasks.indexOf(activeTask)
      const overIndex = tasks.indexOf(overTask)
      const newTasks = arrayMove(tasks, activeIndex, overIndex)
      setTasks(newTasks)
      //TODO: add backend
    } else {
      // Moving to a different column with tasks
      const newTasks = tasks.map((task) => {
        if (task.id === active.id) {
          return { ...task, status: overTask.status }
        }
        return task
      })
      setTasks(newTasks)
      //TODO: add backend
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
  }

  console.log('TASKS: ', tasks)

  if (board) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <section className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center">
            {error && <h1>{error}</h1>}
            <h1 className="mb-2 text-3xl">Name: {board.name}</h1>
            <h1 className="mb-2 text-2xl">ID: {board.id}</h1>
          </div>

          <div className="flex justify-center gap-5">
            {columns.map(({ title }, index) => (
              <Column
                key={index}
                title={title}
                tasks={tasks.filter((task) => task.status === title)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <Task
                key={activeTask.id}
                title={activeTask.title}
                boardId={activeTask.boardId}
                id={activeTask.id}
                description={activeTask.description}
              />
            )}
          </DragOverlay>
        </section>
      </DndContext>
    )
  }
}

export default ColumnsList
