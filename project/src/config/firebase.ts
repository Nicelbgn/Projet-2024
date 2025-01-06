/**
 * Configuration et initialisation de Firebase
 * Centralise la configuration et l'export des services Firebase
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Configuration Firebase à partir des variables d'environnement
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Export des services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);