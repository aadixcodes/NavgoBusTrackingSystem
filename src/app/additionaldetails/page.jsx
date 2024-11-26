"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdditionalDetails = () => {
  const router = useRouter();
  const [stop, setStop] = useState("INDORE");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const contactNumber = document.getElementById('contactNumber').value;
    const busNumber = document.getElementById('busNumber').value;

    if (!contactNumber) {
      errors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit number';
    }

    if (!busNumber) {
      errors.busNumber = 'Bus number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = {
          contactNumber: document.getElementById('contactNumber').value,
          busStop: stop,
          busNumber: document.getElementById('busNumber').value
        };

        const response = await axios.post('http://localhost:8080/update-user-details', data);
        if (response.status === 200) {
          router.push('/dashboard'); // Or wherever you want to redirect after successful submission
        }
      } catch (error) {
        console.error('Error updating details:', error);
      }
    }
  };

  const handleStopChange = (event) => {
    setStop(event.target.value);
  };

  return (
    <div className="w-[100%] py-[3rem] flex items-center justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 shadow-2xl md:mx-0 shadow rounded-3xl sm:p-10">
          <h1 className="text-[30px] mb-[50px] font-bold">Additional Details</h1>
          <div className="max-w-md mx-auto">
            <div className="mt-5 grid grid-cols-1 gap-5">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="contactNumber">
                  Contact No. <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="Enter your contact no."
                  className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    formErrors.contactNumber ? 'border-red-500' : ''
                  }`}
                  type="tel"
                  pattern="[0-9]{10}"
                  id="contactNumber"
                />
                {formErrors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.contactNumber}</p>
                )}
              </div>

              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="busStop">
                  Select Stop <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  id="busStop"
                  value={stop}
                  onChange={handleStopChange}
                >
                  <option value="INDORE">Indore</option>
                  <option value="UJJAIN">Ujjain</option>
                  <option value="DEWAS">Dewas</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="busNumber">
                  Bus Number <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="Enter bus number"
                  className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    formErrors.busNumber ? 'border-red-500' : ''
                  }`}
                  type="text"
                  id="busNumber"
                />
                {formErrors.busNumber && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.busNumber}</p>
                )}
              </div>

              <div className="mt-5">
                <button
                  className="py-2 px-4 bg-[#FACC15] hover:bg-[#FDE047] focus:ring-blue-500 focus:ring-offset-blue-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;