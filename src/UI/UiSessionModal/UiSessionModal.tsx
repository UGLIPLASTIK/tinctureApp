import { sessionModalIsOpen } from '@/store/slices/intefaceSlice/intefaceSelectors';
import { setSessionModalIsOpen } from '@/store/slices/intefaceSlice/intefaceSlice';
import { sessionTins } from '@/store/slices/tincturesSlice/tincturesSelectors';
import { useDispatch, useSelector } from 'react-redux';
import UiModal from '../UiModal';
import { clearSession } from '@/store/slices/tincturesSlice/tincturesSlice';
import type { SessionTin } from '@/types';
import UiBtn from '../UiBtn';
import styles from './uiSessionModal.module.scss';

const UiSessionModal = () => {
  const isOpen = useSelector(sessionModalIsOpen);
  const items: SessionTin[] = useSelector(sessionTins);
  const dispatch = useDispatch();

  const arrToStr = (arr: SessionTin[]): string => {
    let str = ``;
    arr.forEach((item) => (str += `${item.name} ${item.quantity} л.\n`));
    return str;
  };

  function copyText(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      alert('Ваш браузер не поддерживает копирование');
    }
  }

  const handleClear = () => dispatch(clearSession());
  const handleCopy = () => copyText(arrToStr(items));

  return (
    <UiModal isOpen={isOpen} onClose={() => dispatch(setSessionModalIsOpen())}>
      <div className={styles.sessionModal}>
        <ul>
          <h2>Сделано сегодня</h2>
          {items.map((item, idx) => (
            <li key={idx}>{`${item.name} ${item.quantity} л.`}</li>
          ))}
        </ul>
        <div>
          <UiBtn theme={'light'} text={'Очистить'} action={handleClear} />
          <UiBtn
            theme={'light'}
            text={'Копировать в буфер'}
            action={handleCopy}
          />
        </div>
      </div>
    </UiModal>
  );
};

export default UiSessionModal;
