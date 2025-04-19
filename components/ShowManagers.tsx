import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Manager" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },

];

export default function ShowManagers() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-sm px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex-1"
        >
          See assigned Users
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigned Users</DialogTitle>
          <DialogDescription>User info</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-auto">
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{user.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}