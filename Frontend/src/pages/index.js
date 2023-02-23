import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Common.module.css';
import HeaderComponent from '../components/Pumpkin';
import { useState } from "react"; 

export default function Home() {
 const router = useRouter()
  const [todos, settodos] = useState([]);
 
  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    settodos(data);
  router.push('/search')

  };


 
  // function handleClick() {
  //   router.push('/search')
  // }
  
  return (
  <div className={styles.pidForm}>
  <div style={{ fontSize: 50 }}>Please enter the pumpkin ID:</div>
  <div><input type="text" id="pid" name="pid" style={{ fontSize: 50 }}/></div>
  <div><button onClick={fetchTodos} style={{ fontSize: 50 }}>Comfirm</button></div>
  </div>
  )
}