import { clearToken } from '@/store/slices/autorizationSlice/autorizationSlice';
import UiIconBtn from '@/UI/UiIconBtn';
import IconBurger from '@assets/burger.svg?url';
import IconKey from '@assets/key-svgrepo-com.svg?url';
import { setActionsMenuIsOpen } from '@/store/slices/intefaceSlice/intefaceSlice';
import ActionsMenu from '@/widgets/ActionsMenu';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../UI/BackButton';
import styles from './header.module.scss';

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
        <div style={{ display: 'flex', gap: '20px' }}>
          <UiIconBtn
            iconUrl={IconBurger}
            action={() => dispatch(setActionsMenuIsOpen())}
          />
          <UiIconBtn iconUrl={IconKey} action={logOut} />
        </div>
        <BackButton />
      </div>
      <ActionsMenu />
    </header>
  );
};

export default Header;
