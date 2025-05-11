import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { BoxIcon } from "../../icons";

const Buttons = () => {
  return (
    <>
      <PageMeta
        title="Buttons"
        description="Explore Scholarship Portal's UI button components for scholarship management interface"
        ogTitle="UI Buttons - Scholarship Portal"
        ogDescription="Interactive button components for Scholarship Portal's scholarship management platform"
        keywords="UI buttons, interactive elements, scholarship management interface, Scholarship Portal components"
      />
      <PageBreadcrumb pageTitle="Buttons" />
      <div className="space-y-5 sm:space-y-6">
        {/* Primary Button */}
        <ComponentCard title="Primary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              Button Text
            </Button>
            <Button size="md" variant="primary">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Primary Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="primary"
              startIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="primary"
              startIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Primary Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="primary"
              endIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="primary"
              endIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button */}
        <ComponentCard title="Secondary Button">
          <div className="flex items-center gap-5">
            {/* Outline Button */}
            <Button size="sm" variant="outline">
              Button Text
            </Button>
            <Button size="md" variant="outline">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Outline Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="outline"
              startIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="outline"
              startIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Outline Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="outline"
              endIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="outline"
              endIcon={<BoxIcon className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Buttons;
