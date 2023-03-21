import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/data.module.css';
import PumpkinData from '@/components/Pumpkin';

const pumpkinData= () => {
    const router = useRouter()
    console.log(router.query);
    
    const callAPI = async () => {
        router.push('/volunteer/end')
    };



    return (
        <div>
            <div className={styles.section}><PumpkinData className={styles.section} sid= {'11-34'} title= {'Mockingjay'} category= {'Hunger Games'}></PumpkinData>
            </div><div className={styles.section}>
            <div>Status:</div>
            <div>Tracing</div>
            <div>In Progress</div>
            </div>

            <div className={styles.section}>
            <div>Time Elapsed</div>
            <div>24:37</div>
            </div>

            <div className={styles.section}><div>Are you done tracing?</div>
            <button className={styles.button} onClick={callAPI}>Yes</button>
            <button className={styles.buttonNo}onClick={callAPI}>No</button>
            </div>

        </div>
    );
}
export default pumpkinData;