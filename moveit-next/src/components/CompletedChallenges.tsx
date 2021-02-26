import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges () {

  const {completedChallenges} = useContext(ChallengeContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completados</span>
      <span>{completedChallenges}</span>
    </div>
  )
}