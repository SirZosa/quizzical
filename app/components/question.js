import styles from './question.module.css';

export default function Question(props) {
   const ans = props.answers?.map(current => {
    return (
        <h4 
        id={current.id} 
        key={current.id} 
        onClick={props.clickHandler} 
        className={
          current.isHeld && !current.isCorrect && !current.isIncorrect ? styles.isHold : 
          (current.isCorrect && current.isHeld ? styles.correct : 
          (current.isIncorrect && current.isHeld ? styles.incorrect : 
          current.isCorrect ? styles.correctnot : ""))}>{current.answer}</h4>
    )
   })
    
   
    return (
        <div className={styles.container} id={props.id}>
            <h4 className={styles.question}>{props.question}</h4>
            <div className={styles.answers}>
              {ans} 
            </div>
            <hr></hr>
        </div>
    );
  }