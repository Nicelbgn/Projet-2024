/**
 * Composant pour afficher une carte de statistiques dans le tableau de bord.
 * Chaque carte affiche une icône, une valeur numérique et un titre pour décrire la métrique.
 */

import React from 'react'; // Importation de React pour définir un composant
import { View, Text, StyleSheet } from 'react-native'; // Composants et outils de style pour React Native
import { Ionicons } from '@expo/vector-icons'; // Icônes provenant de la bibliothèque Ionicons

// Définition des propriétés attendues pour le composant StatisticsCard
interface StatisticsCardProps {
  title: string; // Titre de la carte, décrit la statistique
  value: number; // Valeur numérique associée à la statistique
  icon: keyof typeof Ionicons.glyphMap; // Nom de l'icône à afficher, valide selon Ionicons
}

// Définition du composant fonctionnel StatisticsCard
export const StatisticsCard = ({ title, value, icon }: StatisticsCardProps) => (
  <View style={styles.card}>
    {/* Conteneur principal stylisé pour la carte */}
    <Ionicons name={icon} size={24} color="white" />
    {/* Icône représentant la statistique, de taille 24 et en blanc */}
    <Text style={styles.value}>{value}</Text>
    {/* Valeur numérique de la statistique, affichée en gras */}
    <Text style={styles.title}>{title}</Text>
    {/* Titre descriptif de la statistique */}
  </View>
);

// Définition des styles pour le composant
const styles = StyleSheet.create({
  card: {
    // Style principal pour la carte
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond avec opacité légère
    borderRadius: 15, // Coins arrondis pour un design moderne
    padding: 15, // Espacement interne autour du contenu
    alignItems: 'center', // Aligne tout le contenu au centre horizontalement
    width: '30%', // Largeur fixée pour permettre un affichage en grille
    borderWidth: 1, // Bordure fine pour délimiter la carte
    borderColor: 'rgba(255, 255, 255, 0.2)', // Couleur de bordure semi-transparente
  },
  value: {
    // Style pour la valeur numérique
    fontSize: 24, // Texte grand pour attirer l'attention
    fontWeight: 'bold', // Texte en gras pour accentuer
    color: 'white', // Couleur blanche
    marginVertical: 5, // Espacement vertical autour de la valeur
  },
  title: {
    // Style pour le titre descriptif
    fontSize: 14, // Taille de police plus petite
    color: 'rgba(255, 255, 255, 0.8)', // Couleur blanche avec opacité réduite
  },
});
