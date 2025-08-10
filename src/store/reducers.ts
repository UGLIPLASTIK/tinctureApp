import { combineReducers } from 'redux';
import { tinctureApi } from './api';
import tincturesSlice from './slices/tincturesSlice';

const rootReducer = combineReducers({
  tinctures: tincturesSlice,
  [tinctureApi.reducerPath]: tinctureApi.reducer,
});

export default rootReducer;
