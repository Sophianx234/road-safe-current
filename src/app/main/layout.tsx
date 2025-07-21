import Image from "next/image";
import { ReactNode } from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

type LayoutProps = {
  children: ReactNode;
}
function layout({children}:LayoutProps) {

  return (
    <div className="">
    <Navbar/>
<Sidebar/>
    <main>
      {children}
      </main>
      
    </div>
  )
}

export default layout
