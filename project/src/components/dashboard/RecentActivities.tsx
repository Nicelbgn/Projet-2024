// Importation des bibliothèques nécessaires
import React from 'react'; // Bibliothèque principale pour les composants React
import { View, Text, StyleSheet } from 'react-native'; // Composants et outils de style pour les interfaces React Native
import { Activity } from '../../types'; // Importation du type Activity (défini ailleurs) pour typer les données

// Définition des propriétés attendues pour le composant RecentActivities
interface RecentActivitiesProps {
  activities: Activity[]; // Tableau d'activités, chaque élément suivant la structure du type Activity
}

// Composant fonctionnel RecentActivities qui affiche une liste d'activités
export const RecentActivities = ({ activities }: RecentActivitiesProps) => (
  <View style={styles.container}> 
    {/* Conteneur principal stylisé */}
    <Text style={styles.title}>Activités récentes</Text>
    {/* Titre de la section */}

    {activities.map((item) => (
      // Parcourt le tableau d'activités pour afficher chaque activité individuellement
      <View key={item.id} style={styles.activityItem}>
        {/* Conteneur de chaque activité avec une clé unique basée sur l'id */}
        <Text style={styles.activityText}>{item.description}</Text>
        {/* Description de l'activité */}
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {/* Timestamp (date/heure) de l'activité */}
      </View>
    ))}
  </View>
);

// Définition des styles utilisés dans le composant
const styles = StyleSheet.create({
  container: {
    // Style du conteneur principal
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Couleur de fond avec une opacité légère
    borderRadius: 15, // Coins arrondis
    padding: 20, // Espacement interne
    marginTop: 20, // Espacement supérieur
    borderWidth: 1, // Bordure fine
    borderColor: 'rgba(255, 255, 255, 0.2)', // Couleur de bordure avec opacité
  },
  title: {
    // Style du titre
    fontSize: 20, // Taille de police importante
    fontWeight: 'bold', // Texte en gras
    color: 'white', // Couleur blanche
    marginBottom: 15, // Espacement sous le titre
  },
  activityItem: {
    // Style pour chaque élément d'activité
    marginBottom: 15, // Espacement entre chaque activité
  },
  activityText: {
    // Style pour le texte de description de l'activité
    fontSize: 16, // Taille de police standard
    color: 'white', // Couleur blanche
  },
  timestamp: {
    // Style pour l'horodatage
    fontSize: 12, // Taille de police réduite
    color: 'rgba(255, 255, 255, 0.6)', // Couleur blanche avec opacité réduite pour indiquer une information secondaire
    marginTop: 5, // Espacement supérieur entre la description et l'horodatage
  },
});
