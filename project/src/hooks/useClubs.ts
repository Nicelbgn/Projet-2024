/**
 * Hook personnalisé pour gérer la liste des clubs
 * Maintient une liste à jour des clubs en temps réel
 */
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Club } from '../types';

export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    // Configuration de la requête Firestore
    const clubsQuery = query(collection(db, 'clubs'));
    
    // Abonnement aux changements en temps réel
    const unsubscribe = onSnapshot(clubsQuery, (snapshot) => {
      const clubsList = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Club));
      setClubs(clubsList);
    });

    // Nettoyage de l'abonnement
    return () => unsubscribe();
  }, []);

  return clubs;
};