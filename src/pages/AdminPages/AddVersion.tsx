import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";
import usePostData from "../../hooks/usePostData.ts";
import usePutData from "../../hooks/usePutData.ts";
import useGetData from "../../hooks/useGetData.ts";

interface FormErrors {
  latestVersion?: string;
  versionDoc?: string;
}

export default function AddVersion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Version form state
  const [latestVersion, setLatestVersion] = useState("");
  const [versionDoc, setVersionDoc] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { getData } = useGetData<any>();
  const { postData, loading: postLoading } = usePostData<any, any>(
    "/v1/admin/create-version",
    { verifyAuth: true }
  );
  const { putData, loading: putLoading } = usePutData<any, any>(
    `/v1/admin/update-version/${id}`,
    { verifyAuth: true }
  );

  const loading = isEditMode ? putLoading : postLoading;

  useEffect(() => {
    const fetchVersionDetails = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const response = await getData(`/v1/admin/version-detail/${id}`);
          if (response?.data) {
            const versionData = response.data;
            setLatestVersion(versionData.latestVersion || "");
            setVersionDoc(versionData.versionDoc || "");
          }
        } catch (err) {
          console.error("Failed to fetch version details:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchVersionDetails();
  }, [id, isEditMode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!latestVersion) {
      newErrors.latestVersion = "Latest version is required";
    }

    if (!versionDoc) {
      newErrors.versionDoc = "Version documentation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = {
        latestVersion,
        versionDoc,
      };

      const response = isEditMode
        ? await putData(formData)
        : await postData(formData);

      if (response?.data) {
        toast.success(
          isEditMode
            ? "Version updated successfully!"
            : "Version created successfully!"
        );
        navigate("/version-list");
      }
    } catch (err) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} version:`,
        err
      );
      toast.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } version. Please try again.`
      );
    }
  };

  return (
    <div>
      <PageMeta
        title={isEditMode ? "Edit Version" : "Add Version"}
        description={
          isEditMode
            ? "Edit existing version details"
            : "Add a new version to the system"
        }
        ogTitle={
          isEditMode
            ? "Edit Version - Scholarship Portal"
            : "Add Version - Scholarship Portal"
        }
        ogDescription={
          isEditMode
            ? "Edit existing version details"
            : "Add a new version to the system"
        }
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Version" : "Add Version"} />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div>
              <Label htmlFor="latestVersion">Latest Version *</Label>
              <Input
                type="text"
                id="latestVersion"
                value={latestVersion}
                onChange={(e) => setLatestVersion(e.target.value)}
                placeholder="Enter version number (e.g., 1.0.0)"
              />
              {errors.latestVersion && (
                <p className="mt-1 text-sm text-red-500">{errors.latestVersion}</p>
              )}
            </div>

            <div className="xl:col-span-2">
              <Label htmlFor="versionDoc">Version Documentation *</Label>
              <TextArea
                value={versionDoc}
                onChange={(value) => setVersionDoc(value)}
                rows={4}
                placeholder="Enter version documentation"
                error={!!errors.versionDoc}
                hint={errors.versionDoc}
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
              ? "Update Version"
              : "Create Version"}
          </button>
        </form>
      )}
    </div>
  );
}
