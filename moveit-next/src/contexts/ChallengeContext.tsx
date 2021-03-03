import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
  children: ReactNode,
  level: number,
  currentExperience: number,
  completedChallenges: number
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModelOpen, setIsLevelModelOpen] = useState(false);
  const experienceToNextLevel = (((level + 1) * 4) ** 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, currentExperience, completedChallenges]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModelOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelModelOpen(false);
  }

  function startNewChallenge() {
    const randomChallenge = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallenge];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', { body: `valendo ${challenge.amount} xp` });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setCompletedChallenges(completedChallenges + 1);
  }

  return (
    <ChallengeContext.Provider
      value={
      {
        level,
        levelUp,
        currentExperience,
        completedChallenges,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }
  }
    >
      {children}

      {isLevelModelOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
