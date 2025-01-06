/**
 * Composant bouton personnalisé
 * Supporte différentes variantes : primary, secondary, danger
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;  // Ajout de la prop disabled
}

export const Button = ({ 
  onPress, 
  title, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) => {
  // Sélection du style en fonction de la variante
  const buttonStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    danger: styles.dangerButton,
  }[variant];

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        buttonStyle,
        disabled && styles.disabledButton
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.buttonText,
        disabled && styles.disabledText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    backgroundColor: '#999',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#666',
  },
});
