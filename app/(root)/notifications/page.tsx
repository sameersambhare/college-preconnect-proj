import { fetchUser } from '@/lib/actions/user.actions';
import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchNotifications, acceptConnectionRequest, declineConnectionRequest } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

const NotificationsPage = async () => {
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    const email = user.emailAddresses[0].emailAddress;
    const userInfo = await fetchUser(email);
    if(!userInfo?.onboarded) redirect("/onboarding");
    const notifications = await fetchNotifications(userInfo._id);
    
    const hasNotifications = !notifications.success && Array.isArray(notifications);

    
    async function handleAccept(formData: FormData) {
        'use server';
        
        const senderId = formData.get('senderId') as string;
        const receiverId = formData.get('receiverId') as string;
        
        if (!senderId || !receiverId) return;
        
        await acceptConnectionRequest(senderId, receiverId);
        revalidatePath('/notifications');
        redirect('/friends')
    }
    
  
    async function handleDecline(formData: FormData) {
        'use server';
        
        const senderId = formData.get('senderId') as string;
        const receiverId = formData.get('receiverId') as string;
        
        if (!senderId || !receiverId) return;
        
        await declineConnectionRequest(senderId, receiverId);
        
        // Revalidate the page to update the UI
        revalidatePath('/notifications');
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Connection Requests</h1>
                <p className="text-gray-600 mt-2">Manage connection requests from other students.</p>
            </div>

            {!hasNotifications ? (
                <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-xl font-semibold text-gray-700">No connection requests</h2>
                        <p className="text-gray-500 max-w-md">
                            You don't have any pending connection requests. Explore students to expand your network!
                        </p>
                        <Link href="/students">
                            <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                                Explore Students
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification: any) => (
                        <div key={notification._id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-orange-500 font-bold text-xl">
                                        {notification.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg">{notification.name}</h3>
                                    <p className="text-sm text-gray-500 mb-1">{notification.collegename}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                            Branch: {notification.branch}
                                        </span>
                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                            Year: {notification.year}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <form action={handleAccept} className="flex-1 sm:flex-initial">
                                            <input type="hidden" name="senderId" value={notification._id} />
                                            <input type="hidden" name="receiverId" value={userInfo._id} />
                                            
                                            <Button 
                                                type="submit"
                                                className="bg-green-500 hover:bg-green-600 text-white w-full"
                                            >
                                                Accept
                                            </Button>
                                        </form>
                                        
                                        <form action={handleDecline} className="flex-1 sm:flex-initial">
                                            <input type="hidden" name="senderId" value={notification._id} />
                                            <input type="hidden" name="receiverId" value={userInfo._id} />
                                            
                                            <Button 
                                                type="submit"
                                                variant="outline" 
                                                className="border-gray-300 text-gray-700 w-full"
                                            >
                                                Decline
                                            </Button>
                                        </form>
                                    </div>
                                    
                                    <Link href={`/profile/${notification._id}`} className="sm:ml-2 mt-2 sm:mt-0">
                                        <Button 
                                            variant="ghost" 
                                            className="text-gray-500 w-full"
                                        >
                                            View Profile
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificationsPage