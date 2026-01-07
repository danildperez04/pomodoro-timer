import { useEffect, useReducer, useRef } from "react"
import CounterDisplay from "./CounterDisplay"
import { timerReducer } from "../reducers/timerReducer"
import { formatTime } from "../utils/formatTime";
import type { PomodoroModes } from "../types";
import Icon from "./Icon";

interface Props {
  mode: PomodoroModes,
  time: number,
}

function Timer({ mode, time }: Props) {
  const [state, dispatch] = useReducer(timerReducer, { time, isRunning: false });

  const audioRef = useRef<HTMLAudioElement>(null);

  const hours = formatTime(Math.floor(state.time / 3600));
  const minutes = formatTime(Math.floor((state.time % 3600) / 60));
  const seconds = formatTime(state.time % 60);

  useEffect(() => {
    dispatch({ type: 'RESET_TIMER', payload: time });
  }, [time]);

  // Set up audio on mount
  useEffect(() => {
    audioRef.current = new Audio('/sounds/alarm.mp3');
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning]);


  // Update title and play audio when time reaches zero
  useEffect(() => {
    document.title = `${hours}:${minutes}:${seconds} - ${mode} Timer`;

    if (state.time === 0) {
      audioRef.current?.play();
    }
  }, [state.time, hours, minutes, seconds]);


  return (
    <>
      <CounterDisplay
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      <div className="flex gap-5">
        <button
          className="px-6 py-2 bg-red-300 rounded-lg text-2xl hover:bg-red-400 transition cursor-pointer uppercase font-bold shadow-lg"
          onClick={() => {
            if (state.isRunning) {
              dispatch({ type: 'PAUSE_TIMER' });
            } else {
              dispatch({ type: 'START_TIMER' });
            }
          }}
        >
          {state.isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 bg-blue-300 rounded-lg text-2xl hover:bg-blue-400 transition cursor-pointer uppercase font-bold shadow-lg disabled:opacity-50"
          onClick={() => dispatch({ type: 'RESET_TIMER', payload: time })}
          disabled={state.time === time && !state.isRunning}
        >
          Reset
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            const dialog = document.querySelector('dialog');
            if (dialog) {
              dialog.showModal();
            }
          }}><Icon /></button>
      </div>
    </>
  )
}

export default Timer