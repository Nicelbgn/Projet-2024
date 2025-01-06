/**
 * Hook personnalisé pour gérer les fonctionnalités de chat
 * Gère les messages en temps réel et l'envoi de nouveaux messages
 */
import { useState, useEffect } from 'react';
import { collection, query, orderBy, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Message } from '../types';

export const useChat = (clubId: string) => {
  // États locaux pour les messages et la gestion des erreurs
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté et si un clubId est fourni
    if (!clubId || !auth.currentUser) {
      setError('Session invalide');
      setLoading(false);
      return;
    }

    // Configuration de la requête Firestore
    const messagesRef = collection(db, `clubs/${clubId}/messages`);
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    // Abonnement aux changements en temps réel
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messagesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        } as Message));
        setMessages(messagesList);
        setLoading(false);
      },
      (err) => {
        console.error('Erreur chat:', err);
        setError('Erreur lors du chargement des messages');
        setLoading(false);
      }
    );

    // Nettoyage de l'abonnement
    return () => unsubscribe();
  }, [clubId]);

  // Fonction pour envoyer un nouveau message
  const sendMessage = async (text: string) => {
    if (!auth.currentUser || !text.trim()) return;

    try {
      await addDoc(collection(db, `clubs/${clubId}/messages`), {
        text: text.trim(),
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonyme',
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Erreur envoi message:', err);
      setError('Erreur lors de l\'envoi du message');
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
};