'use client';
import { ThemeProvider } from "@/components/theme-provider";
import { getReports } from "@/actions/agent.action";
import { useEffect, useState } from "react";
import { FileText, Clock, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';


interface Report {
  title: string;
  timestamp: string;
  summary: string;
  id: string;
  userId: string;


}

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    async function fetchReports() {
      const { success, reports } = await getReports();
      console.log("Fetched reports:", reports);
      if (success) {
        setReports(reports ?? []);
      }
    }
    fetchReports();
  }, []);

  const handleReportClick = (id: string) => {

    router.push(`/analysis/reportDetail/${id}`);
    setReportsOpen(false);

  }


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen bg-slate-50 dark:bg-slate-900 flex overflow-hidden">

        {/* Main Chat Section */}
        <main className={`flex-1 flex flex-col transition-all duration-300 ${reportsOpen ? 'mr-96' : ''}`}>
          {/* Header */}
          <header className="h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 flex-shrink-0 w-full">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              {pathname === '/analysis' && (
                <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Analysis Chat</h1>)}
              {pathname.startsWith('/analysis/reportDetail/') && (
                <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Rapport Détails
                </h1>
              )}

            </div>
            {!reportsOpen &&
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className="px-3 py-1 rounded-lg  hover:bg-green-500 cursor-pointer transition-colors bg-green-400
              text-white flex items-center space-x-2"
              >
                View Reports
              </button>
            }
          </header>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Reports Sidebar */}
        <aside className={`
          fixed right-0 top-0 h-screen w-96 
          transform transition-transform duration-300 ease-in-out z-40
          ${reportsOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700
          flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center">
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className="p-1 mr-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors "
              >
                {reportsOpen && <X size={18} className="dark:text-white text-slate-900" />}
              </button>
              <FileText size={20} className="mr-2 text-blue-500" />
              Rapports Générés
            </h2>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              {reports.length}
            </span>
          </div>

          {/* Reports List - Scrollable */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Aucun rapport généré pour le moment
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.title}
                    onClick={() => handleReportClick(report.id)}
                    className={`
                      group cursor-pointer p-4 rounded-xl border transition-all duration-200
                      hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700
                      ${selectedReport?.title === report.title
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                        : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <FileText size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                          <h3 className="text-sm font-medium text-slate-800 dark:text-white truncate">
                            {report.title}
                          </h3>
                        </div>

                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <Clock size={12} className="mr-1" />
                          {new Date(report.timestamp).toLocaleString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                          {report.summary}
                        </p>


                      </div>

                      <ChevronRight
                        size={16}
                        className="text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">

          </div>
        </aside>
      </div>
    </ThemeProvider>
  );
}