import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/volunteer/enterID');
  }, [router]);

  return <div>Redirecting...</div>;
}

export default Home;
