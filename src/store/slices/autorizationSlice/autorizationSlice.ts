import { roleMap } from '@/config/roles';
import type { Role } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type state = {
  role: Role | null;
  incorrect: boolean;
  key: string | null;
};

const initialState: state = {
  role: null,
  incorrect: false,
  key: null,
};

const saveToken = (token: string) => {
  localStorage.setItem('nekrasovka-access-key', token);
  sessionStorage.setItem('nekrasovka-access-key', token);
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
        saveToken(action.payload);
      } else {
        state.role = null;
        state.incorrect = true;
        saveToken(action.payload);
      }
    },
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.key = action.payload;
    //   saveToken(action.payload);
    // },
    clearToken: (state) => {
      state.key = null;
      state.role = null;
      localStorage.removeItem('nekrasovka-access-key');
      sessionStorage.removeItem('nekrasovka-access-key');
    },
  },
});

export const { setRole, clearToken } = autorizationSlice.actions;

export default autorizationSlice.reducer;
