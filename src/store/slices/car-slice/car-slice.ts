import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '@/types/types';

interface CarState {
  car: Car | undefined;
}

const initialState: CarState = {
  car: undefined,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  selectors: {
    currentСar: (state) => state.car,
    parts: (state) => state.car?.parts,
  },
  reducers: {
    setCar: (state, action: PayloadAction<Car | undefined>) => {
      state.car = action.payload;
    },
  },
});

export const { setCar } = carSlice.actions;
export const { currentСar, parts } = carSlice.selectors;

export default carSlice.reducer;
