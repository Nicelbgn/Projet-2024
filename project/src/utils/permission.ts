/**
 * Utilitaires pour la gestion des permissions
 */

/**
 * Vérifie si l'utilisateur est propriétaire d'un club
 */
export const isClubOwner = (userId: string, ownerId: string): boolean => {
    return userId === ownerId;
  };
  
  /**
   * Vérifie si l'utilisateur est membre d'un club
   */
  export const isClubMember = (userId: string, members: string[]): boolean => {
    return members.includes(userId);
  };
  
  /**
   * Vérifie si l'utilisateur peut effectuer une action sur un club
   */
  export const canPerformClubAction = (
    userId: string,
    ownerId: string,
    members: string[],
    action: 'manage' | 'chat' | 'leave'
  ): boolean => {
    switch (action) {
      case 'manage':
        return isClubOwner(userId, ownerId);
      case 'chat':
        return isClubOwner(userId, ownerId) || isClubMember(userId, members);
      case 'leave':
        return isClubMember(userId, members) && !isClubOwner(userId, ownerId);
      default:
        return false;
    }
  };