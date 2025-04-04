'use client';


export default function AddTicket({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm border border-white/20
 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl mb-4">Add New Ticket</h2>
        <form>
          <input type="text" placeholder="Title" className="w-full border p-2 mb-2" />
          <textarea placeholder="Description" className="w-full border p-2 mb-4" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
