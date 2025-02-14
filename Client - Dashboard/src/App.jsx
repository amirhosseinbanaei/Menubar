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
import { AuthContextProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
            <MenuProvider>
              <AuthContextProvider>
                <AllRoutes />
              </AuthContextProvider>
            </MenuProvider>
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
