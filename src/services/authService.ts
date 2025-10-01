import { User, LoginResponse, RegisterData } from '@/types/auth';

// Mock API service for authentication
class AuthService {
  private baseUrl = '/api/v1/auth';
  
  // Mock users database
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'demo@thaivisa.ai',
      firstName: 'Demo',
      lastName: 'User',
      nationality: 'US',
      phoneNumber: '+1234567890',
      dateOfBirth: '1990-01-01',
      preferredLanguage: 'en',
      isActive: true,
      isVerified: true,
      createdAt: '2024-01-01T00:00:00Z',
    }
  ];

  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const user = this.mockUsers.find(u => u.email === email);
    
    if (!user || password !== 'demo123') {
      throw new Error('Invalid email or password');
    }

    return {
      access_token: 'mock_jwt_token_' + Date.now(),
      refresh_token: 'mock_refresh_token_' + Date.now(),
      token_type: 'bearer',
      expires_in: 3600,
      user,
    };
  }

  async register(userData: RegisterData): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    if (this.mockUsers.find(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User = {
      id: (this.mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      nationality: userData.nationality,
      phoneNumber: userData.phoneNumber,
      dateOfBirth: userData.dateOfBirth,
      preferredLanguage: 'en',
      isActive: true,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    this.mockUsers.push(newUser);
  }

  async getCurrentUser(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token');
    }

    // Mock token validation - in real app, this would verify JWT
    return this.mockUsers[0]; // Return demo user
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = this.mockUsers[0];
    const updatedUser = { ...user, ...profileData };
    this.mockUsers[0] = updatedUser;
    
    return updatedUser;
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      access_token: 'new_mock_jwt_token_' + Date.now(),
      refresh_token: 'new_mock_refresh_token_' + Date.now(),
      token_type: 'bearer',
      expires_in: 3600,
      user: this.mockUsers[0],
    };
  }

  async forgotPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }
    
    // In real app, this would send password reset email
    console.log('Password reset email sent to:', email);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock password reset logic
    console.log('Password reset successful');
  }
}

export const authService = new AuthService();