import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridShape from "../../components/common/GridShape";
import PageMeta from "../../components/common/PageMeta";
import { ScrollToTop } from "../../components/common/ScrollToTop";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <PageMeta
        title="Error"
        description="An error occurred while accessing Scholarship Portal's scholarship management platform"
        ogTitle="Error | Scholarship Portal"
        ogDescription="An error occurred while accessing Scholarship Portal"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ERROR
          </h1>

          <img src="/images/error/error.svg" alt="error" className="dark:hidden" />
          <img
            src="/images/error/error-dark.svg"
            alt="error"
            className="hidden dark:block"
          />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Something went wrong! Redirecting to home page in {countdown} seconds...
          </p>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Back to Home Page
          </button>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - TailAdmin
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
