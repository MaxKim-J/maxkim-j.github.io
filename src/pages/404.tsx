import * as React from 'react';
import MetaHead from '../components/@fundamentals/MetaHead';
import MainLayout from '../components/@layout/MainLayout';
import Footer from '../components/@layout/Footer';
import Header from '../components/@layout/Header/Header';
import globalStyle from '../styles/global';

const NotFoundPage = () => {
  globalStyle();
  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      404 Not Found
    </MainLayout>
  );
};

export const Head = () => {
  return <MetaHead />;
};

export default NotFoundPage;
