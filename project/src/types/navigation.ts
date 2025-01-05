import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  CreateClub: undefined;
  ClubList: undefined;
  Chat: undefined;
  ClubManager: { clubId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}