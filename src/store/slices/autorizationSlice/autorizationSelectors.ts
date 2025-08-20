import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export const role = (state: RootState) => state.autorization.role;
export const isIncorrect = (state: RootState) => state.autorization.incorrect;

export const getAutorizationData = createSelector(
  [role, isIncorrect],
  (currentRole, incorrect) => {
    if (currentRole && !incorrect) {
      return { currentRole, incorrect };
    }
    return { currentRole, incorrect };
  }
);
