import { useContext } from 'react';
import PriceTable from '../Containers/PriceTable';
import { CartContext } from '../../contexts/CartContext';

export default function ContinuBuyingContainer() {
  const { finalPrice, storageItem } = useContext(CartContext);
  return (
    <>
      <PriceTable
        title={'مجموع'}
        buttonTitle='ادامه فرآیند خرید'
        buttonHref={'/checkout'}
        price={finalPrice}
        items={storageItem}
      />
    </>
  );
}
