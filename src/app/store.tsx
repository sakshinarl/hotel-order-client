import {configureStore,combineReducers} from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, 
  PURGE,
   REGISTER,
    REHYDRATE,
     persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default to localStorage for web
import  authReducer from "./slices/authSlice";
import  orderReducer from "./slices/orderSlice";
//used for server side data we reload so dlt all...but use state madhla data localstorage read to store in persist use

const rootReducer = combineReducers({
    auth:authReducer,
    orders: orderReducer,

});


const persistConfig = {
    key: 'root',
    storage,
  };

   
  const persistedReducer = persistReducer(persistConfig, rootReducer);

   

//   create store
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
      },
    }),
});


  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export default store;