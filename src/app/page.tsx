'use client'

import ColumnsList from '@/app/components/ColumnsList/ColumnsList'
import Header from '@/app/components/Header/Header'
import { BoardProvider } from '@/app/context/BoardContext'

export default function Home() {
  return (
    <BoardProvider>
      <Header />
      <main>
        <ColumnsList />
      </main>
    </BoardProvider>
  )
}
