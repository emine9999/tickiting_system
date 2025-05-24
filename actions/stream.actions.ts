'use server';

import { StreamClient } from '@stream-io/node-sdk';
import { auth } from "@/auth";
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  
  const user = await auth ();
  if (!user) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  if (!user.user?.id) throw new Error('User ID is missing');
  const token = streamClient.createToken(user.user.id, expirationTime, issuedAt);

  return token;
};