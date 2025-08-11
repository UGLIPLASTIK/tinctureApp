import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

const allTinctures = (state: RootState) => state.tinctures.allTinctures;
const currentSector = (state: RootState) => state.tinctures.currentSector;

export const selectListBySector = createSelector(
  [allTinctures, currentSector],
  (tinctures, sector) => {
    console.log(sector);
    return sector ? tinctures.filter((tin) => tin.sector === sector) : [];
  }
);
