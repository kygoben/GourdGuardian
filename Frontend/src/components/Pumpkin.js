import styles from '@/../src/styles/data.module.css';

function PumpkinData({title, sid, category, extras}) { 
    return (        
        <>
        
        <div className={styles.title}>{title}</div>
        {extras && <div className={styles.category}>{extras}</div>}
        <div className={styles.category}>{category}</div>
        <div className={styles.id}>{sid}</div></>
    )
}
export default PumpkinData