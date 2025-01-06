/**
 * Écran d'inscription
 * Permet la création de nouveaux comptes utilisateur
 * Gère les deux types de comptes : utilisateur et club
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Input } from '../components/Input';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

export const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName,
        email,
        role,
        createdAt: new Date(),
      });
    } catch (error) {
      setError('Erreur lors de l\'inscription');
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
          <Text style={styles.title}>Inscription</Text>
          
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Input
            style={styles.input}
            placeholder="Nom complet"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

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

          <Input
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Type de compte</Text>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
              dropdownIconColor="white"
            >
              <Picker.Item 
                label="Utilisateur" 
                value="user" 
                color={Platform.OS === 'ios' ? 'white' : '#000'}
              />
              <Picker.Item 
                label="Club" 
                value="club" 
                color={Platform.OS === 'ios' ? 'white' : '#000'}
              />
            </Picker>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
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
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: 10,
    marginBottom: 15,
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