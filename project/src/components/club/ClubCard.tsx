/**
 * Composant pour afficher une carte de club
 * Gère l'affichage des informations du club et les actions possibles
 */


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Club } from '../../types';
import { auth } from '../../config/firebase';

interface ClubCardProps {
  club: Club;
  onManage: (clubId: string) => void;
  onJoin: (clubId: string) => void;
  onLeave: (clubId: string) => void;
  onChat: (clubId: string) => void;
}

export const ClubCard = ({ club, onManage, onJoin, onLeave, onChat }: ClubCardProps) => {
    // Vérifie si l'utilisateur est propriétaire ou membre du club
  const isOwner = club.ownerId === auth.currentUser?.uid;
  const isMember = club.members.includes(auth.currentUser?.uid || '');

  return (
    <View style={styles.card}>
         {/* Image du club */}
      {club.imageUrl && (
        <Image source={{ uri: club.imageUrl }} style={styles.clubImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubDescription}>{club.description}</Text>
         {/* Boutons d'action selon le rôle de l'utilisateur */}
        <View style={styles.buttonContainer}>
          {isOwner ? (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.manageButton]}
                onPress={() => onManage(club.id)}
              >
                <Text style={styles.buttonText}>Gérer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.chatButton]}
                onPress={() => onChat(club.id)}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </>
          ) : isMember ? (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.leaveButton]}
                onPress={() => onLeave(club.id)}
              >
                <Text style={styles.buttonText}>Quitter</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.chatButton]}
                onPress={() => onChat(club.id)}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={[styles.button, styles.joinButton]}
              onPress={() => onJoin(club.id)}
            >
              <Text style={styles.buttonText}>Rejoindre</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  clubImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  clubDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#34C759',
  },
  leaveButton: {
    backgroundColor: '#FF3B30',
  },
  manageButton: {
    backgroundColor: '#007AFF',
  },
  chatButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});