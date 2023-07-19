
import styles from './start.module.css';
export default function Start(props) {
    return (
            <div className={props.start ? styles.start :styles.container}>
           
            <h1 className={styles.h1}>Quizzical</h1>
            <h3 className={styles.h3}>Prove your knowledge</h3>
            <div className={styles.selection}>
            <label htmlFor="category">Select category:</label>
            <select name="category" id="category">
                <option value="">Any</option>
                <option value="&category=9">General knowledge</option>
                <option value="&category=10">Books</option>
                <option value="&category=11">Film</option>
                <option value="&category=12">Music</option>
                <option value="&category=13">Musical & theatres</option>
                <option value="&category=14">Television</option>
                <option value="&category=15">Video games</option>
                <option value="&category=16">Board games</option>
                <option value="&category=17">Science & nature</option>
                <option value="&category=18">Sciece: Computers</option>
                <option value="&category=19">Sciece: Mathematics</option>
                <option value="&category=20">Mythology</option>
                <option value="&category=21">Sports</option>
                <option value="&category=22">Geography</option>
                <option value="&category=23">History</option>
                <option value="&category=24">Politics</option>
                <option value="&category=25">Art</option>
                <option value="&category=26">Celebrities</option>
                <option value="&category=27">Animals</option>
                <option value="&category=28">Vehicles</option>
                <option value="&category=29">Comics</option>
                <option value="&category=30">Science: Gadgets</option>
                <option value="&category=31">Japanase anime & manga</option>
                <option value="&category=32">Cartoon & Animations</option>
            </select>
            </div>
            <div className={styles.selection}>
                <label htmlFor="difficulty">Select dificulty:</label>
                <select name="difficulty" id="difficulty">
                <option value="">Any</option>
                <option value="&difficulty=easy">Easy</option>
                <option value="&difficulty=medium">Medium</option>
                <option value="&difficulty=hard">Hard</option>
                </select>
            </div>
            <button className={styles.btn} onClick={props.clickHandler}>Start quiz</button>
            </div>
        
    );
  }