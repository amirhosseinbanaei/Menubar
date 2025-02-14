import { Tab } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import Map from '../Map/Map';
import MainSection from '../../layouts/MainSection';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomTab({
  onChangeHandler,
  tabTitleKeywords,
  selectedIndex = 0,
}) {
  const { t } = useTranslation();
  const tabsData = [
    { title: 'order', component: <OrderTabPanel /> },
    { title: 'pre-order', component: <PreOrderPanel /> },
    { title: 'delivery', component: <DeliverTabPanel /> },
  ];
  return (
    <div className='w-full'>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(e) => onChangeHandler(e)}>
        <Tab.List className='grid grid-cols-3 gap-2 rounded-xl bg-white shadow-xl px-2 py-3 mb-5'>
          {tabTitleKeywords &&
            tabTitleKeywords.map((keyword) => {
              return (
                <Tab
                  key={keyword}
                  className={({ selected }) =>
                    classNames(
                      'w-full h-12 rounded-md ml-3 py-2.5 text-sm font-medium leading-5',
                      'focus:ring-0 focus:outline-none',
                      selected
                        ? 'text-primary-500 border border-primary-500'
                        : 'text-typography-700 hover:text-typography-500',
                    )
                  }>
                  {t(`pages.checkout.${keyword}`)}
                </Tab>
              );
            })}
        </Tab.List>
        <Tab.Panels>
          {selectedIndex
            ? tabsData.map((eachTabData, index) => {
                return (
                  <Tab.Panel key={index}>{eachTabData.component}</Tab.Panel>
                );
              })
            : tabsData[0].component}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const OrderTabPanel = () => {
  return (
    <>
      <MainSection sectionTitle='سفارش در مجموعه'>
        <p className='text-primary-500 font-bold text-center'>
          چنانچه در مجموعه حضور دارید، روی همین گزینه باقی بمانید.
        </p>
      </MainSection>
    </>
  );
};

const PreOrderPanel = () => {
  return (
    <>
      <MainSection sectionTitle='تحویل سفارش'>
        <p className='text-primary-500 font-bold text-center leading-7'>
          چنانچه میخواهید سفارش خود را انجام دهید و تا پایان روز سفارش خود را به
          صورت حضوری از مجموعه تحویل بگیرید ، این گزینه را انتخاب کنید
        </p>
      </MainSection>
    </>
  );
};

const DeliverTabPanel = () => {
  return (
    <>
      <MainSection sectionTitle='فرم سفارش آنلاین'>
        <Map />
      </MainSection>
    </>
  );
};
