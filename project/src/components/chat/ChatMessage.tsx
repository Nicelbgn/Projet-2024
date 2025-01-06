/**
 * Composant pour afficher un message dans le chat.
 * Le style et l'alignement du message dépendent de son auteur : 
 * - Les messages de l'utilisateur connecté apparaissent sur la droite.
 * - Les messages des autres utilisateurs apparaissent sur la gauche.
 */

import React from 'react'; // Importation de React pour créer le composant fonctionnel
import { View, Text, StyleSheet } from 'react-native'; // Composants de base pour la structure et le style
import { Message } from '../../types'; // Type pour définir la structure d'un message
import { auth } from '../../config/firebase'; // Authentification pour vérifier l'utilisateur connecté
import { getRelativeTime } from '../../utils/dateFormat'; // Fonction utilitaire pour afficher une date relative

// Définition des propriétés du composant
interface ChatMessageProps {
  message: Message; // Chaque message contient des informations comme `userId`, `userName`, `text`, et `createdAt`
}

// Composant fonctionnel ChatMessage
export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Vérifie si l'utilisateur connecté est l'auteur du message
  const isOwnMessage = message.userId === auth.currentUser?.uid;

  return (
    <View
      style={[
        styles.container, // Style de base pour le conteneur
        isOwnMessage ? styles.ownMessage : styles.otherMessage, // Style conditionnel selon l'auteur du message
      ]}
    >
      {/* Affichage du nom de l'utilisateur ayant envoyé le message */}
      <Text style={styles.userName}>{message.userName}</Text>
      
      {/* Texte principal du message */}
      <Text style={styles.messageText}>{message.text}</Text>
      
      {/* Horodatage formaté de manière relative (ex. "il y a 2 min") */}
      <Text style={styles.timestamp}>
        {getRelativeTime(message.createdAt)}
      </Text>
    </View>
  );
};

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    // Style de base pour chaque message
    padding: 10, // Espacement interne
    marginVertical: 5, // Espacement entre les messages (haut/bas)
    marginHorizontal: 10, // Espacement gauche/droite
    borderRadius: 10, // Coins arrondis pour un rendu moderne
    maxWidth: '80%', // Limite la largeur du message
  },
  ownMessage: {
    // Style spécifique pour les messages de l'utilisateur connecté
    backgroundColor: 'rgba(0, 122, 255, 0.8)', // Bleu semi-transparent
    alignSelf: 'flex-end', // Alignement à droite
  },
  otherMessage: {
    // Style spécifique pour les messages des autres utilisateurs
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Gris clair semi-transparent
    alignSelf: 'flex-start', // Alignement à gauche
  },
  userName: {
    // Style pour afficher le nom de l'utilisateur
    fontSize: 12, // Texte plus petit
    color: 'rgba(255, 255, 255, 0.7)', // Blanc avec transparence pour discrétion
    marginBottom: 2, // Espacement avec le texte du message
  },
  messageText: {
    // Style pour le texte principal du message
    fontSize: 16, // Taille normale pour le contenu principal
    color: 'white', // Texte en blanc
  },
  timestamp: {
    // Style pour l'horodatage
    fontSize: 10, // Texte plus petit
    color: 'rgba(255, 255, 255, 0.6)', // Blanc avec opacité réduite
    alignSelf: 'flex-end', // Alignement à droite du message
    marginTop: 4, // Espacement avec le texte du message
  },
});
