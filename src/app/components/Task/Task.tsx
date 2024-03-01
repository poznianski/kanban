'use client'

import Button from '@/app/components/Button/Button'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import DeleteIcon from '@/app/icons/DeleteIcon'
import DnDIcon from '@/app/icons/DnDIcon'
import EditIcon from '@/app/icons/EditIcon'
import { ITaskProps } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx/lite'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Task = ({
  id,
  title: initialTitle,
  description: initialDescription,
  position,
  status,
  deleteTask,
  updateTask,
}: ITaskProps) => {
  const { board } = useContext(BoardContext)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [showActions, setShowActions] = useState(false)
  const [warning, setWarning] = useState(false)
  const prevTitle = useRef(title)
  const prevDescription = useRef(description)
  const maxTitleLength = 15

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'Task',
      title,
      description,
      status,
    },
    disabled: editMode,
  })

  const exitEditMode = () => {
    prevTitle.current = title
    prevDescription.current = description
    setEditMode(false)
  }

  useEffect(() => {
    if (!editMode) {
      prevTitle.current = title
      prevDescription.current = description
    }
  }, [editMode, title, description])

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const isTextArea = e.target instanceof HTMLTextAreaElement

    if (e.key === 'Enter' && !isTextArea) {
      onSave()
    } else if (e.key === 'Escape') {
      setTitle(prevTitle.current)
      setDescription(prevDescription.current)
      setEditMode(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value.length <= maxTitleLength) {
      setTitle(value)
      setWarning(false)
    } else {
      setWarning(true)
    }
  }

  const onSave = () => {
    if (!board) return

    updateTask({
      id,
      title,
      description,
      status,
      position,
      boardId: board.id,
    })
    exitEditMode()
  }

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        className="mb-4 min-h-[140px] w-full rounded-2xl border-2 border-text-main
      bg-theme-main p-4 opacity-50"
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      />
    )
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="relative mb-4 h-[140px] min-h-[140px] w-full overflow-y-auto rounded-2xl
      border-2 border-transparent bg-theme-main p-4 hover:border-text-main"
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!editMode && (
        <>
          <div className="flex justify-between">
            <h1 className="mb-2 border border-transparent text-xl font-bold">
              {title}
            </h1>

            <div
              {...listeners}
              {...attributes}
            >
              <DnDIcon />
            </div>
          </div>

          <p className="mb-2 break-words">{description}</p>
        </>
      )}

      {editMode && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={handleChange}
            autoFocus
            onKeyDown={handleInputKeyDown}
            className="mb-2 rounded border border-text-main bg-theme-main
            px-2 text-xl font-bold outline-none"
          />

          <p
            className={clsx(
              'warning-message m-0',
              warning && 'warning-visible',
            )}
          >
            {warning && `No more than ${maxTitleLength} characters`}
          </p>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleInputKeyDown}
            value={description}
            className="mb-2 rounded border border-text-main bg-theme-main px-2
             outline-none"
          />
        </div>
      )}

      {showActions && (
        <div className="flex justify-end gap-4">
          {editMode ? (
            <div className="flex justify-center gap-2">
              <div onClick={onSave}>
                <Button
                  sm
                  label="Save"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <div
                onClick={() => {
                  setEditMode(true)
                }}
              >
                <EditIcon />
              </div>

              <div onClick={() => deleteTask(id)}>
                <DeleteIcon />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Task
