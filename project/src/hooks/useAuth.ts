/**
 * Hook personnalisé pour gérer l'authentification
 * Surveille l'état de connexion de l'utilisateur
 */
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = () => {
  // État local pour stocker l'utilisateur et l'état de chargement
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Abonnement aux changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Nettoyage de l'abonnement lors du démontage
    return unsubscribe;
  }, []);

  return { user, loading };
};