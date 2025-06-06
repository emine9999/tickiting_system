import React from "react";
import { motion } from "framer-motion";


const ProjectOverview = () => {
  return (
    <motion.div
      className="w-full max-w-[600px] my-4"
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 5 }}
    >
      <div className="border rounded-lg p-6 flex flex-col gap-4 items-center text-neutral-500 text-sm dark:text-neutral-400 dark:border-neutral-700 ">
        <div className="flex items-center gap-2">
          <h1 className=" font-semibold text-neutral-800 dark:text-neutral-200 text-4xl">
            Welcome to </h1>
            {/* logo */}
          <div className="flex items-center justify-center gap-2 bg-slate-200 px-3 py-1 rounded-full ">

            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-gray-900  text-lg">
              TickHub
            </span>
          </div>
 
        </div>
        <p className="text-center">
          TickHub is an AI-powered incident management platform designed to streamline the process of reporting, analyzing, and resolving incidents efficiently in less than 20s.  
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectOverview;
