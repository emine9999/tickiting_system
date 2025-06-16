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
import { Plus} from "lucide-react"; 
import { useState} from "react";
import { Textarea } from "./ui/textarea";
import AssignUser from '@/components/AssignUser';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ticketSchema } from '@/lib/ticketSchema';

export default function AddNewTicket() {
    const [formData, setFormData] = useState({
        title: '',
        priority: 'MEDIUM',
        status: 'OPEN',
        type: 'BUG',
        assignee: '',
        description: ''
      });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [assing,setAssing] = useState<string | null>(null); 

  const handleDataFromChild = (users :any)=>{
    setAssing(users)
  }

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

    const validationResult = ticketSchema.safeParse({ ...formData, assignee: assing });   
    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map((err) => err.message).join(', ');
        setError(errorMessages);
        setLoading(false);
        return;
    }

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, assignee: assing }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create ticket");
      }

      setSuccess("ticket created successfully!");
       // Reset form
       setFormData({
        title: '',
        priority: 'MEDIUM',
        status: 'OPEN',
        type: 'BUG',
        assignee: '',
        description: ''
      });

    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred while creating the ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-400 dark:bg-green-400 cursor-pointer hover:bg-green-300 dark:hover:bg-green-300 dark:text-gray-900 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
        >
          <span className="hidden sm:inline">Add New Ticket</span>
          <span className="sm:hidden">Add Ticket</span>
          <Plus size={20} className="ml-1 sm:ml-2 text-gray-500 dark:text-gray-900" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl">Add New Ticket</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Fill in the ticket information below
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base font-medium">
              Ticket Name *
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter ticket title"
              value={formData.title}
              onChange={handleChange}
              autoComplete="off"
              className="w-full text-sm sm:text-base"
            />
          </div>

          {/* Priority and Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium">
                Priority *
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="w-full text-sm sm:text-base">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium">
                Type *
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full text-sm sm:text-base">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="BUG">Bug</SelectItem>
                    <SelectItem value="FEATURE">Feature</SelectItem>
                    <SelectItem value="TASK">Task</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-medium">
              Status *
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="INPROGRESS">In Progress</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Assign User Component */}
          <div className="space-y-2">
            <AssignUser onDataChange={handleDataFromChild}/>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm sm:text-base font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              placeholder="Enter ticket description"
              onChange={handleChange}
              autoComplete="off"
              className="w-full min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-vertical"
              rows={3}
            />
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mt-4">
              <Alert type="error" message={error} />
            </div>
          )}
          {success && (
            <div className="mt-4">
              <Alert type="success" message={success} />
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Spinner />
                <span>Creating...</span>
              </div>
            ) : (
              'Create Ticket'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}