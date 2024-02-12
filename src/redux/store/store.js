import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../slices/notesSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});
