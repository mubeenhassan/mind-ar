import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, t }) => {
  return (
    <div className="App">
      {/* <Header t={t} /> */}
      <main>{children}</main>
      <Footer t={t} />
    </div>
  );
};

export default Layout;
