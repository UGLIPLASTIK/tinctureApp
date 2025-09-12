import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Tincture } from '@/types';

const allTinctures = (state: RootState) => state.tinctures.allTinctures;
export const currentSector = (state: RootState) =>
  state.tinctures.currentSector;

export const selectListBySector = createSelector(
  [allTinctures, currentSector],
  (tinctures, sector) => {
    return sector
      ? tinctures.filter((tin: Tincture) => tin.sector === sector)
      : [];
  }
);

export const tincturesInStock = createSelector([allTinctures], (tin) => {
  return tin.filter((tin) => tin.actual_quantity > 0);
});
