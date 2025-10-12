import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './todoSlice.js';

export const store = configureStore({
  reducer: {
    todos: todoSlice
  }
})