import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory(prev => ([...prev, newMode]));
    } else {
      setMode(newMode);
      setHistory(history => ([...history, newMode]));
    };
  };

  const back = function () {
    if (history.length > 1) {
      let oldHistory = [...history];
      oldHistory.pop()
      setHistory(oldHistory);
      setMode(oldHistory[oldHistory.length - 1])
    };
  };


  return {
    mode,
    transition,
    back
  };
};