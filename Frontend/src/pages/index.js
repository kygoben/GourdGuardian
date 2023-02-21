import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter()
  function handleClick() {
    router.push('/search')
  }
  
  return (
  <div className={styles.pidForm}>
  <div><label for="pid">Please enter the pumpkin ID:</label></div>
  <div><input type="text" id="pid" name="pid" /></div>
  <div><button onClick={handleClick}>Comfirm</button></div></div>

    
    
  )
}
