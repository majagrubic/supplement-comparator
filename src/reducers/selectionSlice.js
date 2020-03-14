import { createSlice } from '@reduxjs/toolkit';

export const selection = createSlice({
  name: 'selection',
  initialState: {
    selection: 'wheys'
  },
  reducers: {
    setSelection: (state, action) => {
      state.selection = action.payload;
    },
    getSelection: state => {
      return state.selection;
    }
  }
});

export const { setSelection, getSelection } = selection.actions;

export default selection.reducer;
