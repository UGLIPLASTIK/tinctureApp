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
