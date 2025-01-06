/**
 * Écran d'accueil de l'application
 * Premier écran affiché aux utilisateurs non connectés
 * Permet de naviguer vers la connexion ou l'inscription
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue sur</Text>
          <Text style={styles.appName}>ClubConnect</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.logoShadow} />
        </View>

        <Text style={styles.subtitle}>
          Rejoignez la communauté et connectez-vous avec des passionnés !
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Créer un compte</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  logoContainer: {
    position: 'relative',
    marginVertical: 30,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  registerButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});