
import { registerForPushNotificationsAsync } from "@/utilis/regNoti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: string | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<string | null>(null);

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeNotifications = async () => {
      try {
        if (!Device.isDevice) {
          throw new Error("Las notificaciones push requieren un dispositivo físico.");
        }

        const token = await registerForPushNotificationsAsync();
        if (isMounted) {
          setExpoPushToken(token);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Error al obtener el token de notificación.");
        }
      }

      notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
        const idUser = notification.request.content.data.idUser;
        const isUserActive = await AsyncStorage.getItem('userid');
        if (isUserActive !== null && isUserActive === idUser) {
          if (isMounted) {
               setNotification(notification);
          }
        }
         
      }); 

      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        if (isMounted) {
          console.log("Respuesta a la notificación recibida:", response);
          }
      });
    };

   initializeNotifications();

    return () => {    
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ expoPushToken, notification, error }}>
      {children}
    </NotificationContext.Provider>
  );
};
