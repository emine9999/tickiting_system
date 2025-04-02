'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const SHEET_SIDES = ['right'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export default function UserProfile() {
  return (
    <div className="grid grid-cols-1  ">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <h1 className=" w-full">amine elhabi</h1>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4  ">

              <div className='flex justify-center relative'>
              <div className="border w-24 h-24 flex justify-center items-center  rounded-full ">
                  <Image
                    src="/next.svg"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  />
                  
                </div>
                <button className='bg-red-300 border w-8 h-8 rounded-full flex justify-center items-center absolute top-15 right-8	'><Pencil size={17}/></button>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
