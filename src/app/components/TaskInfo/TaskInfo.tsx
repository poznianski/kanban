import React from 'react'

import DnDIcon from '@/app/icons/DnDIcon'
import { ITaskInfo } from '@/types/types'

const TaskInfo = ({ title, description, attributes, listeners }: ITaskInfo) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="w-full border border-transparent text-xl font-bold">
          {title}
        </h1>

        <div
          {...listeners}
          {...attributes}
          className="absolute right-3 top-3"
        >
          <DnDIcon />
        </div>
      </div>

      <p className="block w-full">{description}</p>
    </div>
  )
}

export default TaskInfo
