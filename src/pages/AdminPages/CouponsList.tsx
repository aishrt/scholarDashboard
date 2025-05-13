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

interface Discount {
  id: string;
  brandName: string;
  logo: string;
  discountPercentage: number;
  description: string;
  code: string;
  category: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  url: string;
  discountId?: string;
}

interface DiscountResponse {
  status: string;
  message: string;
  data: Discount[];
}

export default function CouponsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
    category: "all",
  });

  const { getData } = useGetData<DiscountResponse>();

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response: any = await getData(
        "https://getalldiscounts-g2ivo4mtsa-uc.a.run.app"
      );
      if (response) {
        setDiscounts(response);
        setTotalCount(response.length);
      }
    } catch (err) {
      console.error("Failed to fetch discounts:", err);
      toast.error("Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate data
  const getFilteredAndPaginatedData = () => {
    let filteredData = [...discounts];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.brandName.toLowerCase().includes(searchLower) ||
          item.code.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filteredData = filteredData.filter(
        (item) => item.category === filters.category
      );
    }

    // Apply sorting
    if (filters.sort === "a-z") {
      filteredData.sort((a, b) => a.brandName.localeCompare(b.brandName));
    } else if (filters.sort === "z-a") {
      filteredData.sort((a, b) => b.brandName.localeCompare(a.brandName));
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredData.slice(startIndex, endIndex);
  };

  // Calculate filtered data length and update total count
  useEffect(() => {
    let filteredData = [...discounts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.brandName.toLowerCase().includes(searchLower) ||
          item.code.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category !== "all") {
      filteredData = filteredData.filter(
        (item) => item.category === filters.category
      );
    }

    setTotalCount(filteredData.length);
  }, [discounts, filters.search, filters.category]);

  useEffect(() => {
    fetchDiscounts();
  }, []); // Remove currentPage and filters.search from dependencies

  // Define table columns
  const columns: Column[] = [
    {
      key: "brandName",
      header: "Brand",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src={row.logo ? row.logo : "/images/picture.png"}
              alt={row.brandName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/picture.png";
              }}
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {row.brandName}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {row.category}
            </span>
          </div>
        </div>
      ),
      className: "px-5 py-4 sm:px-6",
    },
    {
      key: "discountPercentage",
      header: "Discount",
      render: (value) => `${value}%`,
    },
    {
      key: "code",
      header: "Code",
      render: (value) => value || "N/A",
    },
    {
      key: "category",
      header: "Category",
      render: (value) => (
        <Badge
          size="sm"
          color={
            value === "Scholarship"
              ? "success"
              : value === "Loan"
              ? "warning"
              : "info"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (value) => new Date(value._seconds * 1000).toLocaleDateString(),
    },
  ];

  // Handler for search input
  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
    setCurrentPage(1);
  };

  // Handler for sort dropdown
  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  // Handler for category filter
  const handleCategoryFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Handler for add new discount
  const handleAddNew = () => {
    navigate("/add-coupon");
  };

  // Handler for edit discount
  const handleEdit = (discount: Discount) => {
    navigate(`/edit-coupon/${discount.id}`);
  };

  // Handler for delete discount
  const handleDelete = async (discount: Discount) => {
    try {
      setDeleteLoading(true);
      const response = await api.delete(
        `https://deletediscount-g2ivo4mtsa-uc.a.run.app/${discount.id}`,
        {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        }
      );

      if (response?.data) {
        toast.success("Discount deleted successfully!");
        fetchDiscounts();
      }
    } catch (err) {
      console.error("Failed to delete discount:", err);
      toast.error("Failed to delete discount. Please try again.");
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
        title="Discount List"
        description="View and manage discounts and scholarships using Scholarship Portal's table components"
        ogTitle="Discount List - Scholarship Portal"
        ogDescription="Data table components for managing discounts and scholarships information"
        keywords="data tables, discount management, scholarship data, Scholarship Portal tables"
      />
      <PageBreadcrumb pageTitle="Discount List" />
      <div className="space-y-6">
        <ComponentCard
          title="Discount List"
          showFilters={true}
          showRoleFilter={false}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          showSortFilter={false}
          onRoleFilterChange={handleCategoryFilterChange}
          onAddNew={handleAddNew}
        >
          <BasicTableOne
            data={getFilteredAndPaginatedData()}
            columns={columns}
            isLoading={loading}
            emptyMessage="No discounts found"
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
