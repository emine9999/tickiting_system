'use client'
import React, { useState } from 'react'
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
  } from "@/components/ui/dialog"
  import UserTypeSelector from "@/components/editor/UserTypeSelector";
  import Collaborator from "@/components/editor/Collaborator";
  import { updateDocumentAccess } from "@/actions/room.actions"

  const ShareModal = ({roomId, collaborators ,currentUserType ,creatorId} :ShareDocumentDialogProps) => {
    const user = useSelf(); // this used to know which user wants to change the permissions
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(''); // this used to store the email of the user that wants to be invited
    const [userType, setUserType] = useState<UserType>('viewer'); // this used to store the type of user that wants to be invited
    // handle the share logic
    const shareDocumentHandler = async () => {
      setLoading(true);
  
      await updateDocumentAccess({ 
        roomId, 
        email, 
        userType: userType as UserType, 
        updatedBy: user.info,
      });
  
      setLoading(false);
    }
    console.log("collaborators",collaborators);
    return (
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger>
            <Button className="bg-blue-500 hover:bg-blue-600 flex h-9 gap-1 px-4" disabled={currentUserType !== 'editor'}>
              <Image
                src="/assets/icons/share.svg"
                alt="share"
                width={20}
                height={20}
                className="min-w-4 md:size-5"
              />
              <p className="mr-1 hidden sm:block">
                Share
              </p>
            </Button>
          </DialogTrigger>
          <DialogContent className="shad-dialog">
            <DialogHeader>
              <DialogTitle className='text-gray-200'>Manage who can view this project</DialogTitle>
              <DialogDescription className='text-gray-500'>Select which users can view and edit this document</DialogDescription>
            </DialogHeader>
    
            <Label htmlFor="email" className="mt-6 text-gray-200">
              Email address
            </Label>
            <div className="flex items-center gap-3">
              <div className="flex flex-1 rounded-md bg-dark-400">
                <Input 
                  id="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none bg-transparent text-blue-100 placeholder:text-blue-100 "
                />
                <UserTypeSelector 
                  userType={userType}
                  setUserType={setUserType}
                />
              </div>
              <Button type="submit" onClick={shareDocumentHandler} className="bg-blue-600 cursor-pointer hover:bg-blue-500 flex h-full gap-1 px-5" disabled={loading}>
                {loading ? 'Sending...' : 'Invite'}
              </Button>
            </div>
    
            <div className="my-2 space-y-2">
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
      )
}

export default ShareModal