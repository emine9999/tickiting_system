"use client";
import { User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Delete } from "@/components/Delete";
import { EditUser } from "@/components/EditUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (): ColumnDef<User>[] => [
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
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => <div className="ml-3">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Emails
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },

  {
    accessorKey: "groups",
    header: "Group",
    cell: ({ row }) => {
      const groups = row.getValue("groups") as string[];
      return (
        <div className="flex gap-3 p-2">
          {groups.map((group, idx) => (
            <span
              key={idx}
              className="bg-blue-300 text-black rounded-full px-2 py-1 text-xs font-semibold"
            >
              {group}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <PencilLine color="#BCCCDC" size={19}/>
            <EditUser id={row.original.id.toString()} />
          </div>

          <div className="flex items-center gap-1">
            <Trash2 color="#BCCCDC" size={18}/>
            <Delete userid={row.original.id.toString()} />
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              View User details
            </DropdownMenuItem>

            <DropdownMenuItem>Assign Role</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
