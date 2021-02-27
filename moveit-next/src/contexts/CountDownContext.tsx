import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";



interface CountDownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountDown: () => void,
  resetCountDown: () => void
}

interface CountDownProviderProps {
  children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider ({children}: CountDownProviderProps) {
  const [time, setTime] = useState(0.1*60);
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false);

  const {startNewChallenge} = useContext(ChallengeContext)

  
  let countDownTimeout: NodeJS.Timeout

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
          setTime(time - 1)
        }, 1000)
      } else if ( isActive && time === 0){
        setHasFinished(true)
        setIsActive(false)
        startNewChallenge()
      }
    }, [isActive, time])

  function startCountDown () {
    setIsActive(true)
  }

  function resetCountDown () {
    clearTimeout(countDownTimeout)
    setIsActive(false);
    setTime(0.1 * 60)
    setHasFinished(false)
  }

  return (
    <CountDownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountDown
    }}>
      {children}
    </CountDownContext.Provider>
  )
}