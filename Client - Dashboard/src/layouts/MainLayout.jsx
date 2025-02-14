import RtlLayout from './RtlLayout';
import LtrLayout from './LtrLayout';

import { Outlet } from 'react-router-dom';
import { memo, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const MainLayout = memo(function MainLayout() {
  const { language } = useContext(LanguageContext);
  return (
    <>
      {language === 'fa' || language === 'ar' ? (
        <RtlLayout>
          <Outlet />
        </RtlLayout>
      ) : (
        <LtrLayout>
          <Outlet />
        </LtrLayout>
      )}
    </>
  );
});

export default MainLayout;