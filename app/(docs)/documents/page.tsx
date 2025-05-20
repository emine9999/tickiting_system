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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-h-screen bg-slate-900 text-slate-200">
      <Header className="sticky left-0 top-0 z-10 backdrop-blur-sm bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center justify-between w-full py-2 ">
          <div className="flex items-center flex-1 justify-center gap-2">
            <Image 
              src="/assets/icons/doc.svg"
              alt="Docs"
              width={30}
              height={30}
              className="hidden sm:block brightness-[1.15]"
            />
            <h1 className="text-xl font-bold hidden sm:block">Documents</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Bell size={20} />
            </button>
            <UserAvatar />
          </div>
        </div>
      </Header>
      
      <div className="mt-8 sm:mt-12">
        {documents.length > 0 ? (
          <div className="document-list-container">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">All documents</h3>
              <AddDocumentBtn 
                userId={session.user?.id}
                email={session.user?.email}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                <div key={id} className="relative">
                  <Link 
                    href={`/documents/${id}`} 
                    className="group flex flex-col p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-200"
                  >
                    <div className="flex items-start  gap-3">
                      <div className="rounded-md bg-slate-700 p-2">
                        <Image 
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {metadata.title}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                          Created {dateConverter(createdAt)}
                        </p>
                       
                      </div>
                      <DeleteModal roomId={id}/>
                    </div>
                  </Link>
                  
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="bg-slate-800 p-6 rounded-full mb-6">
              <Image 
                src="/assets/icons/doc.svg"
                alt="Document"
                width={60}
                height={60}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">No documents yet</h2>
            <p className="text-slate-400 mb-6 max-w-sm">
              Create your first document to get started with your workspace
            </p>
            <AddDocumentBtn 
              userId={session?.user?.id}
              email={session?.user?.email}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default Docs