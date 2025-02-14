import { memo, useContext } from 'react';
import MainSection from '../../layouts/MainSection';
import cards from '../Cards/cards';
import { CartContext } from '../../contexts/CartContext';

const CartContainer = memo(function CartContainer() {
  const { storageItem } = useContext(CartContext);
  return (
    <MainSection sectionTitle='سبد خرید'>
      {storageItem.map((eachAddedItem) => {
        return (
          <cards.cart.main
            key={eachAddedItem._id}
            productData={eachAddedItem}
          />
        );
      })}
    </MainSection>
  );
});

export default CartContainer;
