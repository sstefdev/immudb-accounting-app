const SkeletonLoader = () => (
  <div className="animate-pulse flex space-x-3 cursor-default">
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
    </div>
  </div>
);

export default SkeletonLoader;
