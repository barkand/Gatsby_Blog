import * as React from "react";

import { PublicProvider } from "../context/public";
import Theme from "../theme";
import Header from "./header";
import Footer from "./footer";
import ScrollTopButton from "./toys/scrollTop";
import { container } from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <PublicProvider>
        <Theme>
          <Header/>
          <ScrollTopButton>
            <main>
              <div className={container}>
                {children}
               </div>
            </main>
          </ScrollTopButton>
          <Footer />
        </Theme>
      </PublicProvider>
    </>
  );
};

export default Layout;
