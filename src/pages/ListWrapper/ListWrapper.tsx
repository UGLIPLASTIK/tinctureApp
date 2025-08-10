import TinctureList from '@/components/TinctureList';
import { selectListBySector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import type { Sector, Tincture } from '@/types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ListWrapper = () => {
  const location = useLocation();
  const listSector = location.pathname.replace('/', '') as Sector;
  const tinctures = useSelector(selectListBySector);

  const listTitles: Record<Sector, string> = {
    base: 'Основные настойки',
    bonus: 'Бонусные настойки',
    test: 'Тестовые настойки',
  };

  return (
    <TinctureList
      title={listTitles[listSector]}
      list={tinctures as Tincture[]}
      sector={listSector}
    />
  );
};

export default ListWrapper;
