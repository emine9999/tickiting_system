// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
    NavigationMenu,
    NavigationMenuContent,

    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,

  } from "@/components/ui/navigation-menu"
  import { IoSettingsOutline } from "react-icons/io5";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import Link from "next/link";

export default function AdminNav() {
  return (
<div className="w-full">
<NavigationMenu >
    <NavigationMenuList >
      <NavigationMenuItem>      
      <NavigationMenuTrigger className="bg-transparent w-full gap-2 p-2" ><IoSettingsOutline size={22} />Settings</NavigationMenuTrigger>
   
        <NavigationMenuContent className="w-full">
         <Link href="/users" passHref legacyBehavior>
         <NavigationMenuLink className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
         </Link>
         <Link href="/Roles" passHref legacyBehavior>
         <NavigationMenuLink className={navigationMenuTriggerStyle()}>Roles & Permissions</NavigationMenuLink>
            </Link>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</div>
  
  );
}