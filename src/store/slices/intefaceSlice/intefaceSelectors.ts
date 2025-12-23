// import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// const editing = (state: RootState) => state.operations.editing;
export const sessionModalIsOpen = (state: RootState) =>
  state.interface.sessionModalIsOpen;

export const actionsMenuIsOpen = (state: RootState) =>
  state.interface.actionsMenuIsOpen;

export const tinctureModalIsOpen = (state: RootState) =>
  state.interface.tinctureModalIsOpen;
