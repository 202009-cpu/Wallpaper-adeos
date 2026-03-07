export default function FavoriteButton({ isFavorite, onClick, disabled }) {
  return (
    <button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={onClick} disabled={disabled}>
      {isFavorite ? '★ Favorited' : '☆ Favorite'}
    </button>
  );
}
