import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useContext, useMemo } from 'react'

import Button from '@/app/components/Button/Button'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { ITask } from '@/types/types'

interface IColumn {
  title: string
  tasks: ITask[]
}

const Column = ({ title, tasks }: IColumn) => {
  const { addTask } = useContext(BoardContext)
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      type: 'Column',
    },
  })

  return (
    <div
      className="column flex h-[500px] max-h-[500px] w-[300px] min-w-[300px]
      flex-col border-2 border-transparent bg-bg-secondary"
      ref={setNodeRef}
    >
      <h1 className="mb-4 mt-4 text-center text-xl font-bold">{title}</h1>

      <div className="flex flex-col items-center overflow-y-auto p-4">
        <SortableContext items={tasksIds}>
          {tasks.map(
            ({ id, title, boardId, description, status, position }) => (
              <Task
                key={id}
                title={title}
                boardId={boardId}
                id={id}
                description={description}
                status={status}
                position={position}
              />
            ),
          )}
        </SortableContext>
      </div>

      {title === 'ToDo' && (
        <div
          onClick={addTask}
          className="w-full p-4"
        >
          <Button
            isAdd
            label="Add"
          />
        </div>
      )}
    </div>
  )
}

export default Column
