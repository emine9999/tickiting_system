import { Liveblocks } from "@liveblocks/node";
// create a live block instance so when use it to access liveblocks methods
if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error("LIVEBLOCKS_SECRET_KEY environment variable is not set");
}

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
  
});