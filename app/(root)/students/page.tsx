import { currentUser } from '@clerk/nextjs/server'
import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions'
import StudentsClient from './StudentsClient'

export default async function StudentsPage() {
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress || ""
  const userInfo = await fetchUser(email)
  
  if(!userInfo?.onboarded) {
    return null // The redirect will be handled by the client component
  }
  const users = await fetchAllUsers(userInfo._id)
  
  return <StudentsClient initialUsers={users} currentUserId={userInfo._id} />
}
