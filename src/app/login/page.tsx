'use client'
// Update the path below if your Button component is located elsewhere
// Update the path below if your Button component is located elsewhere
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Login() {
  const [showPass,setShowPass] = useState<boolean>(false)
  return (
    <div className="grid grid-cols-2 ">
      <form className=" p-22 overflow-y-hidden h-dvh ">
        <h1 className="font-bold text-center font-bebas text-2xl pb-14">
          Welcome back
        </h1>
        <div>
          <p className="font-inter text-center text-sm pb-4">
            Please enter your details.
          </p>
          <div>
            <div className="space-y-6">
              <label className="relative items-center flex">
                <Input
                  placeholder="Email"
                  className="py-4 h-full rounded-2xl"
                />
                <CiMail className="absolute size-5 right-3 text-orange-300" />
              </label>
              <label className="relative items-center flex">
                <Input
                  placeholder="Password"
                  className="py-4 h-full  rounded-2xl"
                />
               {!showPass? <IoEyeOutline onClick={()=>setShowPass(true)} className="absolute z-10 size-5 right-3 text-orange-300" />
                :<IoEyeOffOutline className="absolute size-5 right-3 z-10 text-orange-300" onClick={()=>setShowPass(false)}/>}
              </label>
            </div>
            <div className="flex items-center pt-6 font-barlow justify-between px-2 text-sm">
              <div className="flex items-center gap-2">
                <Checkbox /> Remember for 30 days{" "}
              </div>
              <p>forgot password?</p>
            </div>

            <Button className="bg-orange-500 mt-11 w-full py-6 rounded-3xl ">
              Login
            </Button>
            <div className="flex items-center pt-6 text-sm font-inter px-2 justify-center gap-1">
              <p className="text-gray-500">Don't have an account? </p>
              <Link href='/signup'>Sign Up</Link>
            </div>
          </div>
        </div>
      </form>
      <div className="relative h-dvh">
        <Image
          src="/images/car-2.jpg"
          fill
          alt="boruto"
          className="object-cover"
        />
      </div>
    </div>
  );
}
