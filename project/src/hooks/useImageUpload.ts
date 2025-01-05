import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ERROR_MESSAGES } from '../utils/errorMessages';

export const useImageUpload = () => {
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        // Retourne l'image en base64 pour stockage direct dans Firestore
        return `data:image/jpeg;base64,${result.assets[0].base64}`;
      }
    } catch (err) {
      setError(ERROR_MESSAGES.UPLOAD.INVALID_FORMAT);
    }
    return null;
  };

  return {
    pickImage,
    error,
  };
};