import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne, {
  Column,
} from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate, useLocation } from "react-router-dom";
import useGetData from "../../hooks/useGetData";

interface Role {
  id: string;
  rolename: string;
  rolelevel: number;
}

interface ApiUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  country: string;
  state: string;
  city: string;
  role: string | Role;
  status: string;
  created_by?: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

interface UserResponse {
  status: string;
  message: string;
  data: {
    users: ApiUser[];
    totalCount: number;
    page: number;
    limit: number;
  };
}

export default function DeviceList() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminList = location.pathname === "/admin-list";
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
    role: "all",
  });

  const { getData } = useGetData<UserResponse>();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        ...(filters.search && { name: filters.search }),
      });

      const response = await getData(`/v1/admin/list-user?${queryParams}`);
      if (response?.data) {
        setUsers(response.data.users);
        setTotalCount(response.data.totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters.search]);

  // Define table columns
  const columns: Column[] = [
    {
      key: "deviceId",
      header: "Device",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src="/images/user/default-avatar.jpg"
              alt={`${row.first_name || ""} ${row.last_name || ""}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {`${row.first_name || ""} ${row.last_name || ""}`.trim() || "N/A"}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {row.role.rolename}
            </span>
          </div>
        </div>
      ),
      className: "px-5 py-4 sm:px-6",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: () => new Date().toLocaleDateString(),
    },
  ];

  // Handler for search input
  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
    setCurrentPage(1); // Reset to first page on new search
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Handler for page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PageMeta
        title={"Device List"}
        description="View and manage fleet data using Scholarship Portal's table components"
        ogTitle="Device List - Scholarship Portal"
        ogDescription="Data table components for managing fleet and logistics information"
        keywords="data tables, fleet management, logistics data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle={"Device List"} />
      <div className="space-y-6">
        <ComponentCard
          title={"Device List"}
          showFilters={true}
          showRoleFilter={false}
          showAddNew={false}
          showSortFilter={false}
          onSearch={handleSearch}
        >
          <BasicTableOne
            data={users}
            columns={columns}
            isLoading={loading}
            emptyMessage="No devices found"
            actions={{
              showEdit: false,
            }}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: handlePageChange,
              totalItems: totalCount,
              itemsPerPage: limit,
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
