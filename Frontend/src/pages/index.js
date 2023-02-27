import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/home.module.css';

export default function index() {


  const router = useRouter()
  const callAPI = async () => {
    router.push('/volunteer/enterID')

  };


  return (
    <div className={styles.pidForm}>

      <button onClick={callAPI} style={{ fontSize: 50 }}>Click here to go to volunteer page</button>
    </div>
  )
}