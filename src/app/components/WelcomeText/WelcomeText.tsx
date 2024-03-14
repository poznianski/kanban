import Button from '@/app/components/Button/Button'
import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import React, { useContext } from 'react'

const WelcomeText = () => {
  const { createBoard } = useContext(BoardContext)

  return (
    <>
      <h1 className="mb-2 text-center text-3xl">
        No data to display. Paste the ID and press Load <br />
        OR
      </h1>

      <div className="mx-auto w-[200px]">
        <Button
          label="Create a Board"
          isAdd
          onClick={createBoard}
        />
      </div>
    </>
  )
}

export default WelcomeText
