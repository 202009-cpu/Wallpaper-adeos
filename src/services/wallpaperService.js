import { firestoreService } from './firestoreService';
import { storageService } from './storageService';

export const wallpaperService = {
  getWallpapers: firestoreService.getWallpapers,
  getFavoritesSet: firestoreService.getFavoritesSet,
  addFavorite: firestoreService.addFavorite,
  trackDownload: firestoreService.trackDownload,

  async uploadWallpaper({ userId, title, imageFile, onProgress }) {
    const imageUrl = await storageService.uploadImage(userId, imageFile, onProgress);
    return firestoreService.addWallpaper({
      title,
      imageUrl,
      uploadedBy: userId
    });
  }
};
