"use client";
import { useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React, { useState, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { UNDERSCORE_NOT_FOUND_ROUTE } from "next/dist/shared/lib/constants";

const SignUp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verificationMessage, setVerificationMessage] = useState("");
  const otpInputs = useRef([]);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input if backspace is pressed and current input is empty
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputs.current[index - 1].focus();
    }
  };

  // const handleSendOtp = async (e) => {
  //   e.preventDefault();
  //   setShowPopup(true);
  //   try {
  //     const response = await axios.post('http://localhost:8080/users/send-otp', { email });
  //     if (response.status === 200) {
  //       setVerificationMessage('OTP sent successfully!');
  //     } else {
  //       setVerificationMessage('Failed to send OTP. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error sending OTP:', error);
  //     setVerificationMessage('An error occurred. Please try again.');
  //   }
  // };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    let validAdmin = true; // Assume true for non-admins

    // Validate the admin passkey if the user is an admin
    if (role === "ADMIN") {
      const passKey = document.getElementById("passKey").value;

      try {
        const passKeyData = qs.stringify({ passKey });
        const passKeyResponse = await axios.post(
          "http://localhost:8080/users/validatePassKey",
          passKeyData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (!passKeyResponse.data) {
          alert("Invalid PassKey");
          return;
        }
      } catch (error) {
        console.error("Error validating PassKey:", error);
        alert("Failed to validate PassKey. Please try again.");
        setShowPopup(false);
        return;
      }
    }

    // Proceed to send OTP regardless of role
    try {
      setShowPopup(true);
      const data = qs.stringify({
        email: email,
        firstName: document.getElementById("firstName").value,
      });

      const otpResponse = await axios.post(
        "http://localhost:8080/send-otp",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Handle different status codes for OTP response
      switch (otpResponse.status) {
        case 200:
          setVerificationMessage("OTP sent successfully!");
          break;
        case 400:
          setVerificationMessage(
            "Invalid request. Please check your input and try again."
          );
          break;
        case 401:
          setVerificationMessage(
            "Unauthorized request. Please check your credentials."
          );
          break;
        case 403:
          setVerificationMessage(
            "Access denied. You do not have permission to perform this action."
          );
          break;
        case 404:
          setVerificationMessage("Service not found. Please try again later.");
          break;
        case 409:
          setVerificationMessage(
            "Conflict detected. There might already be an account with this email."
          );
          break;
        case 500:
          setVerificationMessage("Server error. Please try again later.");
          break;
        case 503:
          setVerificationMessage(
            "Service unavailable. Please try again later."
          );
          break;
        default:
          setVerificationMessage(
            `Unexpected error occurred: ${otpResponse.status}`
          );
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error.response) {
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Data:", error.response.data);

        // Handle specific error responses
        switch (error.response.status) {
          case 400:
            setVerificationMessage(
              "Invalid request. Please check your input and try again."
            );
            break;
          case 401:
            setVerificationMessage(
              "Unauthorized request. Please check your credentials."
            );
            break;
          case 403:
            setVerificationMessage(
              "Access denied. You do not have permission to perform this action."
            );
            break;
          case 404:
            setVerificationMessage(
              "Service not found. Please try again later."
            );
            break;
          case 409:
            setVerificationMessage(
              "Conflict detected. There might already be an account with this email."
            );
            break;
          case 500:
            setVerificationMessage("Server error. Please try again later.");
            break;
          case 503:
            setVerificationMessage(
              "Service unavailable. Please try again later."
            );
            break;
          default:
            setVerificationMessage(
              `Unexpected error occurred: ${error.response.status}`
            );
            break;
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setVerificationMessage(
          "No response from server. Please check your network connection."
        );
      } else {
        console.error("Error setting up request:", error.message);
        setVerificationMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setVerificationMessage("Please enter OTP");
      return;
    }

    const userData = {
      contactNumber: document.getElementById("contactNumber").value,
      email: document.getElementById("email").value,
      firstName: document.getElementById("firstName").value,
      gender: document.getElementById("gender").value,
      lastName: document.getElementById("lastName").value,
      passKey:
        role === "ADMIN" ? document.getElementById("passKey").value : undefined,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/verify-otp-and-signup",
        userData,
        {
          params: {
            email: email,
            otp: enteredOtp,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle different status codes directly after receiving the response
      switch (response.status) {
        case 201:
          setVerificationMessage("Verification successful! Redirecting...");
          setIsVerified(true);
          setTimeout(() => {
            setShowPopup(false);
            router.push("./Navgo");
          }, 3000);
          break;
        case 400:
          setVerificationMessage(
            "Invalid data submitted. Please check the form and try again."
          );
          break;
        case 401:
          setVerificationMessage(
            "Invalid OTP or credentials. Please try again."
          );
          break;
        case 403:
          setVerificationMessage(
            "You are not authorized to perform this action."
          );
          break;
        case 404:
          setVerificationMessage(
            "The requested resource was not found. Please try again later."
          );
          break;
        case 409:
          setVerificationMessage("An account with this email already exists.");
          break;
        case 500:
          setVerificationMessage(
            "A server error occurred. Please try again later."
          );
          break;
        case 502:
          setVerificationMessage("Bad Gateway. Please try again later.");
          break;
        case 503:
          setVerificationMessage(
            "Service is currently unavailable. Please try again later."
          );
          break;
        case 504:
          setVerificationMessage(
            "Server took too long to respond. Please try again later."
          );
          break;
        default:
          setVerificationMessage(`Unexpected response: ${response.status}`);
          break;
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Data:", error.response.data);

        // Handling error responses that weren't expected
        setVerificationMessage(`Unexpected error: ${error.response.data}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setVerificationMessage(
          "No response from server. Please check your network connection."
        );
      } else {
        console.error("Error setting up request:", error.message);
        setVerificationMessage("An error occurred. Please try again.");
      }
    }
  };

  const [role, setRole] = useState("STUDENT");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [stop, setStop] = useState("INDORE");

  const handleStopChange = (event) => {
    setStop(event.target.value);
  };
  return (
    <>
      <div className="w-[100%] py-[3rem] flex items-center  justify-center">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto ">
          <div class="relative px-4 py-10 bg-white mx-8 shadow-2xl md:mx-0 shadow rounded-3xl sm:p-10">
            <h1 className="text-[30px] mb-[50px] font-bold">
              Sign Up to Navgo
            </h1>
            <div class="max-w-md mx-auto">
              <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="firstName"
                  >
                    First name
                  </label>
                  <input
                    placeholder="Enter your first name"
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="firstName"
                  />
                </div>
                <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="lastName"
                  >
                    Last name
                  </label>
                  <input
                    placeholder="Enter your last name"
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="lastName"
                  />
                </div>
                <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    placeholder="Enter your email"
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    placeholder="Create password"
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="password"
                  />
                </div>
                {/* <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="contactNumber"
                  >
                    Contact No.
                  </label>
                  <input
                    placeholder="Enter your contact no."
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="tel"
                    pattern="[0-9]{10}"
                    id="contactNumber"
                  />
                </div> */}
                {/* <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="gender"
                  >
                    Gender
                  </label>
                  <select
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    id="gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div> */}
              </div>
              {/* <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="busstop"
                >
                  Select Stop
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  id="busstop"
                  value={stop}
                  onChange={handleStopChange}
                >
                  <option value="INDORE">Indore</option>
                  <option value="UJJAIN">Ujjain</option>
                  <option value="DEWAS">Dewas</option>
                </select>
              </div> */}

              <div>
              <div>
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="gender"
                  >
                    Gender
                  </label>
                  <select
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    id="gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="STUDENT">Student/Faculty</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                {role === "ADMIN" && (
                  <div>
                    <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="passKey"
                    >
                      Admin Pass-key
                    </label>
                    <input
                      placeholder="Enter passKey"
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="password"
                      id="passKey"
                    />
                  </div>
                )}
              </div>
              <div class="flex justify-center items-center">
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
                    <a href="/additionaldetails" class="ml-2">Sign up with Google</a>
                  </button>
                  <button
                    disabled
                    class="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-[20px]"
                  >
                    <FaGithub className="w-[20px] h-[20px]" />
                    <span class="ml-2">Sign up with Github</span>
                  </button>
                </div>
              </div>
              <div class="mt-5">
                <button
                  class="py-2 px-4 bg-[#FACC15] hover:bg-[#FDE047] focus:ring-blue-500 focus:ring-offset-blue-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <a
                  class="text-center text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  href="/Login"
                >
                  have an account? Log in
                </a>
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Please check your email
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  We've sent a code to {email}
                </p>
              </div>
              <div className="mt-4 flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputs.current[index] = el)}
                    className="w-12 h-12 text-center text-2xl  border rounded-md"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm text-blue-600 cursor-pointer">
                  Didn't get the code? Click to resend.
                </p>
              </div>
              {verificationMessage && (
                <p
                  className={`mt-2 text-sm ${
                    verificationMessage.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {verificationMessage}
                </p>
              )}
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-[#FACC15] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[#FDE047] focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>
              <div className="mt-2">
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
