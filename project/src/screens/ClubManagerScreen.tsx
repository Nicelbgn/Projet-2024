import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Club, User } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const ClubManagerScreen = ({ route, navigation }) => {
  const { clubId } = route.params;
  const [club, setClub] = useState<Club | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClubData();
  }, [clubId]);

  const fetchClubData = async () => {
    try {
      const clubDoc = await getDoc(doc(db, 'clubs', clubId));
      if (clubDoc.exists()) {
        const clubData = { id: clubDoc.id, ...clubDoc.data() } as Club;
        setClub(clubData);
        
        // Récupérer les informations des membres
        const membersQuery = query(
          collection(db, 'users'),
          where('__name__', 'in', clubData.members)
        );
        const membersSnapshot = await getDocs(membersQuery);
        const membersData = membersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as User));
        setMembers(membersData);
      }
    } catch (err) {
      setError('Erreur lors du chargement des données du club');
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    if (!club) return;

    Alert.alert(
      'Confirmer',
      'Voulez-vous vraiment retirer ce membre ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: async () => {
            try {
              const updatedMembers = club.members.filter(id => id !== memberId);
              await updateDoc(doc(db, 'clubs', club.id), {
                members: updatedMembers
              });
              // Mettre à jour l'état local
              setClub({ ...club, members: updatedMembers });
              setMembers(members.filter(member => member.id !== memberId));
            } catch (err) {
              setError('Erreur lors du retrait du membre');
            }
          }
        }
      ]
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchClubData} />;
  if (!club) return <ErrorMessage message="Club non trouvé" />;

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>{club.name}</Text>
        <Text style={styles.description}>{club.description}</Text>
      </Card>

      <Text style={styles.subtitle}>Membres ({members.length})</Text>
      
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.memberRow}>
              <View>
                <Text style={styles.memberName}>{item.fullName}</Text>
                <Text style={styles.memberEmail}>{item.email}</Text>
              </View>
              {item.id !== club.ownerId && (
                <Button
                  title="Retirer"
                  onPress={() => removeMember(item.id)}
                  variant="danger"
                />
              )}
            </View>
          </Card>
        )}
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
  },
});