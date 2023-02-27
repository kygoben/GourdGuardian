import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/home.module.css';
import Link from 'next/link';

export default function Home() {

  const router = useRouter();

  const fetchTodos = async () => {
    const response = await fetch("/api/stencil/1-1");
    const query = await response.json();
    
    console.log(query.category);
    router.push({
      pathname: '/volunteer/confirm',
      query: query
      
    })

  };

  return (
    <div className={styles.pidForm}>
      <div className={styles.instructions}>Enter Stencil ID</div>
      <div><input type="text" id="pid" name="pid" className={styles.input} /></div>
      <div><button onClick={fetchTodos} className={styles.button}>Comfirm</button></div>
      <Link className={styles.back} href="/">Back to Home Page</Link>
    </div>
  )
}