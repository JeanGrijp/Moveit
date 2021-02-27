import {createContext, ReactNode, useEffect, useState} from 'react'

import challenges from '../../challenges.json';
interface ChallengeProviderProps {
  children: ReactNode;
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
  completeChallenge: () => void
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChallengeProvider ({children}: ChallengeProviderProps) {
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

  function levelUp() {
    setLevel(level + 1)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function startNewChallenge () {
    const randomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallenge]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', {body: `valendo ${challenge.amount} xp`})
    }
  }
  
  function resetChallenge () {
    setActiveChallenge(null)
  }

  function completeChallenge () {
    if (!activeChallenge) {
      return
    }

    const {amount} = activeChallenge
    let finalExperience = currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setActiveChallenge(null)
    setCurrentExperience(finalExperience)
    setCompletedChallenges(completedChallenges + 1)
  }

  return (
    <ChallengeContext.Provider 
    value={
      {level, 
      levelUp, 
      currentExperience, 
      completedChallenges, 
      startNewChallenge, 
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge
    }
  }>
      {children}
    </ChallengeContext.Provider>
  )

}

