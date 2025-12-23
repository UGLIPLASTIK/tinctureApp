import type { Tincture } from '@/types';
import { debounce } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import classNames from 'classnames';
import { useReducer, useState, useMemo, memo, useCallback } from 'react';
import ProgressBar from '../ProgressBar';
import styles from './tinctureListItem.module.scss';
import { reducerQauntity } from './TinctureListItem.utils';
import { useEditTinctureMutation } from '@/store/api';
import { addToSession } from '@/store/slices/tincturesSlice/tincturesSlice';
// import { addItemToSession } from './TinctureListItem.utils';
import { useDispatch } from 'react-redux';

type Props = {
  tincture: Tincture;
  isAdmin: boolean;
  isSelected: boolean;
  deleteHandler: (body: Pick<Tincture, 'id'>) => void;
  startEdit: (item: Tincture) => void;
  onClick: (item: Tincture) => void;
};

const TinctureListItem = ({
  tincture,
  deleteHandler,
  startEdit,
  isAdmin,
  onClick,
  isSelected,
}: Props) => {
  const { actual_quantity, name, recommended_quantity, id } = tincture;
  const [changing, setChanging] = useState(false);
  const [editTincture] = useEditTinctureMutation();
  const [sessionMaked, setSessionMaked] = useState(0);
  const dispatch = useDispatch();

  const [bufferQuantity, dispatchQuantity] = useReducer(
    reducerQauntity,
    actual_quantity
  );

  const debouncedChanger = useMemo(
    () =>
      debounce(async (t: Tincture, qty: number) => {
        await editTincture({ ...t, actual_quantity: qty });
      }, 300),
    [editTincture]
  );

  const handleChangeQuantity = useCallback(
    (action: '+' | '-') => {
      dispatchQuantity({ type: action });
      setChanging(true);
      const newQty =
        action === '+'
          ? bufferQuantity + 0.25
          : Math.max(0, bufferQuantity - 0.25);

      const newSessionMaked = (prev: number) => {
        if (action === '-' && prev === 0) return prev;
        return action === '+' ? prev + 0.25 : prev - 0.25;
      };

      const calculatedSessionMaked = newSessionMaked(sessionMaked);

      setChanging(true);
      setSessionMaked(calculatedSessionMaked);

      dispatch(
        addToSession({
          name: tincture.name,
          quantity: calculatedSessionMaked,
        })
      );

      debouncedChanger(tincture, newQty);
    },
    [bufferQuantity, debouncedChanger, dispatch, sessionMaked, tincture]
  );

  return (
    <li
      onClick={() => onClick(tincture)}
      className={classNames([
        styles.tinctureListItem,
        isSelected ? styles['tinctureListItem__selected'] : '',
      ])}
    >
      <div>
        <span>{name}</span>
        <div
          className={classNames([
            styles.buttonGroup,
            !isAdmin ? styles.hidden : '',
          ])}
        >
          <EditOutlined
            onClick={() => startEdit(tincture)}
            className={classNames([styles.icon])}
          />
          <Popconfirm
            placement="left"
            title={'Вы уверены?'}
            description={'Точно удалить?'}
            okText="Да"
            cancelText="Нет"
            onConfirm={() => deleteHandler({ id: id })}
          >
            <DeleteOutlined
              className={classNames([styles.icon__delete, styles.icon])}
            />
          </Popconfirm>
        </div>
      </div>
      <ProgressBar
        visible={isSelected}
        quantity={{
          actual_quantity: changing ? bufferQuantity : actual_quantity,
          recommended_quantity,
        }}
        quantityChanger={handleChangeQuantity}
      />
    </li>
  );
};

export default memo(TinctureListItem);
