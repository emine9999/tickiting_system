"use client";

import Image from "next/image";
import { useState } from "react";

import { deleteDocument } from "@/actions/room.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const DeleteModal = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all hover:bg-gray-100 dark:hover:bg-dark-3 light:hover:bg-gray-100">
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="mt-1"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-white text-black dark:bg-dark-2 dark:text-white light:bg-white light:text-black">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle className="text-gray-800 dark:text-gray-200 light:text-gray-800">
            Delete document
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 light:text-gray-600">
            Are you sure you want to delete this document? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose
            asChild
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black hover:bg-gray-100 dark:border-dark-400 dark:bg-dark-400 dark:text-white dark:hover:bg-dark-3 light:border-gray-300 light:bg-white light:text-black light:hover:bg-gray-100"
          >
            Cancel
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className="gradient-red w-full"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
