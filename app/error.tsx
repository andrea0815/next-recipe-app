'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen p-10 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-red-500">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-text rounded"
      >
        Try again
      </button>
    </div>
  );
}