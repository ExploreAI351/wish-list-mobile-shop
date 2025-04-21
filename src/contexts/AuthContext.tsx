
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  UserCredential,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  token: string | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// JWT token helper functions
const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('@auth_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = await getAuthToken();
      if (storedToken) {
        try {
          // Verify the token is valid
          const decoded = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp && decoded.exp < currentTime) {
            // Token is expired
            await removeAuthToken();
            setToken(null);
          } else {
            setToken(storedToken);
          }
        } catch (error) {
          // Invalid token
          await removeAuthToken();
          setToken(null);
        }
      }
    };
    
    checkStoredToken();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // User is signed in, get the token
        const idToken = await user.getIdToken();
        setToken(idToken);
        await setAuthToken(idToken);
      } else {
        setToken(null);
        await removeAuthToken();
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // After registration, get and store the token
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await setAuthToken(idToken);
      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // After login, get and store the token
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await setAuthToken(idToken);
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Note: signInWithPopup doesn't work with React Native
      // This is just a placeholder - use an alternative method like Google Sign-In for React Native
      alert('Google sign-in requires a different implementation for React Native. This is a placeholder.');
      
      // Implementation would typically use Expo Google Sign-In or react-native-google-signin
      // Example of how it would work:
      // const { idToken } = await GoogleSignin.signIn();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await removeAuthToken();
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser,
    isLoading,
    token,
    register,
    login,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
