import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory(prev => ([...prev, mode]))
    } else {
      setMode(newMode);
      history.push(newMode);
      setHistory(prev => ([...prev, mode]))
    }


  }

  const back = function () {
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length - 1])
    }
  }

  return {
    mode,
    transition,
    back
  }
}