import { createSlice } from '@reduxjs/toolkit';
import client from '../clients/client';

export const supplements = createSlice({
  name: 'supplements',
  initialState: {
    supplements: {
      wheys: [],
      preworkouts: [],
      creatines: []
    },
    loading: false,
    error: false,
    shouldStopFetching: false
  },
  reducers: {
    fetchSupplementsStart: state => {
      state.fetching = true;
      state.shouldStopFetching = false;
    },
    fetchSupplementsSuccess: (state, action) => {
      const { supplements, type } = action.payload;
      state.supplements[type] = supplements;
      state.fetching = false;
    },
    fetchSupplementsFailure: state => {
      state.fetching = false;
      state.error = true;
    },
    getSupplements: (state, action) => {
      const { supplementType } = action;
      return state.supplements[supplementType];
    },
    errorShown: state => {
      state.error = false;
      state.shouldStopFetching = true;
    },
    removeError: state => {
      state.error = false;
      state.shouldStopFetching = false;
    }
  }
});

export const {
  fetchSupplementsStart,
  fetchSupplementsSuccess,
  fetchSupplementsFailure,
  getSupplements,
  errorShown,
  removeError
} = supplements.actions;

export default supplements.reducer;

export const fetchSupplements = type => async dispatch => {
  try {
    dispatch(fetchSupplementsStart());
    const supplements = await client.fetchSupplements(type);
    const payload = { type, ...supplements };
    dispatch(fetchSupplementsSuccess(payload));
  } catch (err) {
    dispatch(fetchSupplementsFailure(err));
  }
};
