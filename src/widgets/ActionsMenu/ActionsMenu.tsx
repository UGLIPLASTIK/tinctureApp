import { useOutsideClick } from '@/shared/hooks/UseOutsideClick';
import { actionsMenuIsOpen } from '@/store/slices/intefaceSlice/intefaceSelectors';
import {
  setActionsMenuIsOpen,
  setSessionModalIsOpen,
} from '@/store/slices/intefaceSlice/intefaceSlice';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ActionsMenu.module.scss';

const ActionsMenu = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpen = useSelector(actionsMenuIsOpen);

  useOutsideClick(dropdownRef, () => dispatch(setActionsMenuIsOpen()));

  if (!isOpen) return null;

  return (
    <nav ref={dropdownRef} className={styles.actionsMenu}>
      <ul>
        <li>
          <button onClick={() => dispatch(setSessionModalIsOpen())}>
            Открыть сессию
          </button>
        </li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
    </nav>
  );
};

export default ActionsMenu;
