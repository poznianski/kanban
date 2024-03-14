import { render } from '@testing-library/react'
import { ReactElement } from 'react'

import { BoardContext } from '@/app/context/BoardContext/BoardContext'
import { IBoardContext } from '@/types/types'

interface CustomRenderOptions {
  providerProps: Partial<IBoardContext>
}

export const renderBoardContext = (
  ui: ReactElement,
  { providerProps }: CustomRenderOptions,
) => {
  return render(
    <BoardContext.Provider value={providerProps as IBoardContext}>
      {ui}
    </BoardContext.Provider>,
  )
}
