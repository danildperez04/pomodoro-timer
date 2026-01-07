type Actions =
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER', payload: number }
  | { type: 'TICK' }
  | { type: 'SET_TIME'; payload: number };

interface TimerState {
  time: number
  isRunning: boolean
}

export function timerReducer(
  state: TimerState,
  action: Actions
): TimerState {
  if (action.type === 'START_TIMER') {
    return { ...state, isRunning: true };
  }

  if (action.type === 'TICK') {
    if (!state.isRunning) return state;

    if (state.time <= 1) {
      return { ...state, time: 0, isRunning: false };
    }

    return { ...state, time: state.time - 1 };
  }

  if (action.type === 'PAUSE_TIMER') {
    return { ...state, isRunning: false };
  }

  if (action.type === 'RESET_TIMER') {

    return { ...state, time: action.payload, isRunning: false };
  }

  if (action.type === 'SET_TIME') {
    return { ...state, time: action.payload };
  }

  return state;
}