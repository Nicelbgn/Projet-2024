/**
 * Écran principal listant tous les clubs disponibles
 * Permet de rejoindre, quitter ou gérer les clubs selon les droits de l'utilisateur
 */

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ClubCard } from '../components/club/ClubCard';
import { ClubHeader } from '../components/club/ClubHeader';
import { useClubs } from '../hooks/useClubs';
import { useUserRole } from '../hooks/useUserRole';
import { useClubMembership } from '../hooks/useClubMembership';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { LinearGradient } from 'expo-linear-gradient';

export const ClubListScreen = () => {
  const navigation = useNavigation();
  // Récupération des données et des hooks nécessaires
  const clubs = useClubs();
  const userRole = useUserRole();
  const { joinClub, leaveClub, loading, error } = useClubMembership();

  // Gestionnaires d'événements pour les actions sur les clubs
  const handleManageClub = (clubId: string) => {
    navigation.navigate('ClubManager', { clubId });
  };

  const handleJoinClub = async (clubId: string) => {
    await joinClub(clubId);
  };

  const handleLeaveClub = async (clubId: string) => {
    await leaveClub(clubId);
  };

  const handleChat = (clubId: string) => {
    navigation.navigate('Chat', { clubId });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <View style={styles.container}>
          {/* En-tête avec boutons d'action */}
        <ClubHeader
          showCreateButton={userRole === 'club'}
          onCreatePress={() => navigation.navigate('CreateClub')}
          onProfilePress={() => navigation.navigate('Profile')}
          onDashboardPress={() => navigation.navigate('Dashboard')}
        />

             {/* Liste des clubs */}
        <FlatList
          data={clubs}
          renderItem={({ item }) => (
            <ClubCard
              club={item}
              onManage={handleManageClub}
              onJoin={handleJoinClub}
              onLeave={handleLeaveClub}
              onChat={handleChat}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  list: {
    gap: 20,
    paddingBottom: 20,
  },
});