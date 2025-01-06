/**
 * Écran de connexion
 * Gère l'authentification des utilisateurs existants
 * Utilise Firebase Auth pour la connexion
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Input } from '../components/Input';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Connexion</Text>
          
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

          <Input
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
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
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    marginBottom: 15,
    height: 50,
  },
  button: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
});