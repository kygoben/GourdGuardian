import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/Common.module.css';
import PumpkinData from '@/components/Pumpkin';
import axios from 'axios'

function confirm() {

    const router = useRouter()
    const callAPI = async () => {
        axios.get('/api/stencil')
            .then((response) => {
                console.log(response)
                router.push('/volunteer/pumpkinData')
            })
    };

    return (
        <div className={styles.pidForm}>
            <PumpkinData></PumpkinData>
            <button onClick={callAPI}>This is my pumpkin</button>
        </div>);
}

export default confirm;