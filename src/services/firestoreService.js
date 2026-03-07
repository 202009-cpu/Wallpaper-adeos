import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from './firebase';

const wallpaperCollection = collection(db, 'wallpapers');

function buildWallpaperQuery(mode, pageSize, cursor) {
  const constraints = [
    orderBy(mode === 'popular' ? 'downloadsCount' : 'createdAt', 'desc'),
    limit(pageSize)
  ];

  if (cursor) {
    constraints.push(startAfter(cursor));
  }

  return query(wallpaperCollection, ...constraints);
}

export const firestoreService = {
  async getWallpapers({ mode = 'new', pageSize = 12, cursor = null }) {
    const snapshot = await getDocs(buildWallpaperQuery(mode, pageSize, cursor));
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;
    return { docs, cursor: lastVisible, hasMore: snapshot.docs.length === pageSize };
  },

  async addWallpaper(payload) {
    const ref = doc(collection(db, 'wallpapers'));
    await setDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      downloadsCount: 0,
      favoritesCount: 0
    });
    return ref.id;
  },

  async addFavorite(userId, wallpaperId) {
    await setDoc(doc(db, 'users', userId, 'favorites', wallpaperId), {
      wallpaperId,
      createdAt: serverTimestamp()
    });
    await setDoc(doc(db, 'favorites', `${userId}_${wallpaperId}`), {
      userId,
      wallpaperId,
      createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, 'wallpapers', wallpaperId), { favoritesCount: increment(1) });
  },

  async getFavoritesSet(userId) {
    const snapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
    return new Set(snapshot.docs.map((d) => d.id));
  },

  async trackDownload(userId, wallpaperId) {
    const downloadsRef = doc(collection(db, 'downloads'));
    await setDoc(downloadsRef, { userId, wallpaperId, createdAt: serverTimestamp() });
    await updateDoc(doc(db, 'wallpapers', wallpaperId), { downloadsCount: increment(1) });
  },

  async getWallpaper(wallpaperId) {
    const snapshot = await getDoc(doc(db, 'wallpapers', wallpaperId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },

  async getUserUploads(userId) {
    const q = query(wallpaperCollection, where('uploadedBy', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
};
