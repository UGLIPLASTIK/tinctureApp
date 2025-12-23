// import type { SessionTin } from '@/types';

export function reducerQauntity(state: number, action: { type: '+' | '-' }) {
  if (state <= 0 && action.type === '-') return state;
  switch (action.type) {
    case '+':
      return state + 0.25;
    case '-':
      return state - 0.25;
    default:
      return state;
  }
}

// export function addItemToSession(item: SessionTin) {
//   const stored = localStorage.getItem('sessionCollection');

//   const sessionCollection: SessionTin[] = stored ? JSON.parse(stored) : [];

//   const index = sessionCollection.findIndex((i) => i.name === item.name);

//   if (index !== -1) {
//     sessionCollection[index] = item;
//   } else {
//     sessionCollection.push(item);
//   }

//   localStorage.setItem('sessionCollection', JSON.stringify(sessionCollection));
// }
