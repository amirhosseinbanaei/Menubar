import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [finalPrice, setFinalPrice] = useState(0);
  const [storageItem, setStorageItem] = useLocalStorage('cart');

  const sumItems = [];
  useEffect(() => {
    storageItem.map((eachItem) => {
      return sumItems.push(eachItem.price * eachItem.quantity);
    });
    const finalP = sumItems.length && sumItems.reduce((a, b) => a + b);
    setFinalPrice(finalP);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageItem]);

  // Add an item to the cart
  const addToCart = async (item) => {
    toast.success('آیتم با موفقیت اضافه شد');
    return setStorageItem((prevCart) => [...prevCart, item]);
  };

  // Remove an item from the cart
  const removeFromCart = (currentItemId) => {
    toast.success('آیتم با موفقیت حذف شد');
    return setStorageItem((prevCart) => {
      const filteredCart = prevCart.filter(
        (eachItem) => eachItem._id !== currentItemId,
      );
      return [...filteredCart];
    });
  };

  const increaseQuantity = (currentItemId) => {
    return setStorageItem((prevCart) => {
      const currentItemIndex = prevCart.findIndex((eachItemObject) => {
        return eachItemObject._id === currentItemId;
      });
      prevCart[currentItemIndex].quantity =
        prevCart[currentItemIndex].quantity + 1;
      return [...prevCart];
    });
  };

  const decreaseQuantity = (currentItemId) => {
    return setStorageItem((prevCart) => {
      const currentItemIndex = prevCart.findIndex((eachItemObject) => {
        return eachItemObject._id === currentItemId;
      });
      if (prevCart[currentItemIndex].quantity > 1) {
        prevCart[currentItemIndex].quantity =
          prevCart[currentItemIndex].quantity - 1;
      }
      return [...prevCart];
    });
  };

  // Clear the cart
  const clearCart = () => {
    setStorageItem([]);
  };

  // Provide the cart state and actions to the child components
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        increaseQuantity,
        finalPrice,
        storageItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
