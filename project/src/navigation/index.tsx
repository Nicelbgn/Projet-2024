import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Import screens
import { StartScreen } from '../screens/StartScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreateClubScreen } from '../screens/CreateClubScreen';
import { ClubListScreen } from '../screens/ClubListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ClubManagerScreen } from '../screens/ClubManagerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? "ClubList" : "Start"}
        screenOptions={{ headerShown: true }}
      >
        {!user ? (
          <>
            <Stack.Screen 
              name="Start" 
              component={StartScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="ClubList" component={ClubListScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="CreateClub" component={CreateClubScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen 
              name="ClubManager" 
              component={ClubManagerScreen}
              options={{ title: 'Gestion du club' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}