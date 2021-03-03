import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
  const { resetCountDown } = useContext(CountDownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountDown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>
            Ganhe
            {' '}
            {activeChallenge.amount}
            {' '}
            xp
          </header>

          <main>

            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>

          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeButtonFailed}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeButtonCompleted}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>

        </div>

      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level-up" />
            Avance para o próximo level completando os desafios.
          </p>
        </div>
      )}
    </div>
  );
}
