import type { Tincture } from '@/types';
import { debounce } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import classNames from 'classnames';
import { useReducer, useState, useMemo, memo } from 'react';
import ProgressBar from '../ProgressBar';
import styles from './tinctureListItem.module.scss';
import { reducerQauntity } from './TinctureListItem.utils';
import { useEditTinctureMutation } from '@/store/api';

type Props = {
  tincture: Tincture;
  isAdmin: boolean;
  deleteHandler: (body: Pick<Tincture, 'id'>) => void;
  startEdit: (item: Tincture) => void;
};

const TinctureListItem = ({
  tincture,
  deleteHandler,
  startEdit,
  isAdmin,
}: Props) => {
  const { actual_quantity, name, recommended_quantity, id } = tincture;
  const [changing, setChanging] = useState(false);
  const [editTincture] = useEditTinctureMutation();

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

  const handleChangeQuantity = (action: '+' | '-') => {
    dispatchQuantity({ type: action });
    setChanging(true);
    const newQty =
      action === '+'
        ? bufferQuantity + 0.25
        : Math.max(0, bufferQuantity - 0.25);

    debouncedChanger(tincture, newQty);
  };

  return (
    <li className={styles.tinctureListItem}>
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
