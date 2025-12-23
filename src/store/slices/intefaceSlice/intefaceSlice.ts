import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

type state = {
  sessionModalIsOpen: boolean;
  tinctureModalIsOpen: boolean;
  actionsMenuIsOpen: boolean;
};

const initialState: state = {
  sessionModalIsOpen: false,
  actionsMenuIsOpen: false,
  tinctureModalIsOpen: false,
};

const intefaceSlice = createSlice({
  name: 'inteface',
  initialState,

  reducers: {
    setSessionModalIsOpen: (state) => {
      state.sessionModalIsOpen = !state.sessionModalIsOpen;
    },
    setActionsMenuIsOpen: (state) => {
      state.actionsMenuIsOpen = !state.actionsMenuIsOpen;
    },
    setTinctureModalIsOpen: (state) => {
      state.tinctureModalIsOpen = !state.tinctureModalIsOpen;
    },
  },
});

export const {
  setSessionModalIsOpen,
  setActionsMenuIsOpen,
  setTinctureModalIsOpen,
} = intefaceSlice.actions;

export default intefaceSlice.reducer;
