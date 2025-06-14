'use server'
import { prisma } from '@/lib/prisma'
import { AgnoResponse } from '@/types/agno-response';
import { getCurrentUser } from './user.actions';
// export async function analyzeIncident(description: string) {
//       const currentUser = await getCurrentUser();
//       if (
//         !currentUser ||
//         !currentUser.id ||
//         !currentUser.username ||
//         !currentUser.email
//       ) {
//         throw new Error("erreur d'authentification, veuillez vous reconnecter");
//       }
//       const user_id = currentUser.id;
//       const user_name = currentUser.username;
//       const user_email = currentUser.email;
//       const group_id = currentUser.groups?.[0] || null; 

//   try {

//     const res = await fetch("http://localhost:8000/analyze", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ description, user_id, user_name, user_email , group_id }),
//     });

//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}));
//       throw new Error(errorData.detail || `Erreur ${res.status}: ${res.statusText}`);
//     }

//     const data: AgnoResponse = await res.json();

//     if (!data.success || data.error) {
//       throw new Error(data.error || "L'analyse a échoué");
//     }

//     console.log("Analyse réussie:", data);
//     return {
//       content: data.raw_content,
//       summary: data.data.summary,
//       incident_type: data.data.incident_type,
//       severity: data.data.severity,
//       recommendations: data.data.recommendations,
//       timestamp: data.timestamp,
//       references: data.references,
//       report_file: data.report_file,
//       metadata: data.metadata
//     };
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message || "Une erreur est survenue lors de l'analyse");
//     } else {
//       throw new Error("Une erreur est survenue lors de l'analyse");
//     }
//   }
// }

//list all reports



export async function analyzeIncident(description: string) {
  const currentUser = await getCurrentUser();
  if (
    !currentUser ||
    !currentUser.id ||
    !currentUser.username ||
    !currentUser.email
  ) {
    return { error: "Erreur d'authentification, veuillez vous reconnecter" };
  }

  const user_id = currentUser.id;
  const user_name = currentUser.username;
  const user_email = currentUser.email;
  const group_id = currentUser.groups?.[0] || "SIR";

  try {
    const res = await fetch(
      `${process.env.AGENT_API_URL}/analyze`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, user_id, user_name, user_email, group_id }),
      }
    );

    if (!res.ok) {
      const errJson = await res.json().catch(() => {});
      return { error: errJson?.detail || `Erreur ${res.status}: ${res.statusText}` };
    }

    const data: AgnoResponse = await res.json();

    if (!data.success || data.error) {
      return { error: data.error || "L'analyse a échoué" };
    }

    const ticket = await prisma.ticket.create({
      data: {
        title: data.data.summary.substring(0, 50),
        description,
        priority: data.data.severity || "MEDIUM",
        status: "OPEN",
        type: "TASK",
        createdBy: { connect: { id: user_id } },
        group: { connect: { name: group_id || "SIR" } },
      },
    });

    const ticketAnalysis = await prisma.ticketAnalysis.create({
      data: {
        title: ticket.title,
        description,
        summary: data.data.summary,
        incidentType: data.data.incident_type,
        severity: data.data.severity,
        resolutionSteps: data.data.resolution_steps,
        recommendations: data.data.recommendations,
        rawContent: data.raw_content,
        metadata: data.metadata,
        timestamp: new Date(data.timestamp),
        user: { connect: { id: user_id } },
        ticket: { connect: { id: ticket.id } },
      },
    });

    return { ticket, ticketAnalysis, success: true };
  } catch (err: unknown) {
    console.error("Erreur analyzeIncident:", err);
    return {
      error:
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue lors de l'analyse",
    };
  }
}



export async function getReports() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    return { success: false, reports: [] };
  }
  const id = currentUser.id;

  try {
    const getreports = await prisma.ticketAnalysis.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        timestamp: "desc",
      },
      select: {

        title: true,
        timestamp: true,
        summary: true,
        incidentType: true,
        id: true,
        userId: true
      },
    });

    return { success: true, reports: getreports };
  } catch (error) {
    return { success: false, reports: [] };
  }
}



// export async function getReportDetails(ticketId: string, userId: string) {

//   const currentUser = await getCurrentUser();
//   if (!currentUser || !currentUser.id || currentUser.id !== userId || !ticketId) {
//     return { success: false, reports: '' };
//   }
//   const id = currentUser.id;
//   try {
//     const getreport = await prisma.ticketAnalysis.findUnique({
//       where: {
//         userId: id,
//         ticketId: ticketId,
//       },
//       select: {
//         title: true,
//         timestamp: true,
//         summary: true,
//         incidentType: true,
//         severity: true,
//         recommendations: true,
//         rawContent: true,
//         metadata: true,
        
//       },
//     });
//     if (getreport?.length === 0) {
//       return { success: false, reports: '' };
//     }
//     console.log("Fetched report details:", getreport);
//     return { success: true, report: getreport };

//   } catch (error) {
//     return { success: false, report: '' };
//   }

// }

export async function getReportDetails(ticketId: string, userId: string) {
  // Input validation
  if (!ticketId || !userId) {
    return { success: false, error: 'Missing required parameters', report: null };
  }

  try {
    const currentUser = await getCurrentUser();
    
    // Authentication and authorization checks
    if (!currentUser?.id || currentUser.id !== userId) {
      return { success: false, error: 'Unauthorized access', report: null };
    }

    const report = await prisma.ticketAnalysis.findUnique({
      where: {
        id: ticketId,
      },
      select: {
        title: true,
        timestamp: true,
        summary: true,
        incidentType: true,
        severity: true,
        recommendations: true,
        rawContent: true,
        metadata: true,
        userId: true, // Include userId to verify ownership
      },
    });

    // Check if the report belongs to the current user
    if (report && report.userId !== currentUser.id) {
      return { success: false, error: 'Unauthorized access to this report', report: null };
    }

    // Check if report exists
    if (!report) {
      return { success: false, error: 'Report not found', report: null };
    }

    console.log("Fetched report details:", report);
    return { success: true, error: null, report };

  } catch (error) {
    console.log("Error fetching report details:", error);
    return { 
      success: false, 
      error: 'Failed to fetch report details', 
      report: null 
    };
  }
}