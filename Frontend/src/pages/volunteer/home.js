import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Common.module.css';

export default function Home() {
  const sid = 0;
  const title = "title";

  const router = useRouter();

  const fetchTodos = async () => {
    const response = await fetch("/api/stencil/1-1");
    const data = await response.json();
    console.log(data);
    router.push({
      pathname: '/volunteer/confirm',
      query: {
        sid: sid,
        title: title
      }
    })

  };

  return (
    <div className={styles.pidForm}>
      <div style={{ fontSize: 50 }}>Please enter the pumpkin ID:</div>
      <div><input type="text" id="pid" name="pid" style={{ fontSize: 50 }} /></div>
      <div><button onClick={fetchTodos} style={{ fontSize: 50 }}>Comfirm</button></div>
    </div>
  )
}