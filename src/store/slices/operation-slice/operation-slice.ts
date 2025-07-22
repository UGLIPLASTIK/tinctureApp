import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PartBody } from '../../../types/types';

type OperationsSliceState = {
  partForAdd: PartBody;
};

const initialState: OperationsSliceState = {
  partForAdd: {
    sector: '',
    part: '',
  },
};

const OperationsSlice = createSlice({
  name: 'operations',
  initialState,
  selectors: {
    part: (state) => state.partForAdd,
  },
  reducers: {
    setPart(state, action: PayloadAction<PartBody>) {
      state.partForAdd = action.payload;
    },
    resetPart(state) {
      state.partForAdd = initialState.partForAdd;
    },
  },
});

export const { resetPart, setPart } = OperationsSlice.actions;
export const { part } = OperationsSlice.selectors;

export default OperationsSlice.reducer;
