import TinctureList from '@/components/TinctureList';
import { selectListBySector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import { setCurrentSector } from '@/store/slices/tincturesSlice/tincturesSlice';
import type { Sector, Tincture } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ListWrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const listSector = location.pathname.replace('/', '') as Sector;

  useEffect(() => {
    dispatch(setCurrentSector(listSector));
  });

  const listTitles: Record<Sector, string> = {
    base: 'Основные настойки',
    bonus: 'Бонусные настойки',
    test: 'Тестовые настойки',
  };
  const tinctures = useSelector(selectListBySector);

  return (
    <TinctureList
      title={listTitles[listSector]}
      list={tinctures as Tincture[]}
    />
  );
};

export default ListWrapper;
