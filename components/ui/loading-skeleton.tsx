import { Skeleton } from "./skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="container max-w-screen-lg flex flex-col gap-4 py-8">
      <Skeleton className="w-full h-96" />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-44" />
        ))}
      </div>
      <Skeleton className="mt-4 w-full h-48" />
    </div>
  );
};
