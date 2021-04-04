import React, { useEffect, useState } from 'react';
import { ButtonState } from './types';
type Props = {
  state: ButtonState;
  isUserGuessing: boolean;
  handleGameEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const GameButton: React.FC<Props> = ({ state, handleGameEvent, isUserGuessing }) => {
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    if (state === ButtonState.start) setButtonText('start');
    else if (state === ButtonState.next) setButtonText('next');
    else {
      setButtonText('submit');
    }
  }, [state]);

  return (
    <button
      onClick={handleGameEvent}
      className={`game-btn ${isUserGuessing ? 'game-btn-disabled' : ''}`}
    >
      {buttonText}
    </button>
  );
};

export default GameButton;
