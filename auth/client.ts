
import { LoggedInUserType } from '@/dataSchemas';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

async function getAuth(): Promise<LoggedInUserType | null> {
    try {
      const response = await axios.post('/api/users/session');
      if (response.data?.auth?.id) {
        return response.data.auth;
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
    return null;
  }
  
  const useAuth = () => {
    const [auth, setAuth] = useState<LoggedInUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
  
    useEffect(() => {
      const fetchAuth = async () => {
        console.log('started')

        setIsLoading(true); // Set loading state to true
        try {
          const user = await getAuth();
          setAuth(user);
        } catch (error) {
          console.error('Error fetching session data:', error);
        } finally {
          setIsLoading(false); // Set loading state to false after fetching
        }
      };
  
      fetchAuth();
    }, []);
  
    return { auth, isLoading };
  };
  
  export default useAuth;