import React from 'react'
import Header from '@/components/editor/Header'
import UserAvatar from '@/components/UserAvatar'
import Image from 'next/image'
import AddDocumentBtn from '@/components/editor/AddDocumentBtn'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDocuments } from '@/actions/room.actions'
import { dateConverter } from '@/lib/utils'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { DeleteModal } from '@/components/editor/DeleteModal'
import ModeToggle  from '@/components/ModeToggle';
const Docs = async() => {
  const session = await auth();
  if (!session) redirect("/auth")
  
    let roomDocuments;
  try {
    roomDocuments = await getDocuments(session.user?.email ?? "");
    console.log("Documents retrieved:", roomDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    roomDocuments = { data: [] }; // Provide default empty data
  }

  // Ensure roomDocuments.data exists, default to empty array if undefined
  const documents = roomDocuments?.data || [];
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-200">
      <Header className="sticky left-0 top-0 z-10 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex items-center flex-1 justify-center gap-2">
              <Image 
                src="/assets/icons/doc.svg"
                alt="Docs"
                width={30}
                height={30}
                
              />
           
            <h1 className="text-xl font-bold hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Documents
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 relative">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <UserAvatar />
          </div>
        </div>
      </Header>
      
      <div className="mt-8 sm:mt-12">
        {documents.length > 0 ? (
          <div className="document-list-container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">All documents</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {documents.length} document{documents.length !== 1 ? 's' : ''} in your workspace
                </p>
              </div>
              <AddDocumentBtn 
                userId={session.user?.id}
                email={session.user?.email}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                <div key={id} className="relative group">
                  <Link 
                    href={`/documents/${id}`} 
                    className="block p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 p-3 group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-slate-600 dark:group-hover:to-slate-500 transition-colors duration-200">
                        <Image 
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={24}
                          height={24}
                          className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                          {metadata.title}
                        </h4>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            Created {dateConverter(createdAt)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Active
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              Document
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </Link>
                  
                 
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <DeleteModal roomId={id}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-600">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
                  <Image 
                    src="/assets/icons/doc.svg"
                    alt="Document"
                    width={48}
                    height={48}
                    className="brightness-0 invert"
                  />
                </div>
              </div>
             
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce delay-300" />
            </div>
            
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No documents yet
              </h2>
              <p className="text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
                Create your first document to get started with your workspace. 
                Collaborate, edit, and share with your team in real-time.
              </p>
              
              <AddDocumentBtn 
                userId={session?.user?.id}
                email={session?.user?.email}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium mx-auto"
              />
              
              
           
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Docs