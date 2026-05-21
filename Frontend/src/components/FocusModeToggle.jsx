import React from 'react';
import { useLayout } from '../contexts/LayoutContext';

export default function FocusModeToggle() {
  const { focusMode, toggleFocusMode } = useLayout();

  return (
    <button
      id="focus-mode-toggle"
      onClick={toggleFocusMode}
      title={focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
      className={`
        focus-toggle-btn
        fixed top-4 right-4 z-[60]
        flex items-center gap-2
        px-4 py-2.5
        rounded-2xl
        font-headline font-bold text-sm
        transition-all duration-300 ease-out
        active:scale-95 active:translate-y-0.5
        ${focusMode
          ? 'bg-primary text-on-primary shadow-[0_3px_0_0_#286500] hover:shadow-[0_2px_0_0_#286500] hover:translate-y-0.5'
          : 'bg-surface-container-lowest text-on-surface-variant border-2 border-outline-variant/30 shadow-[0_3px_0_0_rgba(46,115,0,0.1)] hover:shadow-[0_2px_0_0_rgba(46,115,0,0.1)] hover:translate-y-0.5 hover:border-primary/40'
        }
      `}
    >
      <span
        className="material-symbols-outlined text-[20px] transition-transform duration-300"
        style={{
          fontVariationSettings: focusMode ? "'FILL' 1" : "'FILL' 0",
          transform: focusMode ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {focusMode ? 'visibility_off' : 'visibility'}
      </span>
      <span className="hidden sm:inline">
        {focusMode ? 'Exit Focus' : 'Focus'}
      </span>
    </button>
  );
}
