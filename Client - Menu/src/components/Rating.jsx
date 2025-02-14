import MainSection from '../layouts/MainSection';
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
export default function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const startData = ['بد', 'ضعیف', 'متوسط', 'خوب', 'خیلی خوب', 'عالی'];
  return (
    <MainSection sectionTitle='امتیاز بدهید'>
      <span className='flex w-full justify-center gap-1'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type='button'
              key={index}
              onClick={() => setRating(index)}
              onMouseEnter={() => !rating && setHover(index)}
              onMouseLeave={() => !rating && setHover(rating)}>
              <StarIcon
                data-tooltip-id={`start${index}`}
                data-tooltip-content={`${startData[index]}`}
                className={`w-8 h-8 ${
                  index <= (hover || rating)
                    ? 'text-amber-500'
                    : 'stroke-amber-500 text-white'
                }`}
              />
              <Tooltip id={`start${index}`} />
            </button>
          );
        })}
      </span>
    </MainSection>
  );
}
