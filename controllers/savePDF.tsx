import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';


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
    
  } catch (error: any) {
    Alert.alert('Error', 'No se pudo guardar el PDF: ' + (error.message || JSON.stringify(error)));
  }
};
