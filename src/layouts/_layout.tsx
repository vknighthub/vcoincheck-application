import React from "react";
import Header from "./nav/Header";
import NavHeader from './nav/NavHeader';
import SideBar from "./nav/SideBar";


const Layout = ({ children }: React.PropsWithChildren<{}>) => {
   return (
      <>
         <main>
            <div id="main-wrapper" className="show">
               <NavHeader />
               <SideBar />
               <Header />
               <div className="rightside-event content-body">
                  <div className="container-fluid">
                     {children}
                  </div>
               </div>

            </div>
         </main>
      </>
   );
};

export default Layout;
