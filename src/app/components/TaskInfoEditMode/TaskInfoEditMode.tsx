import { ITaskInfoEditMode } from '@/types'
import clsx from 'clsx'
import React from 'react'

const TaskInfoEditMode = ({
  title,
  handleInputKeyDown,
  handleChange,
  warning,
  description,
  setDescription,
  maxTitleLength,
}: ITaskInfoEditMode) => {
  return (
    <div className="flex flex-col">
      <input
        value={title}
        onChange={handleChange}
        autoFocus
        onKeyDown={handleInputKeyDown}
        className="mb-2 rounded border border-text-main bg-theme-main
            px-2 text-xl font-bold outline-none"
      />

      <p className={clsx('warning-message m-0', warning && 'warning-visible')}>
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
  )
}

export default TaskInfoEditMode
