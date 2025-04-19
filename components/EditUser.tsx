'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function EditUser({ userid }: { userid: string }) {
  const [newPassword, setNewPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null); 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/users/${userid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword ,userid}), 
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update user password");
      }

      setSuccess("Password updated successfully!");
      setNewPassword(""); 
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none shadow-none hover:underline w-fit cursor-pointer bg-gray-50"
        >
          Reset Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter a new password for the user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              className="col-span-3"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>} 
          {success && <p className="text-green-500">{success}</p>} 
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}