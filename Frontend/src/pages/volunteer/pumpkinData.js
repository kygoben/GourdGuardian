import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Common.module.css';
import PumpkinData from '@/components/Pumpkin';

function pumpkinData() {
    const router = useRouter()
    const callAPI = async () => {

        try {
            const res = await fetch(`/api/stencil/1`);
            // const data = await res.json();
            console.log("test")
            console.log(res);
            if (res.status == 200) {
                router.push('/volunteer/end')
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className={styles.pidForm}>
            <PumpkinData></PumpkinData>
            <button onClick={callAPI}>I have finished carving</button>
        </div>
    );
}
export default pumpkinData;