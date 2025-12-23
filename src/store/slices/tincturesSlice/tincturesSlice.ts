import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Tincture, Sector, SessionTin } from '@/types';

type state = {
  allTinctures: Tincture[];
  currentSector: Sector | null;
  sessionTins: SessionTin[];
};

const initialState: state = {
  allTinctures: [],
  currentSector: null,
  sessionTins: JSON.parse(localStorage.getItem('sessionCollection') || '[]'),
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
    addToSession: (state, action: PayloadAction<SessionTin>) => {
      const isIncludeIndex = state.sessionTins.findIndex(
        (item) => item.name === action.payload.name
      );

      if (isIncludeIndex >= 0 && action.payload.quantity === 0) {
        state.sessionTins = state.sessionTins.filter(
          (item) => item.name !== action.payload.name
        );
        return;
      }

      if (isIncludeIndex < 0) {
        state.sessionTins.push(action.payload);
      } else {
        state.sessionTins[isIncludeIndex] = action.payload;
      }

      localStorage.setItem(
        'sessionCollection',
        JSON.stringify(state.sessionTins)
      );
    },

    clearSession: (state) => {
      localStorage.removeItem('sessionCollection');
      state.sessionTins = [];
    },
  },
});

export const { setCurrentSector, setList, addToSession, clearSession } =
  tincturesSlice.actions;

export default tincturesSlice.reducer;
