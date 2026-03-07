import { useEffect } from 'react';
import { wallpaperService } from '../services/wallpaperService';
import { useAppStore } from '../store/AppContext';

export function useFavorites(userId) {
  const { dispatch } = useAppStore();

  useEffect(() => {
    if (!userId) return;

    wallpaperService
      .getFavoritesSet(userId)
      .then((favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load favorites.' }));
  }, [dispatch, userId]);

  const favoriteWallpaper = async (wallpaperId) => {
    if (!userId) return;
    await wallpaperService.addFavorite(userId, wallpaperId);
    const next = await wallpaperService.getFavoritesSet(userId);
    dispatch({ type: 'SET_FAVORITES', payload: next });
  };

  return { favoriteWallpaper };
}
