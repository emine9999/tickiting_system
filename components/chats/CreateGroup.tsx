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
import { User } from "@prisma/client";
import { Users, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ConversationListProps {
  users: User[];
}

const CreateGroup: React.FC<ConversationListProps> = ({ users }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const ticketId = params.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        toast.success("Group created");
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  const handleMemberToggle = (userId: string) => {
    const currentMembers = watch("members") || [];
    const updatedMembers = currentMembers.includes(userId)
      ? currentMembers.filter((id: string) => id !== userId)
      : [...currentMembers, { value: userId }];
    setValue("members", updatedMembers, { shouldValidate: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Users className="cursor-pointer hover:text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
                <UserRoundPlus className="text-blue-500" />
              </div>
              Create a group chat
            </DialogTitle>
            <DialogDescription>
              Create a chat with more than 2 people
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Group name"
                autoComplete="off"
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Select Users</Label>
              <div className="mt-2 space-y-2 flex gap-2 max-h-40 overflow-y-auto border p-2 rounded-md">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleMemberToggle(user.id)}
                    className={`cursor-pointer h-fit p-2 rounded-md ${
                      members?.some((member: any) => member.value === user.id)
                        ? `bg-blue-100 text-blue-700 text-sm`
                        : "hover:bg-gray-100 text-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {user.username}
                      {members?.some(
                        (member: any) => member.value === user.id
                      ) ? (
                        <X className="w-4 h-4 text-red-500" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="justify-end mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-transparent shadow-none text-slate-700 hover:bg-transparent"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
