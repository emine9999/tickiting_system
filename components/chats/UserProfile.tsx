"use client";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AvatarGroup from './AvatarGroup'
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import { useMemo } from "react";
import { format } from "date-fns";
import { DeleteMessage } from "./DeleteMessage";
const SHEET_SIDES = ["right"] as const;

interface profileProps {
  data: Conversation & {
    users: User[];
  };
}

export default function UserProfile({ data }: profileProps) {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "P");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.username;
  }, [data.name, otherUser.username]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  return (
    <div className="grid grid-cols-1  ">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Ellipsis className="cursor-pointer" size={18} />
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
              <SheetDescription>user information</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4  ">
              <div className="flex justify-center relative">

                {data.isGroup ? (
                  <AvatarGroup users={data.users} />
                ) : (
                  <div className="relative w-10 h-10 flex-shrink-0 ">
                    <Image
                      src={otherUser?.image || "/data/glx.jpg"}
                      alt={otherUser?.username || "user"}
                      fill
                      className="rounded-full object-cover ring-2 ring-amber-600"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <p>{title}</p>
                <span>{statusText}</span>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="bg-slate-200 rounded-full p-2">
                    <DeleteMessage />
                  </div>
                  <span>Delete</span>
                </div>
              </div>

              <div className="p-3 space-y-4">
                {data.isGroup && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Emails
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {data.users.map((user) => user.email).join(', ')}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {otherUser.email}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <hr />
                    <div>
                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                        Joined
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
