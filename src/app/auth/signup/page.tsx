"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDashStore } from "@/store/dash-store";

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const {setUser} = useDashStore()
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // react-hook-form with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  async function onSubmit(data: SignupFormData) {
    if (step === 1) {
      setStep(2);
      return;
    }
    console.log("data", data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (file) formData.append("file", file);

    try {
      toast.loading("Signing in.... ");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        console.log("result", result);
        setUser(result.user)
        toast.dismiss();
        toast.success("Account created successfully!");
        router.push("/main/map");
      }
      // e.g. router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Something went wrong");
    } finally {
    }
  }

  // STEP 1: account info
  if (step === 1)
    return (
      <div className="grid grid-cols-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-22 pt-12 overflow-y-hidden h-dvh"
        >
          <h1 className="font-bold text-center font-bebas text-2xl pb-8">
            Create an account
          </h1>

          <p className="font-inter text-center text-sm pb-2">
            Let’s get you started with your new account.
          </p>
          <div className="space-y-2">
            <label className="relative items-center flex">
              <Input
                {...register("username")}
                placeholder="Username"
                className="py-4 h-full rounded-2xl"
              />
              <FaRegUser className="absolute size-4 right-3 text-orange-200" />
            </label>
            {errors.username && (
              <p className="text-red-500 text-xs pl-1">
                {errors.username.message}
              </p>
            )}

            <label className="relative items-center flex">
              <Input
                {...register("email")}
                placeholder="Email"
                className="py-4 h-full rounded-2xl"
              />
              <CiMail className="absolute size-5 right-3 text-orange-200" />
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">
                {errors.email.message}
              </p>
            )}

            <label className="relative items-center flex">
              <Input
                type={showPass ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="py-4 h-full rounded-2xl"
              />
              {!showPass ? (
                <IoEyeOutline
                  onClick={() => setShowPass(true)}
                  className="absolute z-10 size-5 right-3 text-orange-200 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setShowPass(false)}
                  className="absolute size-5 right-3 z-10 text-orange-200 cursor-pointer"
                />
              )}
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs pl-1">
                {errors.password.message}
              </p>
            )}

            <label className="relative items-center flex">
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm password"
                className="py-4 h-full rounded-2xl"
              />
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 pl-1 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center pt-4 font-barlow text-sm justify-between px-2">
            <p className="text-gray-500">Already have an account? </p>
            <Link href="/auth/login">Login</Link>
          </div>

          <Button
            type="submit"
            className="bg-orange-500 mt-8 w-full py-6 rounded-3xl"
          >
            Next
          </Button>
        </form>

        <div className="relative h-dvh">
          <Image
            src="/images/car-3.jpg"
            fill
            alt="boruto"
            className="object-cover"
          />
        </div>
      </div>
    );

  // STEP 2: upload avatar
  if (step === 2)
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-dvh justify-center w-sm mx-auto items-center space-y-6"
      >
        <h1 className="font-bold font-inter">Upload Image to Continue</h1>

        <div
          onClick={handleImageClick}
          className="w-32 h-32 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-sm">Click to upload</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="grid grid-cols-2 items-center gap-2 justify-center">
          <Button
            type="submit"
            className="bg-gray-300 mt-4 w-full py-1 rounded-xl"
          >
            Skip
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 mt-4 w-full py-1 text-orange-900 rounded-xl"
          >
            Sign up
          </Button>
        </div>
        <Toaster />
      </form>
    );
}
