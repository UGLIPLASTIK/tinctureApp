import type { Tincture } from '@/types';
import { debounce } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import classNames from 'classnames';
import { useReducer, useState } from 'react';
import ProgressBar from '../ProgressBar';
import styles from './tinctureListItem.module.scss';
import { reducerQauntity } from './TinctureListItem.utils';
import { useEditTinctureMutation } from '@/store/api';

type Props = {
  tincture: Tincture;
  deleteHandler: () => void;
  startEdit: (item: Tincture) => void;
};

const TinctureListItem = ({ tincture, deleteHandler, startEdit }: Props) => {
  const { actual_quantity, name, recommended_quantity } = tincture;
  const [changing, setChanging] = useState(false);
  const [editTincture] = useEditTinctureMutation();

  const [bufferQuantity, dispatchQuantity] = useReducer(
    reducerQauntity,
    actual_quantity
  );

  const debouncedChanger = debounce(async () => {
    await editTincture({ ...tincture, actual_quantity: bufferQuantity - 0.25 });
  }, 600);

  const handleChangeQuantity = (action: '+' | '-') => {
    dispatchQuantity({ type: action });
    setChanging(true);
    debouncedChanger();
  };

  return (
    <li className={styles.tinctureListItem}>
      <div>
        <span>{name}</span>
        <div className={styles.buttonGroup}>
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
            onConfirm={() => deleteHandler()}
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

export default TinctureListItem;
