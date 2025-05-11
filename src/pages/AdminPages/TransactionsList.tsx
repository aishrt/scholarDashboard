import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate } from "react-router-dom";

export default function TransactionsList() {
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
    navigate("/add-transaction");
  };

  return (
    <>
      <PageMeta
        title="Transactions List"
        description="View and manage transactions data using Scholarship Portal's table components"
        ogTitle="Transactions List - Scholarship Portal"
        ogDescription="Data table components for managing transactions and financial information"
        keywords="transactions, financial data, payment records, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="space-y-6">
        <ComponentCard
          title="Transactions List"
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