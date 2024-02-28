'use client'

import ColumnsList from '@/app/components/ColumnsList/ColumnsList'
import Header from '@/app/components/Header/Header'
import { BoardProvider } from '@/app/context/BoardContext/BoardContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <BoardProvider>
      <Header />
      <main className="container mx-auto">
        <ColumnsList />
      </main>
      <ToastContainer
        theme="dark"
        autoClose={1500}
      />
    </BoardProvider>
  )
}
