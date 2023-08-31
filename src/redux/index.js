import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import NotificationReducer from './slices/notificationSlice';
import AuthReducer from './slices/authSlice';
import ProfileSlice from './slices/profileSlice';
import RosterSlice from './slices/rosterSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const CombinedReducers = combineReducers({
  notify: NotificationReducer,
  auth: AuthReducer,
  profile: ProfileSlice,
  roster: RosterSlice,
});

const PersistedReducer = persistReducer(persistConfig, CombinedReducers);

export const DataStore = configureStore({
  reducer: PersistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const PersistDataStore = persistStore(DataStore);
