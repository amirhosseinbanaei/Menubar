import { createContext, useEffect, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const showMobileMenuHandler = (action) => {
    action === 'open' && setShowMenu(true);
    action === 'close' && setShowMenu(false);
  };
  useEffect(() => {}, [showMenu])
  return (
    <MenuContext.Provider value={{ showMenu, showMobileMenuHandler }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
