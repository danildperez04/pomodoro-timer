import type { MODES } from "../constants";

export type PomodoroModes = keyof typeof MODES;

export type PomodoroTimes = {
  [key in PomodoroModes]: number;
};