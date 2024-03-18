import React, { useContext } from 'react'

import Button from '@/app/components/Button/Button'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import DeleteIcon from '@/app/icons/DeleteIcon'
import EditIcon from '@/app/icons/EditIcon'
import { ITaskActions } from '@/types/types'

const TaskActions = ({ editMode, onSave, setEditMode, id }: ITaskActions) => {
  const { deleteTask } = useContext(BoardContext)

  return (
    <div className="flex gap-4">
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
            onClick={() => setEditMode(true)}
            data-testid="edit-button"
          >
            <EditIcon />
          </div>

          <div onClick={() => deleteTask(id)}>
            <DeleteIcon />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskActions
