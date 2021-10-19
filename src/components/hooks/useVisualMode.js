import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      let oldHistory = [...history];
      oldHistory[oldHistory.length - 1] = newMode
      setHistory(oldHistory);
    } else {
      setMode(newMode);
      setHistory(prev => ([...prev, newMode]));
    };
  };

  const back = function () {
    if (history.length > 1) {
      let oldHistory = [...history];
      setHistory(oldHistory);
      oldHistory.pop()
      setMode(oldHistory[oldHistory.length - 1])

    };
  };


  return {
    mode,
    transition,
    back
  };
};