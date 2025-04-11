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

export function EditUser() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none  shadow-none hover:underline w-fit cursor-pointer">Reset Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Reset the User Password          
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             New Password
            </Label>
            <Input id="name" value="*******" className="col-span-3" />
          </div>

        </div>
        
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
