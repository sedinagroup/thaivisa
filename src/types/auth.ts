export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nationality: string;
  phoneNumber?: string;
  dateOfBirth: string;
  preferredLanguage: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<User>;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nationality: string;
  phoneNumber?: string;
  dateOfBirth: string;
}