import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useAppStore } from '../store/AppContext';

export function useAuth() {
  const { dispatch } = useAppStore();

  useEffect(() => {
    authService.ensureSession().catch((error) => {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Authentication failed.' });
    });

    const unsubscribe = authService.subscribe((user) => {
      dispatch({ type: 'SET_USER', payload: user || null });
    });

    return unsubscribe;
  }, [dispatch]);
}
