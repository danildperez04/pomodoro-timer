import { useEffect, useState } from "react";
import type { PomodoroTimes } from "../types";

interface Props {
  times: PomodoroTimes;
  setTimes: React.Dispatch<React.SetStateAction<PomodoroTimes>>;
}

function PomodoroForm({ times, setTimes }: Props) {
  const [form, setForm] = useState<PomodoroTimes>({
    Pomodoro: times.Pomodoro / 60, ShortBreak: times.ShortBreak / 60, LongBreak: times.LongBreak / 60
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem('pomodoroTimes', JSON.stringify(times));

    setTimes({ Pomodoro: form.Pomodoro * 60, ShortBreak: form.ShortBreak * 60, LongBreak: form.LongBreak * 60 });

    const dialog = document.querySelector('dialog');
    if (dialog) {
      dialog.close();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: parseInt(value, 10)
    }));
  }

  useEffect(() => {
    setForm({
      Pomodoro: times.Pomodoro / 60,
      ShortBreak: times.ShortBreak / 60,
      LongBreak: times.LongBreak / 60
    });
  }, [times]);

  useEffect(() => {
    const dialog = document.querySelector('dialog');
    const handleClose = () => {
      handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
    };

    dialog?.addEventListener('close', handleClose);

    return () => {
      dialog?.removeEventListener('close', handleClose);
    };
  });


  return (
    <form
      className="flex flex-col gap-5 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center gap-8">
        <div className="flex flex-col items-center">
          <label
            htmlFor="Pomodoro">
            Pomodoro
          </label>
          <input
            onChange={handleChange}
            className="mt-2 bg-gray-400 rounded-lg px-2 py-1"
            type="number"
            name="Pomodoro" min="1" max="180"
            value={form.Pomodoro} />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="ShortBreak">
            Short Break
          </label>
          <input
            onChange={handleChange}
            className="mt-2 bg-gray-400 rounded-lg px-2 py-1"
            type="number"
            name="ShortBreak" min="1" max="180"
            value={form.ShortBreak} />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="LongBreak">
            Long Break
          </label>
          <input
            onChange={handleChange}
            className="mt-2 bg-gray-400 rounded-lg px-2 py-1"
            type="number"
            name="LongBreak" min="1" max="180"
            value={form.LongBreak} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded">
        Save Changes
      </button>
    </form>
  )
}

export default PomodoroForm