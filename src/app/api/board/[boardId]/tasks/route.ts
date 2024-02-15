import { createTask, getTasksByBoardId } from '@/app/api/task/service'
import { createEdgeRouter } from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

interface RequestContext {
  params: {
    boardId: string
  }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router
  .get(async (_req, { params: { boardId } }) => {
    const tasks = await getTasksByBoardId(boardId)

    if (tasks.length === 0) {
      return NextResponse.json('No boards found')
    }

    return NextResponse.json(tasks)
  })
  .post(async (req, { params: { boardId } }) => {
    try {
      const { title, description, status } = await req.json()

      const newTask = await createTask({
        id: uuidv4(),
        boardId,
        title,
        description,
        status,
      })

      return NextResponse.json(newTask, { status: 201 })
    } catch (error) {
      console.error('Could not create a task', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })

export const GET = (request: NextRequest, ctx: RequestContext) =>
  router.run(request, ctx)

export const POST = (request: NextRequest, ctx: RequestContext) =>
  router.run(request, ctx)
