import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '@/types';
import { roleMap } from '@/config/roles';

type state = {
  role: Role | null;
  incorrect: boolean;
};

const initialState: state = {
  role: null,
  incorrect: false,
};

const autorizationSlice = createSlice({
  name: 'autorization',
  initialState,

  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      const role = roleMap[action.payload];
      if (role) {
        state.role = role;
        state.incorrect = false;
      } else {
        state.role = null;
        state.incorrect = true;
      }
    },
  },
});

export const { setRole } = autorizationSlice.actions;

export default autorizationSlice.reducer;
