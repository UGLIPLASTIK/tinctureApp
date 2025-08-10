import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Tincture, Sector } from '@/types';

type state = {
  allTinctures: Tincture[];
  currentSector: Sector | null;
};

const initialState: state = {
  allTinctures: [],
  currentSector: null,
};

const tincturesSlice = createSlice({
  name: 'tinctures',
  initialState,

  reducers: {
    setList: (state, action: PayloadAction<Tincture[]>) => {
      state.allTinctures = action.payload;
    },
    setCurrentSector: (state, action: PayloadAction<Sector>) => {
      state.currentSector = action.payload;
    },
  },
});

export const { setCurrentSector, setList } = tincturesSlice.actions;

export default tincturesSlice.reducer;
