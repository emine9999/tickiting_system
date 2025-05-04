"use client";
import { updateDocument } from "@/actions/room.actions";
import ActiveCollaborators from "@/components/editor/ActiveCollaborators";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/editor/Header";
import UserAvatar from "@/components/UserAvatar";
import {
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ShareModal from "@/components/editor/ShareModal";

const CollaborativeRoom = ({ roomId, roomMetadata ,users,currentUserType}: CollaborativeRoomProps) => {
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      try{
        if (documentTitle !== roomMetadata.title) {
        const updatedDocument = await  updateDocument(roomId, documentTitle);
        if (updatedDocument){
          setEditing(false);
        }
        }
      }
        
        catch (error) {
          console.error("Error updating title:", error);
        } finally {
          setLoading(false);
          setEditing(false);
        }
      
    }
  };

  // this effect is used to show the edit icon when the user clicks outside the input field
  useEffect(()=> {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditing(false);
        updateDocument(roomId, documentTitle)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef,documentTitle,roomId]);

  // this effect is used to focus the input field when the user clicks on it
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center gap-2 justify-center"
            >
              {editing && !loading ? (
                <input
                  type="text"
                  ref={inputRef}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  placeholder="Enter title"
                  disabled={!editing}
                  className="text-white text-xl font-semibold border-none bg-transparent focus:outline-none"
                />
              ) : (
                <h1 className="text-xl font-semibold text-white">
                  {documentTitle}
                </h1>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View Only</p>
              )}
            </div>

            {loading && <p className="text-sm text-gray-400">Saving...</p>}

            <div className="flex w-fit justify-end gap-2">
              <UserAvatar />
              <ShareModal 
              roomId={roomId} // in order to know which room to share
              collaborators={users}  // this is the list of users in the room
              currentUserType={currentUserType} // this is the type of the current user
              creatorId={roomMetadata.creatorId}  // this is the id of the user who created the room
              />

                            <ActiveCollaborators />
            </div>
          </Header>
          <Editor 
          roomId={roomId}
          currentUserType={currentUserType}
          />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
