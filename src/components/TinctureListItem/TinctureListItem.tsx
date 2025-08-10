import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Tincture } from '@/types';
import { Popconfirm } from 'antd';
import styles from './tinctureListItem.module.scss';
import classNames from 'classnames';
import ProgressBar from '../ProgressBar';

type Props = {
  tincture: Tincture;
  deleteHandler: () => void;
  startEdit: (item: Tincture) => void;
};

const TinctureListItem = ({ tincture, deleteHandler, startEdit }: Props) => {
  const { actual_quantity, name, recommended_quantity } = tincture;

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
        actual_quantity={actual_quantity}
        recommended_quantity={recommended_quantity}
      />
    </li>
  );
};

export default TinctureListItem;
