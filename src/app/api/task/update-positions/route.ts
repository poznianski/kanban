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

export const POST = (request: NextRequest, ctx: RequestContext) => {
  return router.run(request, ctx)
}
