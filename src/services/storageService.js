import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
  uploadImage(userId, file, onProgress) {
    return new Promise((resolve, reject) => {
      const extension = file.name?.split('.').pop() || 'jpg';
      const storageRef = ref(storage, `wallpapers/${userId}/${Date.now()}.${extension}`);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress?.(progress);
        },
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        }
      );
    });
  }
};
