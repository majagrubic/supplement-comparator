import { createSlice } from '@reduxjs/toolkit';

export const selection = createSlice({
  name: 'selection',
  initialState: {
    selection: 'wheys'
  },
  reducers: {
    setSelection: (state, action) => {
      state.selection = action.payload;
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, null, action.payload);
    },
    getSelection: state => {
      return state.selection;
    }
  }
});

export const { setSelection, getSelection } = selection.actions;

export default selection.reducer;
