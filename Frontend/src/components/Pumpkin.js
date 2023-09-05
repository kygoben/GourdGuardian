import styles from '@/../src/styles/data.module.css';

function PumpkinData({title, sid, category}) { 
    return (        
        <>
        <div className={styles.id}>{sid}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.category}>{category}</div></>
    )
}
export default PumpkinData