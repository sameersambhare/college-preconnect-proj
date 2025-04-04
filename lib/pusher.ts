import PusherServer from 'pusher'
import Pusher from 'pusher-js'

if (!process.env.NEXT_PUBLIC_APP_ID || !process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_SECRET_KEY || !process.env.NEXT_PUBLIC_CLUSTER) {
    throw new Error('Missing Pusher environment variables')
}

export const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
    cluster: process.env.NEXT_PUBLIC_CLUSTER
})

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_CLUSTER!
})