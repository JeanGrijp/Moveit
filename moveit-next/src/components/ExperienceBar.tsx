import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar () {

  const {currentExperience, experienceToNextLevel} = useContext(ChallengeContext)

  const percentToNwextLevel = Math.round(currentExperience * 100) / experienceToNextLevel
  return (
    <header className={styles.experienceBar}>
      <span>0 px</span>
      <div>
        <div style={{width: `${percentToNwextLevel}%`}}></div>
        <span className={styles.currentExperience} style={{left: `${percentToNwextLevel}%`}}>{currentExperience} px</span>
      </div>
      <span>{experienceToNextLevel} px</span>
    </header>
  )
}