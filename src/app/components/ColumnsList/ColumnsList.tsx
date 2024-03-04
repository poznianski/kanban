import Button from '@/app/components/Button/Button'
import Column from '@/app/components/Column/Column'
import Task from '@/app/components/Task/Task'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { useTask } from '@/app/hooks/useTasks'
import CopyIcon from '@/app/icons/CopyIcon'
import { boardService } from '@/app/services/boardService'
import { IBoard } from '@/types'
import { COPY } from '@/utils/constants'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'

const columns = [
  { id: 'ToDo', title: 'ToDo' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
]

const ColumnsList = () => {
  const { board, setBoard } = useContext(BoardContext)
  const {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    updateTask,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    activeId,
  } = useTask(board)

  const [tooltipMessage, setTooltipMessage] = useState(COPY)
  const [editMode, setEditMode] = useState(false)
  const [boardName, setBoardName] = useState('')
  const activeTask = tasks.find((task) => task.id === activeId)

  useEffect(() => {
    setTasks(board?.tasks || [])
    setBoardName(board?.name || '')
  }, [board?.name, board?.tasks, setTasks])

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
