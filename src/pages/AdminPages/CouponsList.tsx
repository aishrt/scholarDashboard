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

export default function CouponsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminList = location.pathname === "/admin-list";
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
      key: "name",
      header: "Coupon",
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
      key: "role",
      header: "Role",
      render: (value) => {
        if (typeof value === "object" && value !== null) {
          return value.rolename || "N/A";
        }
        return value || "N/A";
      },
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <Badge
          size="sm"
          color={
            value === "active"
              ? "success"
              : value === "pending"
              ? "warning"
              : "error"
          }
        >
          {value}
        </Badge>
      ),
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

  // Handler for sort dropdown
  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  // Handler for role filter
  const handleRoleFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      role: value,
    }));
  };

  // Handler for add new user
  const handleAddNew = () => {
    navigate("/add-coupon");
  };

  // Handler for edit user
  const handleEdit = (user: ApiUser) => {
    navigate(`/edit-coupon/${user.id}`);
  };

  // Handler for delete user
  const handleDelete = async (user: ApiUser) => {
    try {
      setDeleteLoading(true);
      // Find the selected role object to get its ID
      const selectedRole = roles.find(
        (r: Role) =>
          r.id === (typeof user.role === "string" ? user.role : user.role.id)
      );
      if (!selectedRole) {
        toast.error("Invalid role selected");
        return;
      }

      const response = await api.delete(`/v1/admin/delete-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        data: {
          role: selectedRole.id,
        },
      });

      if (response?.data) {
        toast.success("Coupon deleted successfully!");
        // Refresh the user list
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to delete coupon:", err);
      toast.error("Failed to delete coupon. Please try again.");
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
        title="Coupon List"
        description="View and manage fleet data using Scholarship Portal's table components"
        ogTitle="Coupon List - Scholarship Portal"
        ogDescription="Data table components for managing fleet and logistics information"
        keywords="data tables, fleet management, logistics data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Coupon List" />
      <div className="space-y-6">
        <ComponentCard
          title="Coupon List"
          showFilters={true}
          showRoleFilter={false}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          showSortFilter={false}
          onRoleFilterChange={handleRoleFilterChange}
          onAddNew={handleAddNew}
        >
          <BasicTableOne
            data={users}
            columns={columns}
            isLoading={loading}
            emptyMessage="No coupons found"
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
