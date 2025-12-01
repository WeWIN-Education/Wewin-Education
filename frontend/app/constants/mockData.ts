import { Book, Project, LearningNode, LessonBlock } from "./types";

export const mockBooks: Book[] = [
  {
    id: "book_kids",
    name: "KIDS - When I Grow Up",
    status: "active",
    description: "KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN",
  },

  {
    id: "book_kids_2",
    name: "STARTERS FOUNDATION - When I Grow Up",
    status: "active",
    description: "KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN",
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    bookId: "book_kids",
    name: 'PROJECT 1: "MY FUTURE CAREER FAIR"',
    description: "Giai đoạn 1: Tháng 11–12 (Khám phá nghề nghiệp & thiên nhiên)",
    order: 1,
  },
  {
    id: "proj2",
    bookId: "book_kids_2",
    name: 'PROJECT 1: "MY FUTURE"',
    description: "Giai đoạn 1: Tháng 11–12 (Khám phá nghề nghiệp & thiên nhiên)",
    order: 1,
  },
];

export const mockLearningNodes: LearningNode[] = [
  {
    id: "w1",
    projectId: "proj1",
    title: "Tuần 1 – Dream Job – Play • Speak • Pronounce",
    type: "week",
    order: 1,
  },
  {
    id: "w2",
    projectId: "proj1",
    title: "Tuần 2 – Mini Career Fair – My Dream Job Presentation",
    type: "week",
    order: 2,
  },

  {
    id: "w1_1",
    projectId: "proj2",
    title: "Tuần 1 – Dream Job – Play • Speak • Pronounce",
    type: "week",
    order: 1,
  },
  {
    id: "w1_2",
    projectId: "proj2",
    title: "Tuần 2 – Mini Career Fair – My Dream Job Presentation",
    type: "week",
    order: 2,
  },
];

export const mockLessonContents: LessonBlock[] = [
  {
    id: "p1_w1_objectives",
    learningNodeId: "w1",
    title: "🎯 MỤC TIÊU MỞ RỘNG",
    type: "list",
    order: 1,
    data: [
      "Phát triển nghe – nói – phát âm chuẩn.",
      "Luyện mẫu câu giao tiếp cơ bản.",
      "Giúp học sinh tự giới thiệu nghề.",
    ],
  },

  {
    id: "p1_w1_pronunciation",
    learningNodeId: "w1",
    title: "🔊 PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 2,
    data: [
      "Âm /tʃ/ – teacher, child, chair",
      "Âm /d/ – doctor, dog, doll",
      "Âm /p/ – pilot, policeman",
      "Âm /f/ – farmer, fireman",
    ],
  },

  {
    id: "p1_w1_song",
    learningNodeId: "w1",
    title: "🎵 SONG / CHANT",
    type: "audio",
    order: 5,
    data: { url: "https://wewin.edu.vn/wp/audio/song.mp3" },
  },

  {
    id: "p2_w1_objectives",
    learningNodeId: "w1",
    title: "🎯 MỤC TIÊU MỞ RỘNG",
    type: "list",
    order: 1,
    data: [
      "Phát triển nghe – nói – phát âm chuẩn.",
      "Luyện mẫu câu giao tiếp cơ bản.",
      "Giúp học sinh tự giới thiệu nghề.",
    ],
  },

  {
    id: "p2_w1_pronunciation",
    learningNodeId: "w1",
    title: "🔊 PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 2,
    data: [
      "Âm /tʃ/ – teacher, child, chair",
      "Âm /d/ – doctor, dog, doll",
      "Âm /p/ – pilot, policeman",
      "Âm /f/ – farmer, fireman",
    ],
  },

  {
    id: "p2_w1_song",
    learningNodeId: "w1",
    title: "🎵 SONG / CHANT",
    type: "audio",
    order: 5,
    data: { url: "https://wewin.edu.vn/wp/audio/song.mp3" },
  },
];
