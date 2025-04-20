const SkeletonCard = () => {
    return (
      <div className="min-w-full animate-pulse p-4 bg-white dark:bg-gray-800 shadow-lg rounded-md flex gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;
  