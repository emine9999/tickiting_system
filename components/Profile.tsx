import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const Profile = () => {
 
  return(
    <div>
      <div className="px-10 shadow-lg  container mx-auto h-screen  flex flex-col justify-center bg-gradient-to-r from-green-100 to-zinc-400 ">
        {/* Header Section */}
        <div className="flex justify-between items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
          <h3 className="text-2xl font-bold text-slate-600">Profile</h3>

        </div>
        {/* body section */}
        <div className=' flex  justify-center  gap-10  mt-8 '>
        
          <div className='w-full '>
                <Card className='' >
            <CardHeader>
              <CardTitle>Edit your Profile</CardTitle>
              <CardDescription>Personal Information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" placeholder="Your Username" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input id="name" placeholder="Your Password" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Bio</Label>
                    <Input id="name" placeholder="Your Bio" />
                  </div>
                 
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='bg-blue-600 hover:bg-blue-500 cursor-pointer'>Saved</Button>
            </CardFooter>
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;