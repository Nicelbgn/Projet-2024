// Importation du type NativeStackScreenProps depuis la bibliothèque @react-navigation/native-stack
// Ce type permet de typer correctement les propriétés des écrans dans une pile de navigation (stack navigation).
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Définition du type RootStackParamList.
 * Ce type décrit la structure des paramètres pour chaque écran de la pile de navigation (stack).
 * Chaque clé de ce type représente un écran dans la pile de navigation, et la valeur associée est le type des paramètres attendus pour cet écran.
 * Par exemple, l'écran 'Chat' attend un paramètre 'clubId' de type string.
 */
export type RootStackParamList = {
  Start: undefined; // L'écran Start n'attend aucun paramètre
  Login: undefined; // L'écran Login n'attend aucun paramètre
  Register: undefined; // L'écran Register n'attend aucun paramètre
  Profile: undefined; // L'écran Profile n'attend aucun paramètre
  CreateClub: undefined; // L'écran CreateClub n'attend aucun paramètre
  ClubList: undefined; // L'écran ClubList n'attend aucun paramètre
  Chat: { clubId: string }; // L'écran Chat attend un paramètre 'clubId' de type string
  ClubManager: { clubId: string }; // L'écran ClubManager attend un paramètre 'clubId' de type string
  Dashboard: undefined; // L'écran Dashboard n'attend aucun paramètre
};

/**
 * Définition du type RootStackScreenProps.
 * Ce type utilise NativeStackScreenProps pour générer les types des props spécifiques aux écrans dans RootStackParamList.
 * Il prend un paramètre générique T qui représente le nom d'un écran dans RootStackParamList.
 * Cela permet d'assurer une gestion forte des types pour chaque écran de la navigation.
 * Par exemple, pour l'écran 'Chat', T serait 'Chat', et les propriétés passées à l'écran seraient typées avec { clubId: string }.
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Déclaration globale du type RootParamList dans l'espace de noms ReactNavigation.
 * Cela permet d'étendre le type RootStackParamList dans l'interface RootParamList de la bibliothèque React Navigation.
 * Grâce à cela, l'éditeur de code pourra autocompléter correctement les noms des paramètres de chaque écran lors de l'utilisation de la navigation.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
