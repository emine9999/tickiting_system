'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import useUser from '@/hooks/useUser';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/meet/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');
    console.log("isLoaded:", isLoaded);
  console.log("user:", user);
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id || "", 
        name: user?.name || undefined,
        image: user?.image || undefined,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;