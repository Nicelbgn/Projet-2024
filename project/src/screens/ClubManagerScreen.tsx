import React, { useState, useEffect } from 'react'; // Importation des hooks React nécessaires pour gérer l'état et les effets secondaires
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'; // Importation des composants de base de React Native
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Fonctions de Firestore pour récupérer et mettre à jour les données
import { db } from '../config/firebase'; // Initialisation de la connexion Firestore
import { Club, User } from '../types'; // Types personnalisés pour Club et User
import { Card } from '../components/Card'; // Importation du composant Card (non utilisé ici, mais peut être utile)
import { Button } from '../components/Button'; // Importation du composant Button
import { LoadingSpinner } from '../components/LoadingSpinner'; // Composant de chargement pendant la récupération des données
import { ErrorMessage } from '../components/ErrorMessage'; // Composant pour afficher les erreurs
import { LinearGradient } from 'expo-linear-gradient'; // Gradient de fond pour le style de l'écran

/**
 * Écran de gestion d'un club. Permet au propriétaire de gérer les membres et les paramètres du club.
 * Affiche également des statistiques et les options de modération (comme retirer des membres).
 */
export const ClubManagerScreen = ({ route, navigation }) => {
  const { clubId } = route.params; // Récupération de l'ID du club passé en paramètre
  const [club, setClub] = useState<Club | null>(null); // État pour stocker les données du club
  const [members, setMembers] = useState<User[]>([]); // État pour stocker la liste des membres
  const [loading, setLoading] = useState(true); // État pour suivre si les données sont en cours de chargement
  const [error, setError] = useState<string | null>(null); // État pour stocker une erreur éventuelle

  // Utilisation de useEffect pour récupérer les données du club et ses membres lors du chargement initial ou si l'ID du club change
  useEffect(() => {
    fetchClubData();
  }, [clubId]); // Dépendance sur `clubId`, ce qui signifie que l'effet s'exécute à chaque changement d'ID de club

  /**
   * Fonction pour récupérer les données du club et ses membres depuis Firestore.
   * Si une erreur survient, l'état `error` est mis à jour.
   */
  const fetchClubData = async () => {
    try {
      // Récupération des données du club
      const clubDoc = await getDoc(doc(db, 'clubs', clubId));
      if (clubDoc.exists()) {
        const clubData = { id: clubDoc.id, ...clubDoc.data() } as Club;
        setClub(clubData); // Mise à jour de l'état avec les données du club
        
        // Récupération des membres du club en utilisant une requête Firestore pour récupérer les utilisateurs dont les IDs sont dans la liste des membres
        const membersQuery = query(
          collection(db, 'users'),
          where('__name__', 'in', clubData.members) // Filtrage des utilisateurs en fonction des membres du club
        );
        const membersSnapshot = await getDocs(membersQuery);
        const membersData = membersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as User)); // Transformation des données en objets User
        setMembers(membersData); // Mise à jour de l'état des membres
      }
    } catch (err) {
      setError('Erreur lors du chargement des données du club'); // En cas d'erreur, on met à jour l'état de l'erreur
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  /**
   * Fonction pour retirer un membre du club.
   * Un alert est affiché pour confirmer l'action de suppression.
   */
  const removeMember = async (memberId: string) => {
    if (!club) return; // Si les données du club ne sont pas encore chargées, on ne fait rien

    // Affichage d'une alerte de confirmation avant de retirer le membre
    Alert.alert(
      'Confirmer',
      'Voulez-vous vraiment retirer ce membre ?',
      [
        { text: 'Annuler', style: 'cancel' }, // Option pour annuler
        {
          text: 'Confirmer',
          onPress: async () => {
            try {
              // Mise à jour de la liste des membres en retirant celui sélectionné
              const updatedMembers = club.members.filter(id => id !== memberId);
              await updateDoc(doc(db, 'clubs', club.id), {
                members: updatedMembers // Mise à jour des membres dans Firestore
              });
              setClub({ ...club, members: updatedMembers }); // Mise à jour de l'état du club
              setMembers(members.filter(member => member.id !== memberId)); // Mise à jour de la liste des membres localement
            } catch (err) {
              setError('Erreur lors du retrait du membre'); // Gestion de l'erreur si quelque chose échoue
            }
          }
        }
      ]
    );
  };

  // Affichage du spinner de chargement pendant la récupération des données
  if (loading) return <LoadingSpinner />;
  // Affichage du message d'erreur si une erreur survient
  if (error) return <ErrorMessage message={error} onRetry={fetchClubData} />;
  // Affichage d'un message d'erreur si le club n'est pas trouvé
  if (!club) return <ErrorMessage message="Club non trouvé" />;

  // Rendu de l'interface utilisateur si les données sont correctement chargées
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient de fond pour une présentation visuelle attractive
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Affichage des informations du club */}
        <View style={styles.clubInfo}>
          <Text style={styles.title}>{club.name}</Text>
          <Text style={styles.description}>{club.description}</Text>
        </View>

        {/* Affichage du titre pour la liste des membres */}
        <Text style={styles.subtitle}>Membres ({members.length})</Text>
        
        {/* Liste des membres du club */}
        <FlatList
          data={members} // Données à afficher
          keyExtractor={(item) => item.id} // Utilisation de l'ID du membre comme clé unique
          renderItem={({ item }) => (
            <View style={styles.memberCard}>
              <View>
                <Text style={styles.memberName}>{item.fullName}</Text>
                <Text style={styles.memberEmail}>{item.email}</Text>
                {/* Affichage de l'étiquette "Propriétaire" si c'est le propriétaire du club */}
                {item.id === club.ownerId && (
                  <Text style={styles.ownerBadge}>Propriétaire</Text>
                )}
              </View>
              {/* Si ce n'est pas le propriétaire, un bouton "Retirer" est affiché */}
              {item.id !== club.ownerId && (
                <Button
                  title="Retirer"
                  onPress={() => removeMember(item.id)} // Appel de la fonction de retrait
                  variant="danger" // Variante du bouton pour afficher en rouge (danger)
                />
              )}
            </View>
          )}
          contentContainerStyle={styles.membersList} // Style personnalisé pour la liste des membres
        />
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
  clubInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  memberCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  memberEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  ownerBadge: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: 'bold',
    marginTop: 4,
  },
  membersList: {
    paddingBottom: 20,
  },
});
