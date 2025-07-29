'use server'
import { ReactNode, useEffect } from "react";
import Navbar from "../_components/Navbar";
import NotificationList from "../_components/NotificationList";
import Sidebar from "../_components/Sidebar";
import { getAllAccidents } from "@/api/actions";

type LayoutProps = {
  children: ReactNode;
}
async function layout({children}:LayoutProps) {

  
  const res = await getAllAccidents() 
 const data = await res.json();
 console.log("Accidents Data:", data);

  return (
    <div className=" grid grid-cols-12 ">
      
<div className="col-span-12 row-span-1 sticky z-50  top-0">

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
