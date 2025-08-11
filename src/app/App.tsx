import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { useGetTinctureListsQuery } from '../store/api';
import { setList } from '@/store/slices/tincturesSlice/tincturesSlice';

function App() {
  const { data: tinctureData } = useGetTinctureListsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tinctureData) {
      dispatch(setList(tinctureData));
    }
  }, [tinctureData, dispatch]);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
