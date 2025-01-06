import React, { useState } from 'react'; // Importation de React et des hooks nécessaires
import { View, Text, Image, StyleSheet } from 'react-native'; // Importation des composants de base de React Native
import { doc, setDoc } from 'firebase/firestore'; // Fonction Firebase pour créer un document dans Firestore
import { db, auth } from '../config/firebase'; // Initialisation de Firestore et Firebase Authentication
import { useImageUpload } from '../hooks/useImageUpload'; // Hook personnalisé pour gérer l'upload d'image
import { Button } from '../components/Button'; // Composant Button
import { Input } from '../components/Input'; // Composant Input pour saisir les informations du club
import { useNavigation } from '@react-navigation/native'; // Hook pour la navigation dans l'application
import { LinearGradient } from 'expo-linear-gradient'; // Gradient de fond de l'écran

/**
 * Écran de création de club.
 * Permet aux utilisateurs de type 'club' de créer un nouveau club,
 * gérer l'upload d'image et la configuration initiale du club.
 */
export const CreateClubScreen = () => {
  const [name, setName] = useState(''); // État pour le nom du club
  const [description, setDescription] = useState(''); // État pour la description du club
  const [image, setImage] = useState<string | null>(null); // État pour l'image du club (si elle est choisie)
  const { pickImage } = useImageUpload(); // Appel du hook pour gérer l'upload d'image
  const navigation = useNavigation(); // Hook de navigation pour rediriger l'utilisateur après la création du club

  /**
   * Fonction pour créer un nouveau club dans Firestore.
   * Récupère les informations saisies par l'utilisateur et crée un document pour le club.
   */
  const handleCreate = async () => {
    if (!auth.currentUser) return; // Vérifie si l'utilisateur est authentifié

    try {
      // Création du document du club dans Firestore avec un ID unique basé sur l'heure actuelle
      const clubRef = doc(db, 'clubs', Date.now().toString());
      await setDoc(clubRef, {
        name, // Nom du club
        description, // Description du club
        imageUrl: image, // URL de l'image si disponible
        ownerId: auth.currentUser.uid, // ID de l'utilisateur actuel comme propriétaire
        members: [auth.currentUser.uid], // L'utilisateur actuel est ajouté comme membre
        createdAt: new Date(), // Date de création du club
      });

      // Redirection vers l'écran de liste des clubs après la création
      navigation.navigate('ClubList');
    } catch (error) {
      console.error('Erreur lors de la création du club:', error); // Affichage de l'erreur dans la console
    }
  };

  /**
   * Fonction pour permettre à l'utilisateur de choisir une image pour le club.
   * Utilise le hook `useImageUpload` pour gérer la sélection de l'image.
   */
  const handleImagePick = async () => {
    const result = await pickImage(); // Appel du hook pour sélectionner l'image
    if (result) {
      setImage(result); // Mise à jour de l'état avec l'URL de l'image sélectionnée
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient de fond pour l'écran
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Créer un club</Text>

          {/* Champ de texte pour saisir le nom du club */}
          <Input
            placeholder="Nom du club"
            value={name}
            onChangeText={setName} // Met à jour l'état du nom du club
            style={styles.input}
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />

          {/* Champ de texte pour saisir la description du club */}
          <Input
            placeholder="Description"
            value={description}
            onChangeText={setDescription} // Met à jour l'état de la description du club
            multiline
            numberOfLines={4} // Le champ description permet plusieurs lignes
            isTextArea
            style={styles.input}
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />

          {/* Bouton pour choisir une image pour le club */}
          <Button 
            title="Choisir une image"
            onPress={handleImagePick} // Appel à la fonction pour choisir une image
            variant="secondary"
          />

          {/* Si une image est choisie, elle est affichée en aperçu */}
          {image && (
            <Image 
              source={{ uri: image }} // Affichage de l'image choisie
              style={styles.preview}
            />
          )}

          {/* Bouton pour créer le club */}
          <Button 
            title="Créer le club"
            onPress={handleCreate} // Appel à la fonction pour créer le club
          />
        </View>
      </View>
    </LinearGradient>
  );
};

// Styles pour l'interface de l'écran
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    marginBottom: 15,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
});
