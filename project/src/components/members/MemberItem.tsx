/**
 * Composant pour afficher un membre individuel
 * Affiche les informations du membre et un bouton de suppression si applicable
 * Gère différemment l'affichage du propriétaire du club
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../Button';
import { User } from '../../types';

interface MemberItemProps {
  member: User;
  isOwner: boolean;
  onRemove: () => void;
}

export const MemberItem = ({ member, isOwner, onRemove }: MemberItemProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{member.fullName}</Text>
        <Text style={styles.email}>{member.email}</Text>
        {isOwner && <Text style={styles.ownerBadge}>Propriétaire</Text>}
      </View>
      {!isOwner && (
        <Button
          title="Retirer"
          onPress={onRemove}
          variant="danger"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  ownerBadge: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: 'bold',
    marginTop: 4,
  },
});