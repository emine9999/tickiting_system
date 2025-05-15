"use client";
import { Ticket } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";


export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ticket title
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => <div className="bg-slate-200 rounded-full px-2 text-center dark:text-red-900">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "createdBy.username", 
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created By
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => <div className="ml-5">{row.original.createdBy?.username}</div>,
  },
  {
    accessorKey: "type",
    header: "type",
    cell: ({ row }) => 
    
    <div >{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
 
  {
    accessorKey: "priority",
    header: "priority",
    cell: ({ row }) => {
      const category = row.getValue("priority") as string;
      const bgColor =
        category === "critical"
          ? "bg-red-200 text-red-500"
          : category === "HIGH"
          ? "bg-yellow-200 text-yellow-500"
          : category === "MEDIUM"
          ? "bg-blue-200 text-blue-500"
          : category === "LOW"
          ? "bg-green-200 text-green-500"
          : "bg-gray-200";
  
      return (
        <div className={`capitalize font-medium ${bgColor}  p-1 rounded-full px-2 text-center`}>
          {category}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Requested Date
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("createdAt")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ticket.id)}
            >
              Copy ticket ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={()=> redirect(`/tickets/${ticket.id}/details`)}
            >View ticket details</DropdownMenuItem>
            <DropdownMenuItem>Assign ticket</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];