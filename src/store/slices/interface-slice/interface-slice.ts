import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
};

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  selectors: {
    menuOpen: (state) => state.menuOpen,
  },
  reducers: {
    toggleMenu(state, action: PayloadAction<boolean | undefined>) {
      state.menuOpen = action.payload ?? !state.menuOpen;
    },
  },
});

export const { toggleMenu } = interfaceSlice.actions;
export const { menuOpen } = interfaceSlice.selectors;

export default interfaceSlice.reducer;
