import { ITask } from '@/app/api/task/service'
import Button from '@/app/components/Button/Button'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface IColumn {
  title: string
  tasks: ITask[]
}

const Column = ({ title, tasks }: IColumn) => {
  const { board, setTasks } = useContext(BoardContext)

  const { isOver, setNodeRef } = useDroppable({
    id: title,
    data: {
      type: 'Column',
    },
  })

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
  }

  return (
    <SortableContext
      items={tasks}
      strategy={rectSortingStrategy}
    >
      <div
        className="w-[350px] bg-bg-secondary p-4 shadow-md shadow-theme-secondary"
        ref={setNodeRef}
        style={{ color: isOver ? 'red' : '' }}
      >
        <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>

        {tasks?.map(({ id, title, boardId, description }) => (
          <Task
            key={id}
            title={title}
            boardId={boardId}
            id={id}
            description={description}
          />
        ))}

        {title === 'ToDo' && (
          <div onClick={addTask}>
            <Button
              isAdd
              label="Add"
            />
          </div>
        )}
      </div>
    </SortableContext>
  )
}

export default Column
