"use client";
import React, { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<number>(0);
  const [errMsg, setErrMsg] = useState<string>(
    "Herhangi bir error uzadikca uzar"
  );
  const isInvalidFullName = React.useMemo(() => {
    let regex = /[aA-zZ0-9]/;
    if (fullName === "") return false;
    if (fullName.length < 3 || fullName.length > 50) return true;
    return fullName.match(regex) ? false : true;
  }, [fullName]);

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;
    // if(!email.includes('.edu.')) return true;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidPassword = React.useMemo(() => {
    if (password === "") return false;
    if (password.includes(" ")) return true;
    if (password.length < 6 || password.length > 50) return true;
    return false;
  }, [password]);

  const handleOpenAlert = async (type: number) => {
    setError(type);
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setError(0);
        resolve();
      }, 4000);
    });
  };

  const handleRegister = async () => {
    if (isInvalidEmail || isInvalidFullName || isInvalidPassword) {
      setErrMsg("Make sure fill all required fields!");
      handleOpenAlert(1);
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data)
    console.log('link:'+``)
    setErrMsg(data.message);
    if (!data.ok) {
      setError(1);
    } else {
      setError(2);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col min-h-screen bg-[#f5f5f5] bg-[url(/bg2.jpg)] bg-cover bg-center bg-no-repeat items-center justify-center p-4 sm:p-6 md:p-10 lg:p-16">
        <div
          className={`absolute  p-2 w-full top-0 text-center shadow transition-all duration-300 ${
            error === 1
              ? "translate-y-0 bg-red-500"
              : error === 2
              ? "-translate-y-10 bg-green-500"
              : "-translate-y-10"
          }`}
        >
          <p>{errMsg}</p>
        </div>
        <div className="text-[#f5f5f5] w-full max-w-2xl flex flex-col p-4 rounded-lg shadow-2xl bg-[#252525]/20 backdrop-blur items-center justify-center py-10 ">
          <h1 className="text-2xl tracking-widest font-medium ">Register</h1>
          <p className="text-sm italic text-[#f5f5f5]/80 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, debitis.
          </p>
          <div className="flex flex-col gap-2  w-full p-2 max-w-md mt-10">
            <label htmlFor="name" className="text-sm">
              Name Surname
            </label>
            <input
              type="text"
              disabled={isLoading}
              name="name"
              id="name"
              value={fullName}
              onChange={(e: any) => {
                setFullName(e.target.value);
              }}
              className={`bg-transparent border border-[#f5f5f5] focus:border-blue-500 p-2 rounded shadow outline-none duration-200 transition-all disabled:bg-[#f5f5f5]/20 disabled:cursor-not-allowed  `}
            />
            <p
              className={`text-xs text-red-300 ${
                isInvalidFullName ? "block" : "hidden"
              } `}
            >
              Please enter a valid full name using only Latin characters.
            </p>
          </div>
          <div className="flex flex-col gap-2  w-full p-2 max-w-md">
            <label htmlFor="email" className="text-sm">
              E-mail
            </label>
            <input
              type="email"
              disabled={isLoading}
              name="email"
              id="email"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              className={`bg-transparent border border-[#f5f5f5] focus:border-blue-500 p-2 rounded shadow outline-none duration-200 transition-all disabled:bg-[#f5f5f5]/20 disabled:cursor-not-allowed  `}
            />
            <p
              className={`text-xs text-red-300 ${
                isInvalidEmail ? "block" : "hidden"
              } `}
            >
              Please enter a valid email.
            </p>
          </div>
          <div className="flex flex-col gap-2  w-full p-2 max-w-md">
            <label htmlFor="pass" className="text-sm">
              Password
            </label>
            <input
              type="password"
              disabled={isLoading}
              name="pass"
              id="pass"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              className={`bg-transparent border border-[#f5f5f5] focus:border-blue-500 p-2 rounded shadow outline-none duration-200 transition-all disabled:bg-[#f5f5f5]/20 disabled:cursor-not-allowed  `}
            />
            <p
              className={`text-xs text-red-300 ${
                isInvalidPassword ? "block" : "hidden"
              } `}
            >
              Please enter a password between 6 and 50 characters without any
              spaces.
            </p>
          </div>
          <button
            disabled={isLoading}
            onClick={handleRegister}
            className="p-3 px-5 mt-5 rounded shadow-xl bg-[#252525] text-[#f5f5f5] transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#252525] disabled:bg-[#f5f5f5]/80 disabled:text-[#252525]/80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  fill="#000000"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                  className="animate-spin"
                >
                  <g id="XMLID_11_">
                    <path
                      id="XMLID_12_"
                      d="M165,232.5c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15v-60
		C180,239.216,173.284,232.5,165,232.5z"
                    />
                    <path
                      id="XMLID_13_"
                      d="M165,7.5c-8.284,0-15,6.716-15,15v30c0,8.284,6.716,15,15,15s15-6.716,15-15v-30
		C180,14.216,173.284,7.5,165,7.5z"
                    />
                    <path
                      id="XMLID_14_"
                      d="M90,157.5c0-8.284-6.716-15-15-15H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h60
		C83.284,172.5,90,165.784,90,157.5z"
                    />
                    <path
                      id="XMLID_15_"
                      d="M315,142.5h-60c-8.284,0-15,6.716-15,15s6.716,15,15,15h60c8.284,0,15-6.716,15-15S323.284,142.5,315,142.5
		z"
                    />
                    <path
                      id="XMLID_16_"
                      d="M90.752,210.533L48.327,252.96c-5.857,5.858-5.857,15.355,0,21.213c2.929,2.929,6.768,4.393,10.607,4.393
		s7.678-1.464,10.607-4.393l42.426-42.427c5.857-5.858,5.857-15.355-0.001-21.213C106.108,204.675,96.611,204.675,90.752,210.533z"
                    />
                    <path
                      id="XMLID_17_"
                      d="M228.639,108.86c3.839,0,7.678-1.464,10.606-4.394l42.426-42.427c5.858-5.858,5.858-15.355,0-21.213
		c-5.857-5.857-15.355-5.858-21.213,0l-42.426,42.427c-5.858,5.858-5.858,15.355,0,21.213
		C220.961,107.396,224.8,108.86,228.639,108.86z"
                    />
                    <path
                      id="XMLID_18_"
                      d="M239.245,210.533c-5.856-5.857-15.355-5.858-21.213-0.001c-5.858,5.858-5.858,15.355,0,21.213
		l42.426,42.427c2.929,2.929,6.768,4.393,10.607,4.393c3.838,0,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0-21.213
		L239.245,210.533z"
                    />
                  </g>
                </svg>
              </>
            ) : (
              <span>Register</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
