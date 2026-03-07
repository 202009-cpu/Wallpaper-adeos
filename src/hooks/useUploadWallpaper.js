import { useCallback } from 'react';
import { pickAndCompressImage } from '../services/imagePickerService';
import { wallpaperService } from '../services/wallpaperService';
import { useAppStore } from '../store/AppContext';

export function useUploadWallpaper(userId) {
  const { dispatch } = useAppStore();

  const upload = useCallback(
    async (title) => {
      if (!userId) throw new Error('Please wait for authentication before uploading.');

      dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 0 });
      const imageFile = await pickAndCompressImage();
      if (!imageFile) return;

      await wallpaperService.uploadWallpaper({
        userId,
        title: title?.trim() || 'Untitled Wallpaper',
        imageFile,
        onProgress: (progress) => dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress })
      });

      dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 100 });
    },
    [dispatch, userId]
  );

  return { upload };
}
