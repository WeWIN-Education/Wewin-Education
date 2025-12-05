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

  STARTERS_FOUNDATION: {
    title: "Starters Foundation When I Grow Up – Dream Job",
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

  STARTERS: { title: "Starters Book", learningTitle: "Starters Learning Plan", overview: [] },
  MOVERS: { title: "Movers Book", learningTitle: "Movers Learning Plan", overview: [] },
  FLYERS: { title: "Flyers Book", learningTitle: "Flyers Learning Plan", overview: [] },
  
  AUDIO: { title: "Audio Library", learningTitle: "Audio Lessons", overview: [] },
  VIDEOS: { title: "Video Library", learningTitle: "Video Lessons", overview: [] },
};

export function getClassDetail(classId: ClassId): ClassDetail {
  return CLASS_DETAILS[classId];
}
