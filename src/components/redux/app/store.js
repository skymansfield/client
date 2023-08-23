import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projectSlice'
import userReducer from '../features/userSlice'
import modalReducer from '../features/modalSlice'
import vendorReducer from '../features/vendorSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)
export const store = configureStore({
  
  reducer: {
  
      project: projectReducer,
      user: persistedReducer,
      modal:modalReducer,
      vendor:vendorReducer,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: [thunk]
     

  },
});



export const persistor = persistStore(store)



// const rootReducer = persistCombineReducers({
//   project: projectReducer,
//   user: userReducer,
//   modal:modalReducer,
//   vendor:vendorReducer,

// })
// const rootPersistConfig = {
//   key: 'root', 
//   storage,
//   whitelist: ['user']
// }
// export const store = configureStore({
  
//   reducer: {
  
//       reducer: persistedReducer,
//       devTools: process.env.NODE_ENV !== 'production',
//       middleware: [thunk]
     

//   },
// });