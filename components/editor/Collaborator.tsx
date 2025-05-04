import Image from 'next/image';
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector';
import { Button } from '@/components/ui/button';
import { removeCollaborator, updateDocumentAccess } from '@/actions/room.actions';

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer');
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({ 
      roomId, 
      email, 
      userType: type as UserType, 
      updatedBy: user 
    });

    setLoading(false);
  }

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  }
  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2  rounded-lg p-2">
        <Image 
          src={collaborator.image } 
          alt={collaborator.username}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-foreground text-white">
            {collaborator.username}
            <span className="text-10-regular pl-2 text-muted-foreground">
              {loading && 'updating...'}
            </span>
          </p>
          <p className="text-sm font-light text-muted-foreground">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-primary">Owner</p>
      ): (
        <div className="flex items-center gap-2">
          <UserTypeSelector 
            userType={userType as UserType}
            setUserType={setUserType || 'viewer'}
            onClickHandler={shareDocumentHandler}
          />
          <Button 
            type="button" 
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            variant="destructive"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  )
}

export default Collaborator