import { cn } from '@/lib/utils';
import { useIsThreadActive } from '@liveblocks/react-lexical';
import { Composer, Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense';
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ThreadWrapperProps {
  thread: any;
}

const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);
  
  return (
    <Thread
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn(
        'comment-thread border border-slate-700 bg-slate-800 rounded-xl p-2 mt-4 transition-all duration-200',
        isActive && '!border-blue-500 shadow-lg shadow-blue-500/20 rounded-xl',
        thread.resolved && 'opacity-40 hover:opacity-70'
      )}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  
  return (
    <div className="comments-container p-4 border border-blue-500  rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={20} className="text-blue-400" />
        <h3 className="text-lg font-medium text-slate-100">Comments</h3>
      </div>
      
      <Composer 
        className="comment-composer rounded-xl  !bg-slate-900 border border-slate-700 hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-md focus-within:shadow-blue-500/20 transition-all duration-200 mb-6 p-3" 
       
      />
      
      {threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadWrapper key={thread.id} thread={thread} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-slate-800 p-3 rounded-full mb-3">
            <MessageSquare size={24} className="text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm">No comments yet</p>
          <p className="text-slate-500 text-xs mt-1">Be the first to start a conversation</p>
        </div>
      )}
    </div>
  );
};

export default Comments;