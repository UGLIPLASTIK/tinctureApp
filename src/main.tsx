import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import MainRouter from './app/routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={MainRouter} />
    </Provider>
  </StrictMode>
);
