import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddUser() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-400 cursor-pointer hover:bg-green-300">Add New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            User info       
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input id="name" value="" placeholder="Username" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="name" value="" placeholder="user@gmail.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Password
            </Label>
            <Input id="name" value="" placeholder="*******" className="col-span-3" />
          </div>

        </div>
        
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
