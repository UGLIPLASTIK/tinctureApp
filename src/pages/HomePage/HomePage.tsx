import { getAutorizationData } from '@/store/slices/autorizationSlice/autorizationSelectors';
import { setRole } from '@/store/slices/autorizationSlice/autorizationSlice';
import type { Sector } from '@/types';
import UiAutorizationForm from '@/UI/UiAutorizationForm';
import UiModal from '@/UI/UiModal';
import { setCurrentSector } from '@store/slices/tincturesSlice/tincturesSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './homePage.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const autorizationData = useSelector(getAutorizationData);
  const { currentRole } = autorizationData;

  useEffect(() => {
    if (currentRole) return;
    const accessKey =
      localStorage.getItem('nekrasovka-access-key') ??
      sessionStorage.getItem('nekrasovka-access-key') ??
      null;
    if (accessKey) {
      dispatch(setRole(accessKey));
    }
  }, [dispatch, currentRole]);

  const setSector = (sector: Sector) => dispatch(setCurrentSector(sector));

  const checkKey = (key: string) => {
    dispatch(setRole(key));
  };

  return (
    <div className={styles.homePage}>
      {currentRole ? (
        <ul>
          <li onClick={() => setSector('base')}>
            <Link to={'/base'}>Основные настойки</Link>
          </li>
          <li onClick={() => setSector('bonus')}>
            <Link to={'/bonus'}>Дополнительные настойки</Link>
          </li>
          <li onClick={() => setSector('test')}>
            <Link to={'/test'}>Тестовые настойки</Link>
          </li>
          <li onClick={() => setSector('guest')}>
            <Link to={'/guest'}>Гостевой список</Link>
          </li>
        </ul>
      ) : (
        <UiModal onClose={() => {}} isOpen={!currentRole}>
          <UiAutorizationForm onSubmitFn={checkKey} />
        </UiModal>
      )}
    </div>
  );
};

export default HomePage;
