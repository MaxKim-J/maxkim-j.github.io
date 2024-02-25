import * as React from 'react';
import CustomHead from '../components/Head';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar/MenuBar';
import { useLangStore } from '../store/langStore';
import { initialize } from '../i18n/initialize';

const LANG = 'ko';

const NotFoundPage = () => {
  initialize(LANG);
  useLangStore((state) => state.setLang)(LANG);

  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      404 Not Found
    </Layout>
  );
};

export const Head = () => {
  return <CustomHead lang={LANG} />;
};

export default NotFoundPage;
