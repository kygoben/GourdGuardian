import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Common.module.css';
import PumpkinData from '@/components/Pumpkin';
import axios from 'axios'

function search() {

const router = useRouter()
    const callAPI = async () => {


        axios.get('/api/todos')
    .then((response) => {
      console.log(response)

      
      router.push('/pumpkinData')
})
        
    };

    return (
        <div className={styles.pidForm}>
        <PumpkinData></PumpkinData>
        <button onClick={callAPI}>This is my pumpkin</button>
    </div>);
}

export default search;