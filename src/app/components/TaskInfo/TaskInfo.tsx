import DnDIcon from '@/app/icons/DnDIcon'
import { ITaskInfo } from '@/types'
import React from 'react'

const TaskInfo = ({ title, description, attributes, listeners }: ITaskInfo) => {
  return (
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
  )
}

export default TaskInfo
