
import { NextRequest, NextResponse } from 'next/server';

const AGNO_API_URL = process.env.AGNO_API_URL || 'http://localhost:8000';
// this file is used to handle the chat API requests for the Agno incident analysis system (analyse d'incidents) , 

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation de la description
    if (!body.description || typeof body.description !== 'string') {
      return NextResponse.json(
        { 
          error: 'Description manquante ou invalide',
          success: false 
        },
        { status: 400 }
      );
    }

    const description = body.description.trim();
    
    if (description.length < 10) {
      return NextResponse.json(
        { 
          error: 'La description doit contenir au moins 10 caractères',
          success: false
        },
        { status: 400 }
      );
    }

    console.log(`[API] Analyse d'incident: ${description.substring(0, 100)}...`);

    // Appel à votre API Agno
    const agnoResponse = await fetch(`${AGNO_API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    // Vérification de la réponse de l'API Agno
    if (!agnoResponse.ok) {
      let errorMessage = `Erreur ${agnoResponse.status}: ${agnoResponse.statusText}`;
      
      try {
        const errorData = await agnoResponse.json();
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch {
        // Si on ne peut pas parser l'erreur JSON, on garde le message par défaut
      }

      console.error(`[API] Erreur Agno API:`, errorMessage);
      
      return NextResponse.json(
        { 
          error: errorMessage,
          success: false,
          statusCode: agnoResponse.status
        },
        { status: agnoResponse.status }
      );
    }

    // Parse de la réponse JSON
    const agnoData = await agnoResponse.json();
    
    console.log(`[API] Réponse Agno reçue avec succès`);

    // Vérification que la réponse contient les données attendues
    if (!agnoData.success) {
      return NextResponse.json(
        { 
          error: 'L\'analyse a échoué côté serveur',
          success: false,
          details: agnoData
        },
        { status: 500 }
      );
    }

    // Formatage de la réponse pour le frontend
    const formattedResponse = {
      success: true,
      report: agnoData.report || 'Aucun rapport généré',
      steps: extractStepsFromReport(agnoData.report),
      timestamp: agnoData.timestamp || new Date().toISOString(),
      references: agnoData.references || [],
      reportFile: agnoData.report_file,
      raw: agnoData // Pour debugging si nécessaire
    };

    return NextResponse.json(formattedResponse);

  } catch (error: any) {
    console.error('[API] Erreur lors de l\'analyse:', error);
    
    // Déterminer le type d'erreur
    let errorMessage = 'Erreur interne du serveur';
    let statusCode = 500;

    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Impossible de se connecter à l\'API Agno. Vérifiez qu\'elle est démarrée sur le port 8000.';
      statusCode = 503;
    } else if (error.name === 'AbortError') {
      errorMessage = 'Timeout - L\'analyse prend trop de temps';
      statusCode = 504;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        success: false,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}

// Fonction utilitaire pour extraire les étapes du rapport
function extractStepsFromReport(report: string): string[] {
  if (!report) return [];
  
  const steps: string[] = [];
  const lines = report.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Recherche de lignes qui ressemblent à des étapes
    if (
      trimmedLine.match(/^\d+\.\s/) || // 1. Étape
      trimmedLine.match(/^-\s/) ||     // - Étape
      trimmedLine.match(/^\*\s/) ||    // * Étape
      trimmedLine.startsWith('Étape') ||
      trimmedLine.startsWith('Step')
    ) {
      steps.push(trimmedLine.replace(/^(\d+\.\s|-\s|\*\s)/, ''));
    }
  }
  
  // Si aucune étape trouvée, créer des étapes basiques
  if (steps.length === 0) {
    return [
      'Analyser l\'incident selon le manuel d\'exploitation',
      'Appliquer les procédures recommandées',
      'Vérifier la résolution du problème'
    ];
  }
  
  return steps.slice(0, 10); // Limiter à 10 étapes max
}
// Gestion des autres méthodes HTTP

export async function GET() {
  return NextResponse.json(
    { 
      error: 'Méthode GET non supportée. Utilisez POST.',
      success: false 
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      error: 'Méthode PUT non supportée. Utilisez POST.',
      success: false 
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      error: 'Méthode DELETE non supportée. Utilisez POST.',
      success: false 
    },
    { status: 405 }
  );
}