import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";
import FileInput from "../../components/form/input/FileInput.tsx";
import usePostData from "../../hooks/usePostData.ts";
import usePutData from "../../hooks/usePutData.ts";
import useGetData from "../../hooks/useGetData.ts";

interface Category {
  _id: string;
  category: string;
}

interface FormErrors {
  brandName?: string;
  category?: string;
  code?: string;
  description?: string;
  discountId?: string;
  discountPercentage?: string;
  logo?: string;
  url?: string;
}

export default function AddCoupons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Coupon form state
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [logo, setLogo] = useState("");
  const [url, setUrl] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();

  const handleFileChange = (file: File | null, fileDataURL: string) => {
    setFile(file);
  };
  const { getData } = useGetData<any>();
  const { postData, loading: postLoading } = usePostData<any, any>(
    "/v1/admin/create-coupon",
    { verifyAuth: true }
  );
  const { putData, loading: putLoading } = usePutData<any, any>(
    `/v1/admin/update-coupon/${id}`,
    { verifyAuth: true }
  );

  const loading = isEditMode ? putLoading : postLoading;

  useEffect(() => {
    const fetchCouponDetails = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const response = await getData(`/v1/admin/coupon-detail/${id}`);
          if (response?.data) {
            const couponData = response.data;
            setBrandName(couponData.brandName || "");
            setCategory(couponData.category || "");
            setCode(couponData.code || "");
            setDescription(couponData.description || "");
            setDiscountId(couponData.discountId || "");
            setDiscountPercentage(couponData.discountPercentage || "");
            setLogo(couponData.logo || "");
            setUrl(couponData.url || "");
          }
        } catch (err) {
          console.error("Failed to fetch coupon details:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCouponDetails();
  }, [id, isEditMode]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getData("/v1/admin/category-list");
        if (response?.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!brandName) {
      newErrors.brandName = "Brand name is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!code) {
      newErrors.code = "Coupon code is required";
    }

    if (!description) {
      newErrors.description = "Description is required";
    }

    if (!discountId) {
      newErrors.discountId = "Discount ID is required";
    }

    if (!discountPercentage) {
      newErrors.discountPercentage = "Discount percentage is required";
    } else if (
      isNaN(Number(discountPercentage)) ||
      Number(discountPercentage) < 0 ||
      Number(discountPercentage) > 100
    ) {
      newErrors.discountPercentage =
        "Discount percentage must be between 0 and 100";
    }

    if (!logo && !isEditMode) {
      newErrors.logo = "Logo is required";
    }

    if (!url) {
      newErrors.url = "URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = {
        brandName,
        category,
        code,
        description,
        discountId,
        discountPercentage: Number(discountPercentage),
        logo,
        url,
      };

      const response = isEditMode
        ? await putData(formData)
        : await postData(formData);

      if (response?.data) {
        toast.success(
          isEditMode
            ? "Coupon updated successfully!"
            : "Coupon created successfully!"
        );
        navigate("/coupon-list");
      }
    } catch (err) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} coupon:`,
        err
      );
      toast.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } coupon. Please try again.`
      );
    }
  };

  return (
    <div>
      <PageMeta
        title={isEditMode ? "Edit Coupon" : "Add Coupon"}
        description={
          isEditMode
            ? "Edit existing coupon details"
            : "Add a new coupon to the system"
        }
        ogTitle={
          isEditMode
            ? "Edit Coupon - Scholarship Portal"
            : "Add Coupon - Scholarship Portal"
        }
        ogDescription={
          isEditMode
            ? "Edit existing coupon details"
            : "Add a new coupon to the system"
        }
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Coupon" : "Add Coupon"} />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div>
              <Label htmlFor="logo">Brand Logo *</Label>
              <FileInput onFileChange={handleFileChange} />
              {errors.logo && (
                <p className="mt-1 text-sm text-red-500">{errors.logo}</p>
              )}
              {logo && (
                <div className="mt-2">
                  <img
                    src={logo}
                    alt="Logo preview"
                    className="w-20 h-20 object-contain border rounded"
                  />
                </div>
              )}
            </div>
            <div></div>
            <div>
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                type="text"
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              {errors.brandName && (
                <p className="mt-1 text-sm text-red-500">{errors.brandName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div>
              <Label htmlFor="code">Coupon Code *</Label>
              <Input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-500">{errors.code}</p>
              )}
            </div>


            <div>
              <Label htmlFor="discountPercentage">Discount Percentage *</Label>
              <Input
                type="number"
                id="discountPercentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                min="0"
                max="100"
              />
              {errors.discountPercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discountPercentage}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="url">URL *</Label>
              <Input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-500">{errors.url}</p>
              )}
            </div>

            <div className="xl:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <TextArea
                value={description}
                onChange={setDescription}
                rows={4}
                placeholder="Enter coupon description"
                error={!!errors.description}
                hint={errors.description}
              />
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
              ? "Update Coupon"
              : "Create Coupon"}
          </button>
        </form>
      )}
    </div>
  );
}
