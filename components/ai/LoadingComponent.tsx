"use client";
import { motion } from "framer-motion";
import { LoadingIcon } from "./icons";
import { Message } from "ai";

interface ExtendedMessage extends Message {
  content: string;
}

export default function LoadingComponent({ userMessage }: { userMessage?: ExtendedMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring" }}
      className="flex flex-col gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500"
    >
      <div className="flex items-center gap-2">
        <div className="animate-spin text-amber-600 dark:text-amber-400">
          <LoadingIcon />
        </div>
        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
          Analyse en cours...
        </span>
      </div>

      {userMessage && (
        <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
          Recherche de solutions pour: "{userMessage.content.substring(0, 60)}..."
        </div>
      )}
      <div className="text-xs text-amber-600 dark:text-amber-400">
        🔍 Consultation du manuel d'exploitation...
      </div>
    </motion.div>
  );
}
