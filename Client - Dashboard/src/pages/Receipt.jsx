import { useEffect, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import MainSection from '../layouts/MainSection';
import { useNavigate } from 'react-router-dom';
import PriceTable from '../components/Containers/PriceTable';
import html2canvas from 'html2canvas';

export default function Receipt() {
  const [receipt] = useLocalStorage('receipt', false);
  const navigate = useNavigate();
  const receiptRef = useRef();
  const splitTime = receipt && receipt.createdAt.split('T');
  const date = splitTime[0].replaceAll('-', '/');
  useEffect(() => {
    !receipt && navigate('/ordered-items');
  }, [receipt]);

  const printOrderHandler = () => {
    const elementToCapture = receiptRef.current;
    html2canvas(elementToCapture, { dpi: 600 }).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const newTab = window.open('', '_blank');
      newTab.document.write(`
      <html>
        <head>
          <title>Screenshot</title>
        </head>
        <body>
          <img width="700" height="300" src="${dataURL}" alt="Screenshot"/>
          <script>
            setTimeout(() => {
               window.print();
            }, 1000);
          </script>
        </body>
      </html>
    `);
    });
  };
  return (
    <MainSection sectionTitle='پرینت سفارش'>
      {receipt && (
        <div
          ref={receiptRef}
          className='w-full md:max-w-[500px] mx-auto'>
          <PriceTable
            items={receipt.items}
            price={receipt.amount}
            title={'مجموع سفارش'}
            date={date}
          />
        </div>
      )}
      <div className='w-full flex justify-end my-5'>
        <button
          onClick={printOrderHandler}
          className='primary-button bg-primary-500 text-white font-medium text-sm'>
          پرینت سفارش
        </button>
      </div>
    </MainSection>
  );
}
