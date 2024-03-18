import { clsx } from 'clsx'
import React from 'react'

import { ITaskInfoEditMode } from '@/types/types'
import { VALUES } from '@/utils/constants'

const TaskInfoEditMode = ({
  title,
  handleInputKeyDown,
  handleChange,
  warning,
  description,
  setDescription,
}: ITaskInfoEditMode) => {
  return (
    <form
      className="flex flex-col"
      data-testid="task-info-edit-mode"
    >
      <input
        data-testid="task_title-input"
        value={title}
        onChange={handleChange}
        autoFocus
        onKeyDown={handleInputKeyDown}
        className="mb-2 w-full rounded border border-text-main
            bg-theme-main px-2 text-xl font-bold outline-none"
      />

      <p
        className={clsx(
          'warning-message m-0 w-full',
          warning && 'warning-visible',
        )}
      >
        {warning && `No more than ${VALUES.MAX_CHARACTERS} characters`}
      </p>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleInputKeyDown}
        value={description}
        className="mb-2 w-full resize-none rounded border border-text-main
             bg-theme-main px-2 outline-none"
      />
    </form>
  )
}

export default TaskInfoEditMode
