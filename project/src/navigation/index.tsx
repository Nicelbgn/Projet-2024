/**
 * Configuration de la navigation de l'application
 * Gère les différentes routes et l'authentification
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Import des écrans
import { StartScreen } from '../screens/StartScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreateClubScreen } from '../screens/CreateClubScreen';
import { ClubListScreen } from '../screens/ClubListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ClubManagerScreen } from '../screens/ClubManagerScreen';
import { DashboardScreen } from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  // Hook personnalisé pour gérer l'état de l'authentification
  const { user, loading } = useAuth();

  // Affiche un spinner pendant le chargement
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        // Définit l'écran initial en fonction de l'état de connexion
        initialRouteName={user ? "ClubList" : "Start"}
        screenOptions={{
          headerShown: true,
          headerBackTitle: "Retour",
          headerTintColor: '#007AFF',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerBlurEffect: 'dark',
          headerShadowVisible: false,
        }}
      >
        {/* Routes pour les utilisateurs non connectés */}
        {!user ? (
          <>
            <Stack.Screen 
              name="Start" 
              component={StartScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ title: 'Connexion' }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ title: 'Inscription' }}
            />
          </>
        ) : (
          // Routes pour les utilisateurs connectés
          <>
            <Stack.Screen 
              name="ClubList" 
              component={ClubListScreen}
              options={{ title: 'Clubs' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Profil' }}
            />
            <Stack.Screen 
              name="CreateClub" 
              component={CreateClubScreen}
              options={{ title: 'Créer un club' }}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
              options={{ title: 'Discussion' }}
            />
            <Stack.Screen 
              name="ClubManager" 
              component={ClubManagerScreen}
              options={{ title: 'Gestion du club' }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ title: 'Tableau de bord' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}