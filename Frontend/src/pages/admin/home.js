import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/admin.module.css';
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
    <div className={styles.layout}>
    <div className={styles.title}>Jack-O-Lantern Tracker</div>    
    <button className={styles.button}>Dashboard</button>
    </div>
  )
}