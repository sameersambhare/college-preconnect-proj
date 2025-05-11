"use server"
import { currentUser } from '@clerk/nextjs/server'
import { fetchUser } from '@/lib/actions/user.actions'
import CommunityChatUI from '@/components/CommunityChatUI'
import { getCommunityInfo } from '@/lib/actions/community.actions'
type tParams=Promise<{id:string}>
export default async function CommunityChatPage({params}:{params:tParams}) {
  const { id } = await params;
  
  // Authenticate user
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  // Get user data
  const email = user.emailAddresses[0].emailAddress;
  const userInfo = await fetchUser(email);
  
  if (!userInfo) {
    throw new Error("User profile not found");
  }
  
  // Verify community exists and user is a member
  try {
    const community = await getCommunityInfo(id, userInfo._id);
    if (!community) {
      throw new Error("Community not found");
    }
    
    // Check if user is a member
    if (!community.members.includes(userInfo._id)) {
      // Redirect to join page or show a different component
      // For now, we'll still render the chat component and let it handle access control
    }
  } catch (error) {
    console.error("Error verifying community access:", error);
    // Handle error or redirect
  }
  
  return (
    <div className="min-h-screen">
      <CommunityChatUI currentUserId={userInfo._id} />
    </div>
  );
}