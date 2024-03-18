'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import React, { useContext, useEffect, useRef, useState } from 'react'

import TaskActions from '@/app/components/TaskActions/TaskActions'
import TaskInfo from '@/app/components/TaskInfo/TaskInfo'
import TaskInfoEditMode from '@/app/components/TaskInfoEditMode/TaskInfoEditMode'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { InputChangeEvent, ITask, KeyboardEvent } from '@/types/types'
import { VALUES } from '@/utils/constants'

const Task = ({
  id,
  title: initialTitle,
  description: initialDescription,
  position,
  status,
}: ITask) => {
  const { board, updateTask } = useContext(BoardContext)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [showActions, setShowActions] = useState(false)
  const [warning, setWarning] = useState(false)
  const prevTitle = useRef(title)
  const prevDescription = useRef(description)

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

  const handleInputKeyDown = (event: KeyboardEvent) => {
    const isTextArea = event.target instanceof HTMLTextAreaElement

    if (event.key === 'Enter' && !isTextArea) {
      onSave()
    } else if (event.key === 'Escape') {
      setTitle(prevTitle.current)
      setDescription(prevDescription.current)
      setEditMode(false)
    }
  }

  const handleChange = (event: InputChangeEvent) => {
    const { value } = event.target

    if (value.length <= VALUES.MAX_CHARACTERS) {
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

  useEffect(() => {
    if (!editMode) {
      prevTitle.current = title
      prevDescription.current = description
    }
  }, [editMode, title, description])

  if (isDragging) {
    return (
      <div
        className="mb-4 h-[180px] min-h-[180px] w-full rounded-2xl border-2
        border-text-main bg-theme-main p-4 opacity-50"
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
      className="relative mb-4 flex h-[180px] min-h-[180px] w-full
      overflow-y-auto overflow-x-hidden rounded-2xl border-2
      border-transparent bg-theme-main p-4 hover:border-text-main"
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex flex-col justify-between">
        {!editMode && (
          <TaskInfo
            attributes={attributes}
            listeners={listeners}
            title={title}
            description={description}
          />
        )}

        {editMode && (
          <TaskInfoEditMode
            handleInputKeyDown={handleInputKeyDown}
            handleChange={handleChange}
            warning={warning}
            title={title}
            description={description}
            setDescription={setDescription}
          />
        )}

        <div className={clsx('task_hover-actions', showActions && 'visible')}>
          <TaskActions
            editMode={editMode}
            onSave={onSave}
            setEditMode={setEditMode}
            id={id}
          />
        </div>
      </div>
    </div>
  )
}

export default Task
