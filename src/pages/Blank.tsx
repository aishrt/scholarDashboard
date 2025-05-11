import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const Blank = () => {
  return (
    <>
      <PageMeta
        title="Blank Page"
        description="Customizable blank page template for Scholarship Portal"
        ogTitle="Blank Page - Scholarship Portal"
        ogDescription="Create custom pages with Scholarship Portal's blank page template"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>
        </div>
      </div>
    </>
  );
};

export default Blank;
