import { createBrowserRouter } from 'react-router-dom';
import BaseTinctures from '../../pages/BaseTinctures';
import BonusTinctures from '../../pages/BonusTinctures';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import TestTinctures from '../../pages/TestTinctures';
import App from '../App';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/baseTinctures', element: <BaseTinctures /> },
      { path: '/testTinctures', element: <TestTinctures /> },
      { path: '/bonusTinctures', element: <BonusTinctures /> },
    ],
  },
]);

export default MainRouter;
