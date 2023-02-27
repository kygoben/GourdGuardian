import styles from '@/../src/styles/data.module.css';

function PumpkinData({title, sid, category}) { 
    //   const sid = props.sid;
    //   console.log(sid);
    //   console.log(1);
    // console.log(title);
    return (        
        <>
        {/* <img src="/pumpkin.png" alt="my image" height="100px" width="100px" /> */}
        <div className={styles.id}>{sid}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.category}>{category}</div></>
    )
}
export default PumpkinData