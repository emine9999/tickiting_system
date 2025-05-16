import { FullMessageType } from "@/types/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.username)
    .join(",");
  console.log("seen lisst ",seenList)
  const container = `flex gap-3 p-4 ${isOwn && "justify-end"} `;
  const avatar = `${isOwn && "order-2"} `;
  const body = ` flex flex-col gap-2 ${isOwn && "items-end"} `;
  const message = `text-sm w-fit overflow-hidden ${
    isOwn ? " bg-sky-500 text-white" : "bg-gray-100"
  } ${data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"} `;
  return (
    <div className={container}>
      <div className={avatar}>
        <div className="relative w-10 h-10 flex-shrink-0 ">
          <Image
            src={data.sender.image || "/data/glx.jpg"}
            alt={data.sender.username || "User"}
            fill
            className="rounded-full object-cover ring-2 ring-amber-600"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.username}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
      </div>

      <div className={message}>
            {data.image ?(
                <Image
                src={data.image}
                alt="image"
                height={288}
                width={288}
                className="object-cover cursor-pointer hover:scale-110 transition translate"
                />
            ): 
            <div>{data.body}</div>
                }
      </div>
      {isLast && isOwn && seenList.length > 0 && (
        <div className="text-xs font-extralight text-gray-500">{`Seen by ${seenList}`}</div>
      )}
    </div>
  );
};

export default MessageBox;
