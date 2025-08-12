import { useDeleteTinctureMutation } from '@/store/api';
import type { DeleteTinctureBody, Tincture, Sector } from '@/types';
import UiBtn from '@/UI/UiBtn';

import { sortTinctures } from '@/utils/tincture.utils';
import classNames from 'classnames';
import { useState } from 'react';
import TinctureListItem from '../TinctureListItem';
import styles from './tinctureList.module.scss';
import { LazyUiModal } from '@/pages/LazyPages';

type Props = {
  list: Tincture[];
  sector: Sector;
  title: string;
};

const TinctureList = ({ list, sector, title }: Props) => {
  const [deleteTincture, { error }] = useDeleteTinctureMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sorting, setSorting] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Tincture | null>(null);

  const startEdit = (item: Tincture) => {
    setEditing(true);
    setEditingItem(item);
    setModalIsOpen(true);
  };

  const handleSorting = () => setSorting((prev) => !prev);

  const handleDeleteTincture = (body: DeleteTinctureBody) => {
    deleteTincture(body);
    if (error) console.log(error);
  };

  const closeModal = () => {
    setModalIsOpen((prev) => !prev);
    setEditing(false);
    setEditingItem(null);
  };

  const sortedItems = sortTinctures(list, sorting);

  return (
    <div className={styles.list}>
      <LazyUiModal
        editing={editing}
        editItem={editingItem}
        list={list}
        sector={sector}
        isOpen={modalIsOpen}
        onClose={() => closeModal()}
      />
      <div className={styles.header}>
        <h3 className={classNames('text-3xl', 'font-bold')}>{title}</h3>
        <UiBtn
          theme="light"
          action={handleSorting}
          styleClass={['sortingBtn', sorting ? 'sortingBtn__down' : '']}
        />
      </div>
      <ul>
        {list.length ? (
          sortedItems.map((tin) => (
            <TinctureListItem
              startEdit={startEdit}
              key={tin.id}
              tincture={tin}
              deleteHandler={() =>
                handleDeleteTincture({ id: tin.id as string, sector: sector })
              }
            />
          ))
        ) : (
          <div className={styles.descrEmpty}>Тут пока пусто</div>
        )}
        <UiBtn
          theme={'light'}
          action={() => setModalIsOpen(true)}
          text="Добавить"
        />
      </ul>
    </div>
  );
};

export default TinctureList;
