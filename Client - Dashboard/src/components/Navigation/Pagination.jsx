import _ from 'lodash';
export default function Pagination({ dataLength, currentPage, changePageHandler }) {
   let numberOfTimes;
   if((dataLength % 10) === 0){
      numberOfTimes = dataLength / 10
   } else {
      numberOfTimes = Math.floor(dataLength / 10) + 1;
   }
  return (
    <>
      <ol
        className='flex my-5 justify-center gap-1 text-xs font-medium'>
        {_.times(numberOfTimes, (index) => {
          return (
            <li key={index} onClick={() => changePageHandler(index + 1)}>
              <p
                className={`${
                  index + 1 === currentPage
                    ? 'bg-primary-500 text-white'
                    : 'border border-gray-100 bg-white'
                } flex items-center hover:cursor-pointer justify-center h-9 w-9 rounded-lg  text-xs leading-8 text-typography-700`}>
                {index + 1}
              </p>
            </li>
          );
        })}
      </ol>
    </>
  );
}

