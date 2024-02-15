'use client'

import ColumnsList from '@/app/components/ColumnsList/ColumnsList'
import Header from '@/app/components/Header/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <ColumnsList />
      </main>
    </QueryClientProvider>
  )
}
