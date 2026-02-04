import type { ClassDetail, ClassId } from "./types";

export const CLASS_DETAILS: Record<ClassId, ClassDetail> = {
  KIDS: {
    title: "When I Grow Up – Dream Job",
    learningTitle: "Learning Plan – Projects & Weeks",

    overview: [
      {
        id: "design",
        icon: "",
        title: "NGUYÊN TẮC THIẾT KẾ",
      },
      {
        id: "pbl",
        icon: "",
        title: "Đặc điểm phương pháp PBL cho trẻ mầm non",
        items: [
          "Học qua dự án thực tế: mỗi chủ đề là một project nhỏ với sản phẩm cụ thể.",
          "Trải nghiệm đa giác quan: nhìn, nghe, chạm, nếm, làm.",
        ],
      },
      {
        id: "structure",
        icon: "",
        title: "Cấu trúc học",
        items: [
          "Tuần 1: Giới thiệu project + Khám phá.",
          "Tuần 2: Thực hành + Tạo sản phẩm.",
          "Sau 3 tháng: Bài ôn tập tổng hợp.",
        ],
      },
    ],
  },

  SYLLABUS_IELTS: {
    title: "SYLLABUS IELTS",
    learningTitle: "SYLLABUS IELTS",

    overview: [
      {
        id: "design",
        icon: "",
        title: "Tổng Quan Khóa Học",
      },
      {
        id: "pbl",
        icon: "",
        title: "Cấu trúc tổng thể khóa học",
        items: [
          "Tổng số buổi: 80 buổi (40 tuần, 2 buổi/tuần)",
          "Thời lượng mỗi buổi: 120 phút",
          "Phân bổ thời gian: 90 phút Giáo viên chính + 30 phút Trợ giảng",
          "Giai đoạn Foundation: 30 buổi (Mindset 0: 15 buổi + Mindset 1: 15 buổi)",
          "Giai đoạn Intensive: 50 buổi (Expert 5: 24 buổi + Expert 6: 24 buổi + Cambridge 19,20: 2 buổi)",
        ],
      },
      {
        id: "structure",
        icon: "",
        title: "Mục tiêu từng giai đoạn",
        items: [
          "Foundation (30 buổi): Band 0-3.5 → 3.5-4.5",
          "Intensive (50 buổi): Band 3.5-4.5 → 5-5-6.5",
        ],
      },
    ],
  },

  STARTERS: { title: "Starters Book", learningTitle: "Starters Learning Plan", overview: [] },
  MOVERS: { title: "Movers Book", learningTitle: "Movers Learning Plan", overview: [] },
  FLYERS: { title: "Flyers Book", learningTitle: "Flyers Learning Plan", overview: [] },
  
  AUDIO: { title: "Audio Library", learningTitle: "Audio Lessons", overview: [] },
  VIDEOS: { title: "Video Library", learningTitle: "Video Lessons", overview: [] },
};

export function getClassDetail(classId: ClassId): ClassDetail {
  return CLASS_DETAILS[classId];
}
