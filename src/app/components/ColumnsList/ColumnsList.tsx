import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React, { useContext } from 'react'

import BoardHeader from '@/app/components/BoardHeader/BoardHeader'
import Column from '@/app/components/Column/Column'
import { columns } from '@/app/components/ColumnsList/columns'
import Loader from '@/app/components/Loader/Loader'
import Task from '@/app/components/Task/Task'
import WelcomeText from '@/app/components/WelcomeText/WelcomeText'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'

const ColumnsList = () => {
  const {
    tasks,
    isLoading,
    board,
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useContext(BoardContext)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  if (isLoading) {
    return <Loader />
  }

  const activeTask = tasks.find((task) => task.id === activeId)
  console.log('TASKS', tasks)

  return !board ? (
    <WelcomeText />
  ) : (
    <>
      <BoardHeader />

      <section className="flex flex-col gap-5">
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
                    {...activeTask}
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

export default ColumnsList
