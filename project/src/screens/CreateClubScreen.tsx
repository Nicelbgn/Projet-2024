import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useImageUpload } from '../hooks/useImageUpload';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigation } from '@react-navigation/native';

export const CreateClubScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { pickImage } = useImageUpload();
  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!auth.currentUser) return;

    try {
      const clubRef = doc(db, 'clubs', Date.now().toString());
      await setDoc(clubRef, {
        name,
        description,
        imageUrl: image, // L'image en base64 sera stockée directement
        ownerId: auth.currentUser.uid,
        members: [auth.currentUser.uid],
        createdAt: new Date(),
      });
      
      navigation.navigate('ClubList');
    } catch (error) {
      console.error('Erreur lors de la création du club:', error);
    }
  };

  const handleImagePick = async () => {
    const result = await pickImage();
    if (result) {
      setImage(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un club</Text>

      <Input
        placeholder="Nom du club"
        value={name}
        onChangeText={setName}
      />

      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        isTextArea
      />

      <Button 
        title="Choisir une image"
        onPress={handleImagePick}
        variant="secondary"
      />

      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.preview}
        />
      )}

      <Button 
        title="Créer le club"
        onPress={handleCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
});