/**
 * Composant pour afficher la liste des membres d'un club
 * Gère l'affichage et les actions sur la liste des membres
 * Inclut le compteur de membres et les options de gestion
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MemberItem } from './MemberItem';
import { User } from '../../types';

interface MemberListProps {
  members: User[];
  ownerId: string;
  onRemove: (userId: string) => void;
}

export const MemberList = ({ members, ownerId, onRemove }: MemberListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membres ({members.length})</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberItem
            member={item}
            isOwner={item.id === ownerId}
            onRemove={() => onRemove(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});