import { ReactNode } from "react";
import Navbar from "../_components/Navbar";
import NotificationList from "../_components/NotificationList";
import Sidebar from "../_components/Sidebar";

type LayoutProps = {
  children: ReactNode;
}
function layout({children}:LayoutProps) {

  return (
    <div className=" grid grid-cols-12 ">
      
<div className="col-span-12 row-span-1 sticky top-0">

    <Navbar/>
</div>
  <div className="row-span-11 col-span-1">
<Sidebar/>
    </div>  

    
    <main className="flex relative z-20  pr-6 col-start-2 col-span-11 row-span-12  overflow-y-auto ">
      
      <NotificationList/>


      {children}

      </main>
      
    </div>
  )
}

export default layout
