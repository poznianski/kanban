import BoardHeader from '@/app/components/BoardHeader/BoardHeader'
import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import WelcomeText from '@/app/components/WelcomeText/WelcomeText'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React, { useContext, useEffect } from 'react'

const columns = [
  { id: 'ToDo', title: 'ToDo' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
]

const ColumnsList = () => {
  const {
    board,
    setBoard,
    tasks,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    activeId,
  } = useContext(BoardContext)

  const activeTask = tasks.find((task) => task.id === activeId)

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

  if (!board) {
    return <WelcomeText />
  }

  if (board) {
    return (
      <>
        <BoardHeader />

        <section className="flex flex-col gap-5 ">
          <div className="flex justify-center">
            <div className="flex gap-5 overflow-x-auto">
              <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={columns}>
                  {columns.map(({ title, id }) => (
                    <Column
                      key={id}
                      title={title}
                      tasks={tasks.filter((task) => task?.status === id)}
                    />
                  ))}
                </SortableContext>

                <DragOverlay>
                  {activeTask && (
                    <Task
                      key={activeTask.id}
                      title={activeTask.title}
                      boardId={activeTask.boardId}
                      id={activeTask.id}
                      status={activeTask.status}
                      description={activeTask.description}
                      position={activeTask.position}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ColumnsList
