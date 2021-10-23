import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@data/contexts/AppContext';
import { AuthProvider } from '@data/contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from '@data/contexts/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  )
}
export default MyApp
