import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="App">
      {/* <Header t={t} /> */}
      <main>{children}</main>
      <Footer t={t} />
    </div>
  );
};

export default Layout;
