"use client";

import { useDashStore } from "@/store/dash-store";
import { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2"; // <-- import here
import {
  FaEdit,
  FaEnvelope,
  FaLock,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [gender, setGender] = useState("Male");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const { user } = useDashStore();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    Swal.fire({
      title: "Saved!",
      text: "Your changes have been successfully saved.",
      icon: "success",
      confirmButtonColor: "#f97316", // tailwind's orange-500
    });
  };

  const handleLogout = async()=>{
    try{
      toast.loading('loging out...')
      const res = await fetch("/api/auth/logout", {
  method: "POST",
  credentials: "include", // important!
});
      if(res.ok){
        toast.dismiss()
        toast.success('logout successful')
        router.push('/auth/login')
        
      }
    }catch(err){
      toast.dismiss()

    }
  } 

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 gap-6 font-sans">
      {/* Sidebar */}
      <aside className="bg-white border border-gray-200 w-full md:max-w-xs rounded-3xl shadow-md p-6 space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer transition hover:brightness-95"
              />
            ) : (
              <img
                src={user?.avatar}
                alt="Profile"
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer transition hover:brightness-95"
              />
            )}
            <button
              onClick={handleImageClick}
              className="absolute bottom-1 right-1 bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-full shadow text-xs"
            >
              <FaEdit />
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
          <h3 className="text-lg font-semibold mt-3 text-gray-800">
            {user?.username}
          </h3>
          <p className="text-sm text-gray-500">Data Analyst</p>
        </div>

        <nav className="space-y-3 px-10">
          <button className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-orange-100 text-orange-700 shadow-sm">
            <FaUser /> Personal Information
          </button>
          <button className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition">
            <FaLock /> Login & Password
          </button>
          <button onClick={handleLogout} className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition">
            <FaSignOutAlt /> Log Out
          </button>
        </nav>
      </aside>

      {/* Main Form */}
      <main className="flex-1 border border-gray-200 bg-white rounded-3xl shadow-md p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

        {/* Gender Selection */}
        <div className="flex gap-4 text-sm">
          {["Male", "Female"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all
                ${
                  gender === option
                    ? "border-orange-500 bg-orange-50 text-orange-600 font-medium shadow-sm"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
                className="accent-orange-500 hidden"
              />
              {option}
            </label>
          ))}
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <InputField
            label="First Name"
            defaultValue={user?.username || ""}
            icon={<FaUser />}
          />

          <div className="relative">
            <InputField
              label="Email"
              defaultValue={user?.email || ""}
              icon={<FaEnvelope />}
            />
          </div>

          <InputField
            label="Password"
            type="password"
            defaultValue="secret"
            icon={<IoLockClosed />}
          />
          <InputField
            type="password"
            label="Confirm Password"
            defaultValue="secret"
            icon={<IoLockClosed />}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl text-sm hover:bg-orange-50 transition">
            Discard Changes
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  defaultValue: string;
  icon: React.ReactNode;
  type?: string;
};

function InputField({
  label,
  defaultValue,
  icon,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="relative">
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-500">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          type={type}
          defaultValue={defaultValue}
          className="w-full bg-transparent focus:outline-none text-gray-800 text-sm"
        />
      </div>
      <Toaster/>
    </div>
  );
}
