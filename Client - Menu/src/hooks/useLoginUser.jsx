import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function useLoginUser(
  options = { shouldNavigate: false, navigate: '/', backRef: null },
) {
  const { currentUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate('');
  const navigateCondition = () => {
    options.shouldNavigate &&
      navigate(
        `${options.navigate}${
          options.backRef && `?back_ref=${options.backRef}`
        }`,
      );
  };
  useEffect(() => {
    if (currentUser._id) {
      return setIsLogin(true);
    } else {
      navigateCondition();
      return setIsLogin(false);
    }
  }, [currentUser]);
  return { isLogin };
}
