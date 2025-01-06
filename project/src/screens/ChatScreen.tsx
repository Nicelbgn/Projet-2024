/**
 * Écran de chat pour un club spécifique
 * Affiche les messages en temps réel et permet d'en envoyer de nouveaux
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const ChatScreen = ({ route }) => {
   // Récupération de l'ID du club depuis les paramètres de navigation
  const { clubId } = route.params;
    // Utilisation du hook personnalisé pour gérer le chat
  const { messages, loading, error, sendMessage } = useChat(clubId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <View style={styles.container}>
         {/* Liste des messages inversée (plus récents en haut) */}
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={styles.messageList}
        />
          {/* Zone de saisie des messages */}
        <ChatInput onSend={sendMessage} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  messageList: {
    padding: 15,
  },
});