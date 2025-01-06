/**
 * Composant pour afficher un indicateur de chargement
 * Utilisé pendant le chargement des données ou les opérations asynchrones
 */

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner = ({ 
  size = 'large', 
  color = '#007AFF' 
}: LoadingSpinnerProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});