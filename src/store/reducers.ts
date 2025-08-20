import { combineReducers } from 'redux';
import { tinctureApi } from './api';
import tincturesSlice from './slices/tincturesSlice';
import operationSlice from './slices/operationSlice';
import autorizationSlice from './slices/autorizationSlice';

const rootReducer = combineReducers({
  tinctures: tincturesSlice,
  operations: operationSlice,
  autorization: autorizationSlice,
  [tinctureApi.reducerPath]: tinctureApi.reducer,
});

export default rootReducer;
