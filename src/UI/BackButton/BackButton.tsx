import { useNavigate, useLocation } from 'react-router-dom';
import styles from './backButton.module.scss';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      className={styles.backButton}
      disabled={location.pathname == '/'}
      onClick={() => navigate(-1)}
    >
      {'< Назад'}
    </button>
  );
};

export default BackButton;
