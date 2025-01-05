export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'club';
  createdAt: Date;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  ownerId: string;
  members: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
}