import React, { useEffect, useState } from 'react';
import { ButtonState } from './types';
type Props = {
  state: ButtonState;
  isUserGuessing: boolean;
  handleGameEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const getButtonText = (state: ButtonState) => {
  switch (state) {
    case ButtonState.start:
      return 'start';
    case ButtonState.next:
      return 'next';
    case ButtonState.submit:
      return 'submit';
  }
};

const GameButton: React.FC<Props> = ({ state, handleGameEvent, isUserGuessing }) => {
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    setButtonText(getButtonText(state));
  }, [state]);

  return (
    <button
      onClick={handleGameEvent}
      className={`game-btn ${isUserGuessing && 'game-btn-disabled'}`}
    >
      {buttonText}
    </button>
  );
};

export default GameButton;
