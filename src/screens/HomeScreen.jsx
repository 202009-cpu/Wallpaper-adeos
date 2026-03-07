import WallpaperCard from '../components/WallpaperCard';
import SortToggle from '../components/SortToggle';

export default function HomeScreen({
  wallpapers,
  favorites,
  loading,
  loadingMore,
  error,
  hasMore,
  mode,
  onModeChange,
  onFavorite,
  onDownload,
  onLoadMore
}) {
  return (
    <section>
      <SortToggle mode={mode} onChange={onModeChange} />

      {loading && <p className="state-msg">Loading wallpapers...</p>}
      {error && <p className="state-msg error">{error}</p>}
      {!loading && !wallpapers.length && !error && <p className="state-msg">No wallpapers found.</p>}

      <div className="wallpaper-grid">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            isFavorite={favorites.has(wallpaper.id)}
            onFavorite={() => onFavorite(wallpaper.id)}
            onDownload={() => onDownload(wallpaper.id)}
          />
        ))}
      </div>

      {hasMore && (
        <button className="primary-btn load-more" onClick={onLoadMore} disabled={loadingMore}>
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </section>
  );
}
