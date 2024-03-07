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
        return NextResponse.json('Name is required', { status: 400 })
      }

      const newBoard = await createBoard({ name })
      return NextResponse.json(newBoard)
    } catch (error) {
      console.error('Could not create a board', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })
  .put(async (req) => {
    try {
      const { id, name } = await req.json()

      if (!name) {
        return NextResponse.json('Name is required', { status: 400 })
      }

      const updatedBoard = await updateBoard({ id, name })
      return NextResponse.json(updatedBoard)
    } catch (error) {
      console.error('Could not update a board', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })
  .delete(async (req) => {
    try {
      const { id } = await req.json()

      if (!id) {
        return NextResponse.json('ID is required', { status: 400 })
      }

      await deleteBoard({ id })
      return new NextResponse('A board successfully deleted', { status: 200 })
    } catch (error) {
      console.error('Could not delete a board', error)
      return NextResponse.json(`Error: ${error}`, { status: 500 })
    }
  })

export const GET = async (
  request: NextRequest,
  ctx: { params?: unknown },
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse | void>
}

export const POST = async (
  request: NextRequest,
  ctx: { params?: unknown },
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse | void>
}

export const PUT = async (
  request: NextRequest,
  ctx: { params?: unknown },
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse | void>
}

export const DELETE = async (
  request: NextRequest,
  ctx: { params?: unknown },
): Promise<NextResponse | void> => {
  return (await router.run(request, ctx)) as Promise<NextResponse | void>
}
