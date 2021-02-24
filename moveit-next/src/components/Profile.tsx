import styles from '../styles/components/Profile.module.css';

export default function Profile () {
  return (
    <div className={styles.profileContainer}>
        <img src="https://avatars.githubusercontent.com/u/40359722?s=460&u=03571e489cb46d8893e98692f6d2d531cc974d4f&v=4" alt="Jean Grijp"/>
        <div>
          <strong>Jean Grijp</strong>
          <p>
            <img src="icons/level.svg" alt=""/>
            Level 1
          </p>
        </div>
    </div>
  )
}