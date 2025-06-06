"use client";

import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, Info, Brain, Database } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

import { ExtendedMessage } from '@/types/agno-response';

const getSeverityColor = (severity?: string) => {
  switch (severity?.toLowerCase()) {
    case 'élevé':
    case 'critique':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    case 'moyen':
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    case 'faible':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
  }
};

const getSeverityIcon = (severity?: string) => {
  switch (severity?.toLowerCase()) {
    case 'élevé':
    case 'critique':
      return <AlertTriangle className="w-4 h-4" />;
    case 'moyen':
      return <Info className="w-4 h-4" />;
    case 'faible':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

export default function MessageComponent({ message }: { message: ExtendedMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", bounce: 0.3 }}
      className={cn(
        "flex flex-col gap-4 p-4 rounded-lg",
        isUser
          ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
          : "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isUser ? (
            <>
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Incident signalé
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Analyse du manuel d'exploitation
              </span>
            </>
          )}
        </div>
        {message.timestamp && (
          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <Clock className="w-3 h-3" />
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Summary and Incident Details for Assistant Messages */}
      {!isUser && (message.summary || message.incident_type || message.severity) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-green-200 dark:border-green-800">
          {message.incident_type && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Type</p>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {message.incident_type}
                </p>
              </div>
            </div>
          )}
          
          {message.severity && (
            <div className="flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getSeverityColor(message.severity))}>
                {getSeverityIcon(message.severity)}
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Sévérité</p>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {message.severity}
                </p>
              </div>
            </div>
          )}

          {message.metadata && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Traitement</p>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {message.metadata.processing_time.toFixed(1)}s
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={cn(
        "text-sm leading-relaxed",
        isUser ? "text-neutral-800 dark:text-neutral-200 font-medium" : "text-neutral-700 dark:text-neutral-300"
      )}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {!isUser && message.recommendations && message.recommendations.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 list-none">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Info className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span>Recommandations ({message.recommendations.length})</span>
              <div className="ml-auto transition-transform group-open:rotate-90">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </summary>
          <div className="mt-3 pl-7 space-y-1">
            {message.recommendations.map((rec, index) => (
              <div key={index} className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <ReactMarkdown>{rec}</ReactMarkdown>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Footer with References and Metadata */}
      {!isUser && (message.references || message.reportFile || message.metadata) && (
        <div className="mt-2 pt-3 border-t border-green-200 dark:border-green-800 space-y-2">
          {message.references && message.references.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <Database className="w-3 h-3" />
              <span>{message.references.length} référence(s) du manuel</span>
            </div>
          )}
          
          {message.reportFile && (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <FileText className="w-3 h-3" />
              <span>Rapport sauvegardé</span>
            </div>
          )}

          {message.metadata && (
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span>Agent: {message.metadata.agent_name}</span>
              <span>Base: {message.metadata.knowledge_base}</span>
              <span>Modèle: {message.metadata.model_used}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}