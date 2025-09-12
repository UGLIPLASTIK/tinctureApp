import styles from './guestPage.module.scss';
import { useSelector } from 'react-redux';
import { tincturesInStock } from '@/store/slices/tincturesSlice/tincturesSelectors';

const GuestPage = () => {
  const list = useSelector(tincturesInStock);
  console.log(list);
  return (
    <div className={styles.guestPage}>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestPage;
