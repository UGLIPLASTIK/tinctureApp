import { setList } from '@/store/slices/tincturesSlice/tincturesSlice';
import UiSessionModal from '@/UI/UiSessionModal';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header';
import { useGetTinctureListsQuery } from '../store/api';

function App() {
  const { data: tinctureData, isLoading } = useGetTinctureListsQuery();
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
        <Outlet context={{ isLoading }} />
        <Footer />
      </div>
      <UiSessionModal />
    </Suspense>
  );
}

export default App;
