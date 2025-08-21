import styles from './header.module.scss';
import { clearToken } from '@/store/slices/autorizationSlice/autorizationSlice';
import { useDispatch } from 'react-redux';
import BackButton from '../../UI/BackButton';
import UiIconBtn from '@/UI/UiIconBtn';
import IconKey from '../../assets/key-svgrepo-com.svg?url';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(clearToken());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <UiIconBtn iconUrl={IconKey} action={logOut} />
        <BackButton />
      </div>
    </header>
  );
};

export default Header;
