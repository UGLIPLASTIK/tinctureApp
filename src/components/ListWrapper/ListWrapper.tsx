import TinctureList from '@/components/TinctureList';
import { selectListBySector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import { setCurrentSector } from '@/store/slices/tincturesSlice/tincturesSlice';
import type { Sector, Tincture } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useOutletContext } from 'react-router-dom';
import Loader from '../Loader';

type OutletContextType = {
  isLoading: boolean;
};

const ListWrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const listSector = location.pathname.replace('/', '') as Sector;
  const { isLoading } = useOutletContext<OutletContextType>();

  useEffect(() => {
    dispatch(setCurrentSector(listSector));
  });

  const listTitles: Record<Sector, string> = {
    base: 'Основные настойки',
    bonus: 'Бонусные настойки',
    test: 'Тестовые настойки',
  };
  const tinctures = useSelector(selectListBySector);

  return isLoading ? (
    <Loader />
  ) : (
    <TinctureList
      title={listTitles[listSector]}
      list={tinctures as Tincture[]}
    />
  );
};

export default ListWrapper;
