'use client'

import DeleteIcon from '@/app/components/icons/DeleteIcon/DeleteIcon'
import DnDIcon from '@/app/components/icons/DnDIcon'
import EditIcon from '@/app/components/icons/EditIcon/EditIcon'
import { ITaskProps } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useRef, useState } from 'react'

const Task = ({
  id,
  title: initialTitle,
  description: initialDescription,
  status,
  deleteTask,
}: ITaskProps) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [showActions, setShowActions] = useState(false)
  const prevTitle = useRef(title).current
  const prevDescription = useRef(description).current

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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') e.stopPropagation()
    if (e.key === 'Enter') setEditMode(false)
    if (e.key === 'Escape') {
      setTitle(prevTitle)
      setDescription(prevDescription)
      setEditMode(false)
    }
  }

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        className="mb-4 min-h-[140px] w-[300px] rounded-2xl border-2 border-text-main
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
      className="relative mb-4 h-[140px] w-[300px] rounded-2xl border-2
      border-transparent bg-theme-main p-4 hover:border-text-main"
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
              style={{ cursor: 'grab' }}
            >
              <DnDIcon />
            </div>
          </div>

          <p className="mb-2">{description}</p>
        </>
      )}

      {editMode && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            onKeyDown={(e) => handleInputKeyDown(e)}
            className="mb-2 rounded border border-text-main bg-theme-main
            px-2 text-xl font-bold outline-none"
          />

          <input
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => handleInputKeyDown(e)}
            value={description}
            className="mb-2 rounded border border-text-main bg-theme-main px-2
             outline-none"
          />
        </div>
      )}

      {showActions && (
        <div className="flex justify-end gap-4">
          {editMode ? (
            <button
              onClick={() => setEditMode(false)}
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Save
            </button>
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
