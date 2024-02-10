import { cookies } from 'next/headers'

import { Copyrigth } from '@/components/Copyrigth'
import { Hero } from '@/components/Hero'
import { SigninLink } from '@/components/SigninLink'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover border-r border-white/10">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SigninLink />}

        <Hero />

        <Copyrigth />
      </div>

      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}
