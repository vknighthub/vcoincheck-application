import React, { useState } from "react";
import NavHeader from './nav/NavHeader';
import SideBar from "./nav/SideBar";
import Header from "./nav/Header";


const Layout = ({ children }: React.PropsWithChildren<{}>) => {
   const [toggle, setToggle] = useState("");
   const onClick = (name: React.SetStateAction<string>) => setToggle(toggle === name ? "" : name);
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
