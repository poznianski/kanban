import { NextRequest, NextResponse } from 'next/server'
import { createEdgeRouter } from 'next-connect'

import { deleteTask, getTaskById, updateTask } from '@/app/api/task/service'

interface RequestContext {
  params: {
    id: string
  }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router
  .get(async (_req, { params: { id } }) => {
    const task = await getTaskById(id)

    if (!task) {
      return NextResponse.json('No such task')
    }

    return NextResponse.json(task)
  })
  .put(async (req, { params: { id } }) => {
    try {
      const { title, description, status, boardId, position } = await req.json()

      const updatedTask = await updateTask({
        id,
        boardId,
        title,
        description,
        status,
        position,
      })

      return NextResponse.json(updatedTask, { status: 201 })
    } catch (error) {
      console.error('Could not update a task', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })
  .delete(async (_req, { params: { id } }) => {
    try {
      await deleteTask(id)

      return NextResponse.json('The task was successfully deleted', {
        status: 200,
      })
    } catch (error) {
      console.error('Could not delete a task', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })

export const GET = async (
  request: NextRequest,
  ctx: RequestContext,
): Promise<NextResponse | void> =>
  (await router.run(request, ctx)) as Promise<NextResponse | void>

export const PUT = async (
  request: NextRequest,
  ctx: RequestContext,
): Promise<NextResponse | void> =>
  (await router.run(request, ctx)) as Promise<NextResponse | void>

export const DELETE = async (
  request: NextRequest,
  ctx: RequestContext,
): Promise<NextResponse | void> =>
  (await router.run(request, ctx)) as Promise<NextResponse | void>
