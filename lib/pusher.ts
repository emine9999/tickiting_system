import PusherServerLib from 'pusher';
import PusherClientLib from 'pusher-js';

// Server-side Pusher instance
export const pusherServer = new PusherServerLib({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'us3',
  useTLS: true,
});

// Client-side Pusher instance
export const pusherClient = new PusherClientLib(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'us3',
  }
);
