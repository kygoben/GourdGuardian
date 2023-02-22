import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Common.module.css';
import HeaderComponent from '../components/Pumpkin';

export default function Home() {
  const router = useRouter()
  function handleClick() {
    router.push('/search')
  }
  
  return (
  <div className={styles.pidForm}>
  <text style={{ fontSize: 50 }}>Please enter the pumpkin ID:</text>
  <div><input type="text" id="pid" name="pid" style={{ fontSize: 50 }}/></div>
  <div><button onClick={handleClick} style={{ fontSize: 50 }}>Comfirm</button></div></div>
  )
}