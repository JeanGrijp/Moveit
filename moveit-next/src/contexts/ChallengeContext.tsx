import {createContext, ReactNode, useState} from 'react'

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
  const [currentExperience, setCurrentExperience] = useState(10);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)



  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    const randomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallenge]
    setActiveChallenge(challenge)
  }
  
  function resetChallenge () {
    setActiveChallenge(null)
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
      experienceToNextLevel
    }
  }>
      {children}
    </ChallengeContext.Provider>
  )

}

