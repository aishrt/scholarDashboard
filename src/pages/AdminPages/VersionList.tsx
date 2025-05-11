import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne, {
  Column,
} from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate, useLocation } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import { toast } from "react-toastify";
import Badge from "../../components/ui/badge/Badge";
import { api } from "../../utils/api";
import storage from "../../utils/storage";
import { useAuthStore } from "../../store/authStore";

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

export default function VersionList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const roles = useAuthStore((state: any) => state.roles);
  console.log("roles------------>", roles);
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
      key: "category",
      header: "Category",
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
  // Handler for add new user
  const handleAddNew = () => {
    navigate("/add-version");
  };

  // Handler for edit user
  const handleEdit = (user: ApiUser) => {
    navigate(`/edit-version/${user.id}`);
  };

  // Handler for delete user
  const handleDelete = async (user: ApiUser) => {
    try {
      setDeleteLoading(true);
      // Find the selected role object to get its ID
      const response = await api.delete(`/v1/admin/delete-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });

      if (response?.data) {
        toast.success("Version deleted successfully!");
        // Refresh the user list
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to delete version:", err);
      toast.error("Failed to delete version. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
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
        title="Version List"
        description="View and manage fleet data using Scholarship Portal's table components"
        ogTitle="Version List - Scholarship Portal"
        ogDescription="Data table components for managing fleet and logistics information"
        keywords="data tables, fleet management, logistics data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Version List" />
      <div className="space-y-6">
        <ComponentCard
          title="Version List"
          showFilters={true}
          showRoleFilter={false}
          onSearch={handleSearch}
          showSortFilter={false}
          onAddNew={handleAddNew}
        >
          <BasicTableOne
            data={users}
            columns={columns}
            isLoading={loading}
            emptyMessage="No versions found"
            actions={{
              showEdit: true,
              showDelete: true,
              onEdit: handleEdit,
              onDelete: handleDelete,
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
