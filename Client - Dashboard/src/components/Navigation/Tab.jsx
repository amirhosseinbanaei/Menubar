import { Tab } from '@headlessui/react';
import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomTab({ tabData }) {
  // const { t } = useTranslation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabChangeHandler = async (e) => {
    return setSelectedTabIndex(e);
  };
  return (
    <div className='w-full'>
      <Tab.Group
        selectedIndex={selectedTabIndex}
        onChange={tabChangeHandler}>
        <Tab.List className='grid grid-flow-col-dense gap-2 rounded-xl bg-white shadow-xl px-2 py-3 mb-5'>
          {tabData.map((eachTabData) => {
            return (
              <Tab
                key={eachTabData.title}
                className={({ selected }) =>
                  classNames(
                    'w-full h-12 rounded-md ml-3 py-2.5 text-sm font-medium leading-5',
                    'focus:ring-0 focus:outline-none',
                    selected
                      ? 'text-primary-500 border border-primary-500'
                      : 'text-typography-700 hover:text-typography-500',
                  )
                }>
                {/* {t(`pages.checkout.${keyword}`)} */}
                {eachTabData.title}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {tabData.map((eachTabData, index) => {
            return (
              <Tab.Panel key={index}>
                {eachTabData.child}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
