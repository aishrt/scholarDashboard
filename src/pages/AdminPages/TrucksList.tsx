import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate } from "react-router-dom";

export default function TrucksList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
    status: "all"
  });

  const handleSearch = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value
    }));
  };

  const handleStatusFilterChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleAddNew = () => {
    navigate("/add-truck");
  };

  return (
    <>
      <PageMeta
        title="Trucks List"
        description="View and manage trucks data using Scholarship Portal's table components"
        ogTitle="Trucks List - Scholarship Portal"
        ogDescription="Data table components for managing trucks and fleet information"
        keywords="trucks, fleet management, vehicle data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Trucks" />
      <div className="space-y-6">
        <ComponentCard
          title="Trucks List"
          showFilters={true}
          showAddNew={false}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onRoleFilterChange={handleStatusFilterChange}
        >
          <BasicTableOne users={[]} />
        </ComponentCard>
      </div>
    </>
  );
} 