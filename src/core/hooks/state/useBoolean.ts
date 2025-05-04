'use client';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface UseBooleanReturnProps {
  state: boolean;
  set: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

interface UseBooleanOptionsProps {}

/**
 * A custom hook that manages a boolean state with optional callbacks for state changes.
 *
 * @param {boolean} [defValue=false] - The initial value of the boolean state.
 * @returns {UseBooleanReturnProps} An object containing the current state, state setter, and utility functions.
 *
 */
const useBoolean = (defValue: boolean = false): UseBooleanReturnProps => {
  // States
  const [state, setState] = useState<boolean>(defValue);

  // Utilities
  const handleToggle = useCallback((): void => {
    setState((v) => !v);
  }, []);

  const handleSetFalse = useCallback((): void => {
    setState(false);
  }, []);

  const handleSetTrue = useCallback((): void => {
    setState(true);
  }, []);

  // Return
  return {
    state,
    set: setState,
    setFalse: handleSetFalse,
    setTrue: handleSetTrue,
    toggle: handleToggle,
  };
};

export default useBoolean;
