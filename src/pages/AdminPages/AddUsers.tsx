import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Checkbox from "../../components/form/input/Checkbox";
import Radio from "../../components/form/input/Radio";
import Switch from "../../components/form/switch/Switch";
import { EyeCloseIcon, EyeIcon, TimeIcon, EnvelopeIcon } from "../../icons";
import DatePicker from "../../components/form/date-picker.tsx";
import PhoneInput from "../../components/form/input/PhoneInput";
import CountrySelect from "../../components/form/input/CountrySelect";
import StateSelect from "../../components/form/input/StateSelect";
import CitySelect from "../../components/form/input/CitySelect";
import { useAuthStore } from "../../store/authStore.ts";
import usePostData from "../../hooks/usePostData.ts";
import usePutData from "../../hooks/usePutData.ts";
import useGetData from "../../hooks/useGetData.ts";
import storage from "../../utils/storage";

interface FormErrors {
  role?: string;
  email?: string;
  firstName?: string;
  phoneNumber?: string;
  status?: string;
  org_name?: string;
  registration_number?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
}

export default function AddUsers() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { login } = useAuthStore();
  const isEditMode = !!id;
  const isEditCompany = location.pathname.startsWith("/edit-company/");
  console.log("isEditCompany", isEditCompany);
  
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState<number | null>(null);
  const [org_name, setOrgName] = useState("");
  const [registration_number, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { getData } = useGetData<any>();
  const { postData, loading: postLoading } = usePostData<any, any>(
    "/v1/admin/create-entity",
    { verifyAuth: true }
  );
  const { putData, loading: putLoading } = usePutData<any, any>(
    `/v1/admin/update-user/${id}`,
    { verifyAuth: true }
  );

  const loading = isEditMode ? putLoading : postLoading;

  // Options for role and status
  const roles = useAuthStore((state: any) => state.roles);
  const roleOptions = [
    ...roles
      .filter((role: any) => role.rolelevel === 100)
      .map((role: any) => ({
        value: role.id,
        label: role.rolename.toUpperCase(),
        rolelevel: role.rolelevel,
      })),
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const response = await getData(`/v1/admin/${isEditCompany ? "organisation-detail" : "user-detail"}/${id}`);
          if (response?.data) {
            const userData = response.data;
            setFirstName(userData.first_name || "");
            setLastName(userData.last_name || "");
            setCountry(userData.country || "");
            setState(userData.state || "");
            setCity(userData.city || "");
            setPostalCode(userData.postal_code || "");
            setPhoneNumber(userData.phone_number || "");
            setEmail(userData.email || "");
            setRole(userData.role || "");
            setOrgName(userData.org_name || "");
            setRegistrationNumber(userData.registration_number || "");
            setAddress(userData.address || "");
            setStatus(userData.status || "active");
            
            // Set role level based on the role
            const selectedRole = roles.find((r: any) => r.id === userData.role);
            setRoleLevel(selectedRole?.rolelevel || null);
          }
        } catch (err) {
          console.error("Failed to fetch user details:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [id, isEditMode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!role) {
      newErrors.role = "Role is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    if (roleLevel === 100 && !org_name) {
      newErrors.org_name = "Organisation name is required";
    }

    if (roleLevel === 100 && !registration_number) {
      newErrors.registration_number = "Registration number is required";
    }

    if (roleLevel === 100 && !address) {
      newErrors.address = "Address is required";
    }

    if (!country) {
      newErrors.country = "Country is required";
    }

    if (!state) {
      newErrors.state = "State is required";
    }

    if (!city) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        country,
        state,
        city,
        postal_code: postalCode,
        phone_number: phoneNumber,
        email,
        role: role, // Sen the actual role ID
        org_name,
        registration_number,
        address,
        password: isEditMode ? undefined : password,
        status,
      };

      // Remove undefined values from formData
      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== undefined)
      );

      const response = isEditMode 
        ? await putData(cleanedFormData)
        : await postData(cleanedFormData);

      if (response?.data) {
        // Show success message
        toast.success(isEditMode ? "User updated successfully!" : "User created successfully!");
        // Redirect to users list
        navigate("/user-list");
      }
    } catch (err) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} user:`, err);
      // Show error message
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} user. Please try again.`);
    }
  };

  return (
    <div>
      <PageMeta
        title={isEditMode ? "Edit User" : "Add User"}
        description={isEditMode ? "Edit existing user details" : "Add a new user to the system"}
        ogTitle={isEditMode ? "Edit User - Trux360 Fleet Management" : "Add User - Trux360 Fleet Management"}
        ogDescription={isEditMode ? "Edit existing user details" : "Add a new user with various roles and details"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit User" : "Add User"} />
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {!isEditMode && (
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select
                options={roleOptions}
                placeholder="Select Role"
                onChange={(value) => {
                  const selectedRole = roles.find((r: any) => r.id === value);
                  setRole(value);
                  setRoleLevel(selectedRole?.rolelevel || null);
                }}
                value={role}
                className={`dark:bg-dark-900 ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isEditMode}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
            </div>
          )}
          {(roleLevel === 100 || isEditCompany) && (
            <>
              <div>
                  <Label htmlFor="org_name">Organisation Name *</Label>
                  <Input
                    type="text"
                    id="org_name"
                    value={org_name}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                  {errors.org_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.org_name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="registration_number">
                    Registration Number *
                  </Label>
                  <Input
                    type="text"
                    id="registration_number"
                    value={registration_number}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                  {errors.registration_number && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.registration_number}
                    </p>
                  )}
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEditMode}
                className={isEditMode ? 'opacity-50 cursor-not-allowed' : ''}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <PhoneInput
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                required
                error={!!errors.phoneNumber}
                hint={errors.phoneNumber}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <CountrySelect
                value={country}
                onChange={(value) => {
                  setCountry(value);
                  setState(""); // Reset state when country changes
                  setCity(""); // Reset city when country changes
                }}
                required
                error={errors.country}
              />
            </div>
            {country && (
              <div>
                <StateSelect
                  value={state}
                  onChange={(value) => {
                    setState(value);
                    setCity(""); // Reset city when state changes
                  }}
                  country={country}
                  required
                  error={errors.state}
                />
              </div>
            )}
            {state && (
              <div>
                <CitySelect
                  value={city}
                  onChange={setCity}
                  country={country}
                  state={state}
                  required
                  error={errors.city}
                />
              </div>
            )}{" "}
            {roleLevel === 100 && (
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                options={statusOptions}
                placeholder="Select Status"
                onChange={(value) => setStatus(value)}
                value={status}
                className="dark:bg-dark-900"
              />
              {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status}</p>
              )}
            </div>
            {!isEditMode && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || isLoading}
          >
            {loading ? "Processing..." : isEditMode ? "Update User" : "Create User"}
          </button>
        </form>
      )}
    </div>
  );
}
