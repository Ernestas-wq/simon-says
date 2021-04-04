import React, { useState, useEffect } from 'react';
import {
  generateRandomSequence,
  areArraysEqual,
  animateSequence,
  animateGuess,
} from './utils';
import {
  SEQUENCE_INTERVAL,
  NOTIFICATION_HIDE_DELAY,
  RESET_GUESS_DELAY,
} from './constants';
import { ButtonState, Notification, NotificationType } from './types';
import GameButton from './GameButton';
import ColorButton from './ColorButton';

const colors = [1, 2, 3, 4];

const App = () => {
  const [score, setScore] = useState<number>(0);
  const [isGameLive, setIsGameLive] = useState<boolean>(false);
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [isUserGuessing, setIsUserGuessing] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.start);
  const [notification, setNotification] = useState<Notification>({
    text: '',
    isOpen: false,
    type: NotificationType.neutral,
  });

  const fetchNextSequence = async (): Promise<any> => {
    setButtonState(ButtonState.submit);
    const sequence = generateRandomSequence(score + 1);
    setCurrentSequence(sequence);
    setIsAnimating(true);
    const timeToGuessText = await animateSequence(sequence, SEQUENCE_INTERVAL);
    setIsAnimating(false);
    setIsUserGuessing(true);
    handleNotification(timeToGuessText, NotificationType.neutral, 300);
  };

  const resetSequences = (): void => {
    setCurrentSequence([]);
    setUserSequence([]);
  };

  const handleSubmitSequence = (seq1: number[], seq2: number[]) => {
    if (seq1.length !== seq2.length) return;
    if (areArraysEqual(seq1, seq2)) {
      setScore(score + 1);
      resetSequences();
      setButtonState(ButtonState.next);
      handleNotification(
        'Good job! You are correct!!!',
        NotificationType.success,
        0
      );
    } else {
      setScore(0);
      setIsGameLive(false);
      setButtonState(ButtonState.start);
      resetSequences();
      handleNotification(
        'Oops! Looks like you messed up',
        NotificationType.danger,
        0
      );
    }
  };

  const handleGameEvent = (): void => {
    switch (buttonState) {
      case ButtonState.start:
        if (isGameLive) break;
        handleNotification('Good Luck!', NotificationType.neutral, 0);
        setIsGameLive(true);
        setTimeout(() => {
          fetchNextSequence();
        }, 2000);
        break;

      case ButtonState.submit:
        handleSubmitSequence(currentSequence, userSequence);
        break;

      case ButtonState.next:
        fetchNextSequence();
        break;

      default:
        console.log('Potatos');

        throw Error("Oops handleGameEvent didn't know what to do");
    }
  };

  const handleGuess = (colorIdx: number): void => {
    if (currentSequence.length === userSequence.length) return;
    if (isUserGuessing) {
      new Audio(`${colorIdx}.mp3`).play();
      const newUserSequence = [...userSequence, colorIdx];
      setUserSequence(newUserSequence);
      animateGuess(colorIdx, RESET_GUESS_DELAY);
    }
  };

  const handleNotification = (
    text: string,
    type: NotificationType,
    delay: number
  ): void => {
    const newNotification = { text, type, isOpen: true };
    setTimeout(() => {
      setNotification(newNotification);
    }, delay);
  };

  useEffect(() => {
    if (currentSequence.length === userSequence.length && currentSequence.length) {
      setIsUserGuessing(false);
      setButtonState(ButtonState.submit);
    }
  }, [currentSequence, userSequence]);

  useEffect(() => {
    if (notification.isOpen) {
      const timeout = setTimeout(() => {
        const newNotification = { ...notification, isOpen: false };
        console.log(notification === newNotification);
        setNotification(newNotification);
      }, NOTIFICATION_HIDE_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <div className="container">
      <h1>how long a sequence can you guess?</h1>
      <div className="score">
        <p>{score}</p>
      </div>
      <div
        className={`message ${notification.isOpen ? 'visible' : ''}
          ${notification.type === NotificationType.danger ? 'message-danger' : ''}
          ${notification.type === NotificationType.success ? 'message-success' : ''}
          `}
      >
        <p>{notification.text}</p>
      </div>

      <div className="game">
        {colors.map(colorId => {
          return (
            <ColorButton key={colorId} colorId={colorId} handleGuess={handleGuess} />
          );
        })}

        <GameButton
          state={buttonState}
          isUserGuessing={isUserGuessing || isAnimating}
          handleGameEvent={handleGameEvent}
        />
      </div>
    </div>
  );
};

export default App;
