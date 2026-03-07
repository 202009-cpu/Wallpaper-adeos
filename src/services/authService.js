import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  ensureSession: async () => {
    if (auth.currentUser) return auth.currentUser;
    const result = await signInAnonymously(auth);
    return result.user;
  },
  subscribe: (cb) => onAuthStateChanged(auth, cb)
};
