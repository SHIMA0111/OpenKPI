import { createContext, useContext, useState, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define User interface
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarType: 'icon' | 'image'; // Type of avatar: predefined icon or custom image
  avatar: string; // Icon identifier or image URL
}

// Define mock users
export const mockUsers = [
  {
    id: uuidv4(),
    username: 'user1',
    password: 'password1',
    displayName: 'User One',
    avatarType: 'icon' as const,
    avatar: 'default'
  },
  {
    id: uuidv4(),
    username: 'user2',
    password: 'password2',
    displayName: 'User Two',
    avatarType: 'icon' as const,
    avatar: 'default'
  },
  {
    id: uuidv4(),
    username: 'admin',
    password: 'admin123',
    displayName: 'Administrator',
    avatarType: 'icon' as const,
    avatar: 'default'
  }
];

// Define context type
interface UserContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserAvatar: (avatar: string, avatarType: 'icon' | 'image') => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Create a user object without the password
      const authenticatedUser: User = {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarType: user.avatarType,
        avatar: user.avatar
      };
      setCurrentUser(authenticatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Update user's avatar
  const updateUserAvatar = (avatar: string, avatarType: 'icon' | 'image') => {
    if (currentUser) {
      // Update current user state
      setCurrentUser({
        ...currentUser,
        avatar,
        avatarType
      });

      // Also update the mock user data so it persists between logins
      const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex].avatar = avatar;
        mockUsers[userIndex].avatarType = avatarType;
      }
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    updateUserAvatar,
    isAuthenticated: currentUser !== null
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Create hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
