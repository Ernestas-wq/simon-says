import React from 'react';

type Props = {
  colorId: number;
  handleGuess: (id: number) => void;
};

const ColorButton: React.FC<Props> = ({ colorId, handleGuess }) => {
  return (
    <div
      className={`color color-${colorId}`}
      onClick={() => handleGuess(colorId)}
    ></div>
  );
};

export default ColorButton;
