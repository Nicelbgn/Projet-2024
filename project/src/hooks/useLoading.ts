import { useState, useCallback } from 'react'; // Importation des hooks React `useState` pour gérer l'état local et `useCallback` pour optimiser les fonctions

/**
 * Hook personnalisé pour gérer un état de chargement avec gestion des erreurs.
 * Ce hook est utile pour gérer des tâches asynchrones ou des opérations longues (par exemple, requêtes API).
 * 
 * @param {boolean} initialState - État initial du chargement (par défaut : `false`).
 * @returns {object} - Contient les états et fonctions pour gérer le chargement et les erreurs.
 */
export const useLoading = (initialState = false) => {
  // État indiquant si une opération est en cours de chargement
  const [isLoading, setIsLoading] = useState(initialState);

  // État pour stocker un éventuel message d'erreur
  const [error, setError] = useState<string | null>(null);

  /**
   * Démarre l'état de chargement.
   * Réinitialise également l'état d'erreur, pour éviter l'affichage d'une erreur précédente.
   */
  const startLoading = useCallback(() => {
    setIsLoading(true); // Indique qu'une opération est en cours
    setError(null); // Réinitialise le message d'erreur
  }, []);

  /**
   * Arrête l'état de chargement.
   * Utilisé une fois que l'opération est terminée, avec ou sans succès.
   */
  const stopLoading = useCallback(() => {
    setIsLoading(false); // Indique que l'opération est terminée
  }, []);

  /**
   * Définit un message d'erreur et arrête l'état de chargement.
   * Utilisé pour signaler une erreur et sortir du mode "chargement".
   * 
   * @param {string} message - Message d'erreur à afficher.
   */
  const setLoadingError = useCallback((message: string) => {
    setError(message); // Définit un message d'erreur
    setIsLoading(false); // Termine l'état de chargement
  }, []);

  /**
   * Retourne les états et fonctions du hook.
   * - `isLoading`: Indique si une opération est en cours.
   * - `error`: Contient un message d'erreur (ou `null` s'il n'y a pas d'erreur).
   * - `startLoading`: Fonction pour démarrer une opération de chargement.
   * - `stopLoading`: Fonction pour terminer une opération de chargement.
   * - `setLoadingError`: Fonction pour signaler une erreur et stopper le chargement.
   */
  return {
    isLoading, // État actuel de chargement
    error, // Message d'erreur
    startLoading, // Fonction pour démarrer le chargement
    stopLoading, // Fonction pour terminer le chargement
    setLoadingError, // Fonction pour signaler une erreur
  };
};
