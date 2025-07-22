import { combineReducers } from 'redux';

import carReducer from './slices/car-slice';
import interfaceReducer from './slices/interface-slice';
import operationReducer from './slices/operation-slice';
import { carApi } from './api';

const rootReducer = combineReducers({
  car: carReducer,
  interface: interfaceReducer,
  operations: operationReducer,
  [carApi.reducerPath]: carApi.reducer,
});

export default rootReducer;
