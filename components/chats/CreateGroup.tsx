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
import { Users, UserRoundPlus, X, Check, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConversationListProps {
  users: User[];
}

const CreateGroup: React.FC<ConversationListProps> = ({ users }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
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
    setMessage(null);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((response) => {
        setMessage({
          type: 'success',
          text: `Group "${data.name}" created successfully!`
        });
        
        setTimeout(() => {
          router.refresh();
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || "Something went wrong while creating the group";
        setMessage({
          type: 'error',
          text: errorMessage
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleMemberToggle = (userId: string) => {
    const currentMembers = watch("members") || [];
    const isCurrentlySelected = currentMembers.some((member: any) => member.value === userId);
    
    const updatedMembers = isCurrentlySelected
      ? currentMembers.filter((member: any) => member.value !== userId)
      : [...currentMembers, { value: userId }];
    
    setValue("members", updatedMembers, { shouldValidate: true });
  };

  const isUserSelected = (userId: string) => {
    return members?.some((member: any) => member.value === userId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-md mx-auto p-0 gap-0 rounded-xl border-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-t-xl">
            <DialogTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <UserRoundPlus className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-gray-100">Create Group Chat</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Start a conversation with multiple people
            </DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 px-6 py-5 space-y-6">
            {/* Message Alert */}
            {message && (
              <div className={`flex items-center gap-3 p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400'
                  : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            {/* Group Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Group Name *
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Group name is required" })}
                placeholder="Enter group name..."
                autoComplete="off"
                className={`h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all ${
                  errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message as string}</p>
              )}
            </div>

            {/* Members Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Members
                </Label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {members?.length || 0} selected
                </span>
              </div>

              {/* Members List */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="max-h-48 overflow-y-auto">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <div
                        key={user.id}
                        onClick={() => handleMemberToggle(user.id)}
                        className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-200 ${
                          index !== users.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""
                        } ${
                          isUserSelected(user.id)
                            ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* User Avatar */}
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.username?.charAt(0).toUpperCase() || "U"}
                          </div>
                          
                          {/* User Info */}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {user.username || "Unknown User"}
                            </p>
                            {user.email && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px] sm:max-w-[200px]">
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isUserSelected(user.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}>
                          {isUserSelected(user.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No users available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl border-t">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1 h-10 rounded-lg border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading || !watch("name")?.trim()}
              className="w-full sm:w-auto order-1 sm:order-2 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Group"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;