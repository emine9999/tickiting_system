"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus} from "lucide-react"; // Import missing icons
import { useState} from "react";
import { Textarea } from "./ui/textarea";

export default function AddRole() {
     const [formData, setFormData] = useState({
        name: "",
        portee: "",
        description: "",
      });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


     // Handle input changes for the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!formData.name || !formData.description || !formData.portee) {
      setError("Please add role name ,portee and description");
      setLoading(false);
      return;
    }

    try {
  
      const res = await fetch("/api/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create Role");
      }

      setSuccess("Role created successfully!");
       // Reset form
       setFormData({
        name: '',
        description: '',
        portee :''
      });

      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
      <Plus size={24} className="text-gray-500 dark:text-gray-400" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>Role info</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom de Role"
              
              autoComplete="off"
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
               Portee
            </Label>
            <Input
              id="portee"
              value={formData.portee}
              name="portee"
              placeholder="Portee de Role"
              onChange={handleChange}
              autoComplete="off"
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              placeholder="Add Description"
              onChange={handleChange}
              autoComplete="off"
              className="col-span-4"
            />
          </div>
           <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
          {loading ? <Spinner /> : 'Add Role'}
          </Button>
        </form>
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

      </DialogContent>
    </Dialog>
  );
}
