"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MessageComponent from "@/components/ai/MessageComponent";
import LoadingComponent from "@/components/ai/LoadingComponent";
import React from "react";
import ProjectOverview from "@/components/ai/project-overview";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { analyzeIncident } from "@/actions/agent.action"; 
import { ExtendedMessage } from '@/types/agno-response';

export default function Chat() {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim().length < 10) {
      toast.error("La description doit contenir au moins 10 caractères");
      return;
    }

    // Ajoute le message utilisateur
    const userMessage: ExtendedMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages((msgs) => [...msgs, userMessage]);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      try {
        const data = await analyzeIncident(currentInput);

        // Construire le message assistant à partir de la réponse
        const assistantMessage: ExtendedMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.ticketAnalysis.rawContent,
          timestamp: new Date(data.ticketAnalysis.timestamp).toISOString(),
          // references: data.ticketAnalysis.references,
          // reportFile: data.ticketAnalysis.report_file,
          summary: data.ticketAnalysis.summary,
          incident_type: data.ticketAnalysis.incidentType,
          severity: data.ticketAnalysis.severity,
          recommendations: data.ticketAnalysis.recommendations,
        };

        setMessages((msgs) => [...msgs, assistantMessage]);
        toast.success("Analyse terminée avec succès");

      } catch (error: any) {
        console.error("Erreur lors de l'analyse:", error);
        
        const errorMessage: ExtendedMessage = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: `❌ **Erreur lors de l'analyse**\n\n${error.message}\n\nVeuillez vérifier que l'API est démarrée sur le port 8000.`,
          timestamp: new Date().toISOString()
        };
        
        setMessages((msgs) => [...msgs, errorMessage]);
        toast.error(error.message || "Une erreur est survenue");
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex justify-center items-start sm:pt-8 min-h-screen w-full  px-4 md:px-0 py-4 ">
      <div className="flex flex-col items-center w-full max-w-[800px]">
        <ProjectOverview />
        
        <motion.div
          animate={{
            minHeight: messages.length > 0 ? 300 : 0,
            padding: messages.length > 0 ? 16 : 0,
          }}
          transition={{
            type: "spring",
            bounce: 0.3,
          }}
          className={cn(
            "rounded-lg w-full transition-all duration-300",
            messages.length > 0
              ? "bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              : "bg-transparent",
          )}
        >
          <div className=" w-full  gap-4">
              {/* Messages */}
            <motion.div
              transition={{ type: "spring" }}
              className="min-h-fit flex flex-col gap-4 max-h-[600px] overflow-y-auto"
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <MessageComponent key={message.id} message={message} />
                ))}
                
                {isPending && (
                  <LoadingComponent userMessage={messages.filter(m => m.role === "user").slice(-1)[0]} />
                )}
              </AnimatePresence>
            </motion.div>
            {/* Form de saisie */}
            <form onSubmit={handleSubmit} className="flex space-x-2 items-center justify-center p-2">
              <div className=" flex justify-between items-center w-full max-w-[600px] h-auto gap-4">
                <Input
                  className="bg-white dark:bg-gray-100 text-base w-full text-slate-700 dark:text-slate-600 p-6 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400"
                  minLength={10}
                  required
                  value={input}
                  placeholder="Décrivez l'incident en détail (minimum 10 caractères)..."
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isPending}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPending || input.trim().length < 10}
                  className=" h-10 w-10  bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                  <Send className="h-6 w-6 dark:text-white text-black" />
                </Button>
              </div>
            </form>

          
          </div>
        </motion.div>
      </div>
    </div>
  );
}