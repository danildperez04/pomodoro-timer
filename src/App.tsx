import { useEffect, useState } from "react";
import Timer from "./components/Timer"
import type { PomodoroModes, PomodoroTimes } from "./types";
import { TIMES } from "./constants";
import PomodoroForm from "./components/PomodoroForm";

function App() {
  const [times, setTimes] = useState<PomodoroTimes>(TIMES);
  const [mode, setMode] = useState<PomodoroModes>("Pomodoro");

  // Load default times for each mode
  useEffect(() => {
    const storage = localStorage.getItem('pomodoroTimes');

    const pomodoroTimes = storage
      ? JSON.parse(storage)
      : times;

    setTimes({
      Pomodoro: pomodoroTimes.Pomodoro,
      ShortBreak: pomodoroTimes.ShortBreak,
      LongBreak: pomodoroTimes.LongBreak,
    });
  }, []);

  return (
    <section className="bg-gray-800 flex justify-center items-center h-screen">
      <div
        className="flex flex-col gap-10 justify-center items-center text-white rounded-lg p-10 bg-gray-700"
      >
        <header className="text-center">
          <nav className="flex gap-2 mb-2">
            <button className="px-4 py-2 rounded-lg border-b bg-gray-400 font-bold disabled:opacity-50"
              onClick={() => setMode('Pomodoro')}
              disabled={mode === 'Pomodoro'}
            >
              Pomodoro
            </button>
            <button className="px-4 py-2 rounded-lg border-b bg-gray-400 font-bold disabled:opacity-50"
              onClick={() => setMode('ShortBreak')}
              disabled={mode === 'ShortBreak'}
            >
              Short Break
            </button>
            <button className="px-4 py-2 rounded-lg border-b bg-gray-400 font-bold disabled:opacity-50"
              onClick={() => setMode('LongBreak')}
              disabled={mode === 'LongBreak'}
            >
              Long Break
            </button>
          </nav>
          <h1
            className="text-4xl font-black uppercase"
          >
            {mode} Timer
          </h1>
        </header>
        <Timer mode={mode} time={times[mode]} />
      </div>
      <dialog
        closedby="any"
        className="bg-gray-700 text-white rounded-lg p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h3 className="mb-4 text-2xl font-bold">Settings</h3>
        <PomodoroForm times={times} setTimes={setTimes} />
      </dialog>
    </section>
  )
}

export default App
