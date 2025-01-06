/**
 * Composant de saisie pour le chat
 * Permet aux utilisateurs d'écrire et d'envoyer des messages
 * Inclut un bouton d'envoi et gère le texte multiligne
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Message..."
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        multiline
      />
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={handleSend}
      >
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});