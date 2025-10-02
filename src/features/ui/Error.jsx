import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <div className="mb-4 text-2xl sm:text-2xl md:text-2xl">😵</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
        Oops! Something went wrong
      </h1>

      <p className="mb-6 max-w-md text-sm text-gray-600 sm:text-base md:text-lg">
        {error?.statusText || error?.message || "Unexpected error occurred."}
      </p>
      <LinkButton
        to="-1"
        className="rounded-full bg-yellow-500 px-4 py-2 
                   text-sm font-semibold text-white shadow-md transition-colors duration-300 
                   hover:bg-yellow-600 sm:px-6 sm:py-3 sm:text-base"
      >
        ← Go Back Home
      </LinkButton>
    </div>
  );
}
