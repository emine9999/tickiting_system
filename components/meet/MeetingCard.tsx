"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";
import { Copy, Play, Calendar, Users, Clock } from "lucide-react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="group relative flex min-h-[280px] w-full flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-sm hover:shadow-lg transition-all duration-300 p-6 xl:max-w-[568px] overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/30 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
     
      <div className={cn(
        "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
        isPreviousMeeting 
          ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400" 
          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
      )}>
        {isPreviousMeeting ? "Completed" : "Upcoming"}
      </div>

      <article className="relative z-10 flex flex-col gap-6">
       
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-sm">
            <Image src={icon} alt="meeting type" width={24} height={24} className="filter brightness-0 invert" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{date}</span>
            </div>
          </div>
        </div>

       
        <div className="flex items-center gap-6 py-3 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isPreviousMeeting ? "45 min" : "Scheduled"}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {avatarImages.length + 5} participants
            </span>
          </div>
        </div>
      </article>

      <article className="relative z-10 flex items-center justify-between">
       
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {avatarImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="relative w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-sm overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <Image
                  src={img}
                  alt={`attendee ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm font-medium shadow-sm">
              +5
            </div>
          </div>
        </div>

      
        {!isPreviousMeeting && (
          <div className="flex gap-3">
            <Button 
              onClick={handleClick} 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2"
            >
              {buttonIcon1 ? (
                <Image src={buttonIcon1} alt="action" width={18} height={18} />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {buttonText || "Start"}
            </Button>
            
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Meeting link copied to clipboard!");
              }}
              variant="outline"
              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        )}

        {/* Previous Meeting Actions */}
        {isPreviousMeeting && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-xl transition-all duration-200"
            >
              View Recording
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;