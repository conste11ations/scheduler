import React, { useState } from "react";

export default function useVisualMode (defaultMode) {
  const [mode, setMode] = useState(defaultMode);
  const [history, setHistory] = useState([defaultMode]);

  const transition = (newMode, replace = false) => {
    
    replace && history.pop(); 
    setMode(newMode);
    history.push(newMode);
  }

  const back = () => {
    history.pop();
    history.length ? setMode(history[history.length - 1]) : setMode(defaultMode);
  }

  return { mode, transition, back };
}