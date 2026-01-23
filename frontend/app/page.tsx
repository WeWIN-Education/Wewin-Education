"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { BookOpen, LineChart, Headphones } from "lucide-react";


const slides = [
  {
    title: "Lộ trình học thông minh",
    subtitle: "Cá nhân hoá theo trình độ – mục tiêu – thời gian học.",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Tài liệu chuẩn Cambridge",
    subtitle: "Starters – Movers – Flyers – IELTS, bám sát khung CEFR.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Môi trường học tập tương tác",
    subtitle: "Video, audio, games & dự án giúp học sinh chủ động sử dụng tiếng Anh.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F3F6FF]">
      {/* ========================================================= */}
      {/* HERO: WeWIN WORLD */}
      {/* ========================================================= */}
      <section className="relative bg-linear-to-b from-[#0E4BA9] via-[#0E4BA9] to-[#00A6FB] text-white overflow-hidden">
        {/* light pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 0 0, rgba(255,255,255,0.6), transparent 55%), radial-gradient(circle at 100% 0, rgba(255,255,255,0.35), transparent 55%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32 grid gap-10 md:grid-cols-2 items-center">
          {/* LEFT: copy */}
          <div>
            <p className="uppercase tracking-[0.2em] text-sm mb-4 text-white/70">
              ENGLISH LEARNING SYSTEM
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              WeWIN Education
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              Nền tảng học tiếng Anh hiện đại – chuẩn Ed-Tech, kết nối lớp học, tài
              nguyên và báo cáo tiến độ vào một hệ sinh thái duy nhất cho học sinh,
              giáo viên và phụ huynh.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 rounded-full bg-white text-[#0E4BA9] font-semibold shadow-lg shadow-black/10 hover:-translate-y-0.5 transition-transform">
                Bắt đầu lộ trình học
              </button>
              <button className="px-6 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10 transition-colors">
                Xem tài nguyên học tập
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm md:text-base">
              <Stat label="Khoá học" value="Kids → IELTS" />
              <Stat label="Tài nguyên số" value="+500" />
              <Stat label="Hệ thống báo cáo" value="Real-time" />
            </div>
          </div>

          {/* RIGHT: “classroom” card */}
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-6 bg-white/10 blur-2xl rounded-3xl" />
              <div className="relative bg-white/10 border border-white/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                <p className="text-sm font-semibold tracking-wide text-white/80 mb-3">
                  MÔI TRƯỜNG HỌC TIẾNG ANH WEWIN
                </p>
                <p className="text-sm text-white/90 mb-6 leading-relaxed">
                  Lộ trình theo tuần, bài học theo dự án, đánh giá kỹ năng 4L –
                  tất cả hiển thị trên một dashboard trực quan.
                </p>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    <span>Kids &amp; Teens: chương trình thiết kế riêng cho học sinh Việt Nam.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Thi thử IELTS, Cambridge Placement, báo cáo chi tiết cho từng bạn.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                    <span>Kết nối giáo viên – phụ huynh – học sinh qua hệ thống theo dõi tiến độ.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CAROUSEL: EXPERIENCE */}
      {/* ========================================================= */}
      <section className="relative max-w-5xl mx-auto px-6 -mt-20 pb-10">
        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-white/70">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2800 }}
            loop
            className="w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <div className="relative w-full h-90 md:h-105">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-10 text-white">
                    <p className="text-sm uppercase tracking-[0.15em] mb-2 text-white/80">
                      LEARNING EXPERIENCE
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {slide.title}
                    </h2>
                    <p className="max-w-xl text-sm md:text-base text-white/90">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURE BLOCKS */}
      {/* ========================================================= */}
      <section className="bg-white py-16 md:py-20 border-t border-[#E0E7FF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#0E4BA9] mb-3">
              WEWIN LEARNING SYSTEM
            </p>
            <h2 className="text-3xl font-bold text-[#0E4BA9] mb-3">
              Hệ sinh thái học tập tiếng Anh WeWIN
            </h2>
            <p className="text-[#4B5C99] max-w-2xl mx-auto">
              Từ lớp học, tài nguyên số đến báo cáo kết quả – mọi thứ được kết nối
              trong một không gian trực quan, dễ sử dụng cho cả giáo viên, học sinh
              và phụ huynh.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="w-7 h-7" />}
              title="Giáo trình chuẩn quốc tế"
              description="Cambridge – Oxford – Pearson, được số hoá thành các node học theo tuần, dự án và kỹ năng."
            />
            <FeatureCard
              icon={<LineChart className="w-7 h-7" />}
              title="Công nghệ theo dõi tiến độ"
              description="Dashboard theo tuần/tháng, KPI từng học viên, báo cáo gửi tự động cho phụ huynh và quản lý."
            />
            <FeatureCard
              icon={<Headphones className="w-7 h-7" />}
              title="Tương tác đa phương tiện"
              description="Video, audio, mini-games, bài luyện kỹ năng Listening – Speaking – Reading – Writing."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================== */
/* SMALL COMPONENTS               */
/* ============================== */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/30 px-4 py-3 backdrop-blur-md">
      <p className="text-xs text-white/70 mb-1">{label}</p>
      <p className="text-sm md:text-base font-semibold">{value}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-full rounded-3xl bg-linear-to-br from-[#F3F7FF] to-[#E4F1FF] border border-[#D2E3FF] shadow-md hover:shadow-xl transition-all overflow-hidden">
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#0E4BA9]/5 group-hover:bg-[#0E4BA9]/10 transition-colors" />
      <div className="relative p-7 flex flex-col gap-4">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white shadow-sm border border-[#D2E3FF] text-[#0E4BA9]">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-[#0E4BA9]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#4B5C99]">{description}</p>
      </div>
    </div>
  );
}
