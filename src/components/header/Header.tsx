import styles from './header.module.scss';
// import NavMenu from '../NavMenu';
import BackButton from '../../UI/BackButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <BackButton />
    </header>
  );
};

export default Header;
