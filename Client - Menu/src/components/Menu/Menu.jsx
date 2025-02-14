import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../contexts/LanguageContext';
import { defaultData } from '../../data/default';
export default function LanguageMenu() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const filterLanguages =
    defaultData.languages.length >= 2 &&
    languagesData.filter(
      (eachData, index) =>
        eachData.languageCode === defaultData.languages[index],
    );
  return (
    <div className='py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:bg-primary-300 hover:text-primary-500 rounded-xl'>
      <Menu
        as='div'
        className={'w-full'}>
        <Menu.Button
          className={`${
            language === 'ltr' ? 'mr-2' : 'ml-2'
          } w-full relative flex items-center`}>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2`}>
            <LanguageIcon className='w-6 h-6 duration-300 pointer-events-none ease' />
            {/* <eachNavItem.icons className='w-6 h-6 duration-300 pointer-events-none ease' /> */}
          </div>
          <span className='ml-1 tracking-normal duration-300 opacity-100 pointer-events-none ease'>
            {t(`register`)}
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='absolute origin-top-right right-5 mt-5 w-52 py-3 px-3 flex flex-col gap-y-2 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {filterLanguages.map((languageObject) => {
              return (
                <Menu.Item key={languageObject.id}>
                  {({ close }) => {
                    return (
                      <>
                        <LanguageFlagContainer
                          title={languageObject.title}
                          languageCode={languageObject.languageCode}
                          closeHandler={close}
                        />
                      </>
                    );
                  }}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function LanguageFlagContainer({ languageCode, title, closeHandler }) {
  const { changeLanguage } = useContext(LanguageContext);
  return (
    <>
      <div
        className='w-full h-10 flex items-center gap-x-3 px-3 hover:cursor-pointer hover:bg-[#ece9e9] rounded-lg'
        onClick={() => {
          closeHandler();
          return changeLanguage(null, languageCode);
        }}>
        <span className='w-6 h-4'>
          <img
            src={`/flags/${languageCode}.png`}
            alt='Flag'
            className='w-full h-full rounded-sm'
          />
        </span>
        <h1 className='font-bold mt-1 text-typography-700 tracking-none'>
          {title}
        </h1>
      </div>
    </>
  );
}

const languagesData = [
  { id: 1, title: 'Farsi', languageCode: 'fa' },
  { id: 2, title: 'English', languageCode: 'en' },
  { id: 3, title: 'Arabic', languageCode: 'ar' },
  { id: 4, title: 'France', languageCode: 'fr' },
];
