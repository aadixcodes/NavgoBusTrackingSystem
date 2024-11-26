"use client";

import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [verificationMessage, setVerificationMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
          'http://localhost:8080/login',
          qs.stringify({ email, password }), // URL-encoded data
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          }
      );
  
      if (response.status === 200) {
          setVerificationMessage('Login successful!');
          window.alert('Login successful!')
          // Optionally redirect to another page
          router.push('./Navgo');
      }
  } catch (error) {
      if (error.response) {
          // Server responded with a status other than 2xx
          switch (error.response.status) {
              case 400:
                  setVerificationMessage('Bad request. Please check your input and try again.');
                  break;
              case 401:
                  // setVerificationMessage('Invalid password. Please try again.');
                  window.alert('Invalid password. Please try again.');
                  break;
              case 403:
                  // setVerificationMessage('Your account is not active. Please contact support.');
                  
                  break;
              case 404:
                  // setVerificationMessage('Email not found. Please check your email and try again.');
                  window.alert('Email not found. Please check your email and try again.');
                  break;
              case 429:
                  setVerificationMessage('Too many attempts. Please wait a moment and try again.');
                  break;
              case 500:
                  setVerificationMessage('Server error. Please try again later.');
                  break;
              case 503:
                  setVerificationMessage('Service unavailable. Please try again later.');
                  break;
              default:
                  setVerificationMessage('An unexpected error occurred. Please try again.');
                  break;
          }
      } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          setVerificationMessage('No response from server. Please check your network connection.');
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
          setVerificationMessage('An error occurred. Please try again.');
      }
  }
  
};


  return (
    <>
      <div className="w-[100%] py-[5rem] flex items-center  justify-center">
        <form onSubmit={handleLogin}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
            <div className="relative px-4 shadow-2xl py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <h1 className="text-[30px] mb-[35px] font-bold">
                Welcome ! <br />
                Login to Navgo
              </h1>
              <div className="max-w-md mx-auto">
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 gap-5">
                  <div>
                    <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      placeholder="Enter your email or username"
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Enter your password"
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-[25px]">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <a
                      className="text-center text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                      href="/Signup"
                    >
                      Or login with
                    </a>
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                  <button class="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-[615px]:px-[5px]">
                    <svg
                      viewBox="0 0 24 24"
                      height="25"
                      width="25"
                      y="0px"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                        fill="#F44336"
                      ></path>
                      <path
                        d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                        fill="#2196F3"
                      ></path>
                      <path
                        d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                        fill="#FFC107"
                      ></path>
                      <path
                        d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                        fill="#00B060"
                      ></path>
                      <path
                        opacity=".1"
                        d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
                      ></path>
                      <polygon
                        opacity=".1"
                        points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
                      ></polygon>
                      <path
                        d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                        fill="#E6E6E6"
                      ></path>
                      <path
                        opacity=".2"
                        d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                        fill="#FFF"
                      ></path>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        y2="12"
                        y1="12"
                        x2="24"
                        x1="0"
                        id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1"
                      >
                        <stop
                          stop-opacity=".2"
                          stop-color="#fff"
                          offset="0"
                        ></stop>
                        <stop
                          stop-opacity="0"
                          stop-color="#fff"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <path
                        d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                        fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"
                      ></path>
                      <path
                        opacity=".1"
                        d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
                      ></path>
                      <path
                        opacity=".2"
                        d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                        fill="#FFF"
                      ></path>
                    </svg>
                    <span class="ml-2">Sign in with Google</span>
                  </button>
                  <button
                    disabled
                    class="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-[20px]"
                  >
                    <FaGithub className="w-[20px] h-[20px]" />
                    <span class="ml-2">Sign in with Github</span>
                  </button>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="py-2 px-4 bg-[#FACC15] hover:bg-[#FDE047] focus:ring-blue-500 focus:ring-offset-blue-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <a
                    className="text-center text-xs text-gray-500 m-[2px] uppercase dark:text-gray-400 hover:underline"
                    href="/Signup"
                  >
                    Don't have an account? Sign Up
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </div>
              <div className="w-[100%] mt-[20px] flex items-center justify-center">
                <a href="/Forget" className="text-gray-500">
                  Forget Password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
