// Définition des nouveaux types utilisés dans l'application

/**
 * Type représentant les statistiques du tableau de bord.
 * Utilisé pour afficher les métriques clés sur les membres, les messages et les clubs.
 */
export interface DashboardStats {
  totalMembers: number; // Nombre total de membres dans le système
  totalMessages: number; // Nombre total de messages envoyés
  totalClubs: number; // Nombre total de clubs enregistrés
  membershipTrend: number[]; // Tableau représentant l'évolution du nombre de membres au fil du temps (par exemple, par mois)
}

/**
 * Type représentant une activité récente dans l'application.
 * Utilisé pour suivre les actions effectuées par les utilisateurs (comme la création d'un message, l'ajout d'un membre, etc.).
 */
export interface Activity {
  id: string; // Identifiant unique de l'activité
  description: string; // Description de l'activité (par exemple, "Nouveau membre ajouté")
  timestamp: string; // Date et heure de l'activité sous forme de chaîne de caractères (ISO 8601)
}

// Types existants...

/**
 * Type représentant un utilisateur dans le système.
 * Utilisé pour stocker les informations personnelles et les droits d'accès de chaque utilisateur.
 */
export interface User {
  id: string; // Identifiant unique de l'utilisateur
  fullName: string; // Nom complet de l'utilisateur
  email: string; // Adresse e-mail de l'utilisateur
  role: 'user' | 'club'; // Rôle de l'utilisateur, soit un simple utilisateur ('user'), soit un propriétaire de club ('club')
  createdAt: Date; // Date de création du compte utilisateur
}

/**
 * Type représentant un club dans le système.
 * Utilisé pour stocker les informations concernant les clubs, y compris leur propriétaire et leurs membres.
 */
export interface Club {
  id: string; // Identifiant unique du club
  name: string; // Nom du club
  description: string; // Description du club
  imageUrl: string; // URL de l'image de profil du club
  ownerId: string; // Identifiant de l'utilisateur propriétaire du club
  members: string[]; // Liste des identifiants des membres du club
  createdAt: Date; // Date de création du club
}

/**
 * Type représentant un message dans le système.
 * Utilisé pour stocker les messages envoyés par les utilisateurs dans l'application.
 */
export interface Message {
  id: string; // Identifiant unique du message
  text: string; // Texte du message
  userId: string; // Identifiant de l'utilisateur ayant envoyé le message
  userName: string; // Nom de l'utilisateur ayant envoyé le message
  createdAt: Date; // Date de création du message
}
