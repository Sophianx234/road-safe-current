'use client';

import { useRef, useState, ChangeEvent } from 'react';
import {
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';

export default function SettingsPage() {
  const [gender, setGender] = useState('Male');
  const [profileImage, setProfileImage] = useState('/images/user-1.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 gap-6 font-sans ">
      {/* Sidebar */}
      <aside className="bg-white border border-gray-200 w-full md:max-w-xs rounded-3xl shadow-md p-6 space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              onClick={handleImageClick}
              className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer transition hover:brightness-95"
            />
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
          <h3 className="text-lg font-semibold mt-3 text-gray-800">Roland Donald</h3>
          <p className="text-sm text-gray-500">Cashier</p>
        </div>

        <nav className="space-y-3 px-10">
          <button className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-orange-100 text-orange-700 shadow-sm">
            <FaUser /> Personal Information
          </button>
          <button className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition">
            <FaLock /> Login & Password
          </button>
          <button className="flex items-center w-full gap-2 px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition">
            <FaSignOutAlt /> Log Out
          </button>
        </nav>
      </aside>

      {/* Main Form */}
      <main className="flex-1 border border-gray-200 bg-white rounded-3xl shadow-md p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

        {/* Gender Selection */}
        <div className="flex gap-4 text-sm">
          {['Male', 'Female'].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all
                ${
                  gender === option
                    ? 'border-orange-500 bg-orange-50 text-orange-600 font-medium shadow-sm'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
          <InputField label="First Name" defaultValue="Roland" icon={<FaUser />} />
          <InputField label="Last Name" defaultValue="Donald" icon={<FaUser />} />

          <div className="relative">
            <InputField
              label="Email"
              defaultValue="rolandDonald@mail.com"
              icon={<FaEnvelope />}
            />
            
          </div>

          <InputField label="Address" defaultValue="3605 Parker Rd." icon={<FaMapMarkerAlt />} />
          <InputField label="Phone Number" defaultValue="(405) 555-0128" icon={<FaPhoneAlt />} />

          <div className="relative">
            <InputField label="Date of Birth" defaultValue="1 Feb, 1995" icon={<FaCalendarAlt />} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl text-sm hover:bg-orange-50 transition">
            Discard Changes
          </button>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm hover:bg-orange-600 transition">
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
};

// Reusable input field with icon
function InputField({ label, defaultValue, icon }: InputFieldProps) {
  return (
    <div className="relative">
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-500">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          type="text"
          defaultValue={defaultValue}
          className="w-full bg-transparent focus:outline-none text-gray-800 text-sm"
        />
      </div>
    </div>
  );
}
