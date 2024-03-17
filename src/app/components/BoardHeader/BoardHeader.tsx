import React, { useContext, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import CopyIcon from '@/app/icons/CopyIcon'
import { MESSAGES } from '@/utils/constants'

const BoardHeader = () => {
  const { board, updateBoard, boardName, setBoardName } =
    useContext(BoardContext)
  const [tooltipMessage, setTooltipMessage] = useState(MESSAGES.COPY)
  const [editMode, setEditMode] = useState(false)

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

  const handleCopyId = () => {
    if (board) {
      navigator.clipboard.writeText(board.id)
      setTooltipMessage('Copied!')
    }
  }

  return (
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
        <p className="mb-2 text-center text-2xl">ID: {board?.id}</p>
        <Tooltip
          id="copy"
          border="1px solid #00796B"
        />

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
  )
}

export default BoardHeader
