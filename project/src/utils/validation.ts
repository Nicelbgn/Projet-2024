/**
 * Utilitaires de validation des données
 */

/**
 * Valide le format d'une adresse email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide la longueur minimale du mot de passe
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Valide la longueur minimale d'un nom
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};