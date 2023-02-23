import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Common.module.css';
import HeaderComponent from '../components/Pumpkin';
import { useState } from "react";

export default function index() {


  const router = useRouter()
  const callAPI = async () => {
    router.push('/volunteer/home')

  };


  return (
    <div className={styles.pidForm}>

      <button onClick={callAPI} style={{ fontSize: 50 }}>Click here to go to volunteer page</button>
    </div>
  )
}