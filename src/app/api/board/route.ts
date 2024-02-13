import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const GET = async () => {
  const res = await prisma.board.findMany()

  return NextResponse.json(res)
}
