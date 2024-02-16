import { getBoardById } from '@/app/api/board/service'
import { createEdgeRouter } from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'

const router = createEdgeRouter<NextRequest, RequestContext>()

interface RequestContext {
  params: {
    boardId: string
  }
}

router.get(async (_req, { params: { boardId } }) => {
  const board = await getBoardById(boardId)

  if (!board) {
    return NextResponse.json(
      { error: 'There is no board with such ID' },
      { status: 404 },
    )
  }

  return NextResponse.json(board)
})

export const GET = (request: NextRequest, ctx: RequestContext) => {
  return router.run(request, ctx)
}
