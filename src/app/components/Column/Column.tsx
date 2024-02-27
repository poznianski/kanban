import Button from '@/app/components/Button/Button'
import Task from '@/app/components/Task/Task'
import { ITask } from '@/types'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

interface IColumn {
  title: string
  tasks: ITask[]
  addTask: () => void
  deleteTask: (taskId: string) => void
}

const Column = ({ title, tasks, addTask, deleteTask }: IColumn) => {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      type: 'Column',
    },
  })

  return (
    <div
      className="flex w-[300px] min-w-[300px]  flex-col border-2 border-transparent bg-bg-secondary p-4"
      ref={setNodeRef}
    >
      <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>

      <div className="flex flex-col items-center">
        <SortableContext items={tasksIds}>
          {tasks.map(({ id, title, boardId, description, status }) => (
            <Task
              key={id}
              title={title}
              boardId={boardId}
              id={id}
              description={description}
              status={status}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      {title === 'ToDo' && (
        <div onClick={addTask}>
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
