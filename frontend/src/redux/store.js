// import { configureStore } from "@reduxjs/toolkit";
import rootreducers from "./reducers/main";

// const store = configureStore(
//     {reducer: rootreducers},
// )

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'

// import rootReducer from './reducers'

export default function reduxStore () {
    
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootreducers)
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
  let persistor = persistStore(store)
  return { persistor, store };
}
