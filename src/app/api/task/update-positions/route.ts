import { updateTasksPositions } from '@/app/api/task/service'
import { createEdgeRouter } from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'

const router = createEdgeRouter<NextRequest, RequestContext>()

interface RequestContext {
  params: {
    boardId: string
  }
}

router.post(async (req) => {
  const tasks = await req.json()

  const updatedTasks = await updateTasksPositions(tasks)

  return NextResponse.json(updatedTasks)
})

export const POST = async (
  request: NextRequest,
  ctx: RequestContext,
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse | void>
}
