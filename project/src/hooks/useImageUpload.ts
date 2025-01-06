import { useState } from 'react'; // Importation de useState pour gérer l'état local
import * as ImagePicker from 'expo-image-picker'; // Expo ImagePicker pour permettre la sélection d'images depuis la galerie
import { ERROR_MESSAGES } from '../utils/errorMessages'; // Messages d'erreur prédéfinis pour une gestion centralisée

// Hook personnalisé pour gérer la sélection et le téléchargement d'images
export const useImageUpload = () => {
  // État pour stocker les messages d'erreur liés au processus de sélection d'images
  const [error, setError] = useState<string | null>(null);

  /**
   * Fonction asynchrone pour ouvrir la galerie et permettre à l'utilisateur
   * de sélectionner une image.
   */
  const pickImage = async () => {
    try {
      // Ouvre la galerie en utilisant le module ImagePicker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limite la sélection aux images uniquement
        allowsEditing: true, // Permet à l'utilisateur de recadrer l'image
        aspect: [4, 3], // Contraint le recadrage à un rapport d'aspect de 4:3
        quality: 0.8, // Définit la qualité de l'image (80%)
        base64: true, // Retourne également l'image encodée en base64
      });

      // Vérifie si l'utilisateur n'a pas annulé la sélection
      if (!result.canceled && result.assets[0].base64) {
        // Retourne l'image au format base64, préfixée par le type MIME
        return `data:image/jpeg;base64,${result.assets[0].base64}`;
      }
    } catch (err) {
      // En cas d'erreur, définit un message d'erreur approprié
      setError(ERROR_MESSAGES.UPLOAD.INVALID_FORMAT);
    }

    // Si une erreur ou annulation survient, retourne null
    return null;
  };

  // Retourne la fonction `pickImage` et l'état d'erreur pour utilisation dans d'autres composants
  return {
    pickImage, // Fonction pour sélectionner une image
    error, // Message d'erreur si un problème survient
  };
};
