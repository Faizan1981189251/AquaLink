import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser, getUser, updateUser } from './firestore';

export interface AuthUser extends User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, userData: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, {
      displayName: userData.fullName
    });
    
    // Create user document in Firestore
    await createUser({
      uid: user.uid,
      email: user.email,
      fullName: userData.fullName,
      phone: userData.phone,
      userType: userData.userType || 'customer',
      profileImage: null,
      addresses: [],
      preferences: {
        notifications: true,
        autoReorder: false
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user data
export const getCurrentUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    const userData = await getUser(user.uid);
    return userData;
  }
  return null;
};