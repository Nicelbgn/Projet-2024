/**
 * Hook personnalisé pour gérer l'adhésion aux clubs
 * Gère les actions de rejoindre et quitter un club
 */
import { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export const useClubMembership = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour rejoindre un club
  const joinClub = async (clubId: string) => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const clubRef = doc(db, 'clubs', clubId);
      await updateDoc(clubRef, {
        members: arrayUnion(auth.currentUser.uid)
      });
    } catch (err) {
      setError('Erreur lors de l\'adhésion au club');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour quitter un club
  const leaveClub = async (clubId: string) => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const clubRef = doc(db, 'clubs', clubId);
      await updateDoc(clubRef, {
        members: arrayRemove(auth.currentUser.uid)
      });
    } catch (err) {
      setError('Erreur lors du départ du club');
    } finally {
      setLoading(false);
    }
  };

  return {
    joinClub,
    leaveClub,
    loading,
    error
  };
};