import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/components/AuthContext';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <Analytics />
        </AuthProvider>
    );
}
