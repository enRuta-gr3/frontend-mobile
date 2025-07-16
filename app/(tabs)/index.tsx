 
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
 
export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLogged } = useRequireAuth();
  useEffect(() => {

    const checkAuth = async () => {
      setLoading(false);
       if (isLogged) { 
        setTimeout(() => {
        router.replace('/(tabs)/homeUser');
         }, 0);
      } else {
         setTimeout(() => {
         return router.replace('/login');
         }, 0);
      }
    };
    checkAuth();
  }, [isLogged, router]);

  return null;
 }
