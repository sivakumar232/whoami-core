import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import LandingContent from './LandingContent'

export default async function Home() {
  try {
    const user = await currentUser()

    // Temporarily disabled to show landing page
    // If user is logged in, redirect to onboarding
    // if (user) {
    //   redirect('/onboarding')
    // }

    // Always show landing page for now
    return <LandingContent />
  } catch (error) {
    // If any error occurs, show landing page
    console.error('Error in Home page:', error)
    return <LandingContent />
  }
}
