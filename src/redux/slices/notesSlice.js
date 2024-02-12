import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addTodo } = noteSlice.actions;
export default noteSlice.reducer;
