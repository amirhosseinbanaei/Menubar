/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('userData', false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const accessToken = Cookies.get('accessToken');
  useEffect(() => {
    if (accessToken && currentUser && accessToken === currentUser.accessToken) {
      setIsAuthenticated(true);
    } else {
      // localStorage.removeItem('userData');
      // Cookies.remove('accessToken');
      setIsAuthenticated(false);
      // setCurrentUser(null);
    }
  }, []);

  const login = async (userData) => {
    // Perform login logic and set currentUser and isAuthenticated
    // Cookies.set('accessToken', userData.accessToken);
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic and reset currentUser and isAuthenticated
    setCurrentUser(false);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    toast.success('از حساب کاربری خود خارج شدید .');
  };

  const authContextValue = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
