export interface AgnoResponse {
  success: boolean;
  data: {
    summary: string;
    incident_type: string;
    severity: string;
    resolution_steps: string[]; 
    recommendations: string[];
    estimated_time: string | null;
    required_resources: string[];
  };
  raw_content: string;
  references: string[];
  metadata: {
    processing_time: number;
    agent_name: string;
    model_used: string;
    knowledge_base: string;
    content_length: number;
    references_count: number;
  };
  timestamp: string;
  report_file?: string;
  error: string | null;
}


import { Message } from "ai";

export interface ExtendedMessage extends Message {
  timestamp?: string;
  references?: string[];
  reportFile?: string;
  summary?: string;
  incident_type?: string;
  severity?: string;
  recommendations?: string[];
  metadata?: {
    processing_time: number;
    agent_name: string;
    model_used: string;
    knowledge_base: string;
  };
}


export interface ReportDetails {
  title: string;
  timestamp: string;
  summary: string;
  incidentType: string;
  severity: string;
  recommendations: string[];
  rawContent: string;
  metadata: any;
  userId: string;
}