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

 
           

    // if (!formData.title || !formData.description || !formData.priority || !formData.status || !formData.type) {
    //   setError("Please add title, description, priority, status and type");
    //   setLoading(false);
    //   return;
    // }

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
        priority: 'medium',
        status: 'open',
        type: 'bug',
        assignee: '',
        description: ''
      });

      // setTimeout(() => setSuccess(null), 2000);
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
          className="bg-green-400 dark:bg-green-400 cursor-pointer hover:bg-green-300 dark:hover:bg-green-300 dark:text-gray-900"
        >
          Add New Ticket<Plus size={24} className="text-gray-500  dark:text-gray-900" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[96vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Ticket</DialogTitle>
          <DialogDescription>Ticket info</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4  ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Ticket Name
            </Label>
            <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter ticket title"
                value={formData.title}
                onChange={handleChange}
              autoComplete="off"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="URGENT">URGENT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                type
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>TYPE</SelectLabel>
                    <SelectItem value="BUG">BUG</SelectItem>
                    <SelectItem value="FEATURE">FEATURE</SelectItem>
                    <SelectItem value="TASK">TASK</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="OPEN">OPEN</SelectItem>
                    <SelectItem value="CLOSED">CLOSED</SelectItem>
                    <SelectItem value="REJECTED">REJECTED</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="INPROGRESS">IN PROGRESS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <AssignUser onDataChange={handleDataFromChild}/>
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
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}
           <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
          {loading ? <Spinner /> : 'Create Ticket'}
          </Button>
        
        </form>
      
      
      </DialogContent>
    </Dialog>
  );
}
