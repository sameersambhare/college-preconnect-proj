"use server"
import CommunityJoin from '@/components/CommunityJoin';
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser} from '@/lib/actions/user.actions';

export default async function CommunityJoinPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await currentUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const email = user.emailAddresses[0].emailAddress;
  const userId = await fetchUser(email)

  return (
    <CommunityJoin communityID={id} userId={userId} />
  );
}