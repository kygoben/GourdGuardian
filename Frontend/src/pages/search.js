import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Common.module.css';
import PumpkinData from '@/components/Pumpkin';

function search() {
const router = useRouter()
    const callAPI = async () => {
        
        try {
            const res = await fetch(`/api/pidSearch`);
            // const data = await res.json();
            console.log("test")
            console.log(res);
            if (res.status == 200){
                router.push('/pumpkinData')
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.pidForm}>
        <PumpkinData></PumpkinData>
        <button onClick={callAPI}>This is my pumpkin</button>
    </div>);
}

export default search;