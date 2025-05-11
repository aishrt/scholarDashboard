import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate } from "react-router-dom";

export default function DealsList() {
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
    navigate("/add-deal");
  };

  return (
    <>
      <PageMeta
        title="Deals List"
        description="View and manage deals data using Trux360's table components"
        ogTitle="Deals List - Trux360"
        ogDescription="Data table components for managing deals and logistics information"
        keywords="deals, fleet management, logistics data, Trux360 tables"
      />
      <PageBreadcrumb pageTitle="Deals" />
      <div className="space-y-6">
        <ComponentCard
          title="Deals List"
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