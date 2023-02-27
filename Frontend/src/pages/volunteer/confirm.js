import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/confirm.module.css';
import PumpkinData from '@/components/Pumpkin';
import axios from 'axios'
import withRouter from 'next/router';

const confirm = () => {
    const router = useRouter()
    console.log(router.query);
    
    const callAPI = async () => {
        axios.get('/api/stencil/1')
            .then((response) => {
                // console.log(response)
                router.push('/volunteer/pumpkinData')
            })
    };

    return (
        <div className={styles.pidForm}>
            <div className={styles.popup}>
            <PumpkinData title={router.query.title} sid={router.query.sid} category={router.query.category}></PumpkinData>
            <div className={styles.instructions}>Is this your stencil?</div>
            <button className={styles.button} onClick={callAPI}>Yes!</button>
            <a href='/volunteer/enterID'><button className={styles.button}>No</button></a>
        </div></div>);
}

export default confirm;