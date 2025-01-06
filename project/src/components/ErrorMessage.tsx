/**
 * Composant pour afficher les messages d'erreur
 * Permet optionnellement de réessayer l'action qui a échoué
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <Button 
        title="Réessayer" 
        onPress={onRetry}
        variant="secondary"
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 15,
    textAlign: 'center',
  },
});