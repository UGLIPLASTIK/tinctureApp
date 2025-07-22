import { Link } from 'react-router-dom';
import styles from './homePage.module.scss';
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ul>
        <li>
          <Link to={'/baseTinctures'}>Основные настойки</Link>
        </li>
        <li>
          <Link to={'/bonusTinctures'}>Дополнительные настойки</Link>
        </li>
        <li>
          <Link to={'/testTinctures'}>Тестовые Настойки</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
