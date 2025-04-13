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


export function Delete() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none  shadow-none hover:underline w-fit cursor-pointer ">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Delete this User Profile
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
