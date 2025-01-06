/**
 * En-tête de la liste des clubs
 * Affiche le titre et les boutons d'action (créer, dashboard, profil)
 * Les boutons sont conditionnels selon les droits de l'utilisateur
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ClubHeaderProps {
  showCreateButton: boolean;
  onCreatePress: () => void;
  onProfilePress: () => void;
  onDashboardPress: () => void;
}

export const ClubHeader = ({ 
  showCreateButton, 
  onCreatePress, 
  onProfilePress,
  onDashboardPress
}: ClubHeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.title}>Clubs disponibles</Text>
    <View style={styles.headerButtons}>
      {showCreateButton && (
        <>
          <TouchableOpacity 
            style={[styles.button, styles.dashboardButton]}
            onPress={onDashboardPress}
          >
            <Ionicons name="stats-chart-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.createButton]}
            onPress={onCreatePress}
          >
            <Ionicons name="add-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Créer</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity 
        style={[styles.button, styles.profileButton]}
        onPress={onProfilePress}
      >
        <Ionicons name="person-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10, // Espace entre les boutons
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
    minWidth: 100, // Taille minimale pour un bouton visible
  },
  createButton: {
    backgroundColor: '#34C759',
  },
  dashboardButton: {
    backgroundColor: '#5856D6',
  },
  profileButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
