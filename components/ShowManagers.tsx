import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
export default function ShowManagers({ role }:{ role: string }) {
  const [users, setUsers] = useState<{ id: string; username?: string; email?: string; role?: { name?: string } }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    if (!role) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/role/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleName: role }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the dialog opens
  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open, role]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogDescription>Users assigned to this role</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner  />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">Error: {error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No users assigned to this role</div>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{user.username || 'No name'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.role?.name || 'No role'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}