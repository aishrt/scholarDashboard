import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import usePostData from "../../hooks/usePostData.ts";
import usePutData from "../../hooks/usePutData.ts";
import useGetData from "../../hooks/useGetData.ts";

interface FormErrors {
  category?: string;
}

export default function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Category form state
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { getData } = useGetData<any>();
  const { postData, loading: postLoading } = usePostData<any, any>(
    "/v1/admin/create-category",
    { verifyAuth: true }
  );
  const { putData, loading: putLoading } = usePutData<any, any>(
    `/v1/admin/update-category/${id}`,
    { verifyAuth: true }
  );

  const loading = isEditMode ? putLoading : postLoading;

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const response = await getData(`/v1/admin/category-detail/${id}`);
          if (response?.data) {
            const categoryData = response.data;
            setCategory(categoryData.category || "");
          }
        } catch (err) {
          console.error("Failed to fetch category details:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCategoryDetails();
  }, [id, isEditMode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = {
        category
      };

      const response = isEditMode
        ? await putData(formData)
        : await postData(formData);

      if (response?.data) {
        toast.success(
          isEditMode
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        navigate("/category-list");
      }
    } catch (err) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} category:`,
        err
      );
      toast.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } category. Please try again.`
      );
    }
  };

  return (
    <div>
      <PageMeta
        title={isEditMode ? "Edit Category" : "Add Category"}
        description={
          isEditMode
            ? "Edit existing category"
            : "Add a new category to the system"
        }
        ogTitle={
          isEditMode
            ? "Edit Category - Scholarship Portal"
            : "Add Category - Scholarship Portal"
        }
        ogDescription={
          isEditMode
            ? "Edit existing category"
            : "Add a new category"
        }
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Category" : "Add Category"} />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || isLoading}
          >
            {loading
              ? "Processing..."
              : isEditMode
              ? "Update Category"
              : "Create Category"}
          </button>
        </form>
      )}
    </div>
  );
}
