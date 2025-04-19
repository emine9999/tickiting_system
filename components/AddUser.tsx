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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

          {/* select menu */}
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
              Role
            </Label>
          <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    {/* end of select */}

    {/* group */}
    <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
              Group
            </Label>
          <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Group</SelectLabel>
          <SelectItem value="SIR">SIR</SelectItem>
          <SelectItem value="QOD">QOD</SelectItem>
          <SelectItem value="Couverture">Couverture</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
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
