import { createContext, useContext, useMemo, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  user: null,
  wallpapers: [],
  favorites: new Set(),
  loading: false,
  loadingMore: false,
  error: '',
  uploadProgress: 0,
  queryMode: 'new',
  pageCursor: null,
  hasMore: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_LOADING_MORE':
      return { ...state, loadingMore: action.payload };
    case 'SET_UPLOAD_PROGRESS':
      return { ...state, uploadProgress: action.payload };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_QUERY_MODE':
      return { ...state, queryMode: action.payload, wallpapers: [], pageCursor: null, hasMore: true };
    case 'SET_WALLPAPERS':
      return {
        ...state,
        wallpapers: action.payload.append ? [...state.wallpapers, ...action.payload.docs] : action.payload.docs,
        pageCursor: action.payload.cursor,
        hasMore: action.payload.hasMore
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
}
