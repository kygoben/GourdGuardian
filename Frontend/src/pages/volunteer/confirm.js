import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/Common.module.css';
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
            <PumpkinData title={router.query.title} sid={router.query.sid}></PumpkinData>
            <button onClick={callAPI}>This is my pumpkin</button>
        </div>);
}

export default confirm;