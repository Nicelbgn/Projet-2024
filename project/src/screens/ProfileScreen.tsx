/**
 * Écran de profil utilisateur
 * Affiche les informations de l'utilisateur connecté
 * Permet la déconnexion et la gestion du profil
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { User } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!user) return null;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Mon Profil</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom complet</Text>
              <Text style={styles.value}>{user.fullName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Type de compte</Text>
              <Text style={styles.value}>{user.role === 'club' ? 'Club' : 'Utilisateur'}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
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
  infoContainer: {
    marginBottom: 30,
  },
  infoRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});