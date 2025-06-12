import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';


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
         router.replace('/login');
         }, 0);
      }
    };
    checkAuth();
  }, [isLogged, router]);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }
  return null;
}
