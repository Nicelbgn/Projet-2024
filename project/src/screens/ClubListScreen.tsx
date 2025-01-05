import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'; // Si vous utilisez un package pour des boutons stylisés
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Club } from '../types';
import { auth } from '../config/firebase'; // Importation pour Firebase Auth
import { useNavigation } from '@react-navigation/native'; // Navigation

export const ClubListScreen = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchClubs = async () => {
      const clubsQuery = query(collection(db, 'clubs'));
      const snapshot = await getDocs(clubsQuery);
      const clubsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Club));
      setClubs(clubsList);
    };

    fetchClubs();
  }, []);

  const handleJoinClub = (clubId: string) => {
    // Logique pour rejoindre un club
    console.log(`Rejoindre le club avec l'ID : ${clubId}`);
  };

  const renderClub = ({ item }: { item: Club }) => (
    <View style={styles.card}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.clubImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubDescription}>{item.description}</Text>
        {item.ownerId === auth.currentUser?.uid ? (
          <Button
            title="Gérer le club"
            onPress={() => navigation.navigate('ClubManager', { clubId: item.id })}
            buttonStyle={styles.manageButton}
          />
        ) : (
          <Button
            title="Rejoindre"
            onPress={() => handleJoinClub(item.id)}
            buttonStyle={styles.joinButton}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clubs disponibles</Text>
      <FlatList
        data={clubs}
        renderItem={renderClub}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
  list: {
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clubImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clubDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  manageButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
