'use client'

import ColumnsList from '@/app/components/ColumnsList/ColumnsList'
import Header from '@/app/components/Header/Header'
import { BoardProvider } from '@/app/context/BoardContext/BoardContext'

export default function Home() {
  return (
    <BoardProvider>
      <Header />
      <main className="container mx-auto">
        <ColumnsList />
      </main>
    </BoardProvider>
  )
}
