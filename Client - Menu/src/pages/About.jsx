import { defaultData } from '../data/default';
import { memo } from 'react';
import { PhoneIcon, MapIcon } from '@heroicons/react/24/outline';
// import { useContext } from 'react';
// import { LanguageContext } from '../contexts/LanguageContext';
import MainSection from '../layouts/MainSection';
import Table from '../components/Table';
export default function About() {
  // const { language } = useContext(LanguageContext);
  return (
    <>
      <MainSection sectionTitle='درباره رستوران'>
        <div className='w-full md:w-10/12 px-3 mx-auto'>
          <p className='font-medium text-typography-700 text-justify leading-9 whitespace-pre-line'>
            {defaultData.about}
          </p>
        </div>
      </MainSection>
      <MainSection sectionTitle='ارتباط با مجموعه'>
        <div className='w-full lg:w-1/2 mx-auto h-52 flex items-end pb-1'>
          <div className='w-full h-48 flex flex-col justify-center gap-y-3 px-1'>
            <span className='w-full h-20 flex gap-x-2'>
              <SocialContainer
                width={'w-full'}
                iconName={'instagram'}
                href={'https://goo.gl/maps/8trMv9YiieS7T7xn8'}
              />
              <SocialContainer
                width={'w-full'}
                iconName={'phone'}
                href={'tel:+1 (416) 800-0885'}
              />
            </span>
            <SocialContainer
              width={'w-full'}
              iconName={'map'}
              href={'https://goo.gl/maps/8trMv9YiieS7T7xn8'}
            />
          </div>
        </div>
      </MainSection>
      <MainSection sectionTitle='ساعت کاری مجموعه'>
        <div className='my-5'>
          <Table />
        </div>
      </MainSection>
    </>
  );
}

const InstagramIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      className='stroke-typography-700'
      width='30'
      height='30'
      viewBox='0 0 50 50'>
      <path d='M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z'></path>
    </svg>
  );
};

const SocialContainer = memo(function SocialContainer({
  width,
  iconName,
  href,
}) {
  return (
    <a
      href={`${href}`}
      rel='noreferrer'
      target='_blank'
      className={`${width} h-20 border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border flex items-center justify-center`}>
      {socialIcons.map(
        (eachIcon) =>
          iconName === eachIcon.title && (
            <eachIcon.icon
              key={eachIcon.title}
              className='text-typography-700 w-7 h-7'
            />
          ),
      )}
    </a>
  );
});

const socialIcons = [
  { title: 'instagram', icon: InstagramIcon },
  { title: 'phone', icon: PhoneIcon },
  { title: 'map', icon: MapIcon },
];
