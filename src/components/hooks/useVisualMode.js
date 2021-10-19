import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = function (newMode, replace = false) {
  //   if (replace) {
  //     setMode(newMode);
  //     setHistory(prev => ([...prev, newMode]));
  //   } else {
  //     setMode(newMode);
  //     setHistory(prev => ([...prev]));
  //   };
  //   console.log(newMode);
  //   console.log(mode);
  //   console.log(history);
  // };

  // const back = function () {
  //   if (history.length === 1) {
  //     transition((history[history.length - 1]), true)
  //   }
  //   if (history.length > 1) {
  //     // setHistory(prev => [...prev]);
  //     // setMode(history[history.length - 1]);
  //     // setMode(SECOND)
  //     // transition((history[history.length - 1]), true)
  //     setMode(history[history.length - 1])

  //   };
  // };

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory(prev => ([...prev, newMode]));
    } else {
      setHistory(history => ([...history, newMode]));
      setMode(newMode);
    };
  };

  const back = function () {
    if (history.length === 1) {
      setMode(history[history.length - 1])
    }
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