/**
 * Utilitaires pour les opérations Firebase courantes
 */
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Récupère un document Firestore avec typage
 */
export const getTypedDoc = async <T>(
  collection: string,
  id: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du document:', error);
    return null;
  }
};

/**
 * Met à jour un document Firestore de manière sécurisée
 */
export const updateDocument = async (
  collection: string,
  id: string,
  data: object
): Promise<boolean> => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du document:', error);
    return false;
  }
};