import * as React from 'react';
import CustomHead from '../components/Head';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar/MenuBar';

const NotFoundPage = () => {
  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      404 Not Found
    </Layout>
  );
};

export const Head = () => {
  return <CustomHead />;
};

export default NotFoundPage;
