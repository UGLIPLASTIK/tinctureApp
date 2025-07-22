import { configureStore } from '@reduxjs/toolkit';
import { carApi } from './api';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carApi.middleware),
});

export default store;
