"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { DotStream } from 'ldrs/react'
import 'ldrs/react/DotStream.css'

// Default values shown

// Default values shown


// Default values shown


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;




export default function Login() {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {

    try {
      toast.loading("Authenticating...");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { message } = await res.json();
        toast.dismiss();
        toast.success(message || "successful");
        
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("login failed ");  
    }
  };

  return (
    <div className="grid grid-cols-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-22 overflow-y-hidden h-dvh"
      >
        <h1 className="font-bold text-center font-bebas text-2xl pb-14">
          Welcome back
        </h1>

        <p className="font-inter text-center text-sm pb-4">
          Please enter your details.
        </p>

        <div className="space-y-6">
          {/* Email */}
          <label className="relative items-center flex">
            <Input
              type="email"
              placeholder="Email"
              className="py-4 h-full rounded-2xl"
              {...register("email")}
            />
            <CiMail className="absolute size-5 right-3 text-orange-300" />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="relative items-center flex">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="py-4 h-full rounded-2xl"
              {...register("password")}
            />
            {!showPass ? (
              <IoEyeOutline
                onClick={() => setShowPass(true)}
                className="absolute z-10 size-5 right-3 text-orange-300 cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPass(false)}
                className="absolute z-10 size-5 right-3 text-orange-300 cursor-pointer"
              />
            )}
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember + Forgot password */}
        <div className="flex items-center pt-6 font-barlow justify-between px-2 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox /> Remember for 30 days
          </div>
          <p>forgot password?</p>
        </div>

        {/* Server error */}
        

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 mt-11 flex items-center w-full py-6 rounded-3xl"
        >
          {isSubmitting ? <DotStream
  size="60"
  speed="2.5"
  color="black" 
/> : "Login"}
        </Button>

        <div className="flex items-center pt-6 text-sm font-inter px-2 justify-center gap-1">
          <p className="text-gray-500">Don't have an account?</p>
          <Link href="/auth/signup">Sign Up</Link>
        </div>
      </form>

      {/* Right-side image */}
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
