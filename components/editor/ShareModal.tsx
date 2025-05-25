"use client";
import React, { useState } from 'react';
import { useSelf } from '@liveblocks/react/suspense';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserTypeSelector from "@/components/editor/UserTypeSelector";
import Collaborator from "@/components/editor/Collaborator";
import { updateDocumentAccess } from "@/actions/room.actions";

const ShareModal = ({ roomId, collaborators, currentUserType, creatorId }: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');

  const shareDocumentHandler = async () => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });

    setLoading(false);
  };

  console.log("collaborators", collaborators);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="bg-blue-500 hover:bg-blue-600 flex h-9 gap-1 px-4"
          disabled={currentUserType !== 'editor'}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-dark-2 text-white dark:bg-dark-2 dark:text-white light:bg-white light:text-black">
        <DialogHeader>
          <DialogTitle className="text-gray-200 dark:text-gray-200 light:text-gray-800">
            Manage who can view this project
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-500 light:text-gray-600">
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        <Label
          htmlFor="email"
          className="mt-6 text-gray-200 dark:text-gray-200 light:text-gray-800"
        >
          Email address
        </Label>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400 dark:bg-dark-400 light:bg-gray-100">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none bg-transparent text-blue-100 placeholder:text-blue-100 dark:text-blue-100 dark:placeholder:text-blue-100 light:text-gray-900 light:placeholder:text-gray-500  focus-visible:ring-0  focus-visible:ring-offset-0"
            />
            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
            />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="bg-blue-600 cursor-pointer hover:bg-blue-500 flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </div>

        <div className="my-2 space-y-2 ">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
