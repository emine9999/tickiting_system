"use client";

import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, Info, Brain, Database, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { renderMarkdown } from "@/lib/utils";
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

// Function to parse structured content
const parseStructuredContent = (content: string) => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const sections: { title?: string; content: string[] }[] = [];
  let currentSection: { title?: string; content: string[] } = { content: [] };

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if line looks like a section title (ends with : or is all caps)
    if (trimmedLine.endsWith(':') || (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3)) {
      // Save current section if it has content
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = { 
        title: trimmedLine.replace(':', '').trim(), 
        content: [] 
      };
    } else if (trimmedLine.length > 0) {
      currentSection.content.push(trimmedLine);
    }
  }
  
  // Add last section
  if (currentSection.content.length > 0 || currentSection.title) {
    sections.push(currentSection);
  }

  return sections;
};

export default function MessageComponent({ message }: { message: ExtendedMessage }) {
  const isUser = message.role === "user";
  const structuredSections = !isUser ? parseStructuredContent(message.content) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", bounce: 0.3 }}
      className={cn(
        "flex flex-col gap-4 p-6 rounded-xl shadow-sm border",
        isUser
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isUser ? (
            <>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Incident signalé
                </span>
                <p className="text-xs text-blue-600 dark:text-blue-400">Par l'utilisateur</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Analyse du manuel d'exploitation
                </span>
                <p className="text-xs text-green-600 dark:text-green-400">Réponse automatisée</p>
              </div>
            </>
          )}
        </div>
        {message.timestamp && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Summary Cards for Assistant Messages */}
      {!isUser && (message.summary || message.incident_type || message.severity) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          {message.incident_type && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {message.incident_type}
                </p>
              </div>
            </div>
          )}
          
          {message.severity && (
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getSeverityColor(message.severity))}>
                {getSeverityIcon(message.severity)}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Sévérité</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {message.severity}
                </p>
              </div>
            </div>
          )}

          {message.metadata && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Traitement</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {message.metadata.processing_time.toFixed(1)}s
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
     {/* Main Content */}
<div className="space-y-2">
 {isUser ? (
   <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
     <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
       {message.content}
     </p>
   </div>
 ) : (
   <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
     <div 
       className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-3xl prose-h1:text-slate-900 prose-h1:dark:text-white prose-h1:mb-6 prose-h1:mt-0 prose-h1:border-b prose-h1:border-gray-300 prose-h1:pb-4
                  prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:dark:text-gray-100 prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
                  prose-h3:text-xl prose-h3:text-slate-700 prose-h3:dark:text-gray-200 prose-h3:mb-3 prose-h3:mt-6 prose-h3:font-semibold
                  prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-slate-900 prose-strong:dark:text-white prose-strong:font-semibold
                  prose-ul:my-4 prose-li:my-2 prose-li:text-gray-700 prose-li:dark:text-gray-300
                  prose-code:bg-gray-100 prose-code:dark:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
       dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
     />
   </div>
 )}
</div>

      {/* Recommendations */}
      {!isUser && message.recommendations && message.recommendations.length > 0 && (
        <details className="group bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <summary className="cursor-pointer text-sm font-semibold text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 list-none">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
              </div>
              <span>Recommandations ({message.recommendations.length})</span>
              <ChevronRight className="w-4 h-4 ml-auto transition-transform group-open:rotate-90" />
            </div>
          </summary>
          <div className="mt-4 space-y-3">
            {message.recommendations.map((rec, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <ReactMarkdown>{rec}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Footer */}
      {!isUser && (message.references || message.reportFile || message.metadata) && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex flex-wrap gap-4 text-xs">
            {message.references && message.references.length > 0 && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <Database className="w-3 h-3" />
                <span>{message.references.length} référence(s) du manuel</span>
              </div>
            )}
            
            {message.reportFile && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <FileText className="w-3 h-3" />
                <span>Rapport sauvegardé</span>
              </div>
            )}
          </div>

          {message.metadata && (
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Agent: {message.metadata.agent_name}</span>
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Base: {message.metadata.knowledge_base}</span>
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Modèle: {message.metadata.model_used}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}