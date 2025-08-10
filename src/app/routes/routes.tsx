import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import ListWrapper from '@/pages/ListWrapper';
import App from '../App';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/base', element: <ListWrapper /> },
      { path: '/test', element: <ListWrapper /> },
      { path: '/bonus', element: <ListWrapper /> },
    ],
  },
]);

export default MainRouter;
