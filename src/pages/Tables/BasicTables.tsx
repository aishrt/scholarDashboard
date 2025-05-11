import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  // Sample data for the table
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      status: "active",
      createdAt: "2024-03-20"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Teacher",
      status: "pending",
      createdAt: "2024-03-19"
    }
  ];

  // Define columns configuration
  const columns = [
    {
      key: "name",
      header: "Name",
      className: "min-w-[200px]"
    },
    {
      key: "email",
      header: "Email",
      className: "min-w-[200px]"
    },
    {
      key: "role",
      header: "Role",
      className: "min-w-[100px]"
    },
    {
      key: "status",
      header: "Status",
      className: "min-w-[100px]"
    },
    {
      key: "createdAt",
      header: "Created At",
      className: "min-w-[120px]"
    }
  ];

  return (
    <>
      <PageMeta
        title="Basic Tables"
        description="View and manage scholarship data using Scholarship Portal's table components"
        ogTitle="Data Tables - Scholarship Portal"
        ogDescription="Data table components for managing scholarship and logistics information"
        keywords="data tables, scholarship management, logistics data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne data={sampleData} columns={columns} />
        </ComponentCard>
      </div>
    </>
  );
}
