import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

export default store;
