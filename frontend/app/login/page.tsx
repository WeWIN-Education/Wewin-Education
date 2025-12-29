"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Routes } from "../../lib/constants/routes";
import { BookOpen, Eye, EyeOff, Target, Trophy } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      text: "Truy cập hàng nghìn học liệu chất lượng",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      text: "Theo dõi tiến độ học tập cá nhân",
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      text: "Tham gia cộng đồng học viên năng động",
    },
  ];

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
      callbackUrl: Routes.HOME,
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
    <div className="fixed inset-0 flex h-screen w-screen overflow-hidden font-[Lexend] z-9999 text-black">
      {/* LEFT SIDE (UI mẫu) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-[60%] relative bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 items-center justify-center overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Logo + Text */}
        <div className="relative z-10 px-16 max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="mb-12">
              <img
                src="/logo.png"
                alt="WeWIN Education Logo"
                className="h-20 md:h-24 mb-8 filter brightness-0 invert"
              />
            </div>

            <h1 className="text-5xl font-black text-white mb-6 leading-tight">
              Chào mừng trở lại!
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Đăng nhập để tiếp tục hành trình học tập cùng WeWIN Education
            </p>

            <div className="space-y-4 mt-12">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-4 text-white/90"
                >
                  {item.icon}
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE (Form + Logic NextAuth) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          w-full lg:w-[40%] 
          bg-white flex items-center justify-center 
          p-6 sm:p-8 lg:p-16 
          overflow-y-auto
          relative
        "
      >
        {/* MOBILE BACKGROUND DECORATION */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute -top-10 -right-20 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute bottom-[-60px] -left-20 w-72 h-72 rounded-full bg-cyan-200/40 blur-3xl" />
        </div>

        <div
          className="
            w-full max-w-md 
            relative z-10 
            bg-white/80 backdrop-blur-xl
            rounded-[28px] shadow-xl 
            px-6 py-10 sm:px-8
            border border-white/50
          "
        >
          {/* MOBILE HEADER — NEW! */}
          <div className="lg:hidden mb-10 text-center">
            {/* Title */}
            <h1 className="text-2xl font-extrabold text-[#0E4BA9] mt-4">
              WeWIN Education
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm mt-1">
              Học liệu – Hành trình – Thành công
            </p>
          </div>

          {/* DESKTOP TITLE */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-600">Nhập thông tin tài khoản của bạn</p>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onKeyPress={handleKeyPress}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@wewin.edu.vn"
                className="
            w-full px-4 py-3.5 
            border-2 border-gray-200 rounded-xl 
            focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
            transition outline-none
            shadow-sm
          "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
              w-full px-4 py-3.5 
              border-2 border-gray-200 rounded-xl 
              focus:border-blue-500 focus:ring-4 focus:ring-blue-100
              transition outline-none
              shadow-sm
            "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right -mt-2">
              <button
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Error */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
            bg-red-50 text-red-600 text-sm 
            px-4 py-3 rounded-xl 
            border border-red-100 flex items-center gap-2
          "
              >
                {errorMessage}
              </motion.div>
            )}

            {/* LOGIN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCredentialsLogin}
              disabled={isLoading}
              className="
                w-full py-4 rounded-xl font-semibold 
                bg-linear-to-r from-[#0E4BA9] to-[#00A6FB]
                text-white shadow-lg shadow-blue-500/30
                mt-2
                disabled:opacity-50
              "
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.button>
          </motion.div>

          {/* FOOTER */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-400 mt-10"
          >
            © 2025 WeWIN Education. All Rights Reserved.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
