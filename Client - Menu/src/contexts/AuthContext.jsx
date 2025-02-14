import { createContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate('');
  const [currentUser, setCurrentUser] = useLocalStorage('UserData');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (currentUser._id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (userData) => {
    setCurrentUser(userData.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic and reset currentUser and isAuthenticated
    setCurrentUser([]);
    setIsAuthenticated(false);
    navigate('/');
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
