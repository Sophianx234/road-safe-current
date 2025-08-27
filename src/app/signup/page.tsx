'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TiUser } from "react-icons/ti";

export default function Signup() {
  const [showPass,setShowPass] = useState<boolean>(false)
  return (
    <div className="grid grid-cols-2 ">
      <form className=" p-22 pt-12 overflow-y-hidden h-dvh ">
        <h1 className="font-bold text-center font-bebas text-2xl pb-8">
        Create an account
        </h1>
        <div>
          <p className="font-inter text-center text-sm pb-2">
          Let’s get you started with your new account.
          </p>
          <div>
            <div className="space-y-6">
              <label className="relative items-center flex">
                <Input
                  placeholder="Username"
                  className="py-4 h-full rounded-2xl"
                />
                <FaRegUser className="absolute size-4 right-3 text-orange-200" />
              </label>
              <label className="relative items-center flex">
                <Input
                  placeholder="Email"
                  className="py-4 h-full rounded-2xl"
                />
                <CiMail className="absolute size-5 right-3 text-orange-200" />
              </label>
              <label className="relative items-center flex">
                <Input
                  placeholder="Password"
                  className="py-4 h-full  rounded-2xl"
                />
               {!showPass? <IoEyeOutline onClick={()=>setShowPass(true)} className="absolute z-10 size-5 right-3 text-orange-200" />
                :<IoEyeOffOutline className="absolute size-5 right-3 z-10 text-orange-200" onClick={()=>setShowPass(false)}/>}
              </label>
              <label className="relative items-center flex">
                <Input
                  placeholder="Confirm password"
                  className="py-4 h-full  rounded-2xl"
                />
               {!showPass? <IoEyeOutline onClick={()=>setShowPass(true)} className="absolute z-10 size-5 right-3 text-orange-200" />
                :<IoEyeOffOutline className="absolute size-5 right-3 z-10 text-orange-200" onClick={()=>setShowPass(false)}/>}
              </label>
            </div>
            <div className="flex items-center pt-4 font-barlow text-sm  justify-between px-2 ">
              <p className="text-gray-500">Already have an account? </p>
              <Link href='/login'>Login</Link>
            </div>

            <Button className="bg-orange-500 mt-8 w-full py-6 rounded-3xl ">
              Login
            </Button>
            
          </div>
        </div>
      </form>
      <div className="relative h-dvh">
        <Image
          src="/images/car-1.jpg"
          fill
          alt="boruto"
          className="object-cover"
        />
      </div>
    </div>
  );
}
