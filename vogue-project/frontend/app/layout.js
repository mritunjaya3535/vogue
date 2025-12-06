import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Vogue - Fashion Store',
  description: 'Your fashion destination',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
