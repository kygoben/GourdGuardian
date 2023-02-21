import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import PumpkinData from '@/components/Pumpkin';

function pumpkinData() {
  const router = useRouter()
  const callAPI = async () => {
        
    try {
        const res = await fetch(`/pumpkinData`);
        // const data = await res.json();
        console.log("test")
        console.log(res);
        if (res.status == 200){
            router.push('/end')
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

    //   <h1>Are you done carving?</h1>,
    //   <form action="/api/completion" method="post">
    //   <button type="stepComplete">Cutting complete</button>
    // </form>
    );
}

export default pumpkinData;