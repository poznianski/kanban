import { NextRequest, NextResponse } from 'next/server'
import { createEdgeRouter } from 'next-connect'

import { getBoardById } from '@/app/api/board/service'

const router = createEdgeRouter<NextRequest, RequestContext>()

interface RequestContext {
  params: {
    boardId: string
  }
}

router.get(async (_req, { params: { boardId } }): Promise<void | Response> => {
  const board = await getBoardById(boardId)

  if (!board) {
    return NextResponse.json('There is no board with such ID', { status: 404 })
  }

  return NextResponse.json(board)
})

export const GET = async (
  request: NextRequest,
  ctx: any,
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse>
}
