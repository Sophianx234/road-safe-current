import Image from "next/image";
import { ReactNode } from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

type LayoutProps = {
  children: ReactNode;
}
function layout({children}:LayoutProps) {

  return (
    <div className=" flex  gap-2 ">

  
<Sidebar/>
    

    
      
    <main className="bg-gray-50 ">


      {children}

      </main>
      
    </div>
  )
}

export default layout
