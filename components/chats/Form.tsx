"use client";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CloudUpload, Image } from "lucide-react";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
// TODO : need to be fixed to upalod the image onSuccess
  const handleUpload =(result: any)=>{
    axios.post('api/messages',{
      image : result?.info?.secure_url,
      conversationId
    })
  }
  return (
    <div className="flex-1 flex  py-4 px-4 w-full gap-2 border-t items-center bg-white">
      <CldUploadButton
      options={{maxFiles:1}}
     onSuccess={handleUpload}
      uploadPreset="bwinyv44"      
      ><Image className="text-sky-500" /></CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
      </form>
    </div>
  );
};

export default Form;
