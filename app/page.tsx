import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import LandingContent from './LandingContent'

export default async function Home() {
  const user = await currentUser()

  // If user is logged in, check if they have a username
  if (user) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        select: { username: true },
      })

      if (dbUser?.username) {
        // User has a username, redirect to their profile
        redirect(`/${dbUser.username}`)
      } else {
        // User doesn't have a username, redirect to onboarding
        redirect('/onboarding')
      }
    } catch (error) {
      console.error('Database connection error:', error)
      // If database is down, redirect to onboarding
      redirect('/onboarding')
    }
  }

  // User is not logged in, show landing page
  return <LandingContent />
}
