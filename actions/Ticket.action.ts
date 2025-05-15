"use server";

import { prisma } from "@/lib/prisma"; 

export async function getTickets() {
  return prisma.ticket.findMany();
}