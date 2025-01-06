// Importation des bibliothèques nécessaires
import React from 'react'; // Importation de React pour définir un composant fonctionnel
import { View, Text, StyleSheet, Dimensions } from 'react-native'; // Composants et outils de style pour React Native
import { LineChart } from 'react-native-chart-kit'; // Composant de graphique en courbes pour visualisation des données

// Définition des propriétés attendues pour le composant MembershipChart
interface MembershipChartProps {
  data: number[]; // Tableau contenant les données numériques pour le graphique
}

// Définition du composant fonctionnel MembershipChart
export const MembershipChart = ({ data }: MembershipChartProps) => (
  <View style={styles.container}>
    {/* Conteneur principal stylisé pour le graphique */}
    <Text style={styles.title}>Évolution des membres</Text>
    {/* Titre du graphique */}

    <LineChart
      // Données à afficher dans le graphique
      data={{
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], // Étiquettes pour les mois
        datasets: [{ data }], // Les points de données (passés en tant que propriété)
      }}
      width={Dimensions.get('window').width - 40} 
      // Largeur dynamique du graphique, adaptée à la taille de l'écran
      height={220} 
      // Hauteur fixe du graphique
      chartConfig={{
        // Configuration visuelle du graphique
        backgroundColor: 'transparent', // Fond transparent
        backgroundGradientFrom: 'rgba(255, 255, 255, 0.1)', // Dégradé du fond
        backgroundGradientTo: 'rgba(255, 255, 255, 0.1)', // Dégradé vers une autre couleur
        decimalPlaces: 0, // Pas de chiffres décimaux dans les valeurs
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
        // Couleur blanche avec opacité ajustable
        style: {
          borderRadius: 16, // Coins arrondis pour une apparence moderne
        },
      }}
      style={styles.chart}
      bezier
      // Ajout de l'effet "bezier" pour lisser les courbes du graphique
    />
  </View>
);

// Définition des styles pour le composant
const styles = StyleSheet.create({
  container: {
    // Style pour le conteneur principal
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond semi-transparent
    borderRadius: 15, // Coins arrondis
    padding: 20, // Espacement interne
    marginTop: 20, // Espacement supérieur
    borderWidth: 1, // Bordure fine
    borderColor: 'rgba(255, 255, 255, 0.2)', // Couleur de bordure avec opacité
  },
  title: {
    // Style pour le titre
    fontSize: 20, // Taille de police importante
    fontWeight: 'bold', // Texte en gras
    color: 'white', // Couleur blanche
    marginBottom: 15, // Espacement sous le titre
  },
  chart: {
    // Style pour le graphique
    marginVertical: 8, // Espacement vertical pour bien séparer le graphique des autres éléments
    borderRadius: 16, // Coins arrondis pour le graphique
  },
});
