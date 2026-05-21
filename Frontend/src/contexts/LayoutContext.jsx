import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  // Persist focus mode in sessionStorage (survives navigation, resets on tab close)
  const [focusMode, setFocusMode] = useState(() => {
    return sessionStorage.getItem('jslearn_focus_mode') === 'true';
  });

  const toggleFocusMode = () => {
    setFocusMode(prev => {
      const next = !prev;
      sessionStorage.setItem('jslearn_focus_mode', String(next));
      return next;
    });
  };

  const disableFocusMode = () => {
    setFocusMode(false);
    sessionStorage.removeItem('jslearn_focus_mode');
  };

  return (
    <LayoutContext.Provider value={{ focusMode, toggleFocusMode, disableFocusMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
