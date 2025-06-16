import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Profile from "@/components/Profile";
import { auth } from "@/auth";
const AccountSettingsPage = async () => {
  const session = await auth();
  console.log("session", session);

  // Extract profile details into an array for mapping
  const profileDetails = [
    { label: "Name", value: session?.user?.name || "Agent" },
    { label: "Email", value: session?.user?.email || "N/A" },
    { label: "Role", value: session?.user?.role?.name || "USER" },
    {
      label: "Role Description",
      value: session?.user?.role?.description || "No description available",
    },
  ];

  return (
    <div className="h-full p-4 md:p-6 dark:bg-slate-900 w-full flex flex-col lg:flex-row gap-6 transition-colors duration-200 ml-14 3xl:ml-0">
      {/* Sidebar profile card */}
      <div className="w-full lg:w-auto lg:min-w-[350px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-white">
          Account Settings
        </h1>
        <div className="p-6 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-gray-50 dark:border-slate-700 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-gray-100 dark:border-slate-700">
              <Avatar className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-700 ring-2 ring-blue-400 dark:ring-blue-500">
                <AvatarImage
                  src={session?.user?.name?.charAt(0) || "/data/u.png"}
                  alt="User Avatar"
                />
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {session?.user?.name || "Agent"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  {session?.user?.role?.name || "USER"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {profileDetails.map((data) => (
                <div
                  key={data.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2"
                >
                  <p className="text-sm font-semibold text-slate-700 dark:text-gray-300 min-w-[80px]">
                    {data.label}:
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 break-words">
                    {data.value}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
              We gald Your With Us
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 mt-6 lg:mt-0">
        <Profile />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
