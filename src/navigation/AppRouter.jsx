import { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import { useAppStore } from '../store/AppContext';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useWallpaperFeed } from '../hooks/useWallpaperFeed';
import { useUploadWallpaper } from '../hooks/useUploadWallpaper';
import { wallpaperService } from '../services/wallpaperService';

export default function AppRouter() {
  const [route, setRoute] = useState('feed');
  const { state, dispatch } = useAppStore();

  useAuth();
  const userId = state.user?.uid;
  const { favoriteWallpaper } = useFavorites(userId);
  const { loadInitial, loadMore } = useWallpaperFeed();
  const { upload } = useUploadWallpaper(userId);

  useEffect(() => {
    loadInitial();
  }, [state.queryMode]);

  const handleUpload = async (title) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: '' });
      await upload(title);
      await loadInitial();
      setRoute('feed');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Upload failed.' });
    }
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Lumina3D Wallpapers</h1>
        <nav>
          <button className="ghost-btn" onClick={() => setRoute('feed')}>
            Feed
          </button>
          <button className="ghost-btn" onClick={() => setRoute('upload')}>
            Upload
          </button>
        </nav>
      </header>

      {route === 'feed' ? (
        <HomeScreen
          wallpapers={state.wallpapers}
          favorites={state.favorites}
          loading={state.loading}
          loadingMore={state.loadingMore}
          error={state.error}
          hasMore={state.hasMore}
          mode={state.queryMode}
          onModeChange={(mode) => dispatch({ type: 'SET_QUERY_MODE', payload: mode })}
          onFavorite={favoriteWallpaper}
          onDownload={(wallpaperId) => wallpaperService.trackDownload(userId, wallpaperId)}
          onLoadMore={loadMore}
        />
      ) : (
        <UploadScreen onUpload={handleUpload} progress={state.uploadProgress} error={state.error} />
      )}
    </main>
  );
}
