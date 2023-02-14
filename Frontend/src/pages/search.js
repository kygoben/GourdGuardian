import { useRouter } from 'next/router';
import React from 'react';

function search() {
const router = useRouter()
    const callAPI = async () => {
        
        try {
            const res = await fetch(`/api/pidSearch`);
            // const data = await res.json();
            console.log("test")
            console.log(res);
            if (res.status == 200){
                router.push('/confirmPumpkin')
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button onClick={callAPI}>This is my pumpkin</button>
    );
}

export default search;