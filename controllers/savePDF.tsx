/*import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform, Alert } from 'react-native';

export const saveToDownloads = async (uri: string, filename: string) => {
  if (Platform.OS === 'android') {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted) {
        Alert.alert('Permisos denegados', 'No se puede guardar el archivo sin permisos.');
        return;
      }

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        'application/pdf'
      );

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('Éxito', 'Archivo PDF guardado en la carpeta seleccionada.');
    } catch (error: any) {
      console.error('Error al guardar PDF:', error);
      Alert.alert('Error', 'No se pudo guardar el PDF: ' + (error.message || JSON.stringify(error)));
    }
  } else {
    // Para iOS o como alternativa
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
    });
  }
};
*/
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

// Solo para Android — guarda en la carpeta 'Download'
export const saveToDownloads = async (pdfUri: string, filename: string) => {
  try {
    if (Platform.OS !== 'android') {
      Alert.alert('Solo Android', 'Este método es válido solo para Android');
      return;
    }
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      Alert.alert('Permisos denegados', 'No se otorgaron permisos para guardar en la carpeta Downloads.');
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(pdfUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri, 
      filename,
      'application/pdf'
    );

    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    Alert.alert('Éxito', `Archivo guardado en: ` + fileUri);
  } catch (error: any) {
    console.error('Error al guardar PDF:', error);
    Alert.alert('Error', 'No se pudo guardar el PDF: ' + (error.message || JSON.stringify(error)));
  }
};
