import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';
import ListWrapper from '@/pages/ListWrapper';
import App from '../App';
import { LazyHomePage } from '@/pages/LazyPages';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LazyHomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/base', element: <ListWrapper /> },
      { path: '/test', element: <ListWrapper /> },
      { path: '/bonus', element: <ListWrapper /> },
    ],
  },
]);

export default MainRouter;
