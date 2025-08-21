import { useDeleteTinctureMutation } from '@/store/api';
import {
  setEditingItem,
  switchEditing,
} from '@/store/slices/operationSlice/operationSlice';
import type { Sector, Tincture } from '@/types';
import UiBtn from '@/UI/UiBtn';
import { sortTinctures } from '@/utils/tincture.utils';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinctureListItem from '../TinctureListItem';
import TinctureModalContainer from '../TinctureModalContainer';
import styles from './tinctureList.module.scss';
import { getAutorizationData } from '@/store/slices/autorizationSlice/autorizationSelectors';
import { editingItem } from '@/store/slices/operationSlice/operationSelectors';

type Props = {
  list: Tincture[];
  sector: Sector;
  title: string;
};

const TinctureList = ({ list, title }: Props) => {
  const [deleteTincture, { error }] = useDeleteTinctureMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sorting, setSorting] = useState(true);
  const [defaultSorting, setDefaultSorting] = useState(true);
  const [hideButtons, setHideButtons] = useState(true);
  const dispatch = useDispatch();
  const { currentRole } = useSelector(getAutorizationData);
  const isAdmin = currentRole === 'admin';
  const selectedItem = useSelector(editingItem);
  const selectedId = selectedItem?.id;

  const startEdit = useCallback(
    (item: Tincture) => {
      dispatch(switchEditing(true));
      dispatch(setEditingItem(item));
      setModalIsOpen(true);
    },
    [dispatch]
  );

  const selectItem = useCallback(
    (tin: Tincture) => {
      dispatch(setEditingItem(tin));
    },
    [dispatch]
  );

  const handleSorting = () => {
    setDefaultSorting(false);
    setSorting((prev) => !prev);
  };

  const handleDefaultSorting = () => setDefaultSorting((prev) => !prev);

  const handleDeleteTincture = useCallback(
    (body: Pick<Tincture, 'id'>) => {
      deleteTincture(body);
      if (error) console.log(error);
    },
    [deleteTincture, error]
  );

  const closeModal = () => {
    setModalIsOpen((prev) => !prev);
    dispatch(switchEditing(false));
  };

  const sortedItems = useMemo(
    () => sortTinctures(list, sorting, defaultSorting),
    [list, sorting, defaultSorting]
  );

  return (
    <div className={styles.list}>
      <TinctureModalContainer
        isOpen={modalIsOpen}
        onClose={() => closeModal()}
      />
      <div
        className={classNames([
          styles.sortingBtns,
          hideButtons ? styles['sortingBtns__hidden'] : '',
        ])}
      >
        <UiBtn
          theme="light"
          action={handleSorting}
          styleClass={[
            'sortingBtn',
            'sortingBtn__qantSort',
            sorting ? 'sortingBtn__down' : '',
          ]}
        />{' '}
        <UiBtn
          theme="light"
          action={handleDefaultSorting}
          styleClass={['sortingBtn', 'sortingBtn__alphaSort']}
        />
        <button
          className={styles.hideBtn}
          onClick={() => setHideButtons((prev) => !prev)}
        ></button>
      </div>
      <div className={styles.header}>
        <h3 className={classNames('text-2xl', 'font-bold')}>{title}</h3>
      </div>
      <ul>
        {list.length ? (
          sortedItems.map((tin) => (
            <TinctureListItem
              onClick={selectItem}
              isAdmin={isAdmin}
              startEdit={startEdit}
              key={tin.id}
              tincture={tin}
              deleteHandler={handleDeleteTincture}
              isSelected={tin.id === selectedId}
            />
          ))
        ) : (
          <div className={styles.descrEmpty}>Тут пока пусто</div>
        )}
        <UiBtn
          theme={'light'}
          action={() => setModalIsOpen(true)}
          text="Добавить"
          hidden={!isAdmin}
        />
      </ul>
    </div>
  );
};

export default TinctureList;
