'use client'
import { Send } from 'lucide-react';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
    placeholder? : string
    id : string
    type? : string
    required?: boolean  
    register: UseFormRegister<FieldValues>;
    errors : FieldErrors
}

const MessageInput :React.FC<MessageInputProps>= ({
    placeholder,
    id,
    type,
    required,
    register,
    errors
}) => {
  return (
    <div className="relative w-full  flex gap-3 items-center">
        <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id,{required})}
        placeholder={placeholder}
        className="text-black py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none font-semibold "
        >
        </input>

        <button
        type="submit"
        className="rounded-full w-7 h-7  items-center p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        ><Send size={18} className='text-white absolute top-3 right-1'/></button>
    </div>
  )
}

export default MessageInput