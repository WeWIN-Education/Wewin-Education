/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-linear-to-br from-[#1057C1] via-[#0E4BA9] to-[#1a5fb4] text-white overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-6">
          {/* Logo & Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center lg:items-start"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-[200px] h-[70px] rounded-xl overflow-hidden mb-4
                         shadow-lg backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#0185b9] to-[#0E4BA9]" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="WeWIN Logo"
                  className="h-10 object-contain drop-shadow-lg"
                />
              </div>
            </motion.div>

            <h2 className="text-lg font-bold text-amber-300 mb-1">
              WeWIN Education
            </h2>
            <p className="text-xs text-blue-100/80 text-center lg:text-left mb-4">
              Nâng tầm tiếng Anh – Mở rộng tương lai 🌏
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {[
                {
                  href: "https://wewin.edu.vn",
                  icon: "https://img.icons8.com/fluency/48/domain.png",
                },
                {
                  href: "https://www.facebook.com/winwineducation",
                  icon: "https://img.icons8.com/color/48/facebook-new.png",
                },
                {
                  href: "https://www.tiktok.com/@wewin.education.vn",
                  icon: "https://img.icons8.com/color/48/tiktok--v1.png",
                },
                {
                  href: "https://www.youtube.com/@wewin.education",
                  icon: "https://img.icons8.com/color/48/youtube-play.png",
                },
                {
                  href: "mailto:officemanager@wewin.edu.vn",
                  icon: "https://img.icons8.com/color/48/gmail--v1.png",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg 
                           flex items-center justify-center hover:bg-white/20
                           transition-all border border-white/20"
                >
                  <img src={social.icon} alt="" className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center justify-center lg:justify-start gap-2">
              <MapPin className="w-4 h-4" />
              Thông tin liên hệ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {/* Contact Items */}
              <ContactItem
                icon={<MapPin className="w-4 h-4 text-amber-300" />}
                label="Địa chỉ"
                content="292B Nơ Trang Long, P.12, Bình Thạnh, TP.HCM"
              />

              <ContactItem
                icon={<Phone className="w-4 h-4 text-amber-300" />}
                label="Điện thoại"
                content={
                  <a
                    href="tel:0345969388"
                    className="hover:text-amber-300 transition-colors"
                  >
                    0345 969 388
                  </a>
                }
              />

              <ContactItem
                icon={<Mail className="w-4 h-4 text-amber-300" />}
                label="Email"
                content={
                  <a
                    href="mailto:officemanager@wewin.edu.vn"
                    className="hover:text-amber-300 transition-colors"
                  >
                    officemanager@wewin.edu.vn
                  </a>
                }
              />

              <ContactItem
                icon={<Globe className="w-4 h-4 text-amber-300" />}
                label="Website"
                content={
                  <a
                    href="https://wewin.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    wewin.edu.vn
                  </a>
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-4" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-blue-100/70">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-amber-300">WeWIN Education</span>.
            All rights reserved. Made with{" "}
            <span className="text-red-400">❤️</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

/* Contact Item Component */
function ContactItem({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm 
                 border border-white/10 hover:bg-white/10 transition-all"
    >
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-amber-200/80 mb-0.5">
          {label}
        </p>
        <div className="text-xs text-blue-100/90 wrap-break-word">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
