export type ClassId = "KIDS" | "GAMES" | "AUDIO" | "VIDEOS";

export const CLASS_IDS: ClassId[] = ["KIDS", "GAMES", "AUDIO", "VIDEOS"];

export const ITEM_PASSWORDS: Record<ClassId, string> = {
  KIDS: "123",
  GAMES: "asd",
  AUDIO: "123",
  VIDEOS: "123",
};

// Chi tiết các lớp học / khóa học
export const CLASS_DETAILS = {
  KIDS: {
    title: "When I Grow Up – Dream Job",
    desc: `<h2>🎯 NGUYÊN TẮC THIẾT KẾ</h2>
           <h3>✨ Đặc điểm phương pháp PBL cho trẻ mầm non</h3>
           <ul>
             <li>Học qua dự án thực tế: mỗi chủ đề là một project nhỏ với sản phẩm cụ thể.</li>
             <li>Trải nghiệm đa giác quan: nhìn, nghe, chạm, nếm, làm.</li>
           </ul>
           <h3>📦 Cấu trúc học</h3>
           <ul></ul>`,
    toc: [
      { id: "stage1", name: "Giai đoạn 1", projects: [] },
      { id: "stage2", name: "Giai đoạn 2", projects: [] },
    ],
  },
  GAMES: {
    title: "WeWIN – Games Learning Center",
    desc: `<p>Chơi games theo từng chủ đề để ôn từ vựng, câu mẫu, phản xạ nhanh.</p>`,
    toc: [
      { id: "stage1", name: "Giai đoạn 1", projects: [] },
    ],
  },
  AUDIO: {
    title: "AUDIO",
    desc: "",
    toc: [],
  },
  VIDEOS: {
    title: "VIDEOS",
    desc: "",
    toc: [],
  },
};

// Lấy chi tiết class theo id
export function getClassDetail(classId: ClassId) {
  return CLASS_DETAILS[classId];
}

// Lấy dữ liệu cho sidebar (toc) theo class
export function getSidebarData(classId: ClassId) {
  return CLASS_DETAILS[classId].toc || [];
}
