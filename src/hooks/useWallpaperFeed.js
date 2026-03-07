import { useCallback } from 'react';
import { wallpaperService } from '../services/wallpaperService';
import { useAppStore } from '../store/AppContext';

export function useWallpaperFeed() {
  const { state, dispatch } = useAppStore();

  const loadWallpapers = useCallback(
    async (append = false) => {
      const loadingType = append ? 'SET_LOADING_MORE' : 'SET_LOADING';
      dispatch({ type: loadingType, payload: true });
      dispatch({ type: 'SET_ERROR', payload: '' });

      try {
        const result = await wallpaperService.getWallpapers({
          mode: state.queryMode,
          pageSize: 12,
          cursor: append ? state.pageCursor : null
        });

        dispatch({ type: 'SET_WALLPAPERS', payload: { ...result, append } });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed loading wallpapers.' });
      } finally {
        dispatch({ type: loadingType, payload: false });
      }
    },
    [dispatch, state.pageCursor, state.queryMode]
  );

  return {
    loadInitial: () => loadWallpapers(false),
    loadMore: () => loadWallpapers(true)
  };
}
