import React from 'react'
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";


interface AlertProps {
    type : "error" | "success";
    message : string ;
}

const Alert = ({type, message}: AlertProps) => {
    const setError = ()=>{
        if (type === "error") return "bg-red-100 text-red-900 border-red-200"
        return "bg-green-100 text-green-900 border-green-200"
    }
  return (
    <div className={`rounded-md text-small  p-2 flex items-center my-1 border ${setError()}`}>
        {type === "error" ? <IoAlertCircleOutline className='me-1'/> :<FaRegCheckCircle className='me-1'/> }
        {message}
    </div>
  )
}

export default Alert