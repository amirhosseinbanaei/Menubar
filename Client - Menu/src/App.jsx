// React Router Dom
import { BrowserRouter as Router } from 'react-router-dom';

// React Query
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// All Routes
import AllRoutes from './routes.jsx';

// Third Party Library
import { Toaster } from 'react-hot-toast';

// Contexts
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import { useEffect } from 'react';

import { defaultData } from './data/default.js';

const queryClient = new QueryClient();
function App() {
  const [, setDirection] = useLocalStorage('Direction');
  useEffect(() => {
    if (
      defaultData.languages[0] === 'fa' ||
      defaultData.languages[0] === 'ar'
    ) {
      return setDirection('rtl');
    } else {
      return setDirection('ltr');
    }
  }, []);
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <CartProvider>
            <MenuProvider>
              <AuthContextProvider>
                <AllRoutes />
              </AuthContextProvider>
            </MenuProvider>
          </CartProvider>
        </LanguageProvider>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              direction: 'rtl',
            },
          }}
        />
        {/* <ReactQueryDevtools
          initialIsOpen={false}
          position='top-right'
        /> */}
      </QueryClientProvider>
    </Router>
  );
}

export default App;
