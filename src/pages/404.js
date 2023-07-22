import * as React from 'react';
import MetaHead from '../components/@fundamentals/MetaHead';
import MainLayout from '../components/@layout/MainLayout';
import Footer from '../components/@layout/Footer';
import Header from '../components/@layout/Header/Header';
import globalStyle from '../styles/global';
const NotFoundPage = () => {
    globalStyle();
    return (React.createElement(MainLayout, { header: React.createElement(Header, null), footer: React.createElement(Footer, null) }, "404 Not Found"));
};
export const Head = () => {
    return React.createElement(MetaHead, null);
};
export default NotFoundPage;
