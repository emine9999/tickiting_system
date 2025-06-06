'use client';

import { usePathname } from 'next/navigation';
import { getReportDetails } from '@/actions/agent.action';
import { getCurrentUser } from '@/actions/user.actions';
import { useEffect, useState } from 'react';
import {  AlertTriangle, FileText, User, Calendar, Tag, Lightbulb, Shield } from 'lucide-react';
import {renderMarkdown,getSeverityColor,getIncidentTypeColor } from '@/lib/utils';
import {ReportDetails} from '@/types/agno-response'; 
import Loader from '@/components/Loader';
import Alert from '@/components/Alert';




const Page = () => {
  const [report, setReport] = useState<ReportDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        const userId = user?.id;

        if (!userId) {
          setError("Utilisateur non connecté.");
          setLoading(false);
          return;
        }

        const { success, report: reportData, error: reportError } = await getReportDetails(id, userId);
        if (success && reportData) {
          setReport(reportData);
        } else {
          setError(reportError || 'Échec du chargement du rapport.');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement du rapport.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <Alert type='error' message='error fetching report details'/>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-w-md text-center">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Aucun rapport trouvé</h2>
          <p className="text-slate-500 dark:text-slate-400">Le rapport demandé n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 mb-6 sm:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-sm sm:text-xl lg:text-3xl font-bold text-white mb-2 leading-tight break-words">{report.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-blue-100">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{new Date(report.timestamp).toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{report.metadata?.user_info?.user_name || 'Utilisateur'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6 lg:space-y-8 min-w-0">
            {/* Summary Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Résumé de l'incident</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base break-words">{report.summary}</p>
            </div>

            {/* Recommendations Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Recommandations</h2>
              </div>
              <div className="space-y-3">
                {report.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm break-words min-w-0">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
                  
            {/* Raw Content Card - Now with Markdown Rendering */}
          
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6 min-w-0">
            {/* Status Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Détails de l'incident</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Type d'incident</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getIncidentTypeColor(report.incidentType)} break-words`}>
                      <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{report.incidentType}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Gravité</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getSeverityColor(report.severity)}`}>
                      <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
                      {report.severity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Card */}
            {report.metadata && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Métadonnées</h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  {report.metadata.processing_time && (
                    <div className="flex justify-between items-start">
                      <span className="text-slate-500 dark:text-slate-400 min-w-0 mr-2">Temps de traitement:</span>
                      <span className="text-green-500 font-medium text-right">{report.metadata.processing_time.toFixed(2)}s</span>
                    </div>
                  )}
                  {report.metadata.model_used && (
                    <div className="flex justify-between items-start ">
                      <span className="text-slate-500 dark:text-slate-400 min-w-0 mr-2">Modèle:</span>
                      <span className="text-green-500  font-medium text-right truncate">{report.metadata.model_used.slice(0,10)}</span>
                    </div>
                  )}

                  {report.metadata.user_info?.group_id && (
                    <div className="flex justify-between items-start">
                      <span className="text-slate-500 dark:text-slate-400 min-w-0 mr-2">Groupe:</span>
                      <span className="text-green-500 font-medium text-right">{report.metadata.user_info.group_id}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

          <div className="bg-white mt-5 dark:bg-slate-800 w-full rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Contenu détaillé</h2>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div 
                  className="p-4 sm:p-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 overflow-x-auto leading-relaxed prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(report.rawContent) }}
                />
              </div>
            </div>
      </div>
    </div>
  );
};

export default Page;