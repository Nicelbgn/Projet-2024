/**
 * Hook personnalisé pour gérer les données du tableau de bord
 * Récupère et calcule les statistiques des clubs
 */
import { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { DashboardStats, Activity } from '../types';

export const useDashboardData = () => {
  // États pour stocker les statistiques et activités
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalMessages: 0,
    totalClubs: 0,
    membershipTrend: [],
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!auth.currentUser) return;

      try {
        // Récupération des clubs de l'utilisateur
        const clubsQuery = query(
          collection(db, 'clubs'),
          where('ownerId', '==', auth.currentUser.uid)
        );
        const clubsSnapshot = await getDocs(clubsQuery);
        const totalClubs = clubsSnapshot.size;

        // Calcul des statistiques globales
        let totalMembers = 0;
        let totalMessages = 0;
        const processedClubs = [];

        // Traitement de chaque club
        for (const doc of clubsSnapshot.docs) {
          const club = doc.data();
          totalMembers += club.members.length;
          
          // Comptage des messages par club
          const messagesQuery = query(collection(db, `clubs/${doc.id}/messages`));
          const messagesSnapshot = await getDocs(messagesQuery);
          totalMessages += messagesSnapshot.size;

          processedClubs.push({
            id: doc.id,
            name: club.name,
            members: club.members.length,
          });
        }

        // Mise à jour des statistiques
        setStats({
          totalMembers,
          totalMessages,
          totalClubs,
          membershipTrend: processedClubs.map(club => club.members) || [0, 0, 0, 0, 0, 0],
        });

        // Génération des activités récentes
        setActivities(processedClubs.map(club => ({
          id: club.id,
          description: `Club ${club.name} - ${club.members} membres`,
          timestamp: 'Aujourd\'hui',
        })));

      } catch (err) {
        console.error('Erreur dashboard:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, activities, loading, error };
};