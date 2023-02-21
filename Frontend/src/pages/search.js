import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image'
import styles from '@/styles/Home.module.css';

function search() {
const router = useRouter()
    const callAPI = async () => {
        
        try {
            const res = await fetch(`/api/pidSearch`);
            // const data = await res.json();
            console.log("test")
            console.log(res);
            if (res.status == 200){
                router.push('/confirmPumpkin')
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.pidForm}>
            <img src="/pumpkin.png" alt="my image" height="100px" width="100px" />
        <text>Harley Davidson 24</text>
        <text>1-17</text>
        <button onClick={callAPI}>This is my pumpkin</button>
    </div>);
}

export default search;