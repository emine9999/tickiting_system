import React from 'react'

const Conversation = () => {
  return (
<div className='flex-1 flex flex-col'>
<div className="p-4 border-b">
    <h2 className="font-semibold">Chat with [Username]</h2>
  </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-4">
    {/* Messages will go here */}
  </div>

  {/* Input Area */}
  <div className="p-4 border-t">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Send
      </button>
    </div>
  </div>
</div>
  )
}

export default Conversation