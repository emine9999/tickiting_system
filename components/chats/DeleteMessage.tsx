import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from 'next/navigation'

export function DeleteMessage() {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setisLoading] = useState(false);
  const params = useParams();
  const ticketId = params.id;
  const onDelete = useCallback(() => {
    setisLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push(`/tickets/${ticketId}/conversation/${conversationId}`);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setisLoading(false));
  }, [conversationId, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer hover:text-red-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-200 rounded-full flex items-center justify-center">
              <TriangleAlert className="text-red-500" />
            </div>
            Delete Conversation
          </DialogTitle>
          <DialogDescription>
            are you sure you want to delete this conversation ? This action
            cannot be undone
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-transparent shadow-none cursor-pointer text-slate-700 hover:bg-transparent"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={onDelete}
            className="bg-red-700 hover:bg-red-600 cursor-pointer"
          >
            {isLoading ? "Deleting ...": 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
