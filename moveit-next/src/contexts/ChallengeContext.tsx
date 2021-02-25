import {createContext, ReactNode, useState} from 'react'


interface ChallengeProviderProps {
  children: ReactNode;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}


export const ChallengeContext = createContext({} as ChallengeContextData)



export function ChallengeProvider ({children}: ChallengeProviderProps) {
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    console.log('Jean Perfect')
  }
  
  return (
    <ChallengeContext.Provider 
    value={
      {level, 
      levelUp, 
      currentExperience, 
      completedChallenges, 
      startNewChallenge
    }
  }>
      {children}
    </ChallengeContext.Provider>
  )

}

