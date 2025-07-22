import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import { Suspense } from 'react';

function App() {
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
