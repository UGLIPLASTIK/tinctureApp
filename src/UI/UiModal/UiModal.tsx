import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './uiModal.module.scss';
import { useEffect, type ReactNode } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
};

const UiModal = ({ onClose, isOpen, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(
        styles.overlay,
        'inset-0',
        'bg-slate-900/60',
        'backdrop-blur'
      )}
      hidden={!isOpen}
    >
      <div className={styles.uiModal}>
        <CloseCircleOutlined
          style={{ display: 'none' }}
          onClick={() => onClose()}
          className={styles.closeBtn}
        />
        {children}
      </div>
    </div>
  );
};

export default UiModal;
