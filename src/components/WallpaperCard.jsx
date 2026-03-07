import AnimatedWallpaperPreview from './AnimatedWallpaperPreview';
import FavoriteButton from './FavoriteButton';

export default function WallpaperCard({ wallpaper, isFavorite, onFavorite, onDownload, disabled }) {
  return (
    <article className="wallpaper-card">
      <AnimatedWallpaperPreview imageUrl={wallpaper.imageUrl} />
      <h3>{wallpaper.title}</h3>
      <p className="meta">Downloads: {wallpaper.downloadsCount || 0}</p>
      <div className="card-actions">
        <FavoriteButton isFavorite={isFavorite} onClick={onFavorite} disabled={disabled} />
        <a href={wallpaper.imageUrl} target="_blank" rel="noreferrer" className="primary-btn" onClick={onDownload}>
          Download
        </a>
      </div>
    </article>
  );
}
