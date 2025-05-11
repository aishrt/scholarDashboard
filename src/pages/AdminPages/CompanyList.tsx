import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne, {
  Column,
} from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import { toast } from "react-toastify";
import Badge from "../../components/ui/badge/Badge";
import { api } from "../../utils/api";
import storage from "../../utils/storage";
import { useAuthStore } from "../../store/authStore";

interface Company {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  country: string;
  state: string;
  city: string;
  status: string;
  created_by?: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

interface CompanyResponse {
  status: string;
  message: string;
  data: {
    organisations: Company[];
    totalCount: number;
    page: number;
    limit: number;
  };
}

interface CompanyDetailResponse {
  status: string;
  message: string;
  data: Company;
}

export default function CompanyList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = location.pathname.includes("/edit-company/");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Partial<Company>>({
    name: "",
    email: "",
    phone_number: "",
    country: "",
    state: "",
    city: "",
    status: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
  });

  const { getData: getCompanyList } = useGetData<CompanyResponse>();
  const { getData: getCompanyDetail } = useGetData<CompanyDetailResponse>();

  const fetchCompanyDetail = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await getCompanyDetail(
        `/v1/admin/organisation-detail/${companyId}`
      );
      if (response?.data) {
        setCompanyDetails(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
          status: response.data.status,
        });
      }
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      toast.error("Failed to fetch company details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsSubmitting(true);
      const response = await api.put(
        `/v1/admin/update-organisation/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        }
      );

      if (response?.data) {
        toast.success("Company updated successfully!");
        navigate("/company-list");
      }
    } catch (err) {
      console.error("Failed to update company:", err);
      toast.error("Failed to update company. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        ...(filters.search && { name: filters.search }),
      });

      const response = await getCompanyList(
        `/v1/admin/list-organisation?${queryParams}`
      );
      if (response?.data) {
        setCompanies(response.data.organisations);
        setTotalCount(response.data.totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && id) {
      fetchCompanyDetail(id);
    } else {
      fetchCompanies();
    }
  }, [currentPage, filters.search, isEditMode, id]);

  // Define table columns
  const columns: Column[] = [
    {
      key: "name",
      header: "Company",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src="/images/user/default-avatar.jpg"
              alt={row.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {row.name || "N/A"}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {row.country}
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
      key: "phone_number",
      header: "Phone",
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

  // Handler for add new company
  const handleAddNew = () => {
    navigate("/add-company");
  };

  // Handler for edit company
  const handleEdit = (company: Company) => {
    navigate(`/edit-company/${company.id}`);
  };

  // Handler for delete company
  const handleDelete = async (company: Company) => {
    try {
      setDeleteLoading(true);
      const response = await api.delete(
        `/v1/admin/delete-organisation/${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        }
      );

      if (response?.data) {
        toast.success("Company deleted successfully!");
        // Refresh the company list
        fetchCompanies();
      }
    } catch (err) {
      console.error("Failed to delete company:", err);
      toast.error("Failed to delete company. Please try again.");
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

  // If we're in edit mode, show the edit form
  if (isEditMode) {
    return (
      <>
        <PageMeta
          title="Edit Company"
          description="Edit company details using Scholarship Portal's form components"
          ogTitle="Edit Company - Scholarship Portal"
          ogDescription="Form components for editing company information"
          keywords="company edit, organization management, Scholarship Portal forms"
        />
        <PageBreadcrumb pageTitle="Edit Company" />
        <div className="space-y-6">
          <ComponentCard title="Edit Company">
            {loading ? (
              <p>Loading company details...</p>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/company-list")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </ComponentCard>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Company List"
        description="View and manage company data using Scholarship Portal's table components"
        ogTitle="Company List - Scholarship Portal"
        ogDescription="Data table components for managing company and organization information"
        keywords="data tables, company management, organization data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Company List" />
      <div className="space-y-6">
        <ComponentCard
          title="Company List"
          showFilters={true}
          onSearch={handleSearch}
          showSortFilter={false}
          onSortChange={handleSortChange}
          onAddNew={handleAddNew}
        >
          <BasicTableOne
            data={companies}
            columns={columns}
            isLoading={loading}
            emptyMessage="No companies found"
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
