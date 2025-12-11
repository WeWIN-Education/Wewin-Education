"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Routes } from "../constants/routes";
import { FloatingInput } from "../components/floatingInput";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(Routes.HOME);
    }
  }, [status]);

  const handleCredentialsLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/", // <----- PHẢI CÓ
    });

    setIsLoading(false);

    if (res?.error) {
      setErrorMessage("Sai email hoặc mật khẩu!");
    } else {
      router.push(Routes.HOME);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleCredentialsLogin();
    }
  };

  return (
    <div className="min-h-[calc(90vh-80px)] bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 font-[Lexend]">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative bg-white/90 backdrop-blur-xl 
          px-8 sm:px-10 py-10 sm:py-12 
          rounded-3xl shadow-2xl 
          w-full max-w-lg 
          border border-white/20
        "
      >
        {/* Logo + Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 text-center"
        >
          <h1 className="md:text-3xl text-2xl font-black mb-2 text-[#E4C28E]">
            WeWIN Education App
          </h1>
          <p className="text-[#0E4BA9] text-sm">
            Đăng nhập để truy cập học liệu
          </p>
        </motion.div>

        {/* Form Inputs */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-6"
        >
          {/* Email */}
          <FloatingInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {/* Password */}
          <FloatingInput
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {/* ⭐ NÚT QUÊN MẬT KHẨU — đây là phần cậu cần */}
          <div className="text-right -mt-2">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMessage}
            </motion.div>
          )}

          {/* Login button */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(14, 75, 169, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCredentialsLogin}
            disabled={isLoading}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Đăng nhập
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          © {new Date().getFullYear()} WeWIN Education. All Rights Reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
