import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  function handleClick() {
    router.push('/search')
  }
  
  return (
    
    <button onClick={handleClick}>Go to the search page</button>
    
  )
}
