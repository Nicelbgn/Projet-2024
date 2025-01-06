/**
 * Hook personnalisé pour gérer le rôle de l'utilisateur
 * Récupère et met à jour le rôle de l'utilisateur depuis Firestore
 */
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };

    fetchUserRole();
  }, []);

  return userRole;
};