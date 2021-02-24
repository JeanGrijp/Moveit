import { useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

export function CountDown () {
  const [time, setTime] = useState(25*60);
  const [isActive, setIsActive] = useState(false)
  
  let countDownTimeout: NodeJS.Timeout

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
          setTime(time - 1)
        }, 1000)
      }
    }, [isActive, time])

  function startCountDown () {
    setIsActive(true)
  }

  function resetCountDown () {
    clearTimeout(countDownTimeout)
    setIsActive(false);
    setTime(25 * 60)
  }

  return (
    <>
    <div className={styles.countDownContainer}>
      <div>
        <span>{minuteLeft}</span>
        <span>{minuteRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondLeft}</span>
        <span>{secondRight}</span>
      </div>
    </div>

    { isActive ? (
      <button 
      className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
      onClick={resetCountDown}
      >Abandonar ciclo
      </button>

    ) : (
      <button 
      className={styles.countDownButton}
      onClick={startCountDown}
      >Iniciar um ciclo
      </button>
    )
  }
    </>
  )
}