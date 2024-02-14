import {
  createBoard,
  deleteBoard,
  getAllBoards,
  updateBoard,
} from '@/app/api/board/service'
import { createEdgeRouter } from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router
  .get(async () => {
    const boards = await getAllBoards()

    if (boards.length === 0) {
      return NextResponse.json('No boards found')
    }

    return NextResponse.json(boards)
  })
  .post(async (req) => {
    try {
      const { name } = await req.json()

      if (!name) {
        return new NextResponse('Name is required', { status: 400 })
      }

      await createBoard({ name })
      return new NextResponse('A board successfully created', { status: 201 })
    } catch (error) {
      console.error('Could not create a board', error)
      return new NextResponse(`Error: ${error}`, { status: 500 })
    }
  })
  .put(async (req) => {
    try {
      const { id, name } = await req.json()

      if (!name) {
        return new NextResponse('Name is required', { status: 400 })
      }

      await updateBoard({ id, name })
      return new NextResponse('A board successfully updated', { status: 200 })
    } catch (error) {
      console.error('Could not update a board', error)
      return new NextResponse(`Error: ${error}`, { status: 500 })
    }
  })
  .delete(async (req) => {
    try {
      const { id } = await req.json()

      if (!id) {
        return new NextResponse('ID is required', { status: 400 })
      }

      await deleteBoard({ id })
      return new NextResponse('A board successfully deleted', { status: 200 })
    } catch (error) {
      console.error('Could not delete a board', error)
      return new NextResponse(`Error: ${error}`, { status: 500 })
    }
  })

export const GET = (request: NextRequest, ctx: { params?: unknown }) => {
  return router.run(request, ctx)
}

export const POST = (request: NextRequest, ctx: { params?: unknown }) => {
  return router.run(request, ctx)
}

export const PUT = (request: NextRequest, ctx: { params?: unknown }) => {
  return router.run(request, ctx)
}

export const DELETE = (request: NextRequest, ctx: { params?: unknown }) => {
  return router.run(request, ctx)
}
