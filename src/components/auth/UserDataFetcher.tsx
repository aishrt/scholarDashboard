import { useEffect } from 'react';
import useGetData from '../../hooks/useGetData';
import { useAuthStore } from '../../store/authStore';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
}

const UserDataFetcher = () => {
  const { getData, loading, error } = useGetData<UserResponse>();
  const updateRoles = useAuthStore((state) => state.updateRoles);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   const data = await getData('/api/auth/me');
    //   if (data && data.role) {
    //     updateRoles([data.role.name]);
    //   }
    // };

    // fetchUserData();
  }, [getData, updateRoles]);

  if (error) {
    console.error('Error fetching user data:', error);
  }

  return null;
};

export default UserDataFetcher; 