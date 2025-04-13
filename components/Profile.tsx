import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  return (
    <div className="h-screen overflow-y-auto w-full px-4 md:px-6 lg:pb-15 b">
      {/* <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">Profile</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Update your personal information</p>
      </div> */}
      
      {/* Body section */}
      <div className="w-full max-w-3xl mx-auto">
        <Card className="border-gray-50 dark:border-slate-700 shadow-sm">
          <CardHeader className="border-b border-gray-50 dark:border-slate-700 pb-4">
            <CardTitle className="text-xl text-slate-800 dark:text-slate-200">Edit your Profile</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Update your personal information and credentials.</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form>
              <div className="grid w-full items-center gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username" className="text-slate-700 dark:text-slate-300">Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Your Username" 
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your Email" 
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Your Password" 
                    className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio" className="text-slate-700 dark:text-slate-300">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us a little about yourself" 
                    className="min-h-[120px] border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="group" className="text-slate-700 dark:text-slate-300">Group</Label>
                    <Input 
                      id="group" 
                      placeholder="Your Group" 
                      defaultValue="SIR"
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="position" className="text-slate-700 dark:text-slate-300">Position</Label>
                    <Input 
                      id="position" 
                      placeholder="Your Position" 
                      defaultValue="Student" 
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 border-t border-gray-50 dark:border-slate-700 pt-4">
            <Button variant="outline" className="border-gray-100 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;