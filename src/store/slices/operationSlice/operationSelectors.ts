import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Tincture } from '@/types';

const editing = (state: RootState) => state.operations.editing;
const editingItem = (state: RootState) => state.operations.editingItem;

export const getEditData = createSelector(
  [editing, editingItem],
  (edit, item) => {
    if (edit && item) {
      return { editing: true as const, editItem: item as Tincture };
    }
    return { editing: false as const, editItem: null };
  }
);
