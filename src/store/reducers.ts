import { combineReducers } from 'redux';
import { tinctureApi } from './api';
import tincturesSlice from './slices/tincturesSlice';
import operationSlice from './slices/operationSlice';
import autorizationSlice from './slices/autorizationSlice';
import intefaceSlice from './slices/intefaceSlice';

const rootReducer = combineReducers({
  tinctures: tincturesSlice,
  operations: operationSlice,
  autorization: autorizationSlice,
  interface: intefaceSlice,
  [tinctureApi.reducerPath]: tinctureApi.reducer,
});

export default rootReducer;
