/**
 * Écran tableau de bord
 * Affiche les statistiques et métriques des clubs
 * Réservé aux propriétaires de clubs
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  StatisticsCard, 
  RecentActivities, 
  MembershipChart 
} from '../components/dashboard';
import { useDashboardData } from '../hooks/useDashboardData';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const DashboardScreen = () => {
  const { stats, activities, loading, error } = useDashboardData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.statsContainer}>
          <StatisticsCard
            title="Membres"
            value={stats.totalMembers}
            icon="people"
          />
          <StatisticsCard
            title="Messages"
            value={stats.totalMessages}
            icon="chatbubbles"
          />
          <StatisticsCard
            title="Clubs"
            value={stats.totalClubs}
            icon="business"
          />
        </View>

        <MembershipChart data={stats.membershipTrend} />
        <RecentActivities activities={activities} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});