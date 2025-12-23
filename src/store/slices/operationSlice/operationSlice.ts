import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Tincture } from '@/types';

type state = {
  editing: boolean;
  editingItem: Tincture | null;
};

const initialState: state = {
  editing: false,
  editingItem: null,
};

const operationSlice = createSlice({
  name: 'operations',
  initialState,

  reducers: {
    switchEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },
    setEditingItem: (state, action: PayloadAction<Tincture>) => {
      state.editingItem = action.payload;
    },
    clearEditData: (state) => {
      state.editing = initialState.editing;
      state.editingItem = initialState.editingItem;
    },
  },
});

export const { switchEditing, setEditingItem, clearEditData } =
  operationSlice.actions;

export default operationSlice.reducer;
