import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from '../slices/ingredientsSlice/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice/constructorSlice';
import feedReducer from '../slices/feedSlice/feedSlice';
import orderReducer from '../slices/orderSlice/orderSlice';
import userReducer from '../slices/userSlice/userSlice';

export const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  orderByNumber: orderReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
