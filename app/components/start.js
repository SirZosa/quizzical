
import styles from './start.module.css';
export default function Start(props) {
    return (
            <div className={props.start ? styles.start :styles.container}>
           
            <h1 className={styles.h1}>Quizzical</h1>
            <h3 className={styles.h3}>Prove your knowledge</h3>
            <button className={styles.btn} onClick={props.clickHandler}>Start quiz</button>
            </div>
        
    );
  }