import { configureStore } from '@reduxjs/toolkit';
import supplementsSlice from './reducers/supplementsSlice';
import selectionSlice from './reducers/selectionSlice';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import parse from 'url-parse';

const reducer = combineReducers({
  supplements: supplementsSlice,
  selection: selectionSlice
});

const validSelections = [
  'wheys',
  'preworkouts',
  'creatines',
  'contact',
  'about',
  'wheyIsolates',
  'caseins'
];

const url = window.location.href;
const parsed = parse(url);
const parsedPathname =
  parsed.pathname && parsed.pathname.slice(1, parsed.pathname.length);
const pathname =
  parsedPathname && validSelections.includes(parsedPathname)
    ? parsedPathname
    : 'wheys';

const preloadedState = {
  selection: {
    selection: pathname
  },
  supplements: {
    supplements: {
      wheys: [],
      preworkouts: [],
      creatines: [],
      wheyIsolates: [],
      caseins: []
    }
  }
};

export default configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});
