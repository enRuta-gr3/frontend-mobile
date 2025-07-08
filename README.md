# 🚌 En Ruta - App de Venta de Pasajes

**En Ruta** es una aplicación móvil desarrollada con **React Native** y **Expo** para la compra de boletos de ómnibus interdepartamentales en Uruguay. Permite a los usuarios registrarse, iniciar sesión, seleccionar viajes, elegir asientos, pagar con PayPal, recibir notificaciones y descargar pasajes en PDF.

---

## 📱 Tecnologías Utilizadas

### Frontend
- React Native (Expo SDK)
- TypeScript
- Expo Router
- @rneui/themed (UI)
- AsyncStorage
- expo-print / expo-sharing (PDF)
- expo-notifications (push)
- expo-file-system / StorageAccessFramework (archivos)

### Backend
- Java Spring Boot
- REST APIs para viajes, usuarios, compras y asientos
- Autenticación por token
- Integración con PayPal (sandbox + redirección móvil)

### Base de Datos
- MySQL o PostgreSQL
- Relaciones: usuarios, viajes, pasajes, asientos

---

## 🔑 Funcionalidades

### 👤 Usuarios
- Registro de usuario (cliente)
- Inicio de sesión
- Recuperación de contraseña

### 🚍 Viajes y pasajes
- Búsqueda de viajes por origen, destino y fecha
- Compra de pasajes (ida y vuelta)
- Selección de asiento (con disponibilidad en tiempo real)
- Descuentos por tipo: Jubilado, Estudiante, Ninguno

### 💳 Pagos
- Integración con **PayPal**
- Redirección y retorno a la app mediante **deep linking**

### 📄 PDF
- Generación automática de comprobante de pasaje en PDF
- Descarga o compartición del PDF al finalizar la compra
- Opción para guardar en carpeta **Downloads** (Android)

### 🔔 Notificaciones push
- Notificación tras compra exitosa
- Registro del token de dispositivo
- Asociadas a usuarios autenticados

---

## 📁 Estructura de carpetas

