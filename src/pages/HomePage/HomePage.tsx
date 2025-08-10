import type { Sector } from '@/types';
import { setCurrentSector } from '@store/slices/tincturesSlice/tincturesSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './homePage.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const setSector = (sector: Sector) => dispatch(setCurrentSector(sector));
  return (
    <div className={styles.homePage}>
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
      </ul>
    </div>
  );
};

export default HomePage;
