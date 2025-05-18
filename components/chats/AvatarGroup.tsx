"use client";
import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarGroupProps {
  users?: User[] 
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);
console.log("slice uses",users)
  return (
    <div className="flex items-center">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`relative h-8 w-8 rounded-full overflow-hidden border-2 border-white ${
            index !== 0 ? "-ml-3" : ""
          }`}
        >
          <Image
            src={user?.image || "/data/glx.jpg"}
            alt={user?.username || "user"}
            fill
            className="object-cover"
            sizes="(max-width: 32px) 100vw"
          />
        </div>
      ))}

      {users.length > 3 && (
        <div className="-ml-2 h-8 w-8 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center border-2 border-white">
          +{users.length - 3}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
