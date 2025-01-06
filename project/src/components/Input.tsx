/**
 * Composant de saisie personnalisé
 * Supporte les champs de texte simples et les zones de texte multiligne
 */

import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  isTextArea?: boolean;
}

export const Input = ({ isTextArea, style, ...props }: InputProps) => {
  return (
    <TextInput
      style={[
        styles.input,
        isTextArea && styles.textArea,
        style
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});