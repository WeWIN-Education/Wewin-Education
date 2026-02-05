import { Book, Project, LearningNode, LessonBlock } from "./types";

export const mockBooks: Book[] = [
  {
    id: "book_kids",
    name: "KIDS",
    status: "active",
    imgUrl:
      "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN",
    gameUrl: "/resources/kids/Games",
  },

  {
    id: "book_syllabus_ielts",
    name: "SYLLABUS IELTS",
    status: "active",
    imgUrl:
      "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "KẾ HOẠCH HỌC TIẾNG ANH WEWIN SYLLABUS IELTS",
    gameUrl: "",
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj_1",
    bookId: "book_syllabus_ielts",
    name: `GIAI ĐOẠN 1: FOUNDATION - MINDSET FOUNDATION (Buổi 1-15)`,
    description: "",
    order: 1,
  },

   {
    id: "proj_2",
    bookId: "book_syllabus_ielts",
    name: `GIAI ĐOẠN 2: FOUNDATION - MINDSET 1 (Buổi 16-30)`,
    description: "",
    order: 2,
  },


  {
    id: "proj_3",
    bookId: "book_syllabus_ielts",
    name: `GIAI ĐOẠN 3: INTENSIVE - EXPERT IELTS 5 (Buổi 31-54)`,
    description: `Cambridge Listening Distribution (Part 1-2):
●	Buổi 31-34: Cambridge 12 Tests 1-4 (Part 1-2)
●	Buổi 35-38: Cambridge 13 Tests 1-4 (Part 1-2)
●	Buổi 39-42: Cambridge 14 Tests 1-4 (Part 1-2)
●	Buổi 43-46: Cambridge 15 Tests 1-4 (Part 1-2)
●	Buổi 47-50: Cambridge 16 Tests 1-4 (Part 1-2)
●	Buổi 51-54: Cambridge 17 Tests 1-4 (Part 1-2)
  `,
    order: 3,
  },

  {
    id: "proj_4",
    bookId: "book_syllabus_ielts",
    name: `GIAI ĐOẠN 4: INTENSIVE - EXPERT IELTS 6 + WRITING WORKSHOP (Buổi 55-78)`,
    description: "",
    order: 4,
  },

  {
    id: "proj_5",
    bookId: "book_syllabus_ielts",
    name: `GIAI ĐOẠN 5: CAMBRIDGE 19-20 PRACTICE (Buổi 79-80)`,
    description: "",
    order: 5,
  },

  ///////////// KIDS /////////////////

  {
    id: "proj1",
    bookId: "book_kids",
    name: 'PROJECT 1: "MY FUTURE CAREER FAIR"',
    description:
      "Giai đoạn 1: Tháng 11–12 (Khám phá nghề nghiệp & thiên nhiên)",
    order: 1,
  },
  {
    id: "proj2",
    bookId: "book_kids",
    name: 'PROJECT 2: "I\'M A STAR PERFORMER" (Tôi là ngôi sao)',
    description: "Chủ đề: WeWIN’s Got Talent – My Dream Talent Show",
    order: 1,
  },
  {
    id: "proj3",
    bookId: "book_kids",
    name: 'PROJECT 3: "BIRD WATCHING ADVENTURE"',
    description: "Chủ đề: My Bird Book – Discovering Birds Around Us",
    order: 3,
  },
  {
    id: "proj4",
    bookId: "book_kids",
    name: 'PROJECT 4: "CHRISTMAS PARTY MINI"',
    description: "Chủ đề: Mini Christmas Party – A Warm and Merry Celebration!",
    order: 4,
  },
  {
    id: "proj5",
    bookId: "book_kids",
    name: 'PROJECT 5: "TET FESTIVAL ORGANIZER"',
    description:
      "Chủ đề: Tết Corner & Zodiac Weeks – Celebrate Vietnamese New Year in English!",
    order: 5,
  },
  {
    id: "proj6",
    bookId: "book_kids",
    name: 'PROJECT 6: "FLOWER SHOP OWNER"',
    description: "Chủ đề: Mini Flower Shop – Bloom with English!",
    order: 6,
  },
  {
    id: "proj6_review",
    bookId: "book_kids",
    name: "BÀI ÔN TẬP",
    description: "Chủ đề: Review",
    order: 6,
  },
  {
    id: "proj7",
    bookId: "book_kids",
    name: 'PROJECT 7: "INSECT EXPLORER" (Nhà thám hiểm côn trùng)',
    description:
      "Chủ đề: Bug Hotel & Insect Journal – Exploring the Tiny World!",
    order: 7,
  },
  {
    id: "proj8",
    bookId: "book_kids",
    name: 'PROJECT 8: "HUNGRY CATERPILLAR\'S FOOD DIARY"',
    description:
      "Chủ đề: What I Eat in a Week – Inspired by The Very Hungry Caterpillar",
    order: 8,
  },
  {
    id: "proj9",
    bookId: "book_kids",
    name: 'PROJECT 9: "FARM DAY ORGANIZER"',
    description: "Chủ đề: Farm Day & Animal Puppets – Life on the Farm!",
    order: 9,
  },
  {
    id: "proj10",
    bookId: "book_kids",
    name: 'PROJECT 10: "CITY TRANSPORT MAP MAKER"',
    description: "Chủ đề: My City Map – Transportation Around the City",
    order: 10,
  },
  {
    id: "proj11",
    bookId: "book_kids",
    name: 'PROJECT 11: "FAST FOOD RESTAURANT OWNER"',
    description: "Chủ đề: WeWIN Fast Food Day – Eat & Speak English!",
    order: 11,
  },
  {
    id: "proj11_review",
    bookId: "book_kids",
    name: 'REVIEW: "SPRING ADVENTURE REVIEW"',
    description: "Chủ đề: Spring Festival Review – Learn, Play, Celebrate!",
    order: 11.5,
  },
  {
    id: "proj12",
    bookId: "book_kids",
    name: 'PROJECT 12: "OCEAN EXPLORER"',
    description:
      "Chủ đề: Underwater World – Explore sea animals and beach life.",
    order: 12,
  },
  {
    id: "proj13",
    bookId: "book_kids",
    name: 'PROJECT 13: "NATURE PHOTOGRAPHER"',
    description:
      "Chủ đề: Nature Photo Album – Explore landforms and nature elements.",
    order: 13,
  },

  {
    id: "proj14",
    bookId: "book_kids",
    name: `PROJECT 14: "SWEET SHOP OWNER"`,
    description: "Chủ đề: Candy Shop – Sweets & Desserts",
    order: 14,
  },
  {
    id: "proj15",
    bookId: "book_kids",
    name: `PROJECT 15: "BACK TO SCHOOL ORGANIZER"`,
    description:
      "Chủ đề: School objects – organization – classroom communication",
    order: 15,
  },
  {
    id: "proj16",
    bookId: "book_kids",
    name: `PROJECT 16: "MID-AUTUMN FESTIVAL PLANNER"`,
    description:
      "Chủ đề: Mid-Autumn Festival – lanterns – mooncakes – storytelling – celebration",
    order: 16,
  },
  {
    id: "proj17",
    bookId: "book_kids",
    name: `PROJECT 17: "MY BODY BOOK"`,
    description:
      "Chủ đề: Body parts – five senses – clothes – personal description",
    order: 17,
  },
  {
    id: "proj_final",
    bookId: "book_kids",
    name: `YEAR-END REVIEW: "WEWIN GRADUATION PARTY"`,
    description: "Chủ đề: Final review – exhibition – awards – celebration",
    order: 18,
  },
];

export const mockLearningNodes: LearningNode[] = [

  ////////////////// IELTS //////////////////////
  ////////////////// IELTS PART 1 //////////////////////
  {
    id: "wsi_1",
    projectId: "proj_1",
    title: "Buổi 1",
    type: "week",
    order: 1,
  },

  {
    id: "wsi_2",
    projectId: "proj_1",
    title: "Buổi 2",
    type: "week",
    order: 2,
  },

  {
    id: "wsi_3",
    projectId: "proj_1",
    title: "Buổi 3",
    type: "week",
    order: 3,
  },

  {
    id: "wsi_4",
    projectId: "proj_1",
    title: "Buổi 4",
    type: "week",
    order: 4,
  },

  {
    id: "wsi_5",
    projectId: "proj_1",
    title: "Buổi 5",
    type: "week",
    order: 5,
  },

  {
    id: "wsi_6",
    projectId: "proj_1",
    title: "Buổi 6",
    type: "week",
    order: 6,
  },

  {
  id: "wsi_7",
  projectId: "proj_1",
  title: "Buổi 7",
  type: "week",
  order: 7,
},
{
  id: "wsi_8",
  projectId: "proj_1",
  title: "Buổi 8",
  type: "week",
  order: 8,
},
{
  id: "wsi_9",
  projectId: "proj_1",
  title: "Buổi 9",
  type: "week",
  order: 9,
},
{
  id: "wsi_10",
  projectId: "proj_1",
  title: "Buổi 10",
  type: "week",
  order: 10,
},
{
  id: "wsi_11",
  projectId: "proj_1",
  title: "Buổi 11",
  type: "week",
  order: 11,
},
{
  id: "wsi_12",
  projectId: "proj_1",
  title: "Buổi 12",
  type: "week",
  order: 12,
},
{
  id: "wsi_13",
  projectId: "proj_1",
  title: "Buổi 13",
  type: "week",
  order: 13,
},
{
  id: "wsi_14",
  projectId: "proj_1",
  title: "Buổi 14",
  type: "week",
  order: 14,
},
{
  id: "wsi_15",
  projectId: "proj_1",
  title: "Buổi 15",
  type: "week",
  order: 15,
},

  
///////////////// PART 2 IELTS //////////////////////
  {
  id: "wsi_16",
  projectId: "proj_2",
  title: "Buổi 16",
  type: "week",
  order: 16,
},
{
  id: "wsi_17",
  projectId: "proj_2",
  title: "Buổi 17",
  type: "week",
  order: 17,
},
{
  id: "wsi_18",
  projectId: "proj_2",
  title: "Buổi 18",
  type: "week",
  order: 18,
},
{
  id: "wsi_19",
  projectId: "proj_2",
  title: "Buổi 19",
  type: "week",
  order: 19,
},
{
  id: "wsi_20",
  projectId: "proj_2",
  title: "Buổi 20",
  type: "week",
  order: 20,
},
{
  id: "wsi_21",
  projectId: "proj_2",
  title: "Buổi 21",
  type: "week",
  order: 21,
},
{
  id: "wsi_22",
  projectId: "proj_2",
  title: "Buổi 22",
  type: "week",
  order: 22,
},
{
  id: "wsi_23",
  projectId: "proj_2",
  title: "Buổi 23",
  type: "week",
  order: 23,
},
{
  id: "wsi_24",
  projectId: "proj_2",
  title: "Buổi 24",
  type: "week",
  order: 24,
},
{
  id: "wsi_25",
  projectId: "proj_2",
  title: "Buổi 25",
  type: "week",
  order: 25,
},

{
  id: "wsi_26",
  projectId: "proj_2",
  title: "Buổi 26",
  type: "week",
  order: 26,
},
{
  id: "wsi_27",
  projectId: "proj_2",
  title: "Buổi 27",
  type: "week",
  order: 27,
},
{
  id: "wsi_28",
  projectId: "proj_2",
  title: "Buổi 28",
  type: "week",
  order: 28,
},
{
  id: "wsi_29",
  projectId: "proj_2",
  title: "Buổi 29",
  type: "week",
  order: 29,
},
{
  id: "wsi_30",
  projectId: "proj_2",
  title: "Buổi 30",
  type: "week",
  order: 30,
},




//////////////GIAI ĐOẠN 3: INTENSIVE - EXPERT IELTS 5 (Buổi 31-54)/////////////////////
{
  id: "wsi_31",
  projectId: "proj_3",
  title: "Buổi 31",
  type: "week",
  order: 31,
},
{
  id: "wsi_32",
  projectId: "proj_3",
  title: "Buổi 32",
  type: "week",
  order: 32,
},
{
  id: "wsi_33",
  projectId: "proj_3",
  title: "Buổi 33",
  type: "week",
  order: 33,
},
{
  id: "wsi_34",
  projectId: "proj_3",
  title: "Buổi 34",
  type: "week",
  order: 34,
},
{
  id: "wsi_35",
  projectId: "proj_3",
  title: "Buổi 35",
  type: "week",
  order: 35,
},
{
  id: "wsi_36",
  projectId: "proj_3",
  title: "Buổi 36",
  type: "week",
  order: 36,
},
{
  id: "wsi_37",
  projectId: "proj_3",
  title: "Buổi 37",
  type: "week",
  order: 37,
},
{
  id: "wsi_38",
  projectId: "proj_3",
  title: "Buổi 38",
  type: "week",
  order: 38,
},
{
  id: "wsi_39",
  projectId: "proj_3",
  title: "Buổi 39",
  type: "week",
  order: 39,
},
{
  id: "wsi_40",
  projectId: "proj_3",
  title: "Buổi 40",
  type: "week",
  order: 40,
},
{
  id: "wsi_41",
  projectId: "proj_3",
  title: "Buổi 41",
  type: "week",
  order: 41,
},
{
  id: "wsi_42",
  projectId: "proj_3",
  title: "Buổi 42",
  type: "week",
  order: 42,
},
{
  id: "wsi_43",
  projectId: "proj_3",
  title: "Buổi 43",
  type: "week",
  order: 43,
},
{
  id: "wsi_44",
  projectId: "proj_3",
  title: "Buổi 44",
  type: "week",
  order: 44,
},
{
  id: "wsi_45",
  projectId: "proj_3",
  title: "Buổi 45",
  type: "week",
  order: 45,
},
{
  id: "wsi_46",
  projectId: "proj_3",
  title: "Buổi 46",
  type: "week",
  order: 46,
},
{
  id: "wsi_47",
  projectId: "proj_3",
  title: "Buổi 47",
  type: "week",
  order: 47,
},
{
  id: "wsi_48",
  projectId: "proj_3",
  title: "Buổi 48",
  type: "week",
  order: 48,
},
{
  id: "wsi_49",
  projectId: "proj_3",
  title: "Buổi 49",
  type: "week",
  order: 49,
},
{
  id: "wsi_50",
  projectId: "proj_3",
  title: "Buổi 50",
  type: "week",
  order: 50,
},
{
  id: "wsi_51",
  projectId: "proj_3",
  title: "Buổi 51",
  type: "week",
  order: 51,
},
{
  id: "wsi_52",
  projectId: "proj_3",
  title: "Buổi 52",
  type: "week",
  order: 52,
},
{
  id: "wsi_53",
  projectId: "proj_3",
  title: "Buổi 53",
  type: "week",
  order: 53,
},
{
  id: "wsi_54",
  projectId: "proj_3",
  title: "Buổi 54",
  type: "week",
  order: 54,
},

///////////////GIAI ĐOẠN 4: INTENSIVE - EXPERT IELTS 6 + WRITING WORKSHOP (Buổi 55-78)/////////////////////
{
  id: "wsi_55",
  projectId: "proj_4",
  title: "Buổi 55",
  type: "week",
  order: 55,
},
{
  id: "wsi_56",
  projectId: "proj_4",
  title: "Buổi 56",
  type: "week",
  order: 56,
},
{
  id: "wsi_57",
  projectId: "proj_4",
  title: "Buổi 57",
  type: "week",
  order: 57,
},
{
  id: "wsi_58",
  projectId: "proj_4",
  title: "Buổi 58",
  type: "week",
  order: 58,
},
{
  id: "wsi_59",
  projectId: "proj_4",
  title: "Buổi 59",
  type: "week",
  order: 59,
},
{
  id: "wsi_60",
  projectId: "proj_4",
  title: "Buổi 60",
  type: "week",
  order: 60,
},
{
  id: "wsi_61",
  projectId: "proj_4",
  title: "Buổi 61",
  type: "week",
  order: 61,
},
{
  id: "wsi_62",
  projectId: "proj_4",
  title: "Buổi 62",
  type: "week",
  order: 62,
},
{
  id: "wsi_63",
  projectId: "proj_4",
  title: "Buổi 63",
  type: "week",
  order: 63,
},
{
  id: "wsi_64",
  projectId: "proj_4",
  title: "Buổi 64",
  type: "week",
  order: 64,
},
{
  id: "wsi_65",
  projectId: "proj_4",
  title: "Buổi 65",
  type: "week",
  order: 65,
},
{
  id: "wsi_66",
  projectId: "proj_4",
  title: "Buổi 66",
  type: "week",
  order: 66,
},
{
  id: "wsi_67",
  projectId: "proj_4",
  title: "Buổi 67",
  type: "week",
  order: 67,
},
{
  id: "wsi_68",
  projectId: "proj_4",
  title: "Buổi 68",
  type: "week",
  order: 68,
},
{
  id: "wsi_69",
  projectId: "proj_4",
  title: "Buổi 69",
  type: "week",
  order: 69,
},
{
  id: "wsi_70",
  projectId: "proj_4",
  title: "Buổi 70",
  type: "week",
  order: 70,
},
{
  id: "wsi_71",
  projectId: "proj_4",
  title: "Buổi 71",
  type: "week",
  order: 71,
},
{
  id: "wsi_72",
  projectId: "proj_4",
  title: "Buổi 72",
  type: "week",
  order: 72,
},
{
  id: "wsi_73",
  projectId: "proj_4",
  title: "Buổi 73",
  type: "week",
  order: 73,
},
{
  id: "wsi_74",
  projectId: "proj_4",
  title: "Buổi 74",
  type: "week",
  order: 74,
},
{
  id: "wsi_75",
  projectId: "proj_4",
  title: "Buổi 75",
  type: "week",
  order: 75,
},
{
  id: "wsi_76",
  projectId: "proj_4",
  title: "Buổi 76",
  type: "week",
  order: 76,
},
{
  id: "wsi_77",
  projectId: "proj_4",
  title: "Buổi 77",
  type: "week",
  order: 77,
},
{
  id: "wsi_78",
  projectId: "proj_4",
  title: "Buổi 78",
  type: "week",
  order: 78,
},
//////////////GIAI ĐOẠN 5: CAMBRIDGE 19-20 PRACTICE (Buổi 79-80)/////////////////////
{
  id: "wsi_79",
  projectId: "proj_5",
  title: "Buổi 79",
  type: "week",
  order: 79,
},
{
  id: "wsi_80",
  projectId: "proj_5",
  title: "Buổi 80",
  type: "week",
  order: 80,
},


/////////////////// KIDS //////////////////////
  {
    id: "w1",
    projectId: "proj1",
    title: "Tuần 1 – Dream Job – Play • Speak • Pronounce",
    type: "week",
    order: 1,
  },
  {
    id: "w1_2",
    projectId: "proj1",
    title: "Tuần 2 – Mini Career Fair – My Dream Job Presentation",
    type: "week",
    order: 2,
  },
  {
    id: "w2",
    projectId: "proj2",
    title: "Tuần 3–4 – WeWIN’s Got Talent – My Dream Talent Show",
    type: "week",
    order: 1,
  },
  {
    id: "w3",
    projectId: "proj3",
    title: "Tuần 5–6 – Bird Watching Adventure",
    type: "week",
    order: 1,
  },

  {
    id: "w4",
    projectId: "proj4",
    title: "Tuần 7–8 – Mini Christmas Party",
    type: "week",
    order: 1,
  },
  {
    id: "w5",
    projectId: "proj5",
    title:
      "GIAI ĐOẠN 2: THÁNG 1-2/2026 (Tết Nguyên Đán - Văn hóa Việt Nam), Tuần 9–12 – Tết Corner & Zodiac Weeks",
    type: "week",
    order: 1,
  },
  {
    id: "w6",
    projectId: "proj6",
    title: "Tuần 13–15 – Flower Shop Owner",
    type: "week",
    order: 1,
  },
  {
    id: "w_review",
    projectId: "proj6_review",
    title: "Winter Festival Review – A Journey Through Our Learning!",
    type: "week",
    order: 2,
  },
  {
    id: "w7",
    projectId: "proj7",
    title: "Tuần 16–17 – Insect Explorer",
    type: "week",
    order: 1,
  },
  {
    id: "w8",
    projectId: "proj8",
    title: "Tuần 18–19 – Hungry Caterpillar’s Food Diary",
    type: "week",
    order: 1,
  },

  {
    id: "w9",
    projectId: "proj9",
    title: "Tuần 20–23 – Farm Day Organizer",
    type: "week",
    order: 1,
  },
  {
    id: "w10",
    projectId: "proj10",
    title: "Tuần 24–27 – City Transport Map Maker",
    type: "week",
    order: 1,
  },
  {
    id: "w11",
    projectId: "proj11",
    title: "Tuần 28–29 – Fast Food Restaurant Owner",
    type: "week",
    order: 1,
  },
  {
    id: "w11_review",
    projectId: "proj11_review",
    title: "Spring Adventure Review (08–14/06)",
    type: "week",
    order: 1,
  },
  {
    id: "w12",
    projectId: "proj12",
    title: "Week – Ocean Explorer",
    type: "week",
    order: 1,
  },
  {
    id: "w13",
    projectId: "proj13",
    title: "Week – Nature Photographer",
    type: "week",
    order: 1,
  },

  {
    id: "w14",
    projectId: "proj14",
    title: "Tuần 38–39 – Sweet Shop Owner",
    type: "week",
    order: 1,
  },
  {
    id: "w15",
    projectId: "proj15",
    title: "Tuần 40–43 – Back to School Organizer",
    type: "week",
    order: 1,
  },
  {
    id: "w16",
    projectId: "proj16",
    title: "Tuần 44–45 - MID-AUTUMN CELEBRATION – THE FESTIVAL OF THE MOON!",
    type: "week",
    order: 16,
  },
  {
    id: "w17",
    projectId: "proj17",
    title: "Tuần 46–49 - ALL ABOUT ME – BODY, SENSES & CLOTHES",
    type: "week",
    order: 17,
  },
  {
    id: "w_final",
    projectId: "proj_final",
    title: "Year-End Celebration - WeWIN Graduation Party – Year-End Review",
    type: "week",
    order: 18,
  },
];

export const projectFinalWeekBlocks: LessonBlock[] = [
  {
    id: "p_final_objective",
    learningNodeId: "w_final",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Tổng kết hành trình học tập trong năm học.
• Ôn lại hơn 10 chủ đề tiếng Anh đã học.
• Trưng bày sản phẩm sáng tạo của học sinh.
• Giao tiếp tiếng Anh qua trò chơi – hoạt động tương tác.
• Vinh danh nỗ lực và sự tiến bộ của từng học sinh.
    `,
  },

  {
    id: "p_final_activities",
    learningNodeId: "w_final",
    title: "🌍 HOẠT ĐỘNG CHÍNH / MAIN ACTIVITIES",
    type: "list",
    order: 2,
    content: `
1. WeWIN World Tour Game:
• Mỗi trạm tương ứng 1 chủ đề đã học (Career, Farm, Ocean…).
• Nhiệm vụ: “Say 3 animals!”, “Find the pizza!”, “Match the clothes!”.
• Hoàn thành nhận 1 sticker passport.

2. Portfolio Exhibition:
• Trưng bày sản phẩm: My City Map, My Bird Book, Nature Album…
• Học sinh trình bày: “This is my farm model.”

3. Memory Video:
• Chiếu clip tổng hợp ảnh hoạt động suốt năm.
• Học sinh cùng hát bài chủ đề WeWIN.

4. Certificate Ceremony:
• Certificate of Completion + Special Awards:
  – Best Speaker
  – Creative Artist
  – Team Player
  – Super Learner
  – Happy Heart
    `,
  },

  {
    id: "p_final_event",
    learningNodeId: "w_final",
    title: "🎉 GRAND EVENT – WEWIN GRADUATION PARTY",
    type: "list",
    order: 3,
    content: `
• Opening Dance – Tiết mục mở màn sôi động.
• Welcome Speech – Giới thiệu từ WeWIN.
• World Tour Review Game.
• Portfolio Exhibition & Memory Video.
• Certificate & Special Awards Ceremony.
• Group Photos & Closing Song.
    `,
  },

  {
    id: "p_final_teacher",
    learningNodeId: "w_final",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 4,
    content: `
1. Chuẩn bị layout lớp theo trạm chủ đề.
2. Ôn lại từ vựng & mẫu câu bằng mini games.
3. Hướng dẫn học sinh giới thiệu sản phẩm 1–2 câu.
4. Chuẩn bị chứng chỉ & bảng trao thưởng.
5. Quay video – chụp ảnh làm clip “WeWIN Memories”.
    `,
  },

  {
    id: "p_final_checklist",
    learningNodeId: "w_final",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 5,
    content: `
• Bản đồ lớp & thẻ nhiệm vụ.
• Sticker & passport book.
• Sản phẩm học sinh và bảng tên.
• Màn chiếu & video tổng kết.
• Certificates & huy chương.
• Bánh kẹo, nước uống.
• Banner & phông nền “WeWIN Graduation”.
• Loa – nhạc nền – micro.
• Camera để ghi hình toàn sự kiện.
    `,
  },

  {
    id: "p_final_outcomes",
    learningNodeId: "w_final",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 6,
    content: `
• Học sinh tự tin ôn lại kiến thức của cả năm.
• Giao tiếp tiếng Anh trong môi trường lễ hội thực tế.
• Trình bày sản phẩm cá nhân bằng 1–3 câu tiếng Anh.
• Tự hào về hành trình học tập và tiến bộ của bản thân.
• Kết nối cảm xúc tích cực giữa học sinh – giáo viên – phụ huynh.
    `,
  },
];

export const project1IELTSWeekBlocks: LessonBlock[] = [
  {
  id: "wsi_1_cambridge_practice",
  learningNodeId: "wsi_1",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN: Bài 1.2 Writing Task 1 (Tr. 3) và Listening C8 (Tr. 9) - T1 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
Trợ giảng giới thiệu 10 từ vựng cốt lõi.

DANH SÁCH 10 TỪ VỰNG:
1. rates (n.): Tỷ lệ.
2. peaked (v.): Đạt đỉnh.
3. higher (adj.): Cao hơn.
4. emigration (n.): Sự xuất cư.
5. until (prep.): Cho đến khi.
6. reserve (v.): Đặt trước.
7. foyer (n.): Sảnh chờ.
8. documentaries (n.): Phim tài liệu.
9. minimum (n.): Mức tối thiểu.
10. exhibits (n.): Vật trưng bày.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T1 Section 2 (Tr. 9 - 12)
Thời lượng: 10 phút
● Hoạt động: Yêu cầu học viên tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào lỗi chính tả, số ít/số nhiều, và các cụm danh từ dài.

Chữa bài Writing Task 1: Bài 1.2: Chart - International Migration in UK (Tr. 3)
Thời lượng: 10 phút
● Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
● Trọng tâm sửa lỗi: Củng cố cấu trúc Task 1. Tập trung vào cách dùng từ vựng mô tả xu hướng và số liệu (ví dụ: peaked, rates).
  `,
},

{
  id: "wsi_1_mindset_foundation",
  learningNodeId: "wsi_1",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 4,
  content: `
Warm-up & Quick Revision (15’)
Mini Quiz (Quizizz/Mentimeter): Kĩ thuật Formative Assessment – kiểm tra nhanh kiến thức cũ bằng MCQ + fill-in, tạo động lực và giúp GV nắm trình độ.
Interactive Activity “Stand Up If…” / “Raise Your Hand If…” (online dùng reaction icon): Kĩ thuật Total Physical Response (TPR) và Ice-breaker – HS phản ứng bằng hành động hoặc icon, tạo năng lượng và liên hệ trực tiếp với chủ đề.
Picture Talk: Kĩ thuật Visual Aids và Guided Discovery – HS quan sát tranh, đoán hoạt động, chia sẻ thời gian. Phù hợp cả nhóm (thảo luận nhanh) và 1-1 (HS mô tả chi tiết hơn).

Main Activities (50–55’)
Vocabulary and Speaking – Collocation Matching + “Find Someone Who…”: Kĩ thuật Matching Exercise để củng cố từ vựng, kết hợp Communicative Practice (Find Someone Who) giúp HS vận dụng từ trong giao tiếp. Online dùng breakout rooms, offline HS di chuyển trong lớp; 1-1 thì GV đóng vai bạn hỏi.
Reading – Choose the Correct Answer: Kĩ thuật Skimming & Scanning – HS đọc nhanh để tìm ý chính, làm MCQ. Mini interaction: Peer Teaching – HS giải thích đáp án cho bạn, tăng kỹ năng diễn đạt.
Reading – Sentence Completion: Kĩ thuật Paraphrasing Practice – HS luyện diễn đạt lại thông tin bằng ≤3 từ. GV dùng Error Analysis khi HS chia sẻ câu dễ nhầm.
Listening – Matching: Kĩ thuật Prediction Strategy – HS dự đoán trước khi nghe, sau đó kiểm chứng. Tương tác: Immediate Feedback bằng reaction 👍/❌. Phù hợp online/offline; 1-1 GV có thể đọc lại câu để HS phản ứng.
Writing – A Description: Kĩ thuật Process Writing – HS viết ngắn theo trình tự (First/Then/After that). Peer feedback: Peer Review – HS đổi bài hoặc share màn hình/Google Doc, nhận xét 1 điểm tích cực.

Production (20–25’)
Speaking – Talking About Your Day + “Guess Who”: Kĩ thuật Extended Speaking Task (1–2 phút) và Gamification (Guess Who). Trong nhóm, HS đoán người mô tả; trong 1-1, GV đoán hoặc HS mô tả cho GV.
Writing – Describing a Daily Routine: Kĩ thuật Controlled to Free Writing – HS viết đoạn 80–100 từ. Tương tác: Collaborative Writing – HS đọc 1 câu, bạn khác thêm câu nối tiếp. Trong 1-1, GV đóng vai người thêm câu.
  `,
},

{
  id: "wsi_1_homework",
  learningNodeId: "wsi_1",
  title: "HOMEWORK",
  type: "list",
  order: 5,
  content: `
Mindset: Unit 1 module handout exercises, học 15 từ vựng mới

Writing Task: Hoàn thành Bài 1.3: Line graph - UK Acid Rain Emission (Tr. 4).

Listening Section: Hoàn thành C8 - T1 Section 3 (Tr. 13 - 17).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_2_cambridge_practice",
  learningNodeId: "wsi_2",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.3 Line graph - UK Acid Rain Emission (Tr. 4) và Listening C8 (Tr. 13) - T1 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. decreased (v.): Giảm xuống.
2. considerably (adv.): Đáng kể.
3. dramatic (adj.): Đột ngột/Đáng kể (Ví dụ: dramatic decrease).
4. sectors (n.): Các lĩnh vực.
5. responsible (adj.): Chịu trách nhiệm (Ví dụ: was responsible for).
6. proposal (n.): Đề xuất.
7. outline (n.): Dàn ý/Phác thảo (Ví dụ: outline document).
8. number (v.): Đánh số.
9. tribal (adj.): Thuộc về bộ lạc (Ví dụ: Navajo Tribal Park).
10. familiar (adj.): Quen thuộc (Ví dụ: feels very familiar).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T1 Section 3 (Tr. 13 - 17)
Thời lượng: 10 phút
• Hoạt động: Yêu cầu học viên tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào lỗi chính tả, các từ khóa học thuật/nghiên cứu, và lỗi định dạng (ví dụ: cần number các ý).

Chữa bài Writing Task 1: Bài 1.3: Line graph - UK Acid Rain Emission (Tr. 4)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào cách sử dụng từ vựng miêu tả sự giảm/tăng mạnh (decreased considerably, fell significantly) và so sánh giữa các lĩnh vực (sectors).
  `,
},

{
  id: "wsi_2_mindset_foundation",
  learningNodeId: "wsi_2",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Warm-up & Quick Revision (15’)
Mini Quiz (Quizizz/Mentimeter, 5 câu MCQ) ôn từ vựng đồ vật trong nhà (lamp, desk, sink, pillows, curtains). Kĩ thuật: Formative Assessment để kiểm tra nhanh.
Interactive Activity “This or That?” – GV chiếu cặp hình house vs apartment, curtains vs blinds, HS giơ reaction/giơ tay để chọn và giải thích 1 câu ngắn. Kĩ thuật: Ice-breaker + Visual Aids để tạo hứng thú.
Cuối phần, HS nhìn tranh các phòng (basement, attic, garage) và đoán tên để dẫn vào bài.

Main Activities (50–55’)
Vocabulary and Speaking (10’): HS dán nhãn đồ vật trong nhà (lamp, desk, sink, pillows, oven/cooker). Kĩ thuật: Labeling & Visual Learning.
Tương tác thêm “Name 3 things in…” – GV gọi 1 phòng bất kỳ, HS nói 3 đồ vật trong phòng đó. Kĩ thuật: Quick Recall + Communicative Practice.

Listening 1 – Picture Description (8–10’): HS nghe Giorgio mô tả phòng ngủ và chọn đúng bức tranh; nghe lại để trả lời câu hỏi bằng 2–3 từ. Kĩ thuật: Listening for Gist & Detail.
Tương tác mini: HS đổi đáp án cho bạn để kiểm tra chéo (Peer Checking).

Reading – Note Taking (8–10’): HS đọc quảng cáo + email và hoàn thành ghi chú (contact info, location). Kĩ thuật: Skimming & Note-taking.
Tương tác: HS đọc to 1 chi tiết, bạn còn lại chỉ ra vị trí trong văn bản (Peer Teaching).

Listening 2 – Short Answers & Dialogue Building (8–10’): HS nghe cuộc hội thoại Giorgio – Andrew Taylor, khoanh YES/NO cho các chủ đề, sau đó nối câu để hoàn thành đoạn hội thoại.
Kĩ thuật: Active Listening + Dialogue Reconstruction.
Tương tác nhanh: GV đọc nội dung, HS giơ reaction YES/NO trước khi nghe lại để check (Immediate Feedback).

Reading (8’): HS chọn đáp án A/B/C để hoàn thành mô tả daily routine của Giorgio. GV giải thích từ vựng, bỏ phần ngữ pháp adverbs of frequency.
Kĩ thuật: Multiple Choice Reading + Vocabulary Clarification.

Speaking Prep – Choosing Accommodation (8–10’): HS xem thông tin On-campus vs Private, liệt kê 1 ưu – 1 nhược điểm mỗi lựa chọn.
Kĩ thuật: Comparative Thinking.
Tương tác: HS hỏi nhau “Which one is better for Giorgio? Why?” (Pair Discussion).

Production (20–25’)
Speaking – Choosing Accommodation (10–12’): HS thảo luận: “Which accommodation is better for Giorgio?” sau đó “Which one is better for YOU?” dùng 2–3 lý do.
Lớp nhóm: chia cặp/breakout rooms; 1-1: GV đóng vai người hỏi.
Interactive twist: HS đổi vai – đóng vai Giorgio và trả lời câu hỏi về chỗ ở.
Kĩ thuật: Role-play + Extended Speaking.

OR

Writing – Email About Accommodation (10–12’): HS sửa lỗi viết hoa/chấm câu trong đoạn email mẫu, sau đó viết email 60–80 từ cho bạn mô tả chỗ ở của mình.
Kĩ thuật: Process Writing + Error Correction.
Tương tác: HS đọc 1 câu bất kỳ, bạn khác thêm 1 câu liên quan (online: chatbox/docs).
Kĩ thuật: Collaborative Writing.
  `,
},

{
  id: "wsi_2_homework",
  learningNodeId: "wsi_2",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 2 module handout exercises, học 15 từ về nhà ở

• Writing Task: Hoàn thành Bài 1.4: Graph & Table - Water Consumption (Tr. 5).
• Listening Section: Hoàn thành C8 - T1 Section 4 (Tr. 18 - 21).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_3_cambridge_practice",
  learningNodeId: "wsi_3",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.4 Graph & Table - Water Consumption (Tr. 5) và Listening C8 (Tr. 18) - T1 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. consumption (n.): Sự tiêu thụ.
2. significantly (adv.): Đáng kể.
3. largest (adj.): Lớn nhất.
4. domestic (adj.): Trong nước/Hộ gia đình.
5. industrial (adj.): Thuộc công nghiệp.
6. economic (adj.): Thuộc kinh tế (Ví dụ: economic geography).
7. urban (adj.): Thuộc thành thị (Ví dụ: urban geography).
8. informed (adj.): Có thông tin đầy đủ.
9. consequence (n.): Hậu quả (Ví dụ: causes and consequences).
10. maps (n.): Bản đồ.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T1 Section 4 (Tr. 18 - 21)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các thuật ngữ học thuật dài (economic geography, information about deep sea beds).

Chữa bài Writing Task 1: Bài 1.4: Graph & Table - Water Consumption (Tr. 5)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào cách diễn đạt tỷ lệ/phần trăm (largest proportion, one third of that amount) và so sánh giữa hai loại biểu đồ (Graph và Table).
  `,
},


{
  id: "wsi_3_mindset_foundation",
  learningNodeId: "wsi_3",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Warm-up & Quick Revision (15’):
Mini Quiz (Quizizz/Mentimeter, 5 MCQ) ôn từ vựng cycling, hiking, playing sports, free-time activities. Kĩ thuật: Formative Assessment để kiểm tra nhanh.
Interactive Activity “Fun or Scary?” – GV chiếu 6 hình (climbing, white water rafting, cycling…), HS giơ reaction hoặc đứng lên để chọn “fun / scary / boring”, rồi chia sẻ 1 lý do ngắn. Kĩ thuật: Total Physical Response (TPR) + Ice-breaker giúp tạo năng lượng và dẫn vào chủ đề.

Main Activities (50–55’):
Listening – Multiple Choice Questions (10–12’): HS nghe 2 người thảo luận về kỳ nghỉ mạo hiểm và chọn đáp án A/B/C. GV nhấn mạnh synonyms (exciting = thrilling). Kĩ thuật: Listening for Gist & Detail + Vocabulary Awareness. Tương tác: HS thảo luận nhanh theo cặp để “thống nhất đáp án” (Peer Negotiation) trước khi GV công bố.
Vocabulary Expansion (5’): Thay vì bảng ngữ pháp, HS làm mini activity: chọn đúng mô tả “habit” vs “temporary activity” dựa vào 4 câu mẫu trong blog entry. Kĩ thuật: Concept Checking Questions (CCQs).
Reading – Use of Distraction (8–10’): HS đọc bài về vận động viên Aimee Fuller và làm T/F/NG. Kĩ thuật: Skimming & Critical Reading. Tương tác nhỏ: mỗi HS giải thích 1 câu NG và chỉ phần thông tin gây nhiễu (Error Analysis).
Speaking and Vocabulary (10–12’): HS nối hành động thể thao với tranh: catch a ball, hit a ball, score a goal. “Describe & Guess” và so sánh 2 bức tranh thể thao (Comparative Task).
Reading – Note Completion Prep for Writing (5–7’): HS đọc thông tin Film Festival + email bạn gửi và hoàn thành ghi chú. Kĩ thuật: Scanning for Key Details.

Production (20–25’):
Speaking Option (10–12’): HS nói 1–2 phút về môn thể thao/hoạt động giải trí họ thích. Tương tác: Switch Partner Quick Talk (Rotating Pair Work).
OR Writing Option (10–12’): HS viết tin nhắn trả lời bạn về Film Festival (50–70 từ). Kĩ thuật: Process Writing + Controlled Practice + Collaborative Writing.
  `,
},


{
  id: "wsi_3_homework",
  learningNodeId: "wsi_3",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 3 module handout exercises, học 15 từ sở thích

• Writing Task: Hoàn thành Bài 1.5: Graph - Car Ownership (Tr. 6).
• Listening Section: Hoàn thành C8 - T2 Section 2 (Tr. 22 - 25).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_4_cambridge_practice",
  learningNodeId: "wsi_4",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.5 Graph - Car Ownership (Tr. 6) và Listening C8 (Tr. 22) - T2 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. ownership (n.): Quyền sở hữu.
2. households (n.): Hộ gia đình.
3. increased (v.): Gia tăng.
4. uncommon (adj.): Không phổ biến.
5. visitors (n.): Khách tham quan.
6. migrant birds (n. phr.): Chim di cư.
7. solar cells (n. phr.): Pin mặt trời.
8. poultry (n.): Gia cầm.
9. diversity (n.): Sự đa dạng.
10. out of bounds (adj. phr.): Cấm vào/Ngoài giới hạn.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T2 Section 2 (Tr. 22 - 25)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến nông nghiệp/môi trường (gene pool, diversity) và các quy định (out of bounds).

Chữa bài Writing Task 1: Bài 1.5: Graph - Car Ownership (Tr. 6)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Mô tả sự tăng ổn định (increased steadily) và cách diễn đạt số lượng/tỷ lệ hộ gia đình (households, just under half).
  `,
},
{
  id: "wsi_4_mindset_foundation",
  learningNodeId: "wsi_4",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
CORRECT MODULE UNIT 1-2-3

Phase 1: UNIT 1 – DAILY LIFE (30 phút)
Giáo viên sẽ bắt đầu 10 phút đầu tiên bằng việc sửa các lỗi về Cách Đọc Giờ (U1, Bài tập 1) và Hành động Hàng ngày (U1, Bài tập 2), bao gồm các collocations cơ bản như have a shower. Tiếp theo, sửa bài tập về Collocations Make và Do (U1, Bài tập 3), đảm bảo học sinh phân loại đúng các cụm từ như make the bed và do the housework. 20 phút còn lại dành cho ngữ pháp trọng tâm: thì Hiện tại Đơn (Present Simple). Giáo viên cần tập trung vào việc sửa lỗi chia động từ ngôi thứ ba số ít (thêm –s/es) trong các bài tập như U1, Bài tập 5 và 6 (ví dụ: washes, watches, cries, practises). Cuối cùng, củng cố vị trí của Trạng từ chỉ tần suất (Adverbs of Frequency) thông qua việc sửa bài tập sắp xếp câu (U1, Bài tập 7), nhắc nhở học sinh về trật tự từ chuẩn xác.

Phase 2: UNIT 2 – HOUSE AND HOME (25 phút)
Giáo viên dành 10 phút để sửa các lỗi từ vựng về nơi chốn và đồ vật. Đầu tiên là về Các Phần của Ngôi nhà (bedroom, garage, garden) (U2, Bài tập 1) và Nội thất (a fridge, some drawers, a wardrobe) (U2, Bài tập 2). Sau đó, sửa các lỗi trong bài tập về Mối quan hệ Gia đình (U2, Language Builder Bài tập 1, 2, 3), kiểm tra khả năng sử dụng các từ như uncle, aunt, cousin và phân biệt giữa dạng trang trọng/thông tục (ví dụ: father/dad). 15 phút tiếp theo được dùng để sửa bài tập về Giới từ chỉ Vị trí (Prepositions of Place) (U2, Reading & Writing Bài tập 6). Giáo viên nên yêu cầu học sinh viết lại các câu có lỗi về vị trí (ví dụ: under the bed, next to the computer, in the cupboard) để củng cố cách mô tả vị trí đồ vật trong nhà.

Phase 3: UNIT 3 – HOBBIES, LEISURE AND ENTERTAINMENT (25 phút)
Giáo viên bắt đầu Unit 3 (10 phút) bằng việc sửa lỗi sai trong bài tập phân loại cách dùng Play, Do, Go cho các môn thể thao (U3, Bài tập 2), nhấn mạnh rằng Play dùng cho môn có bóng/đối kháng (football, tennis), Do cho môn cá nhân (judo, gymnastics), và Go cho hoạt động kết thúc bằng -ing (skiing, cycling). Trong 10 phút tiếp theo, trọng tâm là sửa các lỗi ngữ pháp phức tạp hơn: phân biệt thì Hiện tại Đơn và Hiện tại Tiếp diễn (U3, Bài tập 8, 9). Giáo viên cần giải thích lý do tại sao các động từ trạng thái (know, understand, belong, want) luôn dùng thì Hiện tại Đơn. 5 phút cuối cùng của Unit này dùng để sửa lỗi sai về từ vựng Đồ đựng (bottle, cup, bowl) (U3, Language Builder Bài tập 1) và Thực phẩm (rice, cheese, chicken) (U3, Language Builder Bài tập 2).

Phase 4: Production & Tổng kết (10 phút)
Giáo viên kết thúc buổi học bằng hoạt động luyện tập nói và ứng dụng tổng hợp (7 phút). Yêu cầu học sinh mô tả Lịch trình hàng ngày của một thành viên trong gia đình họ (kết hợp U1 và U2), hoặc một sở thích thường xuyên của họ (sử dụng Play/Do/Go và các thì đã học từ U3). Bài tập này buộc học sinh phải áp dụng các điểm ngữ pháp đã sửa (ví dụ: Present Simple ngôi thứ ba, giới từ). Cuối cùng (3 phút), Giáo viên tổng kết ba điểm ngữ pháp hoặc từ vựng quan trọng nhất đã học trong 90 phút và giao bài tập chuẩn bị.
  `,
},
{
  id: "wsi_4_homework",
  learningNodeId: "wsi_4",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 4 module handout exercises, học 15 từ du lịch

• Writing Task: Hoàn thành Bài 1.6: Bar chart - Marriages and Divorces (Tr. 7).
• Listening Section: Hoàn thành C8 - T2 Section 3 (Tr. 26 - 29).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_5_cambridge_practice",
  learningNodeId: "wsi_5",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.6 Bar chart - Marriages and Divorces (Tr. 7) và Listening C8 (Tr. 26) - T2 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. decline (n.): Sự suy giảm.
2. majority (n.): Đa số.
3. proportion (n.): Tỷ lệ/Phần trăm.
4. stable (adj.): Ổn định.
5. divorces (n.): Các vụ ly hôn.
6. interview (n.): Phỏng vấn.
7. research (n.): Nghiên cứu.
8. minimum (n.): Mức tối thiểu.
9. focused (adj.): Tập trung.
10. academic (adj.): Thuộc học thuật.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T2 Section 3 (Tr. 26 - 29)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng học thuật và nghiên cứu (research, academic side, minimum of three months).

Chữa bài Writing Task 1: Bài 1.6: Bar chart - Marriages and Divorces (Tr. 7)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Mô tả xu hướng xã hội (decline in marriages, proportion of single adults) và sử dụng các từ miêu tả trạng thái (majority, stable).
  `,
},
{
  id: "wsi_5_mindset_foundation",
  learningNodeId: "wsi_5",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1. Warm-up & Quick Revision (15’):
Mini Quiz (Quizizz/Mentimeter, 5 MCQ) ôn từ vựng kỳ nghỉ adventure, beach holiday, city break, sightseeing, go hiking.
Sau đó Interactive Activity: “Where Would You Go?” – GV chiếu 3 ảnh (mountain / city / beach), HS chọn nơi mình muốn đi và nói 1 lý do; online dùng reactions, offline giơ thẻ.
Kết thúc bằng nối nhanh các kỳ nghỉ adventure, city break, language exchange với hình ảnh.

2. Main Activities (50–55’):
Lead-in & Vocabulary (5–7’): HS dán nhãn/ghép tranh các hoạt động kỳ nghỉ như go mountain climbing, stay with host families, go sightseeing.
Tương tác nhỏ: HS nói 1 hoạt động họ thích/không thích và lý do.

Reading: Matching (8–10’): HS đọc 8 mô tả kỳ nghỉ và nối 4 người với loại hình phù hợp.
Tương tác: làm theo cặp → hai bạn phải thống nhất đáp án trước khi GV công bố.

Listening: Interview Task (10–12’): HS nghe phỏng vấn Anna về cultural exchange, chọn đáp án A/B/C.
GV nhắc cách tìm keyword trong câu hỏi và lựa chọn.
Tương tác: trước khi nghe lần 2, HS đoán lại đáp án bằng cách giơ reaction “A/B/C”.

Speaking: Adding More Detail & Giving Reasons (8–10’):
HS nối câu lý do – kết quả, sau đó luyện mở rộng câu trả lời dùng as / so / because.
Tương tác: HS làm theo cặp → mỗi bạn hỏi 1 câu “Why do you like…?” người kia trả lời mở rộng với 2 mệnh đề.

Writing Prep (Emails) (8–10’):
HS đọc email của Simon và hoàn thành các chỗ trống bằng động từ phù hợp theo nghĩa câu (không đi sâu vào ngữ pháp).
Sau đó HS viết 3–4 câu ngắn kể về kỳ nghỉ gần nhất để chuẩn bị cho phần Production.

3. Production (20–25’):
Speaking Option (10–12’):
HS làm Long Turn 1–2 phút – Describe a holiday you really liked, theo gợi ý: nơi chốn – hoạt động – người đi cùng – lý do thích.
Tương tác: “Pass the Question” – HS hỏi follow-up (Where? When? With whom? Why?).

OR

Writing Option (10–12’):
HS viết email 80–100 từ (rút gọn từ bản 150–175 trong sách cho phù hợp lớp Foundation) kể về kỳ nghỉ gần nhất.
Tương tác: HS đọc 1 câu nổi bật, bạn khác thêm 1 câu liên quan để mở rộng ý.
  `,
},
{
  id: "wsi_5_homework",
  learningNodeId: "wsi_5",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 5 module handout exercises, học 15 từ thức ăn

• Writing Task: Hoàn thành Bài 1.7: Charts - Levels of Participation (Tr. 8).
• Listening Section: Hoàn thành C8 - T2 Section 4 (Tr. 30 - 33)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_6_cambridge_practice",
  learningNodeId: "wsi_6",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.7 Charts - Levels of Participation (Tr. 8) và Listening C8 (Tr. 30) - T2 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. higher (adj.): Cao hơn.
2. developing (adj.): Đang phát triển (Ví dụ: developing nations).
3. doubled (v.): Tăng gấp đôi.
4. in contrast (phr.): Ngược lại.
5. innovation (n.): Sự đổi mới.
6. replicate (v.): Tái tạo/Sao chép.
7. attitude (n.): Thái độ.
8. cautious (adj.): Thận trọng.
9. consistency (n.): Sự nhất quán.
10. systems (n.): Hệ thống (Ví dụ: operational systems).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T2 Section 4 (Tr. 30 - 33)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ khóa kinh doanh/quản lý (innovation, replicate) và các cụm từ thể hiện thái độ (realistic and cautious).

Chữa bài Writing Task 1: Bài 1.7: Charts - Levels of Participation (Tr. 8)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: So sánh giữa các quốc gia (developed countries vs developing nations). Miêu tả sự tăng trưởng mạnh (doubled, rapid growth).
  `,
},

{
  id: "wsi_6_mindset_foundation",
  learningNodeId: "wsi_6",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1. Warm-up & Quick Revision (15’):
Mini Quiz (Quizizz/Mentimeter, 5 MCQ) ôn từ vựng món ăn & nguyên liệu (beef, noodles, rice, vegetables, dumplings). Kĩ thuật: Formative Assessment để kiểm tra nhanh.
Interactive Game “Guess the Country – Guess the Dish” – GV chiếu 4 hình món ăn (Pizza, Beef Chow Mein, Sushi, Curry), HS đoán quốc gia và nói 1 nguyên liệu chính. Kĩ thuật: Visual Aids + Prediction.
Kết thúc bằng nối nhanh món ăn với quốc gia và nguyên liệu (Matching Exercise).

2. Main Activities (50–55’):
Lead-in & Vocabulary (5–7’): HS nối quốc gia với món ăn và nối nguyên liệu với món (Pizza – cheese/tomato; Beef Chow Mein – beef/noodles).
Tương tác: HS chia sẻ món họ thích nhất và lý do (Personalization).

Vocabulary and Reading (8–10’): HS đọc bài về Chinese Food Festival, làm MCQ để sửa các thông tin sai trong câu. Kĩ thuật: Skimming & Scanning.
Tương tác: HS làm theo cặp → chỉ ra câu nào “trickiest” và giải thích vì sao (Peer Teaching).

Listening – Matching (8–10’): HS nghe Mark & Jane bàn về lễ hội và nối người với lý do họ không tham gia. Kĩ thuật: Listening for Detail.
Tương tác: HS dự đoán trước bằng reaction “M” hoặc “J” cho từng lý do (Prediction Strategy).

Vocabulary and Listening (10–12’): HS phân loại từ vựng thực phẩm vào 4 nhóm (Meat / Vegetables / Fish / Carbohydrates) và nối động từ nấu ăn (boil, chop, fry, roll).
Sau đó nghe đầu bếp hướng dẫn làm dumplings và hoàn thành mô tả quy trình bằng các từ còn thiếu. Kĩ thuật: Categorization + Gap-fill Listening.
Tương tác: làm thi theo nhóm/cặp xem ai hoàn thành nhanh hơn (Gamification).

Reading – Sentence Completion 1 (8’): HS sắp xếp thứ tự 4–5 tranh món Bulgogi và hoàn thành mô tả nấu ăn bằng a/some hoặc 1 động từ đúng nghĩa. Kĩ thuật: Sequencing + Controlled Practice.
Tương tác: HS thảo luận xem bước nào khó nhất và lý do (Critical Thinking).

3. Production (20–25’):
Speaking Option (10–12’): HS mô tả cách làm một món ăn quen thuộc (phở, cơm chiên, sandwich) theo trình tự First – Then – After that – Finally. Kĩ thuật: Process Speaking.
Tương tác: “Guess the Dish” – bạn khác đoán món ăn dựa vào mô tả (Interactive Guessing Game).

OR

Writing Option (10–12’): HS viết đoạn hướng dẫn nấu một món ăn đơn giản (80–100 từ), dùng từ nối thứ tự và ít nhất 3 động từ nấu ăn. Kĩ thuật: Process Writing.
Tương tác: HS đọc 1 câu bất kỳ, bạn khác thêm 1 bước để tạo thành một quy trình hoàn chỉnh (Collaborative Writing).
  `,
},

{
  id: "wsi_6_homework",
  learningNodeId: "wsi_6",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 6 module handout exercises, học 15 từ giao thông

• Writing Task: Hoàn thành Bài 1.8: Bar chart - Consumer Goods (Tr. 9).
• Listening Section: Hoàn thành C8 - T3 Section 2 (Tr. 34 - 36)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_7_cambridge_practice",
  learningNodeId: "wsi_7",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.8 Bar chart - Consumer Goods (Tr. 9) và Listening C8 (Tr. 34) - T3 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. spending (n.): Chi tiêu.
2. significantly (adv.): Đáng kể (Ví dụ: spent significantly more).
3. least (adj.): Ít nhất.
4. overall (adv.): Tổng thể (Ví dụ: lowest overall spenders).
5. by contrast (phr.): Ngược lại/Để đối chiếu.
6. venues (n.): Địa điểm (Ví dụ: major venues).
7. complex (n.): Khu phức hợp.
8. destroyed (v.): Bị phá hủy.
9. exhibition (n.): Triển lãm.
10. spectacular (adj.): Ngoạn mục.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T3 Section 2 (Tr. 34 - 36)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến nghệ thuật/địa điểm (venues, exhibition) và lỗi nghe số liệu (giá, thời gian).

Chữa bài Writing Task 1: Bài 1.8: Bar chart - Consumer Goods (Tr. 9)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Sử dụng so sánh nhất (least, largest). Nhấn mạnh cách dùng By contrast và các từ miêu tả xấp xỉ (roughly the same, just over).
  `,
},

{
  id: "wsi_7_mindset_foundation",
  learningNodeId: "wsi_7",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1. Warm-up & Quick Revision (15’):
Mini Quiz (Quizizz/Mentimeter, 5 MCQ) ôn từ vựng địa điểm & phương tiện (bridge, station, library, bus, train). Kĩ thuật: Formative Assessment để kiểm tra nhanh.
Interactive Game “Which place is it?” – GV chiếu hình (statue, castle, stadium), HS giơ reaction đoán nhanh và nói 1 câu về nơi đó (“There’s a big stadium in my city.”). Kĩ thuật: Visual Aids + Quick Recall.
Cuối phần, HS hoàn thành bảng nhỏ về Places in a city và Travel & transport cùng GV (Guided Discovery).

2. Main Activities (50–55’):
Reading and Vocabulary (8–10’): HS đọc các văn bản ngắn (biển báo, tin nhắn, email) và chọn câu trả lời A/B/C về ý chính. Kĩ thuật: Skimming & Scanning.
Tương tác: mỗi HS giải thích 1 văn bản bằng 1 câu (“This sign tells us…”) (Peer Teaching).

Listening – Gap-fill (10–12’): HS nghe thông tin về trung tâm mua sắm Northfields, điền chi tiết như kiến trúc sư, postcode, opening hours, transport. Kĩ thuật: Listening for Detail.
Tương tác: HS dự đoán trước 1–2 thông tin dựa vào title (Prediction Strategy).

Listening – Map Completion (8–10’): HS nghe mô tả bản đồ và nối cửa hàng với vị trí (A–F). Kĩ thuật: Listening with Visual Support.
Tương tác: HS vẽ nhanh sơ đồ (online dùng draw tool) và đánh số vị trí để ghi nhớ (Active Note-taking).

Speaking Prep – Talking About Transport & Towns (8–10’): HS đặt và trả lời câu hỏi về quê hương và giao thông (“How do people travel in your town?”). Kĩ thuật: Communicative Practice.
Tương tác: HS dùng bốc thăm ngẫu nhiên câu hỏi/mảnh giấy để hỏi bạn (Gamification).

Writing Prep (5–7’): HS đọc email từ Sandy và brainstorm 3 nơi nên thăm + 2 cách di chuyển phù hợp, dùng các từ nối if, so, because, after that. Kĩ thuật: Brainstorming + Controlled Writing.

3. Production (20–25’):
Speaking Option (10–12’): HS mô tả quê hương hoặc thành phố họ thích, tập trung vào địa điểm và giao thông (“There are… People usually travel by… It’s easier to…”). Kĩ thuật: Extended Speaking Task.
Tương tác: “Partner Swap Q&A” – mỗi 3 phút đổi người và trả lời bộ câu hỏi khác nhau (Rotating Pair Work).

OR

Writing Option (10–12’): HS viết email khoảng 80–100 từ trả lời Sandy về nơi nên thăm và cách di chuyển. Kĩ thuật: Process Writing.
Tương tác: HS chia sẻ 1 câu trong email, bạn khác thêm 1 lý do (Collaborative Writing).
  `,
},
{
  id: "wsi_7_homework",
  learningNodeId: "wsi_7",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 7 module handout exercises, học 15 từ công việc

• Writing Task: Hoàn thành Bài 1.9: Bar chart - House Prices (Tr. 10).
• Listening Section: Hoàn thành C8 - T3 Section 3 (Tr. 37 – 41)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_8_cambridge_practice",
  learningNodeId: "wsi_8",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.9 Bar chart - House Prices (Tr. 10) và Listening C8 (Tr. 37) - T3 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. average (adj.): Trung bình.
2. dropped (v.): Giảm (Ví dụ: dropped by around 10%).
3. period (n.): Giai đoạn.
4. by far (phr.): Vượt trội hơn nhiều.
5. stable (adj.): Ổn định.
6. guidance (n.): Sự hướng dẫn.
7. academic (adj.): Thuộc học thuật.
8. equipment (n.): Thiết bị.
9. interferes (v.): Can thiệp/Gây cản trở.
10. dissertation (n.): Luận văn.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T3 Section 3 (Tr. 37 - 41)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến hỗ trợ học tập (advice and guidance) và yêu cầu học thuật (minimum of three months).

Chữa bài Writing Task 1: Bài 1.9: Bar chart - House Prices (Tr. 10)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Mô tả sự thay đổi giá (dropped, rose, remained stable). Củng cố cách dùng by far và so sánh giữa các thành phố.
  `,
},
{
  id: "wsi_8_mindset_foundation",
  learningNodeId: "wsi_8",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
CORRECT MODULE UNIT 4-5-6

Phase 1: UNIT 4 – TRAVEL AND HOLIDAYS (30 phút)
Giáo viên bắt đầu 10 phút đầu tiên bằng cách sửa các bài tập về Các Loại Hình Kỳ nghỉ (U4, Bài tập 1) và Hoạt động Du lịch (U4, Bài tập 2, 3), đảm bảo học sinh phân biệt được An adventure holiday (phiêu lưu) với A beach holiday (nghỉ biển). Sửa các lỗi sai về Tính từ Mô tả (U4, Bài tập 4) như popular, boring, delicious, cultural, famous. Trong 20 phút tiếp theo, tập trung sửa lỗi ngữ pháp thì Quá khứ Đơn khi kể về kỳ nghỉ đã qua (U4, Bài tập 6, 5), đặc biệt là các động từ bất quy tắc. Điểm ngữ pháp quan trọng nhất là Liên từ so và because (U4, Bài tập 8 và U4, Bài tập 9), Giáo viên cần yêu cầu học sinh giải thích mối quan hệ nguyên nhân – kết quả trong các câu đã sửa. Cuối cùng, sửa nhanh các câu hỏi đọc hiểu True/False liên quan đến Tom’s postcard để kiểm tra việc nắm bắt ngữ cảnh (U4, Bài tập 4).

Phase 2: UNIT 5 – FOOD AND JOBS (30 phút)
Giáo viên dành 15 phút đầu để sửa các lỗi từ vựng về Thực phẩm và Nấu ăn. Bắt đầu bằng việc phân loại Nguyên liệu (Meat, Seafood/Fish, Carbohydrates, Vegetables) (U5, Bài tập 1, 2) như beef, salmon, cauliflower, spaghetti. Sau đó, sửa các Động từ nấu ăn (bake, boil, chop, fry, mix) (U5, Bài tập 3). Trong 15 phút tiếp theo, tập trung vào Quantifiers (các từ chỉ số lượng) (U5, Bài tập 4, 5, 6). Giáo viên cần củng cố cách dùng a/an, some, any và đặc biệt là sự khác biệt giữa many (danh từ đếm được) và much (danh từ không đếm được) thông qua các câu hỏi trong bài tập. Tiếp theo, sửa các lỗi về Từ vựng Nghề nghiệp và Nơi làm việc (U5, Language Builder Bài tập 1, 2), ví dụ: mechanic làm việc ở garage, pilot thì flies a plane.

Phase 3: UNIT 6 – PLACES AND COMPARISONS (25 phút)
Giáo viên dành 10 phút để sửa các lỗi về Từ vựng Địa điểm (U6, Bài tập 1, 2) và các Giới từ chỉ Định hướng (U6, Bài tập 3), đảm bảo học sinh mô tả chính xác vị trí các địa điểm trên bản đồ bằng across, behind, between, next to, opposite. Trong 15 phút còn lại, tập trung sửa ngữ pháp So sánh hơn (Comparative) và So sánh nhất (Superlative) (U6, Bài tập 7, 8, 9, 10). Giáo viên cần sửa các lỗi thêm *-er/est cho tính từ ngắn (safer, faster, oldest) và more/most cho tính từ dài (more expensive, the most interesting). Sửa các dạng bất quy tắc như good/better/best và bad/worse/worst. Kết thúc bằng việc sửa lỗi trong bài tập mô tả bản đồ New City (U6, Bài tập 6, 8) để ứng dụng các cấu trúc so sánh này.

Phase 4: Production & Tổng kết (5 phút)
Giáo viên dành 5 phút để tổng kết và giao bài tập. Yêu cầu học sinh nhanh chóng đưa ra 3 câu so sánh (U6) về các món ăn (U5) hoặc các loại hình du lịch (U4) mà họ đã học. Hoạt động này giúp tổng hợp kiến thức từ ba Unit. Sau đó, Giáo viên tóm tắt các lỗi sai phổ biến nhất trong buổi học và giao bài tập chuẩn bị.
  `,
},
{
  id: "wsi_8_homework",
  learningNodeId: "wsi_8",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
Mindset: Unit 8 exercises, học 15 từ sức khỏe

• Writing Task: Hoàn thành Bài 1.10: Table - Rail Networks (Tr. 11).
• Listening Section: Hoàn thành C8 - T3 Section 4 (Tr. 42 - 45)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_9_cambridge_practice",
  learningNodeId: "wsi_9",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.10 Table - Rail Networks (Tr. 11) và Listening C8 (Tr. 42) - T3 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. largest (adj.): Lớn nhất.
2. extensive (adj.): Rộng lớn/Mở rộng.
3. passengers (n.): Hành khách.
4. oldest (adj.): Cũ nhất.
5. newest (adj.): Mới nhất.
6. geology (n.): Địa chất.
7. construction (n.): Sự xây dựng.
8. tunnels (n.): Đường hầm.
9. installation (n.): Sự lắp đặt.
10. attraction (n.): Điểm thu hút.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T3 Section 4 (Tr. 42 - 45)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ khóa liên quan đến dự án/cơ sở vật chất (geology, tunnels, installation) và các cụm danh từ dài.

Chữa bài Writing Task 1: Bài 1.10: Table - Rail Networks (Tr. 11)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: Sử dụng so sánh nhất (largest, oldest, most extensive). Miêu tả số liệu từ bảng (table) và so sánh kích thước/số lượng hành khách.
  `,
},

{
  id: "wsi_9_mindset_foundation",
  learningNodeId: "wsi_9",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Warm-up & Lead-in & Vocabulary (15’):
HS nối các kỹ năng và khả năng (write well, read a map, work for long hours) với hình ảnh minh họa. GV chiếu hình, HS chọn kỹ năng phù hợp và đặt câu ngắn (“I can read a map well”). Kĩ thuật: Visual Aids + Personalization.
Mini quiz 5 MCQ trên Quizizz/Mentimeter để ôn từ vựng về jobs & skills (Formative Assessment).

Listening – Note Completion (10–12’):
HS nghe quảng cáo radio về đầu bếp TV Jack Riley, hoàn thành ghi chú các chi tiết bị thiếu (tên, ngày, số, nghề nghiệp).
Kĩ thuật: Listening for Detail + Prediction Strategy.
Trước khi nghe, HS dự đoán thông tin dựa vào tiêu đề.
Sau khi nghe, HS chia sẻ câu trả lời trong chat hoặc breakout room (Peer Checking).

Grammar – Can/Can’t/Could/Couldn’t (10’):
HS thảo luận về khả năng của Jack Riley trong quá khứ và hiện tại.
Hoàn thành đối thoại bằng can/can’t/could/couldn’t.
GV nhấn mạnh sự khác biệt giữa khả năng hiện tại và quá khứ.
Kĩ thuật: Concept Checking Questions (CCQs) + Controlled Practice.

Speaking – Describing Skills and Abilities (10’):
HS đặt và trả lời câu hỏi về kỹ năng và khả năng cá nhân, sử dụng động từ khuyết thiếu.
Kĩ thuật: Communicative Practice.
Tương tác: “Partner Swap Q&A” – mỗi 3 phút đổi partner, hỏi–đáp về kỹ năng (“Can you swim well?” “Yes, I can.”) (Rotating Pair Work).

Reading – True/False/Not Given (12–15’):
HS đọc bài báo về các công việc mùa hè (lifeguard, sales assistant).
Áp dụng chiến lược kiểm tra T/F/NG, trả lời 8 câu hỏi.
Kĩ thuật: Skimming & Scanning + Critical Reading.
GV hướng dẫn HS highlight từ khóa và đối chiếu thông tin (Guided Practice).

Writing – An Email for a Summer Job (10–12’):
HS viết email xin việc (60–80 từ), nêu công việc muốn ứng tuyển, các kỹ năng hiện có và các kỹ năng đã học được so với trước đây.
Kiểm tra việc sử dụng can/can’t/could/couldn’t.
Kĩ thuật: Process Writing + Controlled Output.
Tương tác: HS chia sẻ 1 câu trong email, bạn khác thêm chi tiết hoặc lý do bằng linking words (Collaborative Writing).
GV tổng kết bằng cách highlight câu hay và sửa lỗi chung (Feedback & Error Correction).

Production (20–25’):
HS chọn Speaking hoặc Writing.
● Speaking (10–12’): HS thảo luận nhóm nhỏ về công việc mùa hè phù hợp với kỹ năng cá nhân. Kĩ thuật: Extended Speaking Task.
Tương tác: Partner Swap Q&A (Rotating Pair Work).
● Writing (10–12’): HS hoàn thiện email xin việc, chia sẻ câu then chốt, bạn khác bổ sung lý do (Collaborative Writing).
GV khuyến khích HS dùng collocations và linking words để mở rộng ý (Language Awareness).
  `,
},

{
  id: "wsi_9_homework",
  learningNodeId: "wsi_9",
  title: "HOMEWORK",
  type: "list",
  order: 3,
  content: `
MLH: Làm bài tập 2.13-2.15 (20 câu), phát âm -ed 15 từ
Cambridge: Cam 14 T1 S1-2 spelling focus
Mindset: Unit 9 exercises, học 15 từ ngôn ngữ

• Writing Task: Hoàn thành Bài 1.11: Table - Poverty Proportion in Australia (Tr. 12).
• Listening Section: Hoàn thành C8 - T4 Section 2 (Tr. 46 - 48).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_10_cambridge_practice",
  learningNodeId: "wsi_10",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.11 Table - Poverty Proportion in Australia (Tr. 12) và Listening C8 (Tr. 46) - T4 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. poverty (n.): Nghèo đói (Ví dụ: poverty rates).
2. aged (adj.): Lớn tuổi (Ví dụ: aged people).
3. couples (n.): Các cặp đôi.
4. likely (adv.): Có khả năng (Ví dụ: more likely to be poor).
5. respectively (adv.): Tương ứng.
6. grant (n.): Khoản trợ cấp.
7. funding (n.): Quỹ/Tài trợ.
8. clubs (n.): Câu lạc bộ.
9. rehearsing (v.): Diễn tập.
10. stamina (n.): Sức chịu đựng/Sức bền.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T4 Section 2 (Tr. 46 - 48)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến cộng đồng/thể thao (grant, rehearsing, stamina).

Chữa bài Writing Task 1: Bài 1.11: Table - Poverty Proportion in Australia (Tr. 12)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: So sánh tỷ lệ nghèo đói giữa các nhóm (single people vs couples). Cách sử dụng respectively và more likely.
  `,
},
{
  id: "wsi_10_mindset_foundation",
  learningNodeId: "wsi_10",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Lead-in & Listening 1 (10–12’):
HS nghe ba người bạn Samantha, Tom, Sarah thảo luận về việc tập thể dục, ghép ý kiến (too expensive, exercise outdoors is better) với người nói.
● Kĩ thuật: Listening for Gist & Detail + Prediction Strategy.
● Hoạt động tạo hứng thú: “Reaction Race” – GV đọc nhanh một ý kiến, HS dùng reaction icon hoặc chat để đoán ai nói, sau đó giải thích bằng 1 câu (Gamification).

Vocabulary and Speaking (10’):
HS nối hoạt động với hình ảnh (drink water, get enough sleep, enjoy art and music), thảo luận về thói quen lành mạnh.
● Kĩ thuật: Visual Aids + Personalization.
● Hoạt động tương tác: “Healthy Habit Poll” – GV tạo poll online, HS chọn thói quen mình làm thường xuyên, sau đó chia sẻ lý do ngắn gọn (Interactive Polling).

Reading – An Opinion Based Essay (12–15’):
HS đọc bài luận về tầm quan trọng của việc tập thể dục khi ôn thi, trả lời câu hỏi Multiple Choice (Ex 9).
● Kĩ thuật: Skimming & Scanning + Critical Reading.
● GV hướng dẫn HS highlight từ khóa và đối chiếu thông tin (Guided Practice).

Grammar 1 – Should/Shouldn’t (8–10’):
GV giới thiệu và HS hoàn thành quy tắc ngữ pháp về should/shouldn’t (đưa ra lời khuyên).
● Kĩ thuật: Concept Checking Questions (CCQs) + Controlled Practice.
● HS thực hành bằng cách viết 2 lời khuyên về sức khỏe trong chat (Quick Output).

Speaking – Describing a Picture (8–10’):
HS mô tả tranh, đưa ra lời khuyên bằng should/shouldn’t.
● Kĩ thuật: Picture Description + Communicative Practice.
● Tương tác: “Partner Swap Q&A” – HS đổi partner sau mỗi 3 phút, mô tả tranh khác nhau và đưa lời khuyên (Rotating Pair Work).

Vocabulary and Listening 2 (10–12’):
HS nối các cách thư giãn (do yoga, drink tea, go for a walk) với hình ảnh, nghe 5 người nói và nối người nói với hoạt động thư giãn.
● Kĩ thuật: Categorization + Listening for Specific Information.
● GV khuyến khích HS dự đoán trước khi nghe (Prediction Strategy).

Grammar 2 – Have to/Don’t Have to (8–10’):
GV giới thiệu và HS hoàn thành quy tắc về have to/don’t have to (nghĩa vụ/sự lựa chọn).
● Kĩ thuật: Concept Clarification + Controlled Practice.
● HS viết 2 câu về thói quen học tập hoặc sức khỏe của mình (Personalization).

Writing – An Email to a Friend Giving Advice (10–12’):
HS viết email cho bạn Alice (80–100 từ) đưa ra lời khuyên về cách sống lành mạnh, sử dụng should/shouldn’t và have to/don’t have to.
● Kĩ thuật: Process Writing + Controlled Output.
● Hoạt động tương tác: HS chia sẻ 1 câu trong email, bạn khác bổ sung thêm lý do hoặc mở rộng bằng linking words (Collaborative Writing).
● GV tổng kết bằng cách highlight câu hay và sửa lỗi chung (Feedback & Error Correction).

Production (20–25’):
HS chọn Speaking hoặc Writing.
● Speaking (10–12’): HS thảo luận nhóm nhỏ về lời khuyên chăm sóc sức khỏe phù hợp với bạn. Kĩ thuật: Extended Speaking Task.
Tương tác: Partner Swap Q&A (Rotating Pair Work).
● Writing (10–12’): HS hoàn thiện email cho Alice, chia sẻ câu then chốt, bạn khác bổ sung lý do (Collaborative Writing).
GV khuyến khích HS dùng collocations và linking words để mở rộng ý (Language Awareness).
  `,
},
{
  id: "wsi_10_homework",
  learningNodeId: "wsi_10",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset: Unit 10 exercises, học 15 từ công nghệ

• Writing Task: Hoàn thành Bài 1.12: Table - Daily Activities (Tr. 13).
• Listening Section: Hoàn thành C8 - T4 Section 3 (Tr. 49 - 53).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_11_cambridge_practice",
  learningNodeId: "wsi_11",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.12 Table - Daily Activities (Tr. 13) và Listening C8 (Tr. 49) - T4 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. average (n.): Trung bình.
2. leisure (n.): Giải trí/Thời gian rảnh.
3. proportion (n.): Tỷ lệ/Phần trăm.
4. contrast (n.): Sự tương phản.
5. employed (v.): Làm việc/Có việc làm (từ employment).
6. dissertation (n.): Luận văn.
7. computer modeling (n. phr.): Mô hình hóa máy tính.
8. confidence (n.): Sự tự tin.
9. references (n.): Tài liệu tham khảo.
10. tutorials (n.): Các buổi hướng dẫn.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T4 Section 3 (Tr. 49 - 53)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến dự án/luận văn (dissertation, computer modeling) và lời khuyên học tập (build confidence, tutorials).

Chữa bài Writing Task 1: Bài 1.12: Table - Daily Activities (Tr. 13)
Thời lượng: 10 phút
• Hoạt động: Phản hồi bài viết hoặc chữa bài điền từ.
• Trọng tâm sửa lỗi: So sánh giữa nam và nữ (men spend... more than women). Sử dụng on average và in contrast để liên kết thông tin.
  `,
},

{
  id: "wsi_11_mindset_foundation",
  learningNodeId: "wsi_11",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1. Lead-in & Vocabulary (10’):
Học sinh nối các cách học tiếng Anh (use a dictionary, listen to songs) với hình ảnh minh họa, đồng thời luyện tập giới từ và động từ (talk to, communicate by, chat with).
Kĩ thuật: Visual Aids + Controlled Practice.
Hoạt động tạo hứng thú: “Quick Reaction Match” – giáo viên chiếu hình, học sinh chọn đúng cụm từ và đặt câu ngắn, ví dụ “I often listen to songs to learn English”.

2. Grammar – Going to for Future Plans (8–10’):
Học sinh hoàn thành các câu và quy tắc ngữ pháp về going to để diễn đạt kế hoạch tương lai.
Giáo viên hướng dẫn học sinh viết 2 câu về kế hoạch học ngoại ngữ của bản thân.
Kĩ thuật: Concept Checking Questions + Guided Practice.

3. Listening – Discussing a Language Project (10–12’):
Học sinh nghe Sofia và Oliver thảo luận về dự án ngôn ngữ, làm bài T/F và hoàn thành bảng tên/vị trí người làm việc.
Hoạt động tương tác: học sinh dự đoán trước ai sẽ làm nhiệm vụ nào, sau khi nghe chia sẻ kết quả trong chat hoặc breakout room.
Kĩ thuật: Prediction Strategy + Listening for Detail.

4. Speaking – A Longer Talk about a Topic (10’):
Học sinh mô tả một ngôn ngữ đang học theo dạng Speaking Part 2 (1–2 phút), nêu rõ kế hoạch và lý do học.
Hoạt động tương tác: “Partner Swap Talk” – học sinh đổi partner sau mỗi lượt, trình bày ngắn và nhận phản hồi.
Kĩ thuật: Extended Speaking Task + Peer Feedback.

5. Vocabulary and Reading (10’):
Học sinh hoàn thành các collocations (hold a conversation, have an advantage, make progress), sau đó đọc bài báo về Richard Doner – người nói nhiều ngôn ngữ.
Giáo viên yêu cầu học sinh chia sẻ một collocation trong chat và đặt câu với nó.
Kĩ thuật: Collocation Practice + Personalization.

6. Reading – Sentence Completion (10–12’):
Học sinh hoàn thành câu bằng NO MORE THAN THREE words, luyện tập kỹ năng paraphrasing.
Giáo viên hướng dẫn cách tìm từ khóa và diễn giải lại thông tin.
Kĩ thuật: Scanning + Paraphrasing Practice.

7. Writing – Short Essay on a Topic (12–15’):
Học sinh viết bài luận ngắn (80–100 từ) về ưu nhược điểm của từ điển online, sử dụng các từ nối để tổ chức bài viết (Firstly, Furthermore, On the other hand, To sum up).
Hoạt động tương tác: học sinh chia sẻ một câu trong bài, bạn khác thêm ý hoặc mở rộng bằng linking words.
Giáo viên tổng kết bằng cách highlight câu hay và sửa lỗi chung.
Kĩ thuật: Process Writing + Collaborative Writing + Feedback & Error Correction.
  `,
},

{
  id: "wsi_11_homework",
  learningNodeId: "wsi_11",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset: Review Units 1-5 (75 từ), progress test

• Writing Task: Hoàn thành Bài 1.13: Table - Goods Consumer (Tr. 14).
• Listening Section: Hoàn thành C8 - T4 Section 4 (Tr. 54 - 57).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_12_cambridge_practice",
  learningNodeId: "wsi_12",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.13 Table - Goods Consumer (Tr. 14) và Listening C8 (Tr. 54) - T4 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. expenditure (n.): Chi tiêu.
2. highest (adj.): Cao nhất.
3. consumer (n.): Người tiêu dùng.
4. proportion (n.): Tỷ lệ.
5. relatively (adv.): Tương đối.
6. philosophy (n.): Triết học.
7. practical (adj.): Thực tế.
8. calm (adj.): Bình tĩnh.
9. emotions (n.): Cảm xúc.
10. challenge (n.): Thử thách.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C8 - T4 Section 4 (Tr. 54 - 57)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng học thuật (Ví dụ: liên quan đến philosophy hoặc Stoicism).

Chữa bài Writing Task 1: Bài 1.13: Table - Goods Consumer (Tr. 14)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào cách miêu tả tỷ lệ phần trăm (Ví dụ: proportion, highest, lowest) và cách sử dụng các từ so sánh/đối chiếu.
  `,
},
{
  id: "wsi_12_mindset_foundation",
  learningNodeId: "wsi_12",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1. Lead-in & Vocabulary (10’):
Học sinh nối các từ công nghệ (smartphone, laptop, smart TV) với hình ảnh minh họa, đồng thời luyện tập chính tả và từ vựng liên quan đến mạng (attachment, download, stream, backup, store).
Kĩ thuật: Visual Aids + Controlled Practice.
Hoạt động tạo hứng thú: “Tech Quick Match” – giáo viên chiếu hình, học sinh chọn đúng từ và đặt câu ngắn, ví dụ “I often download music on my smartphone”.

2. Reading (10–12’):
Học sinh đọc bài báo về Internet và Server/Client, hoàn thành các câu được diễn giải lại với NO MORE THAN THREE words.
Kĩ thuật: Skimming & Scanning + Paraphrasing Practice.
Giáo viên hướng dẫn học sinh highlight từ khóa và đối chiếu thông tin để tìm đáp án chính xác.

3. Listening 1 – A Lecture (12–15’):
Học sinh nghe mô tả các bộ phận của smartphone (display, power button, microphone) và hoàn thành lý do cho mỗi bộ phận.
Sau đó nghe tiếp để hoàn thành bảng % dân số có smartphone theo năm.
Kĩ thuật: Listening for Detail + Note-taking.
Hoạt động tương tác: học sinh dự đoán trước số liệu, sau khi nghe chia sẻ kết quả trong chat hoặc breakout room (Prediction Strategy).

4. Grammar and Vocabulary – Will/Won’t (8–10’):
Học sinh hoàn thành quy tắc ngữ pháp cho will/won’t (dự đoán tương lai), đồng thời hoàn thành bảng từ vựng mô tả sự thay đổi (rise, fall, increase, decrease).
Kĩ thuật: Concept Checking Questions + Vocabulary Expansion.
Học sinh viết 2 câu dự đoán về công nghệ trong tương lai (Controlled Output).

5. Writing – Describing a Graph (12–15’):
Học sinh mô tả sự thay đổi của các đường trên biểu đồ đường (Smartphone, Laptop, Smart watch, Tablet) bằng ngôn ngữ mô tả sự thay đổi.
Kĩ thuật: Process Writing + Language Awareness.
Hoạt động tương tác: học sinh chia sẻ một câu mô tả, bạn khác bổ sung thêm chi tiết bằng linking words (Collaborative Writing).

6. Listening 2 (8–10’):
Học sinh nghe Lorenzo mô tả một thiết bị công nghệ muốn mua trong tương lai (Audio 20), nối các câu hỏi với câu trả lời.
Kĩ thuật: Listening for Specific Information.
Giáo viên khuyến khích học sinh dự đoán trước khi nghe (Prediction Strategy).

7. Speaking – Describing a Gadget (10–12’):
Học sinh mô tả một thiết bị công nghệ muốn mua (Long Turn 1–2 phút), nêu lý do và kế hoạch sử dụng.
Kĩ thuật: Extended Speaking Task.
Hoạt động tạo hứng thú: “Partner Swap Talk” – học sinh đổi partner sau mỗi lượt, trình bày ngắn và nhận phản hồi (Rotating Pair Work).
  `,
},
{
  id: "wsi_12_homework",
  learningNodeId: "wsi_12",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset: Review Units 6-10 (75 từ), speaking practice

• Writing Task: Hoàn thành Bài 1.14: Pie chart - Electricity (Tr. 15).
• Listening Section: Hoàn thành C9 - T1 Section 2 (Tr. 58 - 60)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_13_cambridge_practice",
  learningNodeId: "wsi_13",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.14 Pie chart - Electricity (Tr. 15) và Listening C9 (Tr. 58) - T1 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. electricity (n.): Điện (Từ đề bài 1.14).
2. increased (v.): Tăng lên.
3. dramatically (adv.): Đột ngột/Mạnh mẽ.
4. nuclear (adj.): Hạt nhân (Ví dụ: nuclear power).
5. declined (v.): Giảm.
6. refurbishment (n.): Sự tân trang/Sửa chữa (Từ ngữ cảnh nghe).
7. postpone (v.): Trì hoãn.
8. storerooms (n.): Phòng chứa đồ.
9. variety (n.): Sự đa dạng.
10. foyer (n.): Sảnh chờ (Từ ngữ cảnh nghe).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T1 Section 2 (Tr. 58 - 60)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến xây dựng và quy hoạch địa điểm (Ví dụ: refurbishment, foyer).

Chữa bài Writing Task 1: Bài 1.14: Pie chart - Electricity (Tr. 15)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào cách so sánh tỷ lệ (big differences, almost 75%). Nhấn mạnh sự thay đổi theo thời gian (increased dramatically, fell).
  `,
},


{
  id: "wsi_13_mindset_foundation",
  learningNodeId: "wsi_13",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
CORRECT MODULE UNIT 7-8-9-10

Phase 1: UNIT 7 – SKILLS AND ABILITY (25 phút)
Giáo viên sẽ bắt đầu buổi học bằng cách sửa ngữ pháp về khả năng và kỹ năng. Tập trung sửa các lỗi trong bài tập sử dụng Can / Can’t (khả năng hiện tại) và Could / Couldn’t (khả năng trong quá khứ) (U7, Bài tập 7, 8 và 9). Giáo viên cần nhấn mạnh cách phân biệt khi nói về kỹ năng chung (ví dụ: I can write very well) so với những gì họ could làm khi còn nhỏ hoặc trong một tình huống cụ thể trong quá khứ (I couldn’t remember a thing). Sau đó, sửa lỗi về từ vựng Nghề nghiệp (chef, lifeguard, receptionist, teacher) (U7, Bài tập 3) và các Động từ liên quan đến Học tập/Công việc như learn, take (a test/a job), pass, failed, taught (U7, Bài tập 2). Cuối cùng, củng cố việc sử dụng giới từ in, on, at khi nói về thời gian hoặc địa điểm làm việc/học tập (U7, Bài tập 5).

Phase 2: UNIT 8 – HEALTH AND ADVICE (25 phút)
Giáo viên dành 15 phút đầu tiên để sửa ngữ pháp lời khuyên và nghĩa vụ. Trọng tâm là sửa các lỗi về cấu trúc Should / Shouldn’t (U8, Bài tập 4, 6), đặc biệt khi đưa ra lời khuyên về sức khỏe (ví dụ: You should drink five glasses of water a day, We shouldn’t eat fast food). Tiếp theo, sửa các bài tập về Have to / Don’t have to (U8, Bài tập 5, 7), làm rõ sự khác biệt giữa nghĩa vụ (You have to wear special shoes when we play football) và sự không cần thiết (You don’t have to be fit to do yoga). 10 phút còn lại dành để sửa lỗi về từ vựng Sức khỏe và Hoạt động (join a gym, eat fruit and vegetables, get sleep) (U8, Bài tập 1, 2) và từ vựng Phương tiện giao thông (bike, metro, tram, coach, boat) (U8, Language Builder Bài tập 1, 2).

Phase 3: UNIT 9 – LANGUAGE AND PLANS (25 phút)
Giáo viên tập trung sửa ngữ pháp kế hoạch tương lai (15 phút). Sửa chi tiết các bài tập sử dụng Be going to để nói về các kế hoạch đã định (U9, Bài tập 3, 4), đặc biệt trong ngữ cảnh học ngôn ngữ (I am going to buy a paper dictionary). Tiếp theo, củng cố các Collocations quan trọng như make a mistake, take a test/exam, make me laugh (U9, Bài tập 7, 8). 10 phút cuối của Unit 9 được dùng để củng cố sự đối lập giữa Present Perfect và Past Simple trong ngữ cảnh kể về trải nghiệm du lịch (U9, Language Builder Bài tập 4, 8, 9), đảm bảo học sinh phân biệt được khi nào dùng Have you ever been (Present Perfect) và I went to London last year (Past Simple). Sửa các từ vựng về Kinh nghiệm Du lịch (ví dụ: ridden a horse, camped in the desert, flown from the airport).

Phase 4: UNIT 10 – SCIENCE AND TECHNOLOGY & Tổng kết (10 phút)
Giáo viên dành 5 phút để sửa nhanh ngữ pháp dự đoán tương lai bằng Will / Won’t (U10, Bài tập 3) (ví dụ: cars will communicate with each other, there won't be any crashes) và từ vựng Công nghệ cốt lõi (app, download, stream, crash, attachment, memory, features). Giáo viên cũng cần sửa các lỗi sai khi mô tả đồ thị bằng ngôn ngữ thay đổi (increased, fell, rise, fall) (U10, Bài tập 4, 5, 6). 5 phút còn lại được dùng để tổng kết buổi học. Giáo viên yêu cầu học sinh sử dụng các cấu trúc đã học (Should/Have to, Will/Won't) để đưa ra lời khuyên về việc sử dụng công nghệ lành mạnh trong tương lai. Cuối cùng, tóm tắt ba điểm ngữ pháp/từ vựng quan trọng nhất đã sửa và giao bài tập chuẩn bị.
  `,
},


{
  id: "wsi_13_homework",
  learningNodeId: "wsi_13",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset: Skills integration exercises

• Writing Task: Hoàn thành Bài 1.15: Pie chart - Diet (Tr. 16).
• Listening Section: Hoàn thành C9 - T1 Section 3 (Tr. 61 - 64)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_14_cambridge_practice",
  learningNodeId: "wsi_14",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 1.15 Pie chart - Diet (Tr. 16) và Listening C9 (Tr. 61) - T1 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. proportion (n.): Tỷ lệ.
2. carbohydrates (n.): Chất bột đường.
3. fat (n.): Chất béo.
4. higher (adj.): Cao hơn (Ví dụ: higher proportion).
5. lowest (adj.): Thấp nhất.
6. physics (n.): Vật lý (Từ ngữ cảnh nghe).
7. essay (n.): Bài tiểu luận (Từ ngữ cảnh nghe).
8. discussions (n.): Các cuộc thảo luận.
9. research (n.): Nghiên cứu.
10. grades (n.): Điểm số (Ví dụ: physics grades).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T1 Section 3 (Tr. 61 - 64)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các thuật ngữ học thuật và nghiên cứu (values-affirmation, essay, grades).

Chữa bài Writing Task 1: Bài 1.15: Pie chart - Diet (Tr. 16)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào so sánh tỷ lệ dinh dưỡng giữa các loại chế độ ăn (average diet, healthy diet, healthy diet for sport). Sử dụng so sánh tuyệt đối (lowest, highest).
  `,
},

{
  id: "wsi_14_mindset_foundation",
  learningNodeId: "wsi_14",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
REVIEW FOR FINAL TEST: CONTACT ACADEMIC MANAGER FOR CONSOLIDATION MATERIALS
`
},


{
  id: "wsi_14_homework",
  learningNodeId: "wsi_14",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
• Writing Task: Hoàn thành Bài 2.1: Essay 01 - Homework (Tr. 17). (Bắt đầu Task 2)
• Listening Section: Hoàn thành C9 - T1 Section 4 (Tr. 65 - 68)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_15_cambridge_practice",
  learningNodeId: "wsi_15",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.1 Essay 01 - Homework (Tr. 17) và Listening C9 (Tr. 65) - T1 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. aspect (n.): Khía cạnh (Ví dụ: necessary aspect of education).
2. evidence (n.): Bằng chứng (Ví dụ: support the idea).
3. outcomes (n.): Kết quả (Ví dụ: improve educational outcomes).
4. independent (adj.): Độc lập (Ví dụ: independent learning).
5. drawbacks (n.): Hạn chế/Nhược điểm.
6. nanotechnology (n.): Công nghệ nano (Từ ngữ cảnh nghe).
7. implications (n.): Hệ quả/Ảnh hưởng.
8. catalysts (n.): Chất xúc tác.
9. global warming (n. phr.): Sự nóng lên toàn cầu.
10. devices (n.): Thiết bị/Dụng cụ.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T1 Section 4 (Tr. 65 - 68)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ khóa khoa học và công nghệ (nanotechnology, global warming).

Chữa bài Writing Task 2: Bài 2.1: Essay 01 - Homework (Tr. 17)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ trong bài luận (Essay).
• Trọng tâm sửa lỗi: Tập trung vào các từ vựng và cụm từ liên kết (as to, in spite of, in my view) và các từ khóa liên quan đến giáo dục (educational outcomes, independent learning, problem solving).

1ST MOCK TEST FOR MINDSET FOUNDATION

Mindset: Chuẩn bị assessment, ôn tập toàn bộ
  `,
},

{
  id: "wsi_15_mindset_foundation",
  learningNodeId: "wsi_15",
  title: "MINDSET FOUNDATION (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
1ST MOCK TEST FOR MINDSET FOUNDATION 
`
},


{
  id: "wsi_15_homework",
  learningNodeId: "wsi_15",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
  Mindset: Chuẩn bị assessment, ôn tập toàn bộ
• Writing Task: Hoàn thành Bài 2.2: Essay 02 - Private Schools (Tr. 18).
• Listening Section: Hoàn thành C9 - T2 Section 2 (Tr. 69 - 72)

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_16_cambridge_practice",
  learningNodeId: "wsi_16",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.2 Essay 02 - Private Schools (Tr. 18) và Listening C9 (Tr. 69) - T2 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. contribute (v.): Đóng góp (Ví dụ: contribute to state schools).
2. disagree (v.): Không đồng ý.
3. nation (n.): Quốc gia (Ví dụ: productive and prosperous nation).
4. advantages (n.): Lợi ích/Ưu điểm.
5. provide (v.): Cung cấp (Ví dụ: provide such employees).
6. swimming pool (n. phr.): Bể bơi (Từ ngữ cảnh nghe).
7. sculpture (n.): Tượng điêu khắc.
8. safety (n.): Sự an toàn (Ví dụ: Douglas Award for safety).
9. magnificent (adj.): Tráng lệ/Tuyệt vời.
10. architect (n.): Kiến trúc sư.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T2 Section 2 (Tr. 69 - 72)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ vựng liên quan đến dự án xây dựng và giải thưởng (sculpture, award for safety).

Chữa bài Writing Task 2: Bài 2.2: Essay 02 - Private Schools (Tr. 18)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào quan điểm cá nhân (Personally, I completely disagree) và các từ khóa liên quan đến chính sách công (pay our share, equal opportunities, high-quality education system).
  `,
},
{
  id: "wsi_16_mindset_1",
  learningNodeId: "wsi_16",
  title: "MINDSET 1 – UNIT 01: RELATIONSHIPS (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 01: RELATIONSHIPS (90’)
Warm-up & Lead-in (15’): HS giải thích ý nghĩa của các từ vựng về gia đình (sister, brother, cousin, uncle, aunt, niece, grandfather…). Kĩ thuật: Visual Aids + Guided Discovery. Thảo luận về những người sống cùng và những thành viên gia đình khác mà HS thân thiết. Interactive Activity: HS thảo luận về ưu điểm của việc sống trong gia đình mở rộng (extended family), sau đó đọc lướt văn bản để kiểm tra các ưu điểm được đề cập. Kĩ thuật: Skimming + Personalization.

Main Activities (50–55’):
Reading – Short-Answer Questions & Scanning (12–15’): HS đọc văn bản Blood is Thicker than Water, xác định từ khóa trong câu hỏi, quét văn bản để tìm thông tin cụ thể. Trả lời câu hỏi ngắn (NO MORE THAN TWO WORDS AND/OR A NUMBER). Kĩ thuật: Skimming & Scanning + Exam Skills Training. Tương tác: HS chia sẻ câu trả lời và kiểm tra lỗi chính tả (Peer Checking).

Vocabulary & Finding Information (8–10’): HS nối các từ vựng được tô sáng trong văn bản (value, influence, stressed, selfish, gain, proverb, appreciate) với ý nghĩa của chúng, sử dụng ngữ cảnh để suy luận. Kĩ thuật: Contextual Guessing + Vocabulary in Context.

Reading Exam Skills (8–10’): HS đọc văn bản mở rộng về ảnh hưởng của mạng xã hội đối với tình bạn và trả lời câu hỏi NO MORE THAN THREE WORDS.

Listening – Multiple Choice & Specific Details (15–18’): HS nghe và nối các cuộc hội thoại với tình huống (Choosing a gift, Arranging a birthday). Nghe lại để xác định người nói là Nam (M) hay Nữ (F). Nghe và chọn câu trả lời đúng (A/B/C).

Production (20–25’):
Speaking Part 1 & Collocations (12–15’): HS thảo luận về gia đình, xác định collocations (a close family, a small family, a typical family) và trả lời câu hỏi Speaking Part 1.

Pronunciation (8–10’): HS luyện phát âm đúng đuôi -s của động từ số ít (/s/, /z/, /Iz/).

Speaking Exam Skills (8–10’): HS hỏi và trả lời các câu hỏi về gia đình, nói ~20 giây/câu.

Mindset 1: Unit 1 exercises, học 20 từ academic
  `,
},

{
  id: "wsi_16_homework",
  learningNodeId: "wsi_16",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
• Writing Task: Hoàn thành Bài 2.3: Essay 03 - Online Education (Tr. 19).
• Listening Section: Hoàn thành C9 - T2 Section 3 (Tr. 73 - 76).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_17_cambridge_practice",
  learningNodeId: "wsi_17",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.3 Essay 03 - Online Education (Tr. 19) và Listening C9 (Tr. 73) - T2 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. common (adj.): Phổ biến.
2. negatives (n.): Điểm tiêu cực.
3. advantages (n.): Lợi ích/Ưu điểm.
4. development (n.): Sự phát triển.
5. access (n.): Sự tiếp cận (Ví dụ: open access).
6. dissertation (n.): Luận văn (Từ ngữ cảnh nghe).
7. tutorials (n.): Các buổi hướng dẫn.
8. confidence (n.): Sự tự tin.
9. reference (n.): Tài liệu tham khảo.
10. peer-group (n. phr.): Nhóm bạn đồng trang lứa.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T2 Section 3 (Tr. 73 - 76)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ khóa liên quan đến nghiên cứu và kỹ năng học tập (dissertation planning, tutorials, build confidence).

Chữa bài Writing Task 2: Bài 2.3: Essay 03 - Online Education (Tr. 19)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Phân tích cấu trúc bài Positive/Negative Development. Nhấn mạnh các từ khóa về lợi ích (allow learners to study in a flexible way, open access) và các từ liên kết (although, despite the negatives).
  `,
},
{
  id: "wsi_17_mindset_1",
  learningNodeId: "wsi_17",
  title: "MINDSET 1 – UNIT 02: PLACES AND BUILDINGS (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 02: PLACES AND BUILDINGS (90’)

Warm-up & Lead-in (15’): HS mô tả nhà hoặc căn hộ đang sống, thảo luận loại nhà mơ ước như luxury apartment, treehouse, houseboat. Kĩ thuật: Visual Aids + Personalization. Tương tác: HS chia sẻ lý do chọn loại nhà mơ ước.

Main Activities (50–55’):
Reading – Skimming & Scanning (8–10’): HS đọc lướt bài Amazing Homes để xác định chủ đề và từ khóa. Kĩ thuật: Skimming & Scanning + Peer Teaching.

Understanding Paraphrase (8–10’): HS nối từ/cụm từ (permanently, privacy, uncomfortable) với paraphrase. Kĩ thuật: Contextual Guessing + Collaborative Practice.

Sentence Completion (8’): HS hoàn thành câu NO MORE THAN TWO WORDS. Kĩ thuật: Controlled Practice.

Reading Exam Skills (8–10’): HS hoàn thành câu NO MORE THAN THREE WORDS về cảm giác rời nhà. Kĩ thuật: Exam Strategy Practice.

Lead-in & Vocabulary (Writing) (5–7’): HS liệt kê cơ sở vật chất đại học, quan sát bản đồ Sunnyhill University. Kĩ thuật: Brainstorming + Guided Discovery.

Prepositions of Place (8–10’): HS mô tả vị trí các tòa nhà bằng between, next to, opposite. Kĩ thuật: Controlled + Communicative Practice.

Writing – Map Description (Task 1) (12–15’): Phân tích cấu trúc bài viết Task 1, đọc bài mẫu. Kĩ thuật: Process Writing + Exam Skills.

Writing Exam Skills (10–12’): HS mô tả quy trình làm cherry jam, dùng bị động và sequencing expressions. Kĩ thuật: Controlled to Free Writing.

Production (20–25’):
Listening – Places in Town & Spelling (8–10’)
Listening – Short-Answer Questions (8–10’)
Listening Exam Skills (8–10’)
Speaking – Describing Home Town (10–12’)
Speaking Pronunciation – /t/ /d/ /ɪd/
Speaking Exam Skills – Partner swap & feedback

Cambridge: Cam 16 T1 S1-2 note completion  
Mindset 1: Unit 2 exercises, học 20 từ accommodation
  `,
},
{
  id: "wsi_17_homework",
  learningNodeId: "wsi_17",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.4: Essay 04 - Choosing a Subject (Tr. 20).
• Listening Section: Hoàn thành C9 - T2 Section 4 (Tr. 77 - 79).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_18_cambridge_practice",
  learningNodeId: "wsi_18",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.4 Essay 04 - Choosing a Subject (Tr. 20) và Listening C9 (Tr. 77) - T2 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. choice (n.): Sự lựa chọn.
2. forced (v.): Bị bắt buộc.
3. better (adj.): Tốt hơn (Ví dụ: it would be better for students).
4. passion (n.): Niềm đam mê (Từ ngữ cảnh bài viết).
5. predict (v.): Dự đoán.
6. housing (n.): Nhà ở (Từ ngữ cảnh nghe).
7. contemporary (adj.): Đương đại/Hiện đại.
8. professionals (n.): Các chuyên gia.
9. insulation (n.): Vật liệu cách nhiệt.
10. solar panels (n. phr.): Tấm pin mặt trời.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T2 Section 4 (Tr. 77 - 79)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến kiến trúc và môi trường (experimental designs, insulation, solar panels).

Chữa bài Writing Task 2: Bài 2.4: Essay 04 - Choosing a Subject (Tr. 20)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Phân tích cấu trúc Discuss Both Views. Nhấn mạnh từ vựng về sự lựa chọn (choice, preferred areas) và từ khóa thể hiện quan điểm (passion, nobody can really predict).
  `,
},
{
  id: "wsi_18_mindset_1",
  learningNodeId: "wsi_18",
  title: "MINDSET 1 (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Correct exercises in Module Unit 1-2 Mindset 1

  `,
},
{
  id: "wsi_18_homework",
  learningNodeId: "wsi_18",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
  Mindset 1: Unit 3 exercises, học 20 từ sports/culture
• Writing Task: Hoàn thành Bài 2.5: Essay 05 - Equality (Tr. 21).
• Listening Section: Hoàn thành C9 - T3 Section 2 (Tr. 80 - 82).

Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_19_cambridge_practice",
  learningNodeId: "wsi_19",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.5 Essay 05 - Equality (Tr. 21) và Listening C9 (Tr. 80) - T3 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. egalitarian (adj.): Bình đẳng (Ví dụ: egalitarian societies).
2. rights (n.): Quyền lợi.
3. opportunities (n.): Cơ hội.
4. access (n.): Sự tiếp cận (Ví dụ: access to education).
5. merits (n.): Công lao/Giá trị cá nhân.
6. historic (adj.): Thuộc lịch sử (Ví dụ: historic port).
7. costumes (n.): Trang phục (Ví dụ: nineteenth-century costume).
8. peak (n.): Đỉnh điểm (Ví dụ: reached at its peak).
9. excavation (n.): Sự khai quật.
10. maritime (adj.): Thuộc hàng hải (Ví dụ: maritime museum).
II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T3 Section 2 (Tr. 80 - 82)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến lịch sử và bảo tàng (historic port, costumes, maritime).
Chữa bài Writing Task 2: Bài 2.5: Essay 05 - Equality (Tr. 21)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào các từ khóa chính trị-xã hội (egalitarian society, rights and opportunities) và cách bày tỏ quan điểm cá nhân (In my opinion, completely agree).
  `,
},

{
  id: "wsi_19_mindset_1",
  learningNodeId: "wsi_19",
  title: "MINDSET 1 (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 03: EDUCATION AND EMPLOYMENT (90’)
Warm-up & Lead-in (15’): Lead-in: HS phân loại từ vựng thành Work hoặc Studies (employers, qualification, lifelong learning, primary education, seminars). Kĩ thuật: Brainstorming + Guided Discovery. Tương tác: HS thảo luận nhanh theo nhóm, GV tổng hợp kết quả trên bảng.
Main Activities (50–55’): 
Reading – Multiple-Choice Questions (8–10’): HS đọc lướt văn bản Globalisation và xác định quan điểm (tích cực hay tiêu cực) về toàn cầu hóa trong giáo dục. Kĩ thuật: Skimming & Scanning. Tương tác: HS luyện tập tìm nhanh đoạn văn chứa câu trả lời.
Vocabulary (Synonyms) (8–10’): HS nối các từ khóa trong câu hỏi (abroad, benefits, disturbing) với từ có nghĩa tương tự trong văn bản (overseas, advantages, disrupting). Kĩ thuật: Contextual Guessing.
Identifying Main Idea (8’): HS chọn bốn câu đại diện cho ý chính của đoạn văn. Kĩ thuật: Critical Reading.
Multiple-Choice (Alternative Method) (8’): HS viết câu trả lời của riêng mình trước khi xem các tùy chọn A-D, sau đó chọn tùy chọn gần nhất. Kĩ thuật: Exam Strategy Practice.
Reading Exam Skills (8–10’): HS đọc bài Work-Based Learning và chọn tiêu đề phù hợp (Matching Headings) cho các đoạn B-F (i–vii). Kĩ thuật: Exam Simulation.
Lead-in (Writing) (5’): HS nối các dạng biểu đồ (table, bar chart, pie chart, line graph) với tên gọi và thảo luận dạng nào mô tả sự thay đổi theo thời gian. Kĩ thuật: Guided Discovery.
Describing Numbers & Graphs (10–12’): HS phân loại các từ mô tả sự thay đổi (decline, increase, drop, fall, growth, rise) thành danh từ (N) hoặc động từ (V). Hoàn thành câu mô tả bảng số liệu bằng cách sử dụng đúng dạng V/N. Chọn mô tả tốt nhất cho line graph. Phân tích các câu mô tả bar chart và xác định câu không phù hợp. Hoàn thành câu mô tả số liệu bằng giới từ (of, from, to, by, between). Kĩ thuật: Controlled Practice + Language Awareness.
Writing Task 1 (Two Diagrams) (10–12’): HS đọc bài mẫu về tỷ lệ thất nghiệp, tìm câu giới thiệu, overview, mô tả dữ liệu, và từ vựng tránh con số chính xác. Kĩ thuật: Process Writing + Exam Skills.
Describing a Pie Chart (8’): HS nối các cụm từ (over a third, the lowest number of students) với quốc gia tương ứng trong biểu đồ tròn. Kĩ thuật: Controlled Practice.
Writing Exam Skills (10–12’): HS đọc và phân tích biểu đồ cột/tròn về tỷ lệ biết chữ, trả lời các câu hỏi chuẩn bị. Viết bài Task 1, ghi nhớ phải có overview và so sánh. Kĩ thuật: Exam Simulation + Guided Writing.
Production (20–25’): 
Lead-in (Listening/Speaking) (5–7’): HS nối hình ảnh với lĩnh vực công việc/học tập (hotel and catering, IT, construction). Phân loại từ vựng thành Job (J) hoặc Course (C). Hoàn thành bảng Job/Area/Course. Nghe và xác định người nói đang nói về công việc hay khóa học. Kĩ thuật: Communicative Practice.
Listening – Sentence Completion (8–10’): HS gạch chân từ khóa trong câu hỏi, nối câu hỏi với loại thông tin cần nghe (job, number, date, name). Nghe và hoàn thành câu (NO MORE THAN TWO WORDS). Kĩ thuật: Listening for Specific Information.
Listening Exam Skills (8–10’): HS đặt các chủ đề (the price of the course, the location of the course) theo thứ tự sẽ được đề cập trong hội thoại. Nối từ/cụm từ với synonyms. Nghe và hoàn thành câu (NO MORE THAN TWO WORDS AND/OR A NUMBER). Kĩ thuật: Exam Strategy Practice.
Vocabulary (Feelings/Experience) (8–10’): HS nối hình ảnh với các lĩnh vực công việc. Phân biệt từ mô tả cảm xúc (F) và trải nghiệm (E) (tired, great, boring, embarrassed). Hoàn thành bảng (amazed vs amazing). Chọn từ đúng trong câu để mô tả cảm xúc/trải nghiệm. Kĩ thuật: Vocabulary Awareness.
Speaking: Part 1 & Pronunciation (8–10’): HS nghe Nina nói, xác định cô ấy là sinh viên/người đi làm và các chủ đề được đề cập theo thứ tự. Luyện tập phát âm các âm bắt đầu bằng hai phụ âm (student, scarf, plastic). Kĩ thuật: Pronunciation Drills + Communicative Practice.
Speaking: Part 2 (Organization) (10–12’): HS xác định ba lĩnh vực chủ đề có khả năng là Part 2. Sắp xếp các giai đoạn chuẩn bị và nói Part 2 theo đúng thứ tự (A–F). Gạch chân từ khóa trên thẻ Part 2 (what you learnt, how you learnt it). Nối từ khóa với ghi chú của thí sinh. Luyện tập giới thiệu bài nói. Kĩ thuật: Exam Simulation + Extended Speaking Task.
Mindset 1: Unit 4 exercises, học 20 từ travel
  `,
},

{
  id: "wsi_19_homework",
  learningNodeId: "wsi_19",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.6: Essay 06 - Admissions Based on Gender (Tr. 22).
• Listening Section: Hoàn thành C9 - T3 Section 3 (Tr. 83 - 87)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_20_cambridge_practice",
  learningNodeId: "wsi_20",
  title: "CAMBRIDGE PRACTICE (15 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.6 Essay 06 - Admissions Based on Gender (Tr. 22) và Listening C9 (Tr. 83) - T3 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. admissions (n.): Sự tuyển sinh.
2. equal (adj.): Bằng nhau (Ví dụ: equal numbers of students).
3. unrealistic (adj.): Phi thực tế.
4. applicants (n.): Ứng viên/Người nộp đơn.
5. qualifications (n.): Bằng cấp/Chuyên môn.
6. competitive (adj.): Cạnh tranh.
7. modules (n.): Các học phần.
8. deadline (n.): Hạn chót.
9. reference (n.): Thư giới thiệu.
10. academic ability (n. phr.): Năng lực học thuật.
II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T3 Section 3 (Tr. 83 - 87)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến học tập và thủ tục (competitive, deadline, reference).
Chữa bài Writing Task 2: Bài 2.6: Essay 06 - Admissions Based on Gender (Tr. 22)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Tập trung vào các lập luận về tính thực tế (unrealistic, practical concerns) và tính công bằng (unfair, based on merit).
  `,
},
{
  id: "wsi_20_mindset_1",
  learningNodeId: "wsi_20",
  title: "MINDSET 1 (90 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 04: FOOD AND DRINK (90’)
Warm-up & Lead-in (15’): Lead-in: HS phân loại thực phẩm thành danh từ đếm được (Countable) và không đếm được (Uncountable). Thảo luận về thói quen ăn uống và các món ăn điển hình của quốc gia. Kĩ thuật: Brainstorming + Guided Discovery. Tương tác: HS chia sẻ món ăn yêu thích và thói quen ăn uống hằng ngày.
Main Activities (50–55’): 
Reading – Locating Information & Paraphrase (10–12’): HS đọc văn bản nhanh và nhớ lại thông tin. Tìm kiếm nhanh các chi tiết cụ thể (ví dụ: a food that can be used as a “glue”). Nhận biết paraphrase để nối câu hỏi (Who dislikes the takeaway culture?) với bằng chứng trong văn bản. Kĩ thuật: Skimming & Scanning + Paraphrase Recognition.
Sentence Completion (Reading) (8’): HS hoàn thành câu bằng MỘT TỪ lấy từ văn bản. Kĩ thuật: Controlled Practice. Tương tác: HS chia sẻ câu dễ nhầm nhất và thảo luận lý do.
Reading Exam Skills (10–12’): HS đọc bài báo về Food TV, xác định đoạn văn chứa thông tin cụ thể (lịch sử chef, số lượng show TV). Nối mô tả về các đầu bếp nổi tiếng (cooked food not good for you, helped children eat healthy food) với tên đầu bếp. Kĩ thuật: Exam Strategy Practice + Keyword Highlighting.
Lead-in (Writing) (5’): HS phân tích hai sơ đồ (takeaway, Indian restaurants), nối các cụm từ mô tả (highest proportion, steady increase) với sơ đồ phù hợp. Kĩ thuật: Guided Discovery.
Writing – Describing Data (Task 1) (10–12’): HS hoàn thành câu giới thiệu và tổng quan (overview) cho hai sơ đồ. Nối các tỷ lệ phần trăm từ biểu đồ tròn với mô tả bằng chữ (just over a third, about a quarter). Hoàn thành câu so sánh takeaways bằng fewer, least, less, more, most. Nối các số liệu không chính xác với mô tả tương ứng (approximately, around half a million). Kĩ thuật: Controlled Practice + Language Awareness.
Writing – Studying a Model Answer (8–10’): HS đọc bài mẫu cho Task 1 (hai sơ đồ), tìm hai câu nên loại bỏ (vì chứa thông tin ngoài). Tìm kiếm trong bài mẫu các phần tử cấu trúc (overview, comparison, expression to avoid exact numbers). Kĩ thuật: Process Writing + Exam Skills.
Writing Exam Skills (8–10’): HS phân tích biểu đồ (obesity), trả lời các câu hỏi chuẩn bị trước khi viết. Viết báo cáo Task 1 theo các nhắc nhở. Kĩ thuật: Exam Simulation + Guided Writing.
Production (20–25’): 
Lead-in (Listening) (5–7’): HS nối hình ảnh với cách chuẩn bị thức ăn (bake, boil, fry, grill). Phân loại từ vựng thực phẩm vào các nhóm (Meat, Vegetables, Sweets). Kĩ thuật: Visual Aids + Vocabulary Categorization.
Listening – Matching Tasks (8–10’): HS nghe hội thoại, nối gợi ý với câu trả lời/kết quả. Nghe và xác định phương pháp chế biến. Nghe và nối cửa hàng với loại thực phẩm (A–D). Nghe radio, nối nhà hàng với loại hình (A–G). Kĩ thuật: Listening for Specific Information.
Listening – Synonym and Paraphrase (8’): HS tìm các từ/cụm từ trong script có nghĩa tương đương (crowded, delicious, cheap). Chọn tùy chọn KHÔNG đồng nghĩa với câu gốc. Kĩ thuật: Synonym Recognition.
Listening – Classification Tasks (8’): HS nghe chef nói, nối các tuyên bố (1–5) với quốc gia (A–C). Kĩ thuật: Listening for Detail + Categorization.
Listening Exam Skills (8–10’): HS chọn bốn loại thực phẩm (A–F) tương ứng với mô tả (thường được trẻ em thích? cần chuyên môn để làm?). Kĩ thuật: Exam Simulation.
Speaking – Expressing Opinions & Part 2 (10–12’): HS nghe Mohammed nói về ẩm thực và xác định các cụm từ thể hiện ý kiến tích cực hoặc tiêu cực. Nghe Angelica nói về bữa ăn phổ biến, trả lời câu hỏi. Nối các điểm trên thẻ Part 2 với ghi chú của thí sinh. Phân loại các cụm từ thành Introduction (I) hoặc Conclusion (C). Kĩ thuật: Communicative Practice + Exam Strategy.
Mindset 1: Unit 5 exercises, học 20 từ food culture
  `,
},
{
  id: "wsi_20_homework",
  learningNodeId: "wsi_20",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.7: Essay 07 - Music (Tr. 23).
• Listening Section: Hoàn thành C9 - T3 Section 4 (Tr. 88 - 90)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_21_cambridge_practice",
  learningNodeId: "wsi_21",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.7 Essay 07 - Music (Tr. 23) và Listening C9 (Tr. 88) - T3 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. variety (n.): Sự đa dạng.
2. vital (adj.): Sống còn/Quan trọng.
3. traditional (adj.): Truyền thống.
4. identity (n.): Bản sắc.
5. contrast (n.): Sự tương phản (Ví dụ: in contrast).
6. celebrates (v.): Kỷ niệm/Tôn vinh.
7. composer (n.): Nhà soạn nhạc.
8. orchestral (adj.): Thuộc dàn nhạc giao hưởng.
9. contemporary (adj.): Đương đại.
10. handover (n.): Sự bàn giao (Ví dụ: flag handover ceremony).
II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T3 Section 4 (Tr. 88 - 90)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến âm nhạc và sự kiện (composer, orchestral piece, flag handover ceremony).
Chữa bài Writing Task 2: Bài 2.7: Essay 07 - Music (Tr. 23)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ.
• Trọng tâm sửa lỗi: Phân tích câu hỏi kép (Why do we need music? Is traditional music more important?). Tập trung vào từ vựng liên quan đến văn hóa (vital part of all human cultures, sense of identity).
  `,
},
{
  id: "wsi_21_mindset_1",
  learningNodeId: "wsi_21",
  title: "MINDSET 1",
  type: "paragraph",
  order: 2,
  content: `
Correct exercises in Module Unit 3–4 Mindset 1

Mindset 1: Unit 6 exercises, học 20 từ urban planning
  `,
},
{
  id: "wsi_21_homework",
  learningNodeId: "wsi_21",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.8: Essay 08 - Supporting Artists (Tr. 24).
• Listening Section: Hoàn thành C9 - T4 Section 2 (Tr. 91 - 94).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_22_cambridge_practice",
  learningNodeId: "wsi_22",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.8 Essay 08 - Supporting Artists (Tr. 24) và Listening C9 (Tr. 91) - T4 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. funding (n.): Sự tài trợ (Ví dụ: funding of creative artists).
2. support (n.): Sự hỗ trợ (Ví dụ: government support).
3. alternative (adj.): Thay thế (Ví dụ: alternative sources of support).
4. necessary (adj.): Cần thiết.
5. depend (v.): Phụ thuộc (Ví dụ: rely on alternative sources).
6. gardens (n.): Khu vườn (Từ ngữ cảnh nghe).
7. replanted (v.): Được trồng lại.
8. cafe (n.): Quán cà phê.
9. donation (n.): Khoản quyên góp.
10. accessible (adj.): Có thể tiếp cận.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T4 Section 2 (Tr. 91 - 94)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến cảnh quan và dịch vụ công cộng (formal gardens, cafe, donation).

Chữa bài Writing Task 2: Bài 2.8: Essay 08 - Supporting Artists (Tr. 24)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Tập trung vào các lập luận về tài trợ (funding, government support, alternative sources). Củng cố cách dùng liên từ tương phản (while, but, although).
  `,
},
{
  id: "wsi_22_mindset_1",
  learningNodeId: "wsi_22",
  title: "MINDSET 1 – UNIT 05: CONSUMERISM (90’)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 05: CONSUMERISM (90’)

Warm-up & Lead-in (15’): HS phân loại từ vựng thành Good points, Bad points, Opinion cho chủ đề mua sắm online.  
Kĩ thuật: Brainstorming + Guided Discovery.

Main Activities (50–55’):
• Part 2 Question Types: Nối loại câu hỏi Part 2 với hành động cần làm.  
• Writing an Introduction: Phân tích và viết Introduction cho chủ đề cashless society.  
• Developing an Argument: Nối ý chính với ví dụ minh họa.  
• Studying a Model Essay: Phân tích bài luận mẫu về cửa hàng nhỏ.  
• Writing Exam Skills: Viết bài luận Agree/Disagree về shopping mall.

Production (20–25’):
• Listening: Nhận diện distractors, paraphrase và MCQs về mua sắm.  
• Speaking: Thảo luận thói quen mua sắm, chuẩn bị và nói Part 2 (2 phút).
  `,
},
{
  id: "wsi_22_homework",
  learningNodeId: "wsi_22",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset 1: Unit 7 exercises, học 20 từ career

• Writing Task: Hoàn thành Bài 2.9: Essay 09 - Economic Progress (Tr. 25).
• Listening Section: Hoàn thành C9 - T4 Section 3 (Tr. 95 - 98).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_23_cambridge_practice",
  learningNodeId: "wsi_23",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.9 Essay 09 - Economic Progress (Tr. 25) và Listening C9 (Tr. 95) - T4 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. economic (adj.): Thuộc kinh tế.
2. growth (n.): Tăng trưởng.
3. essential (adj.): Thiết yếu.
4. employment (n.): Việc làm (Ví dụ: job creation, high level of employment).
5. infrastructure (n.): Cơ sở hạ tầng.
6. gender (n.): Giới tính.
7. attitude (n.): Thái độ.
8. motivation (n.): Động lực.
9. confidence (n.): Sự tự tin.
10. observe (v.): Quan sát.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T4 Section 3 (Tr. 95 - 98)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến tâm lý học và giáo dục (values-affirmation, attitude, confidence).

Chữa bài Writing Task 2: Bài 2.9: Essay 09 - Economic Progress (Tr. 25)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích các mục tiêu của chính phủ (economic progress vs other types of progress). Tập trung vào từ khóa kinh tế (job creation, revenue, strong economy) và các tiêu chí khác (social, environmental and health criteria).
  `,
},
{
  id: "wsi_23_mindset_1",
  learningNodeId: "wsi_23",
  title: "MINDSET 1 – UNIT 06: LEISURE TIME (90’)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 06: LEISURE TIME (90’)

Warm-up & Lead-in (15’): HS nối các môn thể thao với hành động tương ứng và chia sẻ trải nghiệm cá nhân.  
Kĩ thuật: Visual Aids + Guided Discovery.

Main Activities (50–55’):
• Reading T/F/NG & Summary Completion về các môn thể thao khác thường.  
• Reading Exam Skills: Parkour (T/F/NG + Summary Completion).  
• Writing: Đánh giá bài luận Part 2, luyện linking ideas, viết Agree/Disagree.  

Production (20–25’):
• Listening – Map Labelling & Exam Skills.  
• Speaking: Mô tả hoạt động giải trí, luyện linking words và weak forms, thực hành Part 2.
  `,
},
{
  id: "wsi_23_homework",
  learningNodeId: "wsi_23",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset 1: Unit 8 exercises, học 20 từ healthcare

• Writing Task: Hoàn thành Bài 2.10: Essay 10 - Business Responsibilities (Tr. 26).
• Listening Section: Hoàn thành C9 - T4 Section 4 (Tr. 99 - 101).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_24_cambridge_practice",
  learningNodeId: "wsi_24",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.10 Essay 10 - Business Responsibilities (Tr. 26) và Listening C9 (Tr. 99) - T4 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. profit (n.): Lợi nhuận (Ví dụ: make a profit).
2. social (adj.): Thuộc xã hội (Ví dụ: social obligations).
3. obligations (n.): Nghĩa vụ.
4. community (n.): Cộng đồng.
5. impact (n.): Tác động.
6. urban planning (n.): Quy hoạch đô thị.
7. redevelopment (n.): Sự tái phát triển.
8. facilities (n.): Cơ sở vật chất.
9. auditorium (n.): Khán phòng.
10. council (n.): Hội đồng (Ví dụ: council will restore).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C9 - T4 Section 4 (Tr. 99 - 101)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến phát triển đô thị và dịch vụ công cộng (redevelopment, auditorium, nature reserve).

Chữa bài Writing Task 2: Bài 2.10: Essay 10 - Business Responsibilities (Tr. 26)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích câu hỏi đồng ý/không đồng ý (To what extent do you agree...). Tập trung vào từ vựng liên quan đến trách nhiệm (social obligations, financial objectives).
  `,
},
{
  id: "wsi_24_mindset_1",
  learningNodeId: "wsi_24",
  title: "MINDSET 1 (90’)",
  type: "paragraph",
  order: 2,
  content: `
Correct exercises in Module Unit 5–6 Mindset 1

Mindset 1: Unit 9 exercises, học 20 từ multilingual
  `,
},
{
  id: "wsi_24_homework",
  learningNodeId: "wsi_24",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.11: Essay 11 - Environment Damage (Tr. 27).
• Listening Section: Hoàn thành C10 - T1 Section 2 (Tr. 102 - 104).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_25_cambridge_practice",
  learningNodeId: "wsi_25",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.11 Essay 11 - Environment Damage (Tr. 27) và Listening C10 (Tr. 102) - T1 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. responsible (adj.): Chịu trách nhiệm.
2. damage (n.): Thiệt hại/Hư hại.
3. reduce (v.): Giảm bớt.
4. address (v.): Giải quyết (Ví dụ: address these problems).
5. individuals (n.): Các cá nhân.
6. equipment (n.): Thiết bị/Dụng cụ.
7. trained (v.): Được đào tạo.
8. overtime (n.): Làm thêm giờ.
9. regulations (n.): Quy tắc/Quy định.
10. physical (adj.): Thuộc thể chất.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T1 Section 2 (Tr. 102 - 104)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các quy định nơi làm việc và sức khỏe (equipment, trained, physical fit).

Chữa bài Writing Task 2: Bài 2.11: Essay 11 - Environment Damage (Tr. 27)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích cấu trúc Problem/Solution. Tập trung vào từ vựng liên quan đến môi trường (environmental problems, reduce the damage) và các tác nhân (governments and individuals).
  `,
},
{
  id: "wsi_25_mindset_1",
  learningNodeId: "wsi_25",
  title: "MINDSET 1 (90’)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 07: FAME AND THE MEDIA (90’)

Warm-up & Lead-in (15’): HS kể tên các công cụ tìm kiếm, trang tin tức, mạng xã hội. Thảo luận về mục đích sử dụng Internet. Kĩ thuật: Brainstorming + Guided Discovery. Tương tác: HS chia sẻ thói quen sử dụng Internet, GV tổng hợp và phân loại theo mục đích (học tập, giải trí, giao tiếp).

Main Activities (50–55’):
Reading – Skim Reading & Matching Features (8–10’): HS đọc lướt văn bản và xác định mục đích. Nối các tính năng với nền tảng mạng xã hội (A–E).  
Reading – Identifying the Writer’s Views (8–10’): HS phân tích quan điểm tác giả, làm YES/NO/NOT GIVEN.  
Reading Exam Skills (10–12’): HS đọc văn bản về các loài động vật nổi tiếng, làm Matching Features và YES/NO/NOT GIVEN.  

Lead-in (Writing) (5’): HS phân loại từ vựng (celebrity, reporter, wealthy, paparazzi).  
Writing – Part 2 Paragraphs (8–10’): Phân tích đoạn văn mẫu, xác định Point & Evidence.  
Writing – Giving Specific Examples (8–10’): Bổ sung ví dụ cụ thể, tránh lặp từ.  
Writing Exam Skills (10–12’): Viết bài luận Part 2 theo kế hoạch và checklist.

Production (20–25’):
Listening – Flow-Chart Completion / Prediction / Technical Flow-Charts / Exam Skills.  
Speaking – Part 2 & Part 3: Nói về người nổi tiếng, sử dụng linking words, phân tích dạng câu hỏi Part 3.
  `,
},
{
  id: "wsi_25_homework",
  learningNodeId: "wsi_25",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset 1: Unit 10 exercises, học 20 từ technology

• Writing Task: Hoàn thành Bài 2.12: Essay 12 - Technology & Relationships (Tr. 28).
• Listening Section: Hoàn thành C10 - T1 Section 3 (Tr. 105 - 109).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_26_cambridge_practice",
  learningNodeId: "wsi_26",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.12 Essay 12 - Technology & Relationships (Tr. 28) và Listening C10 (Tr. 105) - T1 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. technology (n.): Công nghệ.
2. interact (v.): Tương tác.
3. relationships (n.): Các mối quan hệ.
4. development (n.): Sự phát triển.
5. positive (adj.): Tích cực.
6. negative (adj.): Tiêu cực.
7. abroad (adv.): Ở nước ngoài.
8. documentary (n.): Phim tài liệu.
9. ignore (v.): Phớt lờ.
10. textbooks (n.): Sách giáo khoa.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T1 Section 3 (Tr. 105 - 109)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến khóa học và tài liệu (textbooks, documentary).

Chữa bài Writing Task 2: Bài 2.12: Essay 12 - Technology & Relationships (Tr. 28)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích ảnh hưởng của công nghệ lên quan hệ (affected relationships in various ways). Sử dụng các từ so sánh/đối chiếu quan điểm (positive and negative outcomes).
  `,
},
{
  id: "wsi_26_mindset_1",
  learningNodeId: "wsi_26",
  title: "MINDSET 1 (90’)",
  type: "paragraph",
  order: 2,
  content: `
LESSON PLAN – Unit 08: NATURAL WORLD (90’)

Warm-up & Lead-in (15’): HS xác định các cặp từ đồng nghĩa/trái nghĩa (predator/prey, conservation/protection). Kĩ thuật: Vocabulary Categorization + Guided Discovery. Tương tác: thảo luận cặp đôi, GV tổng hợp và minh họa bằng ví dụ.

Main Activities (50–55’):
Reading – Notes Completion (10–12’): Đọc và hoàn thành ghi chú về cá heo/cá voi cứu người (NO MORE THAN TWO / THREE WORDS).  
Reading – Matching Sentence Endings (8–10’): Nối phần đầu – cuối câu đúng.  
Reading Exam Skills (10–12’): Làm Note Completion và Matching Sentence Endings về sở thú.

Writing:
Lead-in (5’): Cặp từ cố định (endangered species, fossil fuels).  
Writing a Conclusion (8–10’): Xác định summary / prediction / recommendation.  
Writing – Linking Main Ideas (8–10’): Phân tích bài mẫu, liên kết ý.  
Writing Exam Skills (10–12’): Lập dàn ý và viết Task 2 về Global Warming (Causes & Solutions).

Production (20–25’):
Listening – Note Completion & Exam Skills: hoàn thành ghi chú về mountain gorilla, American bullfrog, box jellyfish.  
Speaking – Part 2 & Part 3: Mô tả động vật hoang dã, thảo luận Pets & Zoos, phát triển câu trả lời bằng lý do và ví dụ.
  `,
},
{
  id: "wsi_26_homework",
  learningNodeId: "wsi_26",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Mindset 1: Review Units 1–5, vocabulary test (100 từ)

• Writing Task: Hoàn thành Bài 2.13: Essay 13 - Traditions and Technology (Tr. 29).
• Listening Section: Hoàn thành C10 - T1 Section 4 (Tr. 110 - 112).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_27_cambridge_practice",
  learningNodeId: "wsi_27",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.13 Essay 13 - Traditions and Technology (Tr. 29) và Listening C10 (Tr. 110) - T1 Section 4 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. inevitable (adj.): Không thể tránh khỏi.
2. traditional cultures (n. phr.): Các nền văn hóa truyền thống.
3. incompatible (adj.): Không tương thích.
4. loss (n.): Sự mất mát (Ví dụ: lead to the loss of).
5. societies (n.): Các xã hội.
6. fitness (n.): Sự cân đối/Sức khỏe.
7. consultation (n.): Sự tư vấn.
8. individual (adj.): Cá nhân (Ví dụ: individual programme).
9. strength (n.): Sức mạnh/Thể lực.
10. endurance (n.): Sức bền.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T1 Section 4 (Tr. 110 - 112)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến thể thao và sức khỏe (fitness, consultation, endurance).

Chữa bài Writing Task 2: Bài 2.13: Essay 13 - Traditions and Technology (Tr. 29)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích mức độ đồng ý/không đồng ý (partly agree). Tập trung vào từ khóa (technological developments, traditional cultures, incompatible).
  `,
},
{
  id: "wsi_27_mindset_1",
  learningNodeId: "wsi_27",
  title: "MINDSET 1",
  type: "paragraph",
  order: 2,
  content: `
Correct exercises in Module Unit 7–8 Mindset 1

Mindset 1: Review Units 6–10, listening practice
  `,
},
{
  id: "wsi_27_homework",
  learningNodeId: "wsi_27",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.14: Essay 14 - Video Games (Tr. 30).
• Listening Section: Hoàn thành C10 - T2 Section 2 (Tr. 113 - 116).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_28_cambridge_practice",
  learningNodeId: "wsi_28",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.14 Essay 14 - Video Games (Tr. 30) và Listening C10 (Tr. 113) - T2 Section 2 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. harmless (adj.): Vô hại.
2. adverse (adj.): Bất lợi/Tiêu cực (Ví dụ: adverse effect).
3. outweigh (v.): Quan trọng hơn.
4. entertaining (adj.): Giải trí.
5. drawbacks (n.): Nhược điểm.
6. finalising (v.): Hoàn tất (Ví dụ: finalising plans).
7. negotiate (v.): Đàm phán.
8. rehearsal (n.): Buổi diễn tập.
9. director (n.): Đạo diễn.
10. production (n.): Sự sản xuất/Vở kịch.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T2 Section 2 (Tr. 113 - 116)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến kịch nghệ và du lịch (finalising plans, rehearsal, director).

Chữa bài Writing Task 2: Bài 2.14: Essay 14 - Video Games (Tr. 30)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích cấu trúc Drawbacks Outweigh Benefits. Tập trung vào các thuật ngữ liên quan đến trò chơi (virtual worlds, addiction) và các từ liên kết (On the one hand, However, I would argue).

REVIEW FOR 1ST TEST: CONTACT ACADEMIC MANAGER FOR CONSOLIDATION MATERIALS
  `,
},
{
  id: "wsi_28_mindset_1",
  learningNodeId: "wsi_28",
  title: "MINDSET 1",
  type: "paragraph",
  order: 2,
  content: `
Mindset 1: Speaking Part 2 practice, cue cards
  `,
},
{
  id: "wsi_28_homework",
  learningNodeId: "wsi_28",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
• Writing Task: Hoàn thành Bài 2.15: Essay 15 - Festivals (Tr. 31).
• Listening Section: Hoàn thành C10 - T2 Section 3 (Tr. 117 - 121).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_29_cambridge_practice",
  learningNodeId: "wsi_29",
  title: "CAMBRIDGE PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
GIÁO ÁN: Bài 2.15 Essay 15 - Festivals (Tr. 31) và Listening C10 (Tr. 117) - T2 Section 3 (30 PHÚT) - TRỢ GIẢNG

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. religious (adj.): Thuộc tôn giáo.
2. meaning (n.): Ý nghĩa.
3. forgotten (v.): Quên.
4. opportunities (n.): Cơ hội.
5. priority (n.): Sự ưu tiên.
6. obesity (n.): Béo phì (Từ ngữ cảnh nghe).
7. aerobic (adj.): Thuộc thể dục nhịp điệu (Ví dụ: aerobic exercise).
8. nutrition (n.): Dinh dưỡng.
9. experiment (n.): Thí nghiệm.
10. ethics (n.): Đạo đức (Ví dụ: ethics approval).

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T2 Section 3 (Tr. 117 - 121)  
Thời lượng: 10 phút  
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến sức khỏe, nghiên cứu và đạo đức (obesity, aerobic exercise, ethics approval).

Chữa bài Writing Task 2: Bài 2.15: Essay 15 - Festivals (Tr. 31)  
Thời lượng: 10 phút  
• Hoạt động: Chữa bài điền từ.  
• Trọng tâm sửa lỗi: Phân tích quan điểm về lễ hội truyền thống (meaning behind traditional or religious festivals). Tập trung vào từ khóa forgotten và việc ưu tiên niềm vui (enjoyment seems to be the priority).

REVIEW FOR 1ST TEST: CONTACT ACADEMIC MANAGER FOR CONSOLIDATION MATERIALS
  `,
},
{
  id: "wsi_29_homework",
  learningNodeId: "wsi_29",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
• Writing Task: Ôn tập lại các task đã làm.
• Listening Section: Hoàn thành C10 - T2 Section 4 (Tr. 122 - 125).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_30_teacher_note",
  learningNodeId: "wsi_30",
  title: "GIÁO VIÊN",
  type: "paragraph",
  order: 3,
  content: `
Foundation Completion Test: Comprehensive assessment + transition to Intensive
  `,
},
{
  id: "wsi_31_expert_5_core",
  learningNodeId: "wsi_31",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 1A: Smart Learners (90’)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về đặc điểm của người học giỏi. Giáo viên gợi mở bằng câu hỏi dẫn dắt để học sinh chia sẻ kinh nghiệm cá nhân. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên đóng vai bạn học.
Reading (25’): Reading – học sinh đọc nhanh bài đọc và chọn mục đích của đoạn văn. Phương pháp: Skimming + Prediction Strategy. Sau đó nối các ý chính (1–5) với đoạn văn (A–E). Phương pháp: Matching Task + Peer Checking. Tiếp tục gạch chân từ khóa và so sánh với bạn học. Phương pháp: Exam Skills Training. Cuối cùng học sinh trả lời câu hỏi ngắn (NO MORE THAN THREE WORDS) và thảo luận về các đặc điểm giúp bản thân trở thành người học tốt hơn. Phương pháp: Controlled Practice + Communicative Practice.
Listening (15’): Listening – học sinh nghe và hoàn thành ghi chú. Trước khi nghe, luyện tập dự đoán câu trả lời (ngày tháng, số). Phương pháp: Listening for Detail + Prediction Strategy. Tương tác: học sinh chia sẻ dự đoán trước khi nghe, sau khi nghe đối chiếu kết quả với bạn.
Speaking (15’): Speaking – học sinh thảo luận về khóa học, sở thích và thành phố. Phương pháp: Communicative Practice. Học sinh lắng nghe và gạch chân tính từ được sử dụng để mô tả. Phương pháp: Active Listening + Vocabulary Expansion. Sau đó luyện tập đưa ra ý kiến và lý do, sử dụng từ nối (and, as, because, but, in fact, so, that’s why). Phương pháp: Controlled Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (25’): Writing – học sinh viết bài luận Task 2 về ưu và nhược điểm của việc học ở nước ngoài. Đầu tiên đọc bài luận mẫu và nối các phần (1–4) với đoạn văn (A–D: disadvantages, introducing the topic, conclusion, advantages). Phương pháp: Guided Discovery + Exam Skills. Sau đó luyện tập thêm điểm hỗ trợ cho mỗi ưu/nhược điểm. Phương pháp: Brainstorming + Controlled Writing. Cuối cùng học sinh viết đoạn ngắn (3–4 câu) cho một ưu điểm và một nhược điểm. Phương pháp: Process Writing.
  `,
},
{
  id: "wsi_31_teaching_assistant",
  learningNodeId: "wsi_31",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 1: STUDENT ROOMS PLANS (Tr. 2) và Listening C10 (Tr. 126) - T3 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. layout (n.): Bố cục.
2. accommodate (v.): Chứa.
3. capacity (n.): Sức chứa.
4. features (n.): Đặc điểm/Tính năng.
5. larger (adj.): Lớn hơn.
6. evolving (v.): Phát triển/Thay đổi (Từ ngữ cảnh nghe).
7. obsolete (adj.): Lỗi thời.
8. funding (n.): Quỹ/Tài trợ.
9. archive (n.): Kho lưu trữ.
10. budget (n.): Ngân sách.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T3 Section 2 (Tr. 126 - 129)
Thời lượng: 10 phút
• Hoạt động: Yêu cầu học viên tự kiểm tra đáp án. Trợ giảng chữa lỗi, tập trung vào từ vựng liên quan đến thư viện/cơ sở vật chất (budget, archive, evolving) và các lỗi chính tả.

Chữa bài Writing Task 1: BÀI 1: STUDENT ROOMS PLANS (Tr. 2)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Tập trung vào từ vựng miêu tả bố cục (layout), sức chứa (accommodate, capacity) và so sánh (larger, differences).
  `,
},
{
  id: "wsi_31_homework",
  learningNodeId: "wsi_31",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Present Simple, Vocabulary – Studying & Reading Skills.
• Writing Task: Hoàn thành BÀI 2: CAR ADVERTISING EXPENDITURE (Tr. 3).
• Listening Section: Hoàn thành C10 - T3 Section 3 (Tr. 130 - 134).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_32_expert_5_core",
  learningNodeId: "wsi_32",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 1B: Studying at University (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về trải nghiệm học tập tại trường đại học, so sánh giữa học lý thuyết và thực hành. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp hoặc nhóm nhỏ, trong lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – học sinh nghe và hoàn thành ghi chú (Notes Completion – Section 1). Trước khi nghe, luyện tập dự đoán loại thông tin cần điền (ngày tháng, số, tên). Phương pháp: Listening for Detail + Prediction Strategy. Tương tác: học sinh chia sẻ dự đoán trước khi nghe, sau khi nghe đối chiếu kết quả với bạn học hoặc giáo viên.
Reading (20’): Reading – học sinh đọc văn bản về khóa học kinh doanh và trả lời câu hỏi ngắn (CHOOSE NO MORE THAN TWO WORDS). Phương pháp: Skimming & Scanning + Controlled Practice. Sau đó thảo luận xem lý thuyết hay thực hành có giá trị hơn trong kinh doanh. Phương pháp: Communicative Practice + Critical Thinking. Tương tác: thảo luận nhóm nhỏ hoặc breakout room online, trong lớp 1-1 giáo viên đóng vai bạn học để trao đổi.
Writing (25’): Writing – học sinh lập dàn ý cho bài luận Advantages/Disadvantages về việc học tại đại học, ghi chú các ưu và nhược điểm. Phương pháp: Brainstorming + Guided Discovery. Sau đó viết hai đoạn văn mẫu về ưu và nhược điểm. Phương pháp: Process Writing + Controlled Practice. Tương tác: học sinh chia sẻ đoạn văn với bạn học hoặc giáo viên, nhận phản hồi và chỉnh sửa.
Speaking (20’): Speaking – học sinh luyện tập hỏi và trả lời về các kỹ năng và hoạt động (Speaking Part 1). Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_32_teaching_assistant",
  learningNodeId: "wsi_32",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 2: CAR ADVERTISING EXPENDITURE (Tr. 3) và Listening C10 (Tr. 130) - T3 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. expenditure (n.): Chi tiêu.
2. largest (adj.): Lớn nhất.
3. format (n.): Định dạng.
4. opposite (n.): Sự đối lập.
5. advertising (n.): Quảng cáo.
6. episodic (adj.): Thuộc từng giai đoạn.
7. semantic (adj.): Thuộc ngữ nghĩa.
8. encoding (n.): Mã hóa.
9. retrieval (n.): Sự truy xuất.
10. neurological (adj.): Thuộc thần kinh.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T3 Section 3 (Tr. 130 - 134)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các thuật ngữ liên quan đến trí nhớ (episodic memory, semantic memory, encoding, retrieval).

Chữa bài Writing Task 1: BÀI 2: CAR ADVERTISING EXPENDITURE (Tr. 3)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: Sử dụng so sánh nhất (largest, lowest). Từ vựng liên quan đến chi tiêu (expenditure, money) và phương tiện quảng cáo (format, TV, cinema).
  `,
},
{
  id: "wsi_32_homework",
  learningNodeId: "wsi_32",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Present Simple + Can/Can’t, Vocabulary – Higher Education & Collocations.
• Writing Task: Hoàn thành BÀI 3: WASTE COLLECTION RECYCLING (Tr. 4).
• Listening Section: Hoàn thành C10 - T3 Section 4 (Tr. 135 - 138).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_33_expert_5_core",
  learningNodeId: "wsi_33",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 2A: Family and Friends (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về gia đình và bạn bè, chia sẻ ngoại hình, sở thích, thói quen. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – học sinh đọc lướt và chọn tiêu đề cho các đoạn văn (A–E) về gia đình và bạn bè. Phương pháp: Skimming + Matching Task. Sau đó gạch chân từ khóa trong tiêu đề và đoạn văn để xác định ý chính. Phương pháp: Exam Skills Training.
Listening (15’): Listening – học sinh nghe và hoàn thành ghi chú (Notes Completion – Section 1). Phương pháp: Listening for Detail + Prediction Strategy. Tương tác: học sinh chia sẻ dự đoán trước khi nghe, sau khi nghe đối chiếu kết quả với bạn học hoặc giáo viên.
Speaking (15’): Speaking + Pronunciation – học sinh thảo luận về gia đình và bạn bè, luyện tập đưa ra giải thích và biện minh. Phương pháp: Communicative Practice. Học sinh luyện phát âm các tính từ nhiều âm tiết theo trọng âm (attractive, different, favourite, interesting). Phương pháp: Pronunciation Drills.
Writing (30’): Writing – Task 1 – học sinh phân tích và trả lời câu hỏi về biểu đồ cột (Canadians’ answers). Phương pháp: Guided Discovery + Exam Skills. Sau đó hoàn thành bản tóm tắt mô tả dữ liệu. Phương pháp: Process Writing + Controlled Practice.
  `,
},
{
  id: "wsi_33_teaching_assistant",
  learningNodeId: "wsi_33",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 3: WASTE COLLECTION RECYCLING (Tr. 4) và Listening C10 (Tr. 135) - T3 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. waste (n.): Rác thải/Chất thải.
2. collected (v.): Được thu gom.
3. fluctuations (n.): Sự dao động.
4. highest (adj.): Cao nhất.
5. rising (v.): Đang tăng.
6. dancing (n.): Nhảy múa.
7. hormones (n.): Hoóc-môn.
8. obesity (n.): Bệnh béo phì.
9. balance (n.): Thăng bằng.
10. aerobic (adj.): (Bài tập) nhịp điệu.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T3 Section 4 (Tr. 135 - 138)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến sức khỏe và thể dục (hormones, aerobic, obesity).

Chữa bài Writing Task 1: BÀI 3: WASTE COLLECTION RECYCLING (Tr. 4)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Tập trung vào cách miêu tả số liệu và xu hướng (collected, rising, fluctuations, highest).
  `,
},
{
  id: "wsi_33_homework",
  learningNodeId: "wsi_33",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Comparatives & Superlatives, Vocabulary – Family & Relationships, Phrasal verbs.
• Writing Task: Hoàn thành BÀI 4: VOLUNTEERS ORGANIZATIONS (Tr. 5).
• Listening Section: Hoàn thành C10 - T4 Section 2 (Tr. 139 - 142).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_34_expert_5_core",
  learningNodeId: "wsi_34",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 2B: Events and Celebrations (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về các lễ kỷ niệm quen thuộc trong gia đình, trường học hoặc quốc gia. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Sentence Completion – học sinh nghe và hoàn thành câu (WRITE NO MORE THAN TWO WORDS). Trước khi nghe, dự đoán loại từ bị thiếu (noun, verb, adjective…). Phương pháp: Listening for Detail + Prediction Strategy. Tương tác: học sinh chia sẻ dự đoán trước khi nghe, sau khi nghe đối chiếu kết quả với bạn học hoặc giáo viên.
Reading (20’): Reading – Matching Headings – học sinh nối tiêu đề (i–viii) với đoạn văn (A–F) về Party time in Ancient Egypt. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh làm việc theo nhóm nhỏ, so sánh kết quả và giải thích lý do chọn tiêu đề.
Writing (25’): Writing – Task 1 – học sinh phân tích và trả lời câu hỏi về biểu đồ cột (Foreign languages spoken). Hoàn thành bài tóm tắt và so sánh bằng các cụm từ. Sau đó viết sáu câu mô tả biểu đồ tròn về tần suất sinh viên Nhật Bản sử dụng tiếng Anh ngoài việc học. Phương pháp: Guided Discovery + Process Writing. Tương tác: học sinh chia sẻ đoạn viết với bạn học hoặc giáo viên để nhận phản hồi.
Speaking (20’): Speaking – Expand Answers – học sinh luyện tập mở rộng câu trả lời cho các câu hỏi Part 1 bằng cách thêm lý do, ví dụ hoặc chi tiết. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_34_teaching_assistant",
  learningNodeId: "wsi_34",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 4: VOLUNTEERS ORGANIZATIONS (Tr. 5) và Listening C10 (Tr. 139) - T4 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. volunteers (n.): Tình nguyện viên.
2. organizations (n.): Các tổ chức.
3. educational (adj.): Thuộc giáo dục.
4. environmental (adj.): Thuộc môi trường.
5. quarter (n.): Một phần tư.
6. recruitment (n.): Tuyển dụng (Từ ngữ cảnh nghe).
7. training (n.): Đào tạo.
8. overtime (n.): Làm thêm giờ.
9. assessment (n.): Đánh giá.
10. membership (n.): Tư cách thành viên.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T4 Section 2 (Tr. 139 - 142)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến thể thao/cơ sở vật chất (swimming pool, fitness suite) và các thuật ngữ quản lý (recruitment, training, assessment).

Chữa bài Writing Task 1: BÀI 4: VOLUNTEERS ORGANIZATIONS (Tr. 5)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: Tập trung vào việc so sánh tỷ lệ (percentage, highest/lowest), sử dụng từ vựng liên quan đến lĩnh vực (educational, environmental, health care).
  `,
},
{
  id: "wsi_34_homework",
  learningNodeId: "wsi_34",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Adverbs & Adverbial Phrases, Vocabulary – Countries, Nationalities, Celebrations.
• Writing Task: Hoàn thành BÀI 5: EDUCATION IN SINGAPORE (Tr. 7).
• Listening Section: Hoàn thành C10 - T4 Section 3 (Tr. 143 - 147)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_35_expert_5_core",
  learningNodeId: "wsi_35",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 3A: Jobs (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về các loại công việc phổ biến (full-time, freelance, part-time) và chia sẻ trải nghiệm cá nhân hoặc mong muốn nghề nghiệp. Phương pháp: Brainstorming + Guided Discovery.
Reading (20’): Reading – True/False/Not Given – học sinh nối câu (1–3) với mô tả (A–C: T, F, NG) về văn bản Google Street View. Sau đó đọc văn bản về trekkers và trả lời T/F/NG. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh làm việc theo cặp hoặc nhóm nhỏ, trong lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Multiple Choice – học sinh nghe đoạn hội thoại, gạch chân từ khóa trong câu hỏi và chọn HAI đáp án mô tả điều sinh viên đang làm để tìm việc và lời khuyên của cố vấn nghề nghiệp. Phương pháp: Listening for Detail + Prediction Strategy.
Speaking (15’): Speaking – Develop Your Opinion – học sinh phát triển ý kiến về công việc, đưa ra lý do và ví dụ để mở rộng câu trả lời. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (30’): Writing – Problem-Solution Essay (Task 2) – học sinh phân tích bài mẫu, nối các đoạn (1–4) với mô tả (A–D: description of problem, solution, conclusion). Phương pháp: Guided Discovery + Exam Skills. Sau đó gạch chân từ khóa về nguyên nhân và kết quả (as a result, because, therefore). Cuối cùng học sinh viết đoạn văn ngắn mô tả một vấn đề và giải pháp. Phương pháp: Process Writing + Controlled Practice.
  `,
},
{
  id: "wsi_35_teaching_assistant",
  learningNodeId: "wsi_35",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 5: EDUCATION IN SINGAPORE (Tr. 7) và Listening C10 (Tr. 143) - T4 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. attended (v.): Đã tham dự/Học.
2. average (n.): Trung bình.
3. rose (v.): Đã tăng (quá khứ của rise).
4. considerably (adv.): Đáng kể.
5. higher (adj.): Cao hơn.
6. innovative (adj.): Sáng tạo.
7. appliances (n.): Thiết bị.
8. pressurise (v.): Gây áp lực.
9. detergents (n.): Chất tẩy rửa.
10. recycle (v.): Tái chế/Tái sử dụng.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T4 Section 3 (Tr. 143 - 147)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến thiết kế và công nghệ (innovative, appliances, carbon dioxide, recycle).

Chữa bài Writing Task 1: BÀI 5: EDUCATION IN SINGAPORE (Tr. 7)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: Miêu tả sự thay đổi đáng kể theo thời gian (rose considerably). So sánh số năm học và tỷ lệ đạt bằng cấp (average years, bachelor degree).
  `,
},
{
  id: "wsi_35_homework",
  learningNodeId: "wsi_35",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Present Continuous & Stative Verbs, Vocabulary – Jobs & Adjectives.
• Writing Task: Hoàn thành BÀI 6: FUEL PRODUCTION IN EUROPE (Tr. 8).
• Listening Section: Hoàn thành C10 - T4 Section 4 (Tr. 148 - 151).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_36_expert_5_core",
  learningNodeId: "wsi_36",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 3B: At Work (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về các thách thức và lợi ích khi làm việc hoặc kinh doanh. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Multiple Choice – học sinh nghe và chọn HAI đáp án mô tả thách thức và HAI đáp án mô tả lợi ích của việc kinh doanh. Phương pháp: Listening for Detail + Exam Strategy. Tương tác: học sinh gạch chân từ khóa trước khi nghe, sau đó đối chiếu kết quả với bạn học hoặc giáo viên.
Reading (20’): Reading – True/False/Not Given – học sinh đọc văn bản về công việc tại nhà (at work) và trả lời T/F/NG. Phương pháp: Skimming & Scanning + Controlled Practice. Tương tác: học sinh làm việc theo nhóm nhỏ hoặc trong lớp 1-1 giáo viên đóng vai bạn học để trao đổi.
Writing (25’): Writing – Problem-Solution Essay (Task 2) – học sinh phân tích bài mẫu, nối các đoạn với mô tả (description of problem, solution, conclusion). Sau đó lập dàn ý về Problems và Solutions cho một chủ đề liên quan đến công việc. Phương pháp: Guided Discovery + Process Writing. Tương tác: học sinh chia sẻ dàn ý hoặc đoạn viết với bạn học hoặc giáo viên để nhận phản hồi.
Speaking (20’): Speaking – Part 2 – học sinh luyện tập mô tả công việc mong muốn làm trong tương lai, mở rộng câu trả lời bằng lý do, ví dụ và chi tiết. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_36_teaching_assistant",
  learningNodeId: "wsi_36",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 6: FUEL PRODUCTION IN EUROPE (Tr. 8) và Listening C10 (Tr. 148) - T4 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. petroleum (n.): Dầu mỏ.
2. produced (v.): Được sản xuất.
3. tonnes (n.): Tấn.
4. steadily (adv.): Đều đặn.
5. fluctuated (v.): Đã dao động.
6. endangered (adj.): Có nguy cơ tuyệt chủng.
7. habitat (n.): Môi trường sống.
8. erosion (n.): Sự xói mòn.
9. logging (n.): Việc đốn gỗ/khai thác gỗ.
10. reproduction (n.): Sự sinh sản.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C10 - T4 Section 4 (Tr. 148 - 151)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến sinh thái và bảo tồn (endangered, habitat, logging, reproduction).

Chữa bài Writing Task 1: BÀI 6: FUEL PRODUCTION IN EUROPE (Tr. 8)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Mô tả xu hướng (steadily, dropped, fluctuated) và so sánh lượng sản xuất nhiên liệu (petroleum, coal, natural gas).
  `,
},
{
  id: "wsi_36_homework",
  learningNodeId: "wsi_36",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5 Homework: Grammar – Have to/Must/Need to/Should, Vocabulary – Types of work, Benefits, Phrasal verbs, Collocations.
• Writing Task: Hoàn thành BÀI 7: FOOD CONSUMPTION (Tr. 9).
• Listening Section: Hoàn thành C11 - T1 Section 2 (Tr. 152 - 155).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_37_expert_5_core",
  learningNodeId: "wsi_37",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 4A: Health (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về thói quen giữ sức khỏe (ăn uống, tập luyện, nghỉ ngơi). Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Matching Sentence Endings – học sinh nối phần đầu câu với phần cuối câu đúng (A–F) và xác định mối liên hệ (cause and effect, problem and solution). Sau đó trả lời câu hỏi Matching sentence endings về fitness apps. Phương pháp: Skimming & Scanning + Exam Skills.
Listening (15’): Listening – Matching (Section 4) – học sinh nghe và nối thông tin chi tiết với lựa chọn đúng. Phương pháp: Listening for Detail + Controlled Practice. Tương tác: học sinh chia sẻ đáp án và giải thích lý do chọn.
Speaking (15’): Speaking – Express and Disagree – học sinh luyện tập đồng ý và không đồng ý (agree/disagree) trong các tình huống liên quan đến sức khỏe. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (30’): Writing – Opinion Essay (Task 2) – học sinh đọc yêu cầu bài viết về lợi ích/bất lợi của việc tham gia phòng gym. Phương pháp: Guided Discovery. Sau đó sử dụng paraphrase để diễn đạt lại các câu. Cuối cùng viết phần Introduction cho bài luận. Phương pháp: Process Writing + Controlled Practice.
  `,
},
{
  id: "wsi_37_teaching_assistant",
  learningNodeId: "wsi_37",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 7: FOOD CONSUMPTION (Tr. 9) và Listening C11 (Tr. 152) - T1 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. consumption (n.): Sự tiêu thụ.
2. highest (adj.): Cao nhất.
3. slightly (adv.): Nhẹ/Một chút.
4. grams (n.): Gram.
5. meat (n.): Thịt.
6. open-air (adj.): Ngoài trời.
7. uneven (adj.): Gồ ghề/Không bằng phẳng.
8. scarecrow (n.): Bù nhìn.
9. woodwork (n.): Công việc gỗ.
10. farmyard (n.): Sân nông trại.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T1 Section 2 (Tr. 152 - 155)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ vựng liên quan đến nông trại/địa điểm (open-air museum, scarecrow, farmyard). Nhấn mạnh lỗi an toàn (don't frighten or injure the animals, don't touch them).

Chữa bài Writing Task 1: BÀI 7: FOOD CONSUMPTION (Tr. 9)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: So sánh lượng tiêu thụ thực phẩm theo đơn vị (grams). Miêu tả xu hướng tăng nhẹ (rose slightly) và so sánh phần lớn/phần nhỏ (largest/smallest part).
  `,
},
{
  id: "wsi_37_homework",
  learningNodeId: "wsi_37",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Past Simple & Past Continuous, Vocabulary – Illnesses, Injuries & Staying Healthy.
• Writing Task: Hoàn thành BÀI 8: CLASS SIZES (Tr. 10).
• Listening Section: Hoàn thành C11 - T1 Section 3 (Tr. 156 - 159).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_38_expert_5_core",
  learningNodeId: "wsi_38",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 4B: Nature (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về thế giới tự nhiên, chia sẻ trải nghiệm về động vật hoặc môi trường. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Matching (Section 4) – học sinh nghe bài giảng về cách động vật tự chữa bệnh (self-medication) và nối lý thuyết với loài động vật cụ thể. Phương pháp: Listening for Detail + Controlled Practice. Tương tác: học sinh so sánh đáp án với bạn học hoặc giáo viên.
Reading (20’): Reading – Matching Sentence Endings – học sinh đọc văn bản về Remedies from nature và nối phần đầu câu với phần cuối câu đúng. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: thảo luận nhóm nhỏ hoặc trong lớp 1-1 giáo viên đóng vai bạn học để trao đổi.
Writing (25’): Writing – Opinion Essay (Task 2) – học sinh phân tích bài mẫu, nối các đoạn (A–D) với mô tả (introduction, arguments, counter-arguments, conclusion). Phương pháp: Guided Discovery + Exam Skills. Sau đó lập dàn ý cho bài luận về thử nghiệm thuốc trên động vật. Phương pháp: Brainstorming + Process Writing. Tương tác: học sinh chia sẻ dàn ý hoặc đoạn viết với bạn học hoặc giáo viên để nhận phản hồi.
Speaking (20’): Speaking – Give Examples – học sinh luyện tập đưa ra ví dụ để mở rộng câu trả lời và nói trôi chảy. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_38_teaching_assistant",
  learningNodeId: "wsi_38",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 8: CLASS SIZES (Tr. 10) và Listening C11 (Tr. 156) - T1 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. average (n.): Trung bình.
2. compared (v.): Được so sánh.
3. smaller (adj.): Nhỏ hơn.
4. larger (adj.): Lớn hơn.
5. students (n.): Học sinh.
6. unusual (adj.): Bất thường.
7. underrepresented (adj.): Bị đại diện dưới mức (số lượng ít).
8. discussions (n.): Các cuộc thảo luận.
9. grades (n.): Điểm số.
10. underperforming (v.): Hoạt động kém.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T1 Section 3 (Tr. 156 - 159)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng học thuật (psychologists and physicists, underrepresented, underperforming) và các thuật ngữ nghiên cứu (grades, values-affirmation).

Chữa bài Writing Task 1: BÀI 8: CLASS SIZES (Tr. 10)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: So sánh kích thước lớp học (smaller, larger) giữa các quốc gia và so với mức world average.
  `,
},
{
  id: "wsi_38_homework",
  learningNodeId: "wsi_38",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Countable/Uncountable nouns & Quantifiers, Vocabulary – Animal kingdom, Geographical features, Verbs.
• Writing Task: Hoàn thành BÀI 9: IGLOO BUILDING PROCESS (Tr. 11).
• Listening Section: Hoàn thành C11 - T1 Section 4 (Tr. 160 - 163)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_39_expert_5_core",
  learningNodeId: "wsi_39",
  title: "REVIEW TEST 1",
  type: "paragraph",
  order: 1,
  content: `
Do and Correct Review test 1
  `,
},
{
  id: "wsi_39_teaching_assistant",
  learningNodeId: "wsi_39",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 9: IGLOO BUILDING PROCESS (Tr. 11) và Listening C11 (Tr. 160) - T1 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. process (n.): Quá trình.
2. surface (n.): Bề mặt.
3. hard-packed (adj.): Nén chặt (Ví dụ: hard-packed snow).
4. saw (n.): Cưa.
5. blocks (n.): Các khối.
6. biodiversity (n.): Đa dạng sinh học.
7. predators (n.): Kẻ săn mồi.
8. boundaries (n.): Ranh giới/Biên giới.
9. congregating (v.): Tập trung lại.
10. endangered (adj.): Nguy cơ tuyệt chủng.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T1 Section 4 (Tr. 160 - 163)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các từ khóa khoa học (biodiversity, predators, endangered). Nhấn mạnh lỗi nghe số nhiều/số ít.

Chữa bài Writing Task 1: BÀI 9: IGLOO BUILDING PROCESS (Tr. 11)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Tập trung vào từ vựng miêu tả quy trình (process, saw, blocks, edges) và trật tự các bước xây dựng igloo.
  `,
},
{
  id: "wsi_39_homework",
  learningNodeId: "wsi_39",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Module 5A exercises p.71-73, travel vocabulary 25 từ
• Writing Task: Hoàn thành BÀI 10: BUS COMPANY PERFORMANCE (Tr. 13).
• Listening Section: Hoàn thành C11 - T2 Section 2 (Tr. 164 - 167)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_40_expert_5_core",
  learningNodeId: "wsi_40",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 5A: Journeys (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về những chuyến đi gần đây hoặc kỳ nghỉ đáng nhớ. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Matching Information – học sinh nối các câu từ đoạn văn với loại thông tin chúng cung cấp (character, reason, experience). Sau đó hoàn thành bài kiểm tra Matching Information. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh làm việc theo nhóm nhỏ hoặc trong lớp 1-1 giáo viên hỗ trợ phân tích từ khóa.
Listening (15’): Listening – Table Completion (Section 2) – học sinh luyện tập dự đoán câu trả lời và đọc lướt bảng thông tin. Sau đó nghe và hoàn thành bảng về chuyến đi du lịch (Bornco trip). Phương pháp: Listening for Detail + Prediction Strategy.
Speaking (15’): Speaking – Part 2 & Structure Your Answer – học sinh luyện tập mô tả kỳ nghỉ đã tận hưởng, sử dụng cấu trúc câu trả lời rõ ràng (introduction, details, conclusion). Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (30’): Writing – Task 1 (Line Graphs & Describing Trends) – học sinh phân loại từ mô tả xu hướng (Going up, Going down, Staying the same). Phương pháp: Guided Discovery. Sau đó viết hai đoạn văn mô tả các xu hướng và thay đổi dựa trên biểu đồ đường. Phương pháp: Process Writing + Controlled Practice.
  `,
},
{
  id: "wsi_40_teaching_assistant",
  learningNodeId: "wsi_40",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 10: BUS COMPANY PERFORMANCE (Tr. 13) và Listening C11 (Tr. 164) - T2 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. target (n.): Mục tiêu.
2. achieved (v.): Đã đạt được.
3. percentage (n.): Tỷ lệ phần trăm.
4. dropped (v.): Giảm.
5. exceeded (v.): Vượt quá.
6. refurbishment (n.): Sự tân trang.
7. postpone (v.): Trì hoãn.
8. adjustable (adj.): Có thể điều chỉnh.
9. lighting (n.): Hệ thống chiếu sáng.
10. technical (adj.): Thuộc kỹ thuật.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T2 Section 2 (Tr. 164 - 167)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến nâng cấp cơ sở vật chất (refurbishment, adjustable seats) và hoạt động nhà hát (lighting, technical side).

Chữa bài Writing Task 1: BÀI 10: BUS COMPANY PERFORMANCE (Tr. 13)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: Mô tả hiệu suất (percentage, dropped, increased). So sánh giữa mục tiêu (target) và thực tế (achieved, exceeded).
  `,
},
{
  id: "wsi_40_homework",
  learningNodeId: "wsi_40",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – -ing forms & Infinitives, Vocabulary – Travel & Transport, Compound nouns, Phrasal verbs.
• Writing Task: Hoàn thành BÀI 11: DRIVING LICENSE PROCESS (Tr. 15).
• Listening Section: Hoàn thành C11 - T2 Section 3 (Tr. 168 - 172)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_41_expert_5_core",
  learningNodeId: "wsi_41",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 5B: Our Environment (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về các vấn đề môi trường thường gặp ở địa phương (khí thải, tiếng ồn, rác thải). Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Table Completion (Section 4) – học sinh nghe và hoàn thành bảng về các vấn đề môi trường liên quan đến thời tiết (WRITE ONE WORD). Trước khi nghe, luyện tập dự đoán loại từ cần điền. Phương pháp: Listening for Detail + Prediction Strategy.
Reading (20’): Reading – Matching Information (Visual Pollution) – học sinh đọc văn bản về ô nhiễm thị giác và nối các đoạn văn (A–G) với thông tin chúng chứa. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh làm việc theo nhóm nhỏ hoặc trong lớp 1-1 giáo viên hỗ trợ phân tích từ khóa.
Writing (25’): Writing – Task 1 (Line Graphs) – học sinh phân tích biểu đồ Seriousness of environmental issues. Phương pháp: Guided Discovery. Sau đó viết lại câu bằng cách thay động từ thành tính từ/trạng từ để mô tả xu hướng. Cuối cùng viết đoạn văn ngắn mô tả dữ liệu. Phương pháp: Process Writing + Controlled Practice.
Speaking (20’): Speaking – Part 2 & Use Time Phrases – học sinh mô tả một nơi có vấn đề môi trường, mở rộng câu trả lời bằng lý do và ví dụ. Phương pháp: Communicative Practice + Extended Speaking Task. Sau đó lắng nghe và điền vào bảng các cụm từ chỉ thời gian (time phrases) được sử dụng. Phương pháp: Pronunciation & Fluency Practice.
  `,
},
{
  id: "wsi_41_teaching_assistant",
  learningNodeId: "wsi_41",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 11: DRIVING LICENSE PROCESS (Tr. 15) và Listening C11 (Tr. 168) - T2 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. license (n.): Giấy phép.
2. register (v.): Đăng ký.
3. eyesight (n.): Thị lực.
4. pass (v.): Đậu/Vượt qua.
5. reattempt (v.): Thi lại/Thực hiện lại.
6. aims (n.): Mục tiêu (Từ ngữ cảnh nghe).
7. equipment (n.): Thiết bị.
8. visibility (n.): Tầm nhìn.
9. crevices (n.): Khe nứt/Chỗ nấp.
10. exposed (adj.): Bị phơi bày.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T2 Section 3 (Tr. 168 - 172)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến môi trường và thiết bị ngoài trời (equipment, visibility, crevices, exposed). Nhấn mạnh lỗi không mang thiết bị (didn't bring the compass).

Chữa bài Writing Task 1: BÀI 11: DRIVING LICENSE PROCESS (Tr. 15)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Mô tả quy trình (process). Tập trung vào các bước cần thiết (register, eyesight test, pass, reattempt).
  `,
},
{
  id: "wsi_41_homework",
  learningNodeId: "wsi_41",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Prepositions, Vocabulary – Weather & Environmental Issues.
• Writing Task: Hoàn thành BÀI 12: HYDROELECTRIC DAM MAP (Tr. 16).
• Listening Section: Hoàn thành C11 - T2 Section 4 (Tr. 173 – 176)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_42_expert_5_core",
  learningNodeId: "wsi_42",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 6A: The Food We Eat (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về thói quen ăn uống hằng ngày và các nhóm thực phẩm thường dùng. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Summary Completion – học sinh luyện tập hiểu diễn giải lại (paraphrasing). Sau đó hoàn thành bản tóm tắt bằng MỘT TỪ từ văn bản. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án với bạn học hoặc giáo viên để kiểm tra từ khóa.
Listening (15’): Listening – Matching (Section 1) – học sinh nghe và nối Comments (A–F) với Products (1–5). Phương pháp: Listening for Detail + Controlled Practice. Tương tác: học sinh chia sẻ đáp án và giải thích lý do chọn.
Speaking (15’): Speaking – Say You Are Not Sure & Pronunciation – học sinh luyện tập cách nói rằng mình không chắc chắn trong hội thoại. Phương pháp: Communicative Practice. Sau đó luyện phát âm các từ có silent letters (night, two, receipt, listen, island, know). Phương pháp: Pronunciation Drills.
Writing (30’): Writing – Opinion Essay (Task 2) – học sinh học cách cấu trúc một đoạn văn bằng cách đưa ra ý chính và ví dụ hỗ trợ. Phương pháp: Guided Discovery + Process Writing. Tương tác: học sinh viết đoạn ngắn, chia sẻ với bạn học hoặc giáo viên để nhận phản hồi.
  `,
},
{
  id: "wsi_42_teaching_assistant",
  learningNodeId: "wsi_42",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 12: HYDROELECTRIC DAM MAP (Tr. 16) và Listening C11 (Tr. 173) - T2 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. structure (n.): Cấu trúc/Công trình.
2. construction (n.): Sự xây dựng.
3. river (n.): Sông.
4. dam (n.): Đập.
5. farmlands (n.): Đất nông nghiệp.
6. upheavals (n.): Sự biến động lớn/Thay đổi lớn.
7. adapt (v.): Thích nghi.
8. anatomy (n.): Giải phẫu.
9. migratory (adj.): Di cư.
10. contamination (n.): Sự ô nhiễm.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T2 Section 4 (Tr. 173 - 176)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến sinh học/thích nghi (upheavals, adapt, anatomy, migratory) và sự thay đổi trong thành phố.

Chữa bài Writing Task 1: BÀI 12: HYDROELECTRIC DAM MAP (Tr. 16)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và Nối câu (Exercise 3).
• Trọng tâm sửa lỗi: Miêu tả bản đồ (map). Tập trung vào sự thay đổi địa lý (river, forest, farmlands) sau khi xây dựng (construction) đập (dam).
  `,
},
{
  id: "wsi_42_homework",
  learningNodeId: "wsi_42",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Be going to, Vocabulary – Food groups & Diet.
• Writing Task: Hoàn thành BÀI 13: OVERWEIGHT PEOPLE AUSTRALIA (Tr. 17).
• Listening Section: Hoàn thành C11 - T3 Section 2 (Tr. 177 - 180)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_43_expert_5_core",
  learningNodeId: "wsi_43",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 6B: How We Buy (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về thói quen mua sắm (offline và online), chia sẻ trải nghiệm cá nhân. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Matching (Section 1) – học sinh nghe cuộc hội thoại về các sản phẩm (stationery, newspapers, greetings cards, books, DVDs) và nối Comments (A–F) với Products (1–5). Phương pháp: Listening for Detail + Controlled Practice.
Reading (20’): Reading – Summary Completion – học sinh đọc văn bản về mua sắm online và hoàn thành tóm tắt bằng MỘT TỪ. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án với bạn học hoặc giáo viên để kiểm tra từ khóa.
Writing (25’): Writing – Opinion Essay (Task 2) – học sinh phân loại các cụm từ nối (linking phrases) theo chức năng (addition, contrast, cause/effect). Phương pháp: Guided Discovery. Sau đó lập dàn ý cho bài luận về ưu/nhược điểm của mua sắm online. Phương pháp: Process Writing + Controlled Practice.
Speaking (20’): Speaking – Degrees of Certainty – học sinh luyện tập sử dụng các cụm từ thể hiện mức độ chắc chắn (e.g. definitely, probably, might, could). Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_43_teaching_assistant",
  learningNodeId: "wsi_43",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
BÀI 13: OVERWEIGHT PEOPLE AUSTRALIA (Tr. 17) và Listening C11 (Tr. 177) - T3 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. overweight (adj.): Thừa cân.
2. gender (n.): Giới tính.
3. compared (v.): Được so sánh.
4. one-third (n. phr.): Một phần ba.
5. lowest (adj.): Thấp nhất.
6. recruitment (n.): Tuyển dụng.
7. mentor (n.): Người hướng dẫn.
8. proactive (adj.): Chủ động.
9. reference (n.): Thư giới thiệu/Tham khảo.
10. supervisors (n.): Người giám sát.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T3 Section 2 (Tr. 177 - 180)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến việc làm/học tập (recruitment, mentor, proactive) và các quy tắc làm việc (dress code, high heels).

Chữa bài Writing Task 1: BÀI 13: OVERWEIGHT PEOPLE AUSTRALIA (Tr. 17)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Exercise 1) và trắc nghiệm (Exercise 2).
• Trọng tâm sửa lỗi: Miêu tả xu hướng theo thời gian (rose, reached a peak). So sánh tỷ lệ (percentage) thừa cân (overweight) giữa hai nhóm giới tính (gender, males, females). (Kết thúc Phần 1 Task 1)
  `,
},
{
  id: "wsi_43_homework",
  learningNodeId: "wsi_43",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Will & Be going to, Vocabulary – Types of shops & Shopping.
• Writing Task: Hoàn thành Bài 1: Couples not having children (Tr. 19). (Bắt đầu Task 2)
• Listening Section: Hoàn thành C11 - T3 Section 3 (Tr. 181 - 185)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_44_expert_5_core",
  learningNodeId: "wsi_44",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 7A: Communities (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về cộng đồng nơi mình sống, chia sẻ điểm tích cực và tiêu cực. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online, với lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Flow-chart Completion – học sinh đọc văn bản Bournville: an unusual community và hoàn thành biểu đồ dòng chảy, tập trung vào trình tự (sequencing). Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án với bạn học hoặc giáo viên để kiểm tra logic trình tự.
Listening (15’): Listening – Short-answer Questions (Section 3) – học sinh nghe và xác định các loại thông tin khác nhau, sau đó trả lời câu hỏi ngắn. Phương pháp: Listening for Detail + Controlled Practice.
Speaking (15’): Speaking – Express Opposing Ideas – học sinh luyện tập bày tỏ ý kiến đối lập, thảo luận về ưu và nhược điểm của việc sống ở thành phố. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (30’): Writing – Task 1 (Tables) – học sinh viết phần giới thiệu và tổng quan cho bảng về theft in Helby. Phương pháp: Guided Discovery + Exam Skills. Sau đó mô tả các con số bằng cách sử dụng biểu thức (half, a quarter, a third). Phương pháp: Process Writing + Controlled Practice.
  `,
},
{
  id: "wsi_44_teaching_assistant",
  learningNodeId: "wsi_44",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 1: Couples not having children (Tr. 19) và Listening C11 (Tr. 181) - T3 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. trend (n.): Xu hướng.
2. childless (adj.): Không có con.
3. disadvantages (n.): Hạn chế/Nhược điểm.
4. career-oriented (adj.): Định hướng nghề nghiệp.
5. free time (n. phr.): Thời gian rảnh.
6. dissertation (n.): Luận văn.
7. statistics (n.): Thống kê.
8. note-taking (n.): Ghi chú.
9. peer-group (n. phr.): Nhóm đồng lứa.
10. confidence (n.): Sự tự tin.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T3 Section 3 (Tr. 181 - 185)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến học tập/nghiên cứu (dissertation, statistics, note-taking) và kỹ năng mềm (peer-group discussions, build confidence).

Chữa bài Writing Task 2: Bài 1: Couples not having children (Tr. 19)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích ưu điểm/nhược điểm (advantages and disadvantages). Tập trung vào từ khóa về tự do/nghề nghiệp (focus on their work, free time) và vấn đề xã hội (struggle to hang with their peers, take care of them when old).
  `,
},
{
  id: "wsi_44_homework",
  learningNodeId: "wsi_44",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Zero Conditional, Vocabulary – Communities & Crime.
• Writing Task: Hoàn thành Bài 2: Athletes using banned substances (Tr. 20).
• Listening Section: Hoàn thành C11 - T3 Section 4 (Tr. 186 - 190)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_45_expert_5_core",
  learningNodeId: "wsi_45",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 7B: Public Services (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – thảo luận nhanh về các dịch vụ công cộng địa phương (bệnh viện, bưu điện, thư viện) và trải nghiệm sử dụng chúng. Phương pháp: Brainstorming + Guided Discovery. Tương tác: cặp/nhóm nhỏ hoặc breakout room; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (20’): Listening – Multiple choice & Short-answer (Section 3) – nghe và trả lời trắc nghiệm kết hợp câu hỏi trả lời ngắn; tập trung xác định loại thông tin (số liệu, tên, địa điểm). Phương pháp: Listening for Detail + Exam Skills (underline keywords, predict answers). Tương tác: kiểm tra chéo đáp án và giải thích lựa chọn.
Reading (20’): Reading – Flow-chart Completion & Multiple choice – hoàn thành biểu đồ dòng chảy từ văn bản về The New York City High Line, sau đó chọn BA đáp án đúng cho câu hỏi trắc nghiệm. Phương pháp: Skimming for structure + Scanning for details. Tương tác: thảo luận lý do chọn đáp án; lớp 1-1 giáo viên đóng vai phản biện.
Writing (25’): Writing – Task 1 (Tables) – phân tích bảng “satisfaction with facilities”, viết phần giới thiệu và tổng quan, nêu xu hướng chính và so sánh nổi bật. Phương pháp: Guided Discovery + Process Writing. Tương tác: chia sẻ bản nháp, nhận phản hồi mục tiêu (clarity, overview, data selection).
Speaking (15’): Speaking – Give yourself time to think – luyện kỹ thuật trì hoãn tự nhiên (well, let me think…, that’s a good question…) để cấu trúc câu trả lời mạch lạc. Phương pháp: Communicative Practice + Fluency Drills. Tương tác: đổi bạn (nhóm) hoặc giáo viên làm đối thoại (1-1).
  `,
},
{
  id: "wsi_45_teaching_assistant",
  learningNodeId: "wsi_45",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 2: Athletes using banned substances (Tr. 20) và Listening C11 (Tr. 186) - T3 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. substances (n.): Chất.
2. competition (n.): Cuộc thi/Cạnh tranh.
3. steroids (n.): Steroid.
4. cheating (v.): Gian lận.
5. punishments (n.): Hình phạt.
6. designs (n.): Thiết kế (Ví dụ: experimental designs).
7. quarry (n.): Mỏ đá.
8. environmentally-friendly (adj.): Thân thiện với môi trường.
9. insulation (n.): Vật liệu cách nhiệt.
10. waste (n.): Chất thải.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T3 Section 4 (Tr. 186 - 190)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến xây dựng bền vững (environmentally-friendly, insulation) và vấn đề môi trường (waste, carbon dioxide).

Chữa bài Writing Task 2: Bài 2: Athletes using banned substances (Tr. 20)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích nguyên nhân (fierce competition, lack of strictness) và giải pháp (heavier punishments, revamping testing facilities) cho vấn đề doping.
  `,
},
{
  id: "wsi_45_homework",
  learningNodeId: "wsi_45",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – First Conditional, Vocabulary – Public buildings & Public services.
• Writing Task: Hoàn thành Bài 3: Politicians' private lives (Tr. 21).
• Listening Section: Hoàn thành C11 - T4 Section 2 (Tr. 191 - 194)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_46_expert_5_core",
  learningNodeId: "wsi_46",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 8A: Sport (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về vai trò của thể thao trong cuộc sống, chia sẻ môn thể thao yêu thích và lý do. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Multiple Choice – học sinh đọc văn bản về tâm lý thể thao, phân biệt chi tiết và thông tin chung. Sau đó trả lời câu hỏi trắc nghiệm. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án, giải thích lý do chọn.
Listening (15’): Listening – Summary Completion (Section 1) – học sinh nghe và hoàn thành bản tóm tắt về thành công trong thể thao (NO MORE THAN TWO WORDS). Phương pháp: Listening for Detail + Prediction Strategy.
Speaking (15’): Speaking – Balance Information & Link Ideas – học sinh luyện tập cân bằng thông tin khi trả lời câu hỏi, sử dụng từ nối để liên kết ý tưởng (e.g. moreover, however, in addition, on the other hand). Phương pháp: Communicative Practice + Fluency Drills.
Writing (30’): Writing – Problem-Solution Essay (Task 2) – học sinh giới thiệu lý do và giải pháp cho vấn đề trẻ em chơi ít thể thao. Phương pháp: Guided Discovery + Process Writing. Sau đó nối câu với lý do/giải pháp tương ứng và viết đoạn văn ngắn. Tương tác: học sinh chia sẻ đoạn viết với bạn học hoặc giáo viên để nhận phản hồi.
  `,
},
{
  id: "wsi_46_teaching_assistant",
  learningNodeId: "wsi_46",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 3: Politicians' private lives (Tr. 21) và Listening C11 (Tr. 191) - T4 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. private lives (n. phr.): Đời sống cá nhân.
2. allegations (n.): Cáo buộc.
3. distress (n.): Đau khổ.
4. consent (n.): Sự đồng ý.
5. breaking the law (v. phr.): Vi phạm pháp luật.
6. controls (n.): Bộ điều khiển.
7. switched off (v. phr.): Tắt.
8. reset (v.): Thiết lập lại.
9. overseas (adj.): Ở nước ngoài.
10. takeaway (n.): Đồ ăn mang đi.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T4 Section 2 (Tr. 191 - 194)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến hướng dẫn sử dụng thiết bị (controls, switched off, reset) và các thông tin thực tế (overseas, takeaway, railway museum).

Chữa bài Writing Task 2: Bài 3: Politicians' private lives (Tr. 21)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích mức độ đồng ý/không đồng ý (To what extent do you agree or disagree?). Tập trung vào từ vựng về quyền riêng tư (private lives, privacy), hậu quả (distress, destroy family life) và các vấn đề pháp lý (breaking the law).
  `,
},
{
  id: "wsi_46_homework",
  learningNodeId: "wsi_46",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Present Perfect, Vocabulary – Sporting & Equipment.
• Writing Task: Hoàn thành Bài 4: Art and drama in schools (Tr. 22).
• Listening Section: Hoàn thành C11 - T4 Section 3 (Tr. 195 - 199)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_47_expert_5_core",
  learningNodeId: "wsi_47",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 8B: Work and Play (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận về sự cân bằng giữa công việc và giải trí, chia sẻ hoạt động yêu thích sau giờ làm. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Multiple Choice (Section 2) – học sinh nghe đoạn hội thoại và chọn đáp án đúng cho câu hỏi trắc nghiệm. Phương pháp: Listening for Detail + Exam Skills (underline keywords, predict answers).
Reading (20’): Reading – Notes Completion & Multiple Choice – học sinh đọc văn bản, hoàn thành ghi chú bằng MỘT TỪ, sau đó trả lời câu hỏi trắc nghiệm. Phương pháp: Skimming & Scanning + Controlled Practice. Tương tác: học sinh so sánh đáp án và giải thích lý do chọn.
Writing (25’): Writing – Problem-Solution Essay (Task 2) – học sinh phân tích bài mẫu về việc bỏ cuộc khi chơi thể thao mới. Phương pháp: Guided Discovery + Exam Skills. Sau đó lập dàn ý cho bài luận, xác định vấn đề và giải pháp, viết đoạn văn ngắn. Phương pháp: Process Writing + Controlled Practice.
Speaking (20’): Speaking – Develop a Topic – học sinh luyện tập phát triển chủ đề khi nói, mở rộng câu trả lời bằng lý do, ví dụ và chi tiết. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_47_teaching_assistant",
  learningNodeId: "wsi_47",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 4: Art and drama in schools (Tr. 22) và Listening C11 (Tr. 195) - T4 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. creative subjects (n. phr.): Các môn sáng tạo.
2. talents (n.): Tài năng.
3. confident (adj.): Tự tin.
4. socialise (v.): Hòa nhập xã hội.
5. self-confidence (n.): Sự tự tin.
6. credit (n.): Tín chỉ.
7. critical (adj.): Phê bình.
8. lecturers (n.): Giảng viên.
9. assertive (adj.): Quả quyết.
10. achievement (n.): Thành tựu.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T4 Section 3 (Tr. 195 - 199)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến học thuật/sinh viên (credit, critical assignments, lecturers) và kinh nghiệm du học (sense of achievement).

Chữa bài Writing Task 2: Bài 4: Art and drama in schools (Tr. 22)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích mức độ đồng ý/không đồng ý (Do you agree or disagree?). Tập trung vào lợi ích của môn nghệ thuật (creative subjects, discover potential talents) và phát triển kỹ năng xã hội (socialise, boost confidence).
  `,
},
{
  id: "wsi_47_homework",
  learningNodeId: "wsi_47",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Articles, Vocabulary – Sporting events & Collocations.
• Writing Task: Hoàn thành Bài 5: Choosing university subjects (Tr. 23).
• Listening Section: Hoàn thành C11 - T4 Section 4 (Tr. 200 - 203)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_48_expert_5_core",
  learningNodeId: "wsi_48",
  title: "REVIEW TEST 2",
  type: "paragraph",
  order: 1,
  content: `
Do and Correct Review test 2
  `,
},
{
  id: "wsi_48_teaching_assistant",
  learningNodeId: "wsi_48",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 5: Choosing university subjects (Tr. 23) và Listening C11 (Tr. 200) - T4 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. crucial (adj.): Quan trọng.
2. remuneration (n.): Tiền công/Lương.
3. passion (n.): Niềm đam mê.
4. successful (adj.): Thành công.
5. promote (v.): Thúc đẩy.
6. upheavals (n.): Sự biến động/Thay đổi lớn.
7. prey (n.): Con mồi/Vật săn.
8. migration (n.): Sự di cư.
9. predators (n.): Kẻ săn mồi.
10. urban (adj.): Thuộc thành thị.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C11 - T4 Section 4 (Tr. 200 - 203)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến sinh thái và môi trường (urban environments, sparrowhawks/birds of prey, migration).

Chữa bài Writing Task 2: Bài 5: Choosing university subjects (Tr. 23)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích cấu trúc Discuss Both Views. Tập trung vào lợi ích tài chính (pays high wages, good remuneration) so với đam mê (passion, successful career).
  `,
},
{
  id: "wsi_48_homework",
  learningNodeId: "wsi_48",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Module 9B exercises p.142-144, technology vocabulary 25 từ
• Writing Task: Hoàn thành Bài 6: Youth neglecting vote (Tr. 24).
• Listening Section: Hoàn thành C12 - T5 Section 2 (Tr. 204 - 207)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_49_expert_5_core",
  learningNodeId: "wsi_49",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 9A: The News (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về thói quen cập nhật tin tức như đọc báo giấy, xem TV, nghe radio hay dùng mạng xã hội. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Matching Features – học sinh đọc văn bản về truyền thông và nối các đặc điểm với mô tả phù hợp. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án, giải thích lý do chọn.
Listening (15’): Listening – Form Completion (Section 1) – học sinh nghe và định vị thông tin để hoàn thành mẫu đơn. Phương pháp: Listening for Detail + Prediction Strategy (dự đoán loại từ cần điền: tên, số, địa điểm). Tương tác: học sinh đối chiếu đáp án với bạn học hoặc giáo viên.
Speaking (15’): Speaking – Express Attitude – học sinh luyện tập bày tỏ thái độ với tin tức, ví dụ “I find this report reliable” hoặc “I don’t agree with this headline”. Phương pháp: Communicative Practice + Extended Speaking Task. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
Writing (20’): Writing – Compare and Contrast (Task 1 Pie Charts) – học sinh phân tích biểu đồ tròn về nguồn tin tức như TV, newspapers, online, radio. Sau đó viết đoạn văn so sánh và đối chiếu, sử dụng từ nối whereas, while, compared to, in contrast. Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_49_teaching_assistant",
  learningNodeId: "wsi_49",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 6: Youth neglecting vote (Tr. 24) và Listening C12 (Tr. 204) - T5 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. neglecting (v.): Sao nhãng/Bỏ qua.
2. democracy (n.): Nền dân chủ.
3. elections (n.): Cuộc bầu cử.
4. campaigns (n.): Chiến dịch.
5. representation (n.): Sự đại diện.
6. kitchen assistants (n. phr.): Trợ lý nhà bếp.
7. slippery (adj.): Trơn trượt.
8. regulations (n.): Quy tắc/Quy định.
9. overtime (n.): Làm thêm giờ.
10. hygienic (adj.): Vệ sinh.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T5 Section 2 (Tr. 204 - 207)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến công việc nhà bếp (kitchen assistants, slippery, overtime) và các quy tắc làm việc (regulations, hygienic).

Chữa bài Writing Task 2: Bài 6: Youth neglecting vote (Tr. 24)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích nguyên nhân và giải pháp (problems and solutions). Tập trung vào các thuật ngữ chính trị (elections, democracy), hậu quả (hinder political change), và giải pháp (awareness campaigns, promote participation).
  `,
},
{
  id: "wsi_49_homework",
  learningNodeId: "wsi_49",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Present Perfect vs Past Simple, Vocabulary – Media & Adjectives.
• Writing Task: Hoàn thành Bài 7: Sports facilities vs Public Health (Tr. 25).
• Listening Section: Hoàn thành C12 - T5 Section 3 (Tr. 208 - 212).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_50_expert_5_core",
  learningNodeId: "wsi_50",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 9B: Technology (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về vai trò của công nghệ trong đời sống hằng ngày như điện thoại, máy tính, internet. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Matching & Form Completion (Section 1) – học sinh nghe đoạn hội thoại về công nghệ, nối thông tin giữa Comments và Items, sau đó hoàn thành mẫu đơn với thông tin chính xác (WRITE ONE WORD/NUMBER). Phương pháp: Listening for Detail + Prediction Strategy.
Reading (20’): Reading – Matching Features & Sentence Completion – học sinh đọc văn bản Brain health and technology, nối đặc điểm với mô tả phù hợp và hoàn thành câu bằng MỘT TỪ từ văn bản. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh so sánh đáp án và giải thích lý do chọn.
Writing (20’): Writing – Task 1 (Bar/Line Graphs) – học sinh phân tích biểu đồ về quyền sở hữu thiết bị điện tử, mô tả điểm tương đồng và khác biệt bằng cụm từ so sánh như similarly, likewise, in contrast. Phương pháp: Guided Discovery + Process Writing. Tương tác: học sinh viết đoạn mô tả ngắn, chia sẻ với bạn học hoặc giáo viên để nhận phản hồi.
Speaking (15’): Speaking – Ask for Clarification/Repetition – học sinh luyện tập cách yêu cầu làm rõ hoặc nhắc lại trong hội thoại, ví dụ “Could you repeat that?” hoặc “What do you mean by…?”. Phương pháp: Communicative Practice + Fluency Drills. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_50_teaching_assistant",
  learningNodeId: "wsi_50",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 7: Sports facilities vs Public Health (Tr. 25) và Listening C12 (Tr. 208) - T5 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. facilities (n.): Cơ sở vật chất.
2. public health (n. phr.): Sức khỏe cộng đồng.
3. physical exercise (n. phr.): Tập thể dục.
4. productive (adj.): Năng suất.
5. malnutrition (n.): Suy dinh dưỡng.
6. libraries (n.): Thư viện.
7. obsolete (adj.): Lỗi thời.
8. funding (n.): Quỹ.
9. archives (n.): Kho lưu trữ.
10. insurance (n.): Bảo hiểm.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T5 Section 3 (Tr. 208 - 212)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến dịch vụ công cộng (libraries, obsolete), và các vấn đề quản lý (funding, archives, insurance).

Chữa bài Writing Task 2: Bài 7: Sports facilities vs Public Health (Tr. 25)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích cấu trúc Discuss Both Views. Tập trung vào lập luận ủng hộ thể thao (physical exercise, enhance general health) và các biện pháp khác (improving diet quality, other effective measures).
  `,
},
{
  id: "wsi_50_homework",
  learningNodeId: "wsi_50",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Possessives, Pronouns, Quantifiers, Vocabulary – Technology & Word Formation.
• Writing Task: Hoàn thành Bài 8: Separate vs Mixed schools (Tr. 27).
• Listening Section: Hoàn thành C12 - T5 Section 4 (Tr. 213 - 217)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_51_expert_5_core",
  learningNodeId: "wsi_51",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 10A: Being Understood (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về những tình huống giao tiếp khó khăn như không hiểu ý người khác, khác biệt văn hóa hoặc ngôn ngữ. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Reading (20’): Reading – Yes/No/Not Given – học sinh đọc văn bản và trả lời Yes/No/Not Given về quan điểm của tác giả. Phương pháp: Skimming & Scanning + Exam Skills (xác định keywords, đối chiếu với văn bản). Tương tác: học sinh so sánh đáp án và giải thích lý do chọn.
Listening (15’): Listening – Label a Diagram (Section 4) – học sinh nghe và gán nhãn biểu đồ về Effective communication. Phương pháp: Listening for Detail + Prediction Strategy (dự đoán loại thông tin cần điền: noun, verb, phrase). Tương tác: học sinh đối chiếu đáp án với bạn học hoặc giáo viên.
Writing (20’): Writing – Opinion Essay (Task 2) – học sinh phân tích bài mẫu về giao tiếp trực tiếp, xác định cấu trúc và cách lập luận. Sau đó viết phần kết luận cho một bài luận ý kiến, sử dụng paraphrase để nhấn mạnh quan điểm. Phương pháp: Guided Discovery + Process Writing.
Speaking (15’): Speaking – Emphasise a Point (Part 2) – học sinh luyện tập mô tả ngôn ngữ muốn học, nhấn mạnh một ý bằng cách dùng cụm từ như What I really want to highlight is… hoặc The most important thing is…. Phương pháp: Communicative Practice + Fluency Drills. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_51_teaching_assistant",
  learningNodeId: "wsi_51",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 8: Separate vs Mixed schools (Tr. 27) và Listening C12 (Tr. 213) - T5 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. separate (adj.): Riêng biệt.
2. co-educational (adj.): Hỗn hợp (Trường học).
3. academic performance (n. phr.): Kết quả học tập.
4. social skills (n. phr.): Kỹ năng xã hội.
5. courtesy (n.): Lịch sự/Nhã nhặn.
6. collaboration (n.): Hợp tác.
7. teamwork (n.): Làm việc nhóm.
8. inconsistency (n.): Sự không nhất quán.
9. industriousness (n.): Sự siêng năng.
10. excellence (n.): Sự xuất sắc.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T5 Section 4 (Tr. 213 - 217)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào các giá trị trong kinh doanh (collaboration, inconsistency, industriousness, excellence).

Chữa bài Writing Task 2: Bài 8: Separate vs Mixed schools (Tr. 27)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích cấu trúc Discuss Both Views. Tập trung vào lập luận về sự tập trung học tập (academic performance) so với lợi ích xã hội (social skills, polite with the opposite sex).
  `,
},
{
  id: "wsi_51_homework",
  learningNodeId: "wsi_51",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – Relative Clauses (who, where, whose, whom), Vocabulary – Communication (Spoken/Non-verbal).
• Writing Task: Hoàn thành Bài 9: Being a celebrity (Tr. 28).
• Listening Section: Hoàn thành C12 - T6 Section 2 (Tr. 218 - 221)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_52_expert_5_core",
  learningNodeId: "wsi_52",
  title: "EXPERT 5 CORE (90 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 10B: Understanding Others (90’)
(Expert 5 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)
Warm-up & Lead-in (10’): Speaking – học sinh thảo luận nhanh về trải nghiệm giao tiếp với người từ nền văn hóa khác, chia sẻ khó khăn và lợi ích. Phương pháp: Brainstorming + Guided Discovery. Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.
Listening (15’): Listening – Label a Diagram & Notes Completion (Section 4) – học sinh nghe bài giảng về The cultural iceberg, gán nhãn biểu đồ với các yếu tố bề nổi và bề chìm của văn hóa, sau đó hoàn thành ghi chú với thông tin chính xác. Phương pháp: Listening for Detail + Prediction Strategy. Tương tác: học sinh đối chiếu đáp án với bạn học hoặc giáo viên.
Reading (20’): Reading – Short-answer Questions & Yes/No/Not Given – học sinh đọc văn bản về Cultural diversity in business, trả lời câu hỏi ngắn bằng MỘT TỪ hoặc CỤM TỪ, đồng thời xác định Yes/No/Not Given về quan điểm tác giả. Phương pháp: Skimming & Scanning + Exam Skills. Tương tác: học sinh thảo luận lý do chọn đáp án.
Writing (20’): Writing – Opinion Essay (Task 2) – học sinh phân tích bài mẫu về Global communication, xác định cách lập luận và từ nối, sau đó luyện tập bày tỏ sự chắc chắn trong bài viết bằng cụm từ như It is clear that… hoặc There is no doubt that…. Cuối cùng viết đoạn kết luận ngắn cho một bài luận ý kiến. Phương pháp: Guided Discovery + Process Writing.
Speaking (15’): Speaking – Use Correct Stress and Intonation – học sinh luyện tập phát âm trọng âm và ngữ điệu đúng để diễn đạt thái độ và ý nghĩa trong giao tiếp. Phương pháp: Pronunciation Drills + Communicative Practice. Tương tác: Partner Swap trong lớp nhóm hoặc giáo viên đóng vai bạn học trong lớp 1-1.
  `,
},
{
  id: "wsi_52_teaching_assistant",
  learningNodeId: "wsi_52",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 9: Being a celebrity (Tr. 28) và Listening C12 (Tr. 218) - T6 Section 2 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. celebrity (n.): Người nổi tiếng.
2. benefits (n.): Lợi ích.
3. privacy (n.): Quyền riêng tư.
4. remuneration (n.): Tiền công/Lương.
5. overshadows (v.): Che mờ/Lấn át.
6. flight (n.): Chuyến bay.
7. rehearsal (n.): Buổi diễn tập.
8. premiere (n.): Buổi công chiếu đầu tiên.
9. dressy (adj.): Sang trọng.
10. festival (n.): Lễ hội.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T6 Section 2 (Tr. 218 - 221)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến nghệ thuật/du lịch (flight, rehearsal, premiere, dressy occasion, festival).

Chữa bài Writing Task 2: Bài 9: Being a celebrity (Tr. 28)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích ưu điểm/vấn đề (more benefits or more problems?). Tập trung vào lợi ích vật chất (huge remuneration) và vấn đề quyền riêng tư (lack of privacy, not possible to lead a private life).
  `,
},
{
  id: "wsi_52_homework",
  learningNodeId: "wsi_52",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Homework: Grammar – May/Might, Could, Vocabulary – Intercultural Communication & Attitudes.
• Writing Task: Hoàn thành Bài 10: Multinational companies (Tr. 29).
• Listening Section: Hoàn thành C12 - T6 Section 3 (Tr. 222 - 226).
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_53_expert_5_core",
  learningNodeId: "wsi_53",
  title: "REVIEW FOR 1ST TEST",
  type: "paragraph",
  order: 1,
  content: `
REVIEW FOR 1ST TEST: CONTACT ACADEMIC MANAGER FOR CONSOLIDATION MATERIALS
  `,
},
{
  id: "wsi_53_teaching_assistant",
  learningNodeId: "wsi_53",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 10: Multinational companies (Tr. 29) và Listening C12 (Tr. 222) - T6 Section 3 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. corporations (n.): Các tập đoàn.
2. economy (n.): Nền kinh tế.
3. trade (n.): Thương mại.
4. reputations (n.): Danh tiếng.
5. competition (n.): Cạnh tranh.
6. first tutorial (n. phr.): Buổi hướng dẫn đầu tiên.
7. course (n.): Khóa học.
8. abroad (adv.): Ở nước ngoài.
9. journalism (n.): Báo chí.
10. novels (n.): Tiểu thuyết.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T6 Section 3 (Tr. 222 - 226)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến học tập (tutorial, course), chuyên ngành (journalism, novels), và vấn đề sách/tài liệu (difficult to get hold of the books).

Chữa bài Writing Task 2: Bài 10: Multinational companies (Tr. 29)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích ưu điểm/nhược điểm (advantages and disadvantages). Tập trung vào lợi ích kinh tế (economic progress, availability of jobs) và tác động tiêu cực (drop in the selling rate, closure of small businesses).
  `,
},
{
  id: "wsi_53_homework",
  learningNodeId: "wsi_53",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Mock test analysis, error correction, weakness identification
• Writing Task: Hoàn thành Bài 11: TV for education vs entertainment (Tr. 31).
• Listening Section: Hoàn thành C12 - T6 Section 4 (Tr. 227 - 230)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},
{
  id: "wsi_54_expert_5_core",
  learningNodeId: "wsi_54",
  title: "FINAL TEST FOR EXPERT 5",
  type: "paragraph",
  order: 1,
  content: `
FINAL TEST FOR EXPERT 5
  `,
},
{
  id: "wsi_54_teaching_assistant",
  learningNodeId: "wsi_54",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Bài 11: TV for education vs entertainment (Tr. 31) và Listening C12 (Tr. 227) - T6 Section 4 (30 PHÚT) - TRỢ GIẢNG
I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. entertainment (n.): Giải trí.
2. educational programs (n. phr.): Chương trình giáo dục.
3. intellectual (adj.): Thuộc trí tuệ.
4. outperform (v.): Vượt trội.
5. intellect (n.): Trí tuệ.
6. conflict (n.): Xung đột.
7. bullying (n.): Bắt nạt.
8. victim (n.): Nạn nhân.
9. stressful (adj.): Căng thẳng.
10. mediator (n.): Người hòa giải.

II. NỘI DUNG CHÍNH (20 PHÚT)
Chữa bài Listening: C12 - T6 Section 4 (Tr. 227 - 230)
Thời lượng: 10 phút
• Hoạt động: Tự kiểm tra đáp án. Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến xung đột nơi làm việc (conflict, bullying, stressful) và các vai trò giải quyết vấn đề (mediator).

Chữa bài Writing Task 2: Bài 11: TV for education vs entertainment (Tr. 31)
Thời lượng: 10 phút
• Hoạt động: Chữa bài điền từ (Gap-fill).
• Trọng tâm sửa lỗi: Phân tích cấu trúc Discuss Both Views. Tập trung vào vai trò giải trí (entertainment) và lợi ích giáo dục (educational programs, develop a child’s intellectual skills).
  `,
},
{
  id: "wsi_54_homework",
  learningNodeId: "wsi_54",
  title: "HOMEWORK",
  type: "homework",
  order: 3,
  content: `
Expert 5: Individual improvement plan, prepare for Expert 6
• Writing Task: Hoàn thành Bài 12: Gender quotas in companies (Tr. 32).
• Listening Section: Hoàn thành C12 - T7 Section 2 (Tr. 231 - 234)
Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_55_expert_6_core",
  learningNodeId: "wsi_55",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 1A: Communication Today (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về hình ảnh yêu thích trên điện thoại thông minh và độ tin cậy của ảnh chụp so với mô tả.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (20’):
Reading – Identify Topic Sentences & Matching Headings –
học sinh phân tích đoạn văn để xác định câu chủ đề và chủ đề lặp lại trong đoạn B và C.
Sau đó thực hành chọn tiêu đề đúng cho các đoạn A và D–G từ danh sách (List of Headings).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận xem việc xác định câu chủ đề có giúp ích cho bài tập nối tiêu đề hay không,
cuối cùng thảo luận về sự phát triển của nhiếp ảnh kỹ thuật số và việc mọi người có dễ bị thuyết phục hơn bởi Internet không.

Listening (15’):
Listening – Locate Information & Notes Completion (Section 1) –
trước khi nghe, học sinh đọc câu hỏi (2–10) và xác định loại thông tin cần nghe (how much, what, how many)
cùng từ tín hiệu cần tìm.
Sau đó thực hành hoàn thành ghi chú về Student mobile plan
(bao gồm loại điện thoại miễn phí, hợp đồng tối thiểu, chi phí, tên, email, cách thanh toán và địa điểm nhận).
Phương pháp: Listening for Detail + Prediction Strategy.

Speaking (15’):
Speaking – Expand Answers (Part 1) –
học sinh luyện tập mở rộng câu trả lời cho các câu hỏi Part 1, cố gắng nói hơn 20 giây.
Tiếp theo phân tích cụm từ mở rộng như:
The benefit of, the downside of, Take schoolwork, for instance
và nối chúng với mục đích
(Giving examples, Giving reasons, Stating advantages/disadvantages, Expressing a habit, Stating certainty).
Cuối cùng thực hành đưa ra ý kiến về Communicating with people,
ví dụ: What do you use your mobile phone for the most?.

Writing (20’):
Writing – Write an Overview Task 1 –
học sinh nối câu giới thiệu (1–3) với biểu đồ (A–C),
xác định chức năng của câu giới thiệu và cách câu tổng quan khác với câu giới thiệu.
Sau đó thực hành viết câu giới thiệu và câu tổng quan cho biểu đồ
về lý do mọi người kết bạn (friend) và hủy kết bạn (unfriend) trên mạng xã hội.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_55_writing_speaking_practice",
  learningNodeId: "wsi_55",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.1 Art
• Do you like art?
• Do you like visiting art galleries?
• Do you want to be an artist?
• Do you like modern art or traditional art?

Practice Writing:
IELTS Writing Task 1 – Car Sales by Region
The chart shows the percentage of car manufacturer's total sales
in North America, South America, Europe and Asia.
  `,
},
{
  id: "wsi_55_teaching_assistant",
  learningNodeId: "wsi_55",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN: Listening C12 (Tr. 235) - T7 Section 3
và Listening C12 (Tr. 240) - T7 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. case study (n. phr.): Nghiên cứu tình huống.
2. interview (v.): Phỏng vấn.
3. anonymous (adj.): Ẩn danh.
4. trends (n.): Xu hướng.
5. mercury (n.): Thủy ngân.
6. toxic (adj.): Độc hại.
7. contamination (n.): Sự ô nhiễm.
8. migration (n.): Sự di cư.
9. telegraph (n.): Điện báo.
10. invention (n.): Phát minh.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C12 - T7 Section 3 (Tr. 235 - 239) – 10 phút
• Hoạt động: Học viên tự kiểm tra đáp án.
• Trợ giảng chữa lỗi, tập trung vào từ vựng nghiên cứu
(case study, interview, anonymous)
và các bước phân tích dữ liệu (trends, graphs).

Chữa bài Listening 2:
C12 - T7 Section 4 (Tr. 240 - 243) – 10 phút
• Hoạt động: Tự kiểm tra đáp án.
• Trợ giảng chữa lỗi tập trung vào từ vựng khoa học/môi trường
(mercury, toxic, contamination)
và sự di chuyển của động vật (migration).
  `,
},
{
  id: "wsi_55_homework",
  learningNodeId: "wsi_55",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Present Tenses (Simple / Continuous)
• Stative verbs: want, need, include

Vocabulary:
• Collocations
• Phrasal verbs
• Words with more than one meaning
• Communication

Writing:
• Bar chart structure practice
• Viết 01 bài IELTS Writing Task 1 (150 từ)

Listening:
• Hoàn thành C12 - T8 Section 2 (Tr. 244 - 247)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_56_expert_6_core",
  learningNodeId: "wsi_56",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 1B: Back to the Old Ways (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về cách mọi người tiếp nhận tin tức ngày nay so với trước đây,
chia sẻ trải nghiệm cá nhân về việc đọc báo giấy, xem TV hay dùng mạng xã hội.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Notes, Table & Form Completion (Section 1) –
học sinh thực hành hoàn thành ghi chú (Student is studying/year),
bảng (Position/Where: Food assistant, Salesperson, Receptionist),
và mẫu đơn (STUDENT DETAILS: Name, Address, Room No., Skills, Interview location/time).
Phương pháp: Listening for Detail + Prediction Strategy.
Tương tác: học sinh đối chiếu đáp án với bạn học hoặc giáo viên để kiểm tra độ chính xác.

Reading (20’):
Reading – Matching Headings & Sentence Completion –
trước khi đọc, học sinh quyết định loại văn bản (lịch sử hay tranh luận).
Sau đó đọc đoạn văn và chọn tiêu đề đúng cho các đoạn B–G
từ danh sách (List of Headings i–ix).
Tiếp tục hoàn thành câu (7–10) bằng cách chọn ONE WORD ONLY từ đoạn văn,
ví dụ: Around a third of internet surfers stay on a __ page for __.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 1: Talk about the News –
học sinh thảo luận về các loại tin tức như news article, subject,
current affairs, human interest stories, gossip columns.
Sau đó thực hành trả lời các câu hỏi như:
Do you read newspapers?
How do you prefer to learn about news events?
và ghi âm câu trả lời để nghe lại.
Cuối cùng đánh giá các lĩnh vực cần cải thiện về độ trôi chảy
(fluency: speed, repetition, expanding answers).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe a Chart –
học sinh luyện tập paraphrasing bằng cách nối từ/cụm từ với nghĩa tương đồng
và viết lại câu giới thiệu để tránh lặp từ.
Tiếp theo phân tích biểu đồ về thu nhập từ bán vé rạp chiếu phim và DVD,
kiểm tra tiêu chí Task Achievement (Task 1)
và phân tích các đoạn mô tả dữ liệu.
Cuối cùng viết mô tả biểu đồ (ít nhất 150 từ),
tập trung vào dữ liệu quan trọng và so sánh.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_56_writing_speaking_practice",
  learningNodeId: "wsi_56",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.2 Teenagers
• Do you care about teenagers’ fashion trends?
• Do you like spending time with teenagers?
• What activities do young people like to do in your country?
• Do you know what the fashion trend among young people is like in your country?

Practice Writing:
IELTS Writing Task 1 – Fuel Use in Transport
The chart below shows information about fuel used in the transport sector
in different countries in Europe,
compared to the EU average, in 2009 and 2010.
  `,
},
{
  id: "wsi_56_teaching_assistant",
  learningNodeId: "wsi_56",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN: Listening C12 (Tr. 240) - T7 Section 4
và Listening C12 (Tr. 244) - T8 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. mercury (n.): Thủy ngân.
2. toxic (adj.): Độc hại.
3. contamination (n.): Sự ô nhiễm.
4. migration (n.): Sự di cư.
5. underground (adj.): Dưới lòng đất.
6. garments (n.): Trang phục.
7. sculpture (n.): Tượng điêu khắc.
8. footpath (n.): Lối đi bộ.
9. estate (n.): Bất động sản/Khu vực.
10. pavilion (n.): Đình/Lầu.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C12 - T7 Section 4 (Tr. 240 - 243) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi về từ vựng khoa học
(mercury, toxin)
và sự phụ thuộc của động vật biển vào thính giác để định vị.

Chữa bài Listening 2:
C12 - T8 Section 2 (Tr. 244 - 247) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi tập trung vào từ vựng
liên quan đến mua sắm/địa điểm
(department store, garments, underground car park)
và hướng dẫn đường đi (footpath).
  `,
},
{
  id: "wsi_56_homework",
  learningNodeId: "wsi_56",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Past Simple

Vocabulary:
• The Media (collocations, word practice)

Listening:
• Hoàn thành C12 - T8 Section 3 (Tr. 248 - 252)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_57_expert_6_core",
  learningNodeId: "wsi_57",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 2A: Feeling Good (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về khái niệm bucket list,
đọc định nghĩa và viết ba mục tiêu của riêng mình.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (20’):
Reading – Identify Key Words & Yes/No/Not Given –
học sinh gạch chân từ khóa trong các tuyên bố,
so sánh thông tin trong các cặp câu để xác định chúng nói giống nhau hay mâu thuẫn.
Sau đó thực hành trả lời YES/NO/NOT GIVEN
cho các tuyên bố về nghiên cứu
“The Unforeseen Costs of Extraordinary Experience”.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Listening (15’):
Listening – Word Stress & Multiple Choice (Section 2) –
học sinh nghe và trả lời câu hỏi chỉ dựa trên các từ được nhấn trọng âm.
Sau đó thực hành trắc nghiệm (Questions 1–5)
về quan điểm của Don Norman,
lời khuyên giảm stress,
cách trải nghiệm vẻ đẹp
và đề xuất của Evelyn Underhill.
Phương pháp: Listening for Main Idea + Stress Awareness.

Speaking (15’):
Speaking – Generate Ideas & Vocabulary (Part 2) –
học sinh mô tả something that makes you happy
(what, where/when, how often, explain why).
Tiếp theo hoàn thành ghi chú của thí sinh
với các từ như creative, daydream, make plans, thinking time.
Cuối cùng luyện tập cấu trúc câu trả lời
bằng cách sử dụng các cụm từ giúp mở rộng câu trả lời
và xác định chức năng của chúng
(start a new sentence, join two sentences).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Opinion Essay (Task 2) –
học sinh phân tích câu hỏi:
“Money is one of the most important factors in a person’s happiness.
To what extent do you agree?”
Gạch chân từ khóa và định nghĩa factor, To what extent.
Sau đó áp dụng các kỹ thuật sản sinh ý tưởng:
Cubing, Your perspective, Other perspectives,
Identify examples, Flip a problem.
Cuối cùng lập dàn ý,
lựa chọn hai lý do tốt nhất để hỗ trợ ý kiến cá nhân
theo Plan A (chỉ tập trung vào ý kiến cá nhân)
hoặc Plan B (trình bày hai quan điểm).
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_57_writing_speaking_practice",
  learningNodeId: "wsi_57",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.3 Party
• Have you been to a party recently?
• Do you prefer to go to small parties or big parties?
• Do you like parties?
• How often did you have a party when you were a kid?
• Have you ever organized a party?

Practice Writing:
IELTS Writing Task 1 – Cars per 1000 People
The bar chart shows the number of cars per 1000 people
in five European countries in three years,
compared with the European average.
  `,
},
{
  id: "wsi_57_teaching_assistant",
  learningNodeId: "wsi_57",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN: Listening C12 (Tr. 244) - T8 Section 2
và Listening C12 (Tr. 248) - T8 Section 3

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. underground (adj.): Dưới lòng đất.
2. garments (n.): Trang phục.
3. sculpture (n.): Tượng điêu khắc.
4. footpath (n.): Lối đi bộ.
5. estate (n.): Bất động sản.
6. adaptations (n.): Sự thích nghi/Chuyển thể.
7. classification (n.): Sự phân loại.
8. headline (n.): Tiêu đề.
9. clip (n.): Đoạn phim ngắn.
10. satire (n.): Châm biếm.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C12 - T8 Section 2 (Tr. 244 - 247) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi về từ vựng
liên quan đến cửa hàng bách hóa (department store)
và các tác phẩm nghệ thuật (sculpture).

Chữa bài Listening 2:
C12 - T8 Section 3 (Tr. 248 - 252) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi tập trung vào từ vựng
liên quan đến phim ảnh/văn học
(adaptations, classification, satire)
và báo chí (headline, clip).
  `,
},
{
  id: "wsi_57_homework",
  learningNodeId: "wsi_57",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Building Complex Sentences
• Relative Clauses (that, when, where, which, who)

Vocabulary:
• Definitions
• Collocations
• Research
• Adjectives describing experiences

Writing:
• Data description practice
• Viết 1 bài Task 1 (150 từ)

Listening:
• Hoàn thành C12 - T8 Section 4 (Tr. 253 - 257)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_58_expert_6_core",
  learningNodeId: "wsi_58",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 2B: Looking Good (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về tầm quan trọng của ngoại hình
trong giao tiếp và công việc, chia sẻ trải nghiệm cá nhân.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Multiple Choice & Sentence Completion (Section 2) –
học sinh thực hành trắc nghiệm (Questions 1–6)
về các chủ đề giao tiếp, body language,
ảnh hưởng của cortisol và lời khuyên buổi sáng.
Sau đó hoàn thành câu (7–10) với NO MORE THAN THREE WORDS,
ví dụ:
“Before the interview, participants created a presentation of their __.”
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Information & Yes/No/Not Given –
học sinh nối các câu (1–4) với đoạn văn (A–F),
ví dụ:
“People purchase things so they can feel good
when other people notice them.”
Sau đó trả lời YES/NO/NOT GIVEN
cho các tuyên bố liên quan đến thời trang và mua sắm.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 2: Describe an Event –
học sinh nghe và ghi lại các từ/cụm từ
cho thấy thí sinh có vốn từ vựng tốt.
Sau đó thực hành mô tả
a time you did something important
(what, when/where, how you felt, why it was important).
Cuối cùng đánh giá việc sử dụng từ vựng (Lexical resource)
so với các tiêu chí Band 5 và 6.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Opinion Essay –
học sinh viết bài luận với đề bài:
“Do you think people care more about appearance than in the past?”
Trước tiên lập kế hoạch bằng cách chọn hai hoặc ba điểm
để thảo luận chuyên sâu,
áp dụng các Perspectives
(của bản thân, của người khác giới, của người lớn tuổi).
Sau đó viết đoạn văn,
gạch chân các cụm từ giới thiệu ý kiến,
lý do và ví dụ trong các câu mẫu.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_58_writing_speaking_practice",
  learningNodeId: "wsi_58",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.4 Fishing
• Is fishing popular in your country?
• Do you like eating fish?
• Do you like fishing?
• Did you ever go fishing when you were a child?

Practice Writing:
IELTS Writing Task 1 – Car Ownership in the UK
The chart below gives information
about car ownership in the UK
from 1975 to 2005.
  `,
},
{
  id: "wsi_58_teaching_assistant",
  learningNodeId: "wsi_58",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN: Listening C12 (Tr. 248) - T8 Section 3
và Listening C12 (Tr. 253) - T8 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. adaptations (n.): Sự thích nghi/Chuyển thể.
2. classification (n.): Sự phân loại.
3. headline (n.): Tiêu đề.
4. clip (n.): Đoạn phim ngắn.
5. acoustics (n.): Âm học.
6. decibels (n.): Decibel.
7. erratic (adj.): Thất thường.
8. aesthetic (adj.): Thẩm mỹ.
9. virtual reality (n. phr.): Thực tế ảo.
10. consistency (n.): Sự nhất quán.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C12 - T8 Section 3 (Tr. 248 - 252) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi về từ vựng
liên quan đến phim ảnh/văn học
(adaptations, satire).

Chữa bài Listening 2:
C12 - T8 Section 4 (Tr. 253 - 257) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi tập trung vào
từ vựng liên quan đến âm học và công nghệ
(acoustics, decibels, virtual reality)
và tính thẩm mỹ (aesthetic).
  `,
},
{
  id: "wsi_58_homework",
  learningNodeId: "wsi_58",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Parts of Speech
• Adjectives of Feeling
• Intensifiers

Vocabulary:
• The Media & Communication
  (collocations, phrasal verbs, word forms)

Writing:
• Supporting arguments
• Viết 1 bài Task 2 (250 từ)

Listening:
• Hoàn thành C13 - T1 Section 2 (Tr. 258 - 261)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_59_expert_6_core",
  learningNodeId: "wsi_59",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 3A: Learning for Life (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về trải nghiệm học tập lâu dài,
chia sẻ lý do tại sao việc học không chỉ dừng lại ở trường lớp.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (20’):
Reading – Text Structure & Summary Completion –
học sinh đọc câu đầu tiên của mỗi đoạn (A–D)
và nối đoạn văn với chủ đề tương ứng
như differences in discipline
hoặc reasons for carrying out the experiment.
Sau đó hoàn thành bản tóm tắt (3a) bằng Word bank,
tiếp tục hoàn thành tóm tắt (4)
bằng cách chọn từ từ danh sách A–I.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh so sánh đáp án
và giải thích cách xác định thông tin.

Listening (15’):
Listening – Identify Similarity & Difference (Section 3) –
học sinh nghe và hoàn thành bảng so sánh
hai khóa học đại học (Bartlett vs Rugby)
bằng cách đánh dấu tick/cross.
Tiếp theo nối phần đầu/cuối câu
để mô tả sự tương đồng và khác biệt
(both, unlike, main difference).
Cuối cùng phân loại các khóa học
(architecture, medicine, programming, fashion)
theo mức độ an toàn trong tương lai
(A = disappear, B = reduced numbers, C = continue to be important).
Phương pháp: Listening for Detail + Controlled Practice.

Speaking (15’):
Speaking – Give Reasons for Your Opinions (Part 3) –
học sinh so sánh câu trả lời đơn giản
và câu trả lời phát triển để nhận ra sự khác biệt.
Thực hành trả lời câu hỏi Part 3 về Art in schools,
sử dụng cụm từ tổ chức ý
như Firstly, Then also, Another point to consider is.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe a Chart –
học sinh phân tích biểu đồ cột
Average cost of an undergraduate degree
để xác định chi phí cao nhất/thấp nhất,
phân biệt tuition fees và living costs.
Sau đó viết đoạn mô tả biểu đồ tròn
Number of students/schools: Private/Public,
sử dụng that of / those of để liên kết thông tin.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_59_writing_speaking_practice",
  learningNodeId: "wsi_59",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.5 Teachers
• Do you have a favorite teacher?
• In what way has your favourite teacher helped you?
• Are you still in touch with your primary school teachers?
• Do you have a teacher from your past that you still remember?
• Do you want to be a teacher in the future?

Practice Writing:
IELTS Writing Task 1 – Employment Status in the US
The chart shows the employment status
of adults in the US
in 2003 and 2013.
  `,
},
{
  id: "wsi_59_teaching_assistant",
  learningNodeId: "wsi_59",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C12 (Tr. 253) - T8 Section 4
và Listening C13 (Tr. 258) - T1 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. acoustics (n.): Âm học.
2. decibels (n.): Decibel.
3. aesthetic (adj.): Thẩm mỹ.
4. virtual reality (n. phr.): Thực tế ảo.
5. congestion (n.): Tắc nghẽn.
6. visibility (n.): Tầm nhìn.
7. regulated (v.): Được điều chỉnh.
8. pedestrian (n.): Người đi bộ.
9. council (n.): Hội đồng.
10. fumes (n.): Khí thải.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C12 - T8 Section 4 (Tr. 253 - 257) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi về từ vựng âm học
(soundscapes, decibels).
Nhấn mạnh tiếng ồn là vấn đề xã hội – chính trị
và cần được quản lý bằng quy định.

Chữa bài Listening 2:
C13 - T1 Section 2 (Tr. 258 - 261) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào giao thông và an toàn
(congestion, visibility, pedestrian crossing)
và chính sách công (council).
  `,
},
{
  id: "wsi_59_homework",
  learningNodeId: "wsi_59",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Comparative Forms
  (comparative & superlative adjectives,
   adverbs, quantifiers)

Vocabulary:
• Dependent Prepositions
• Education
• Adjective Endings
• Collocations

Listening:
• Hoàn thành C13 - T1 Section 3 (Tr. 262 - 266)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_60_expert_6_core",
  learningNodeId: "wsi_60",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 3B: The World of Work (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về môi trường làm việc lý tưởng,
chia sẻ trải nghiệm cá nhân về văn phòng hoặc nơi học tập.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Notes Completion & Matching (Section 3) –
học sinh hoàn thành ghi chú về Project notes
(ví dụ: Description must be 1 word or less, deadline).
Sau đó nối các yếu tố môi trường làm việc
(yellow working environment, pictures, plants, large windows, soft lighting)
với mục đích hỗ trợ
(A = sleeping better, B = being more creative, C = feeling happy at work).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Yes/No/Not Given & Summary Completion –
học sinh trả lời YES/NO/NOT GIVEN
cho các tuyên bố về Emotional Intelligence.
Tiếp theo hoàn thành bản tóm tắt
bằng cách chọn từ từ danh sách (A–L).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Discussing Shopping and Retail –
học sinh luyện trả lời các câu hỏi Part 3
về Shops and retail
(ví dụ: How do you think shopping habits have changed in recent years?).
Sau đó phân tích việc sử dụng connectors
và câu phức của thí sinh
để cải thiện Grammatical range and accuracy.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Write a Summary –
học sinh phân tích biểu đồ đường
Women’s weekly earnings as a percentage of men’s wages.
Tiếp theo nối các cụm từ
với tiêu chí Band 5 và Band 6
để hiểu coherence and cohesion
(ví dụ: connectors are used to show how ideas relate).
Cuối cùng hoàn thành câu
với các từ so sánh/tương phản
although, despite, however, in spite of.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_60_writing_speaking_practice",
  learningNodeId: "wsi_60",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.6 Television Programs
• Where do you usually watch TV programs/shows? Why/Why not?
• What’s your favorite TV program/show? Why?
• Are there any programs/shows you don’t like watching? Why/Why not?
• Do you think you will watch more TV or fewer TV programs/shows in the future? Why/Why not?

Practice Writing:
IELTS Writing Task 1 – Employment Distribution (3 Countries)
The bar chart shows the distribution of employment
among agriculture, services and industries
in three countries in 1980
and the projected distribution in 2020.
  `,
},
{
  id: "wsi_60_teaching_assistant",
  learningNodeId: "wsi_60",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 258) - T1 Section 2
và Listening C13 (Tr. 262) - T1 Section 3

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. congestion (n.): Tắc nghẽn.
2. visibility (n.): Tầm nhìn.
3. pedestrian (n.): Người đi bộ.
4. council (n.): Hội đồng.
5. germination (n.): Sự nảy mầm.
6. equipment (n.): Thiết bị.
7. practical (adj.): Thực tế/Thực hành.
8. procedure (n.): Quy trình.
9. chemicals (n.): Hóa chất.
10. variable (n.): Biến số.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T1 Section 2 (Tr. 258 - 261) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
liên quan đến các quy định giao thông mới
và biện pháp tăng cường an toàn
cho người đi bộ (pedestrian crossings).

Chữa bài Listening 2:
C13 - T1 Section 3 (Tr. 262 - 266) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào từ vựng thí nghiệm khoa học
(germination, equipment, procedure)
và kỹ năng đọc tài liệu học thuật (reading list).
  `,
},
{
  id: "wsi_60_homework",
  learningNodeId: "wsi_60",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Verb Patterns (-ing and infinitives)

Vocabulary:
• Business and Finance
  (collocations, word practice)

Listening:
• Hoàn thành C13 - T1 Section 4 (Tr. 267 - 270)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_61_expert_6_core",
  learningNodeId: "wsi_61",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 4A: Discoveries and Inventions (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận và phân loại các mục
thành discoveries và inventions,
chia sẻ ví dụ quen thuộc trong đời sống.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (20’):
Reading – Text Referencing & Matching Features –
học sinh tìm và gạch chân các giải thưởng khoa học trong đoạn văn,
phân tích các reference words như this, it, they
và xác định chúng ám chỉ điều gì.
Sau đó thực hành nối các tuyên bố (1–4)
với loại nghiên cứu (A–D).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Listening (15’):
Listening – Context & Connected Speech (Section 2) –
học sinh nghe phần giới thiệu
và trả lời các câu hỏi về người nói, địa điểm,
chủ đề của buổi nói chuyện.
Tiếp theo hoàn thành ghi chú (Questions 1–6)
về Teleportation Exhibition
(Opens, Closes, Gallery themes, Details of super computer).
Phương pháp: Listening for Context + Notes Completion.

Speaking (15’):
Speaking – Give Yourself Time to Think (Part 2) –
học sinh luyện sử dụng các cụm kéo dài thời gian suy nghĩ
như er, I guess, How can I describe.
Sau đó nghe và xác định các cụm từ khái quát hóa
almost always, Generally speaking, The majority.
Cuối cùng thực hành mô tả
an invention you cannot live without.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Structure a Paragraph (Task 2 Opinion Essay) –
học sinh phân tích đoạn văn,
nối các câu với mục đích
(Introduce the main idea, Explain/Give examples, Reach a conclusion).
Tiếp theo tìm các từ tham chiếu
và connectors chỉ nguyên nhân/kết quả.
Cuối cùng viết một đoạn văn
trả lời câu hỏi Task 2
về việc khuyến khích sinh viên học khoa học.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_61_writing_speaking_practice",
  learningNodeId: "wsi_61",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.7 Money
• When you go shopping, do you prefer to pay for things in cash or by card? Why/Why not?
• Do you ever save money to buy special things? Why/Why not?
• Would you ever take a job which had low pay? Why/Why not?
• Would winning a lot of money make a big difference to your life? Why/Why not?

Practice Writing:
IELTS Writing Task 1 – Teacher Salaries
The table shows the salaries of secondary and high school teachers in 2009.
  `,
},
{
  id: "wsi_61_teaching_assistant",
  learningNodeId: "wsi_61",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 262) - T1 Section 3
và Listening C13 (Tr. 267) - T1 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. germination (n.): Sự nảy mầm.
2. equipment (n.): Thiết bị.
3. procedure (n.): Quy trình.
4. variable (n.): Biến số.
5. ancient (adj.): Cổ đại.
6. Babylonians (n.): Người Babylon.
7. Aristotle (n.): Aristotle – nhà triết học.
8. barometer (n.): Khí áp kế.
9. telegraph (n.): Điện báo.
10. hygrometer (n.): Ẩm kế.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T1 Section 3 (Tr. 262 - 266) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
về các bước tiến hành thí nghiệm
(procedure, equipment)
và việc đo lường
(measure its dimensions).

Chữa bài Listening 2:
C13 - T1 Section 4 (Tr. 267 - 270) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào lịch sử dự báo thời tiết,
các nhà khoa học cổ đại
(Aristotle, Babylonians)
và các phát minh đo lường
(barometer, hygrometer).
  `,
},
{
  id: "wsi_61_homework",
  learningNodeId: "wsi_61",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Future & Present Probability
  (could, might, must, can’t, will definitely)

Vocabulary:
• Academic Research
• Collocations
• Science Terminology
• Verb Endings

Listening:
• Hoàn thành C13 - T2 Section 2 (Tr. 271 - 274)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_62_expert_6_core",
  learningNodeId: "wsi_62",
  title: "EXPERT 6 CORE (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 4B: Inner and Outer Space (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về công nghệ thực tế ảo (virtual reality)
và cách nó được sử dụng trong đời sống, học tập hoặc giải trí.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Multiple Choice & Notes Completion (Section 2) –
học sinh làm trắc nghiệm (Questions 1–5)
về các thiết bị thực tế ảo như Far Vu và Iris 3D.
Sau đó hoàn thành ghi chú (Questions 6–10)
về Uses of Virtual Reality
(NO MORE THAN ONE WORD).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Features & Sentence Completion –
trước khi đọc, học sinh thảo luận
về tính xác thực của khoa học trong phim ảnh
và các hoạt động du hành thời gian/vũ trụ.
Sau đó nối các tuyên bố (1–6)
với hành động trong phim khoa học viễn tưởng (A–D).
Tiếp tục hoàn thành câu (7–12)
(NO MORE THAN TWO WORDS),
ví dụ: To ensure the science was correct,
the film-maker asked a famous __ for help.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh giải thích lý do chọn đáp án.

Speaking (15’):
Speaking – Part 2: Describe a Skill –
học sinh thảo luận về các kỹ năng thực hành (practical skills),
sau đó mô tả a practical skill you have
(what it is, how/when you use it,
how you learnt it, how it may be useful in the future).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Opinion Essay –
Some people believe that space travel is a waste of government money
while others believe it is important for human development.
Discuss both views and give your opinion.
Học sinh vẽ spidergram brainstorm
(Waste of money / Human development),
phân tích đoạn văn mẫu về coherence & relevance,
sau đó hoàn thành câu giới thiệu đoạn tiếp theo
bằng ngôn ngữ đối chiếu
(However, On the other hand).
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_62_writing_speaking_practice",
  learningNodeId: "wsi_62",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.8 Hometown
• Where is your hometown?
• What is special about your hometown?
• Do you like living there?
• Would you like to move back to your hometown in the future?

Practice Writing:
IELTS Writing Task 1 – Tourism-related Jobs
The chart shows the number of jobs
in tourism-related industries
in one UK city between 1989 and 2009.
  `,
},
{
  id: "wsi_62_teaching_assistant",
  learningNodeId: "wsi_62",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 267) - T1 Section 4
và Listening C13 (Tr. 271) - T2 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. ancient (adj.): Cổ đại.
2. Aristotle (n.): Aristotle – nhà triết học.
3. barometer (n.): Khí áp kế.
4. telegraph (n.): Điện báo.
5. common (adj.): Phổ biến.
6. source (n.): Nguồn.
7. craft (n.): Nghề thủ công.
8. dog-walking (n. phr.): Dắt chó đi dạo.
9. dog-friendly (adj.): Thân thiện với chó.
10. scarecrow (n.): Bù nhìn.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T1 Section 4 (Tr. 267 - 270) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
về lịch sử dự báo thời tiết,
công trình của Aristotle
và vai trò của các phát minh
như telegraph trong thu thập dữ liệu thời tiết.

Chữa bài Listening 2:
C13 - T2 Section 2 (Tr. 271 - 274) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào từ vựng liên quan đến công viên
(Halland Common),
các hoạt động (dog-walking)
và nghề thủ công
(willows, basket-making).
  `,
},
{
  id: "wsi_62_homework",
  learningNodeId: "wsi_62",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6: Homework

Grammar:
• Future Forms
  (is coming onto, will take, ’s going to be, etc.)

Vocabulary:
• Technology (hardware, apps, actions)

Listening:
• Hoàn thành C13 - T2 Section 3 (Tr. 275 - 279)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_63_expert_6_core",
  learningNodeId: "wsi_63",
  title: "EXPERT 6 CORE – REVIEW TEST 1 (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
Do and Correct Review Test 1

Mục tiêu:
• Đánh giá tổng hợp Listening – Reading – Writing – Speaking
• Củng cố kỹ năng làm bài và sửa lỗi chiến lược
• Chuẩn bị chuyển tiếp sang nội dung Module 5A

Hoạt động:
• Học viên làm Review Test 1 dưới điều kiện thời gian
• Giáo viên hướng dẫn cách tự phát hiện lỗi:
  – Keyword mismatch
  – Paraphrase traps
  – Grammar & coherence issues
• Thảo luận nhanh các lỗi phổ biến và cách tránh
  `,
},
{
  id: "wsi_63_writing_speaking_practice",
  learningNodeId: "wsi_63",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.9 Food
• What kind of food do you like?
• Do you prefer eating at home or in restaurants?
• What is a traditional dish in your country?
• Do you think people’s eating habits are changing?

Practice Writing:
IELTS Writing Task 1 – Dissertation Completion
The chart shows the number of students
in a UK university who:
• completed their dissertation (on time or late),
• failed to write,
• rewrote their dissertation
in 1990, 2000 and 2010.
  `,
},
{
  id: "wsi_63_teaching_assistant",
  learningNodeId: "wsi_63",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 271) - T2 Section 2
và Listening C13 (Tr. 275) - T2 Section 3

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. craft (n.): Nghề thủ công.
2. farmyard (n.): Sân nông trại.
3. dog-walking (n. phr.): Dắt chó đi dạo.
4. scarecrow (n.): Bù nhìn.
5. cramped (adj.): Chật chội.
6. timetabling (n.): Lên thời gian biểu.
7. review (v.): Xem xét/Đánh giá lại.
8. current (adj.): Hiện tại/Mới nhất.
9. security (n.): An ninh.
10. resources (n.): Nguồn lực/Tài nguyên.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T2 Section 2 (Tr. 271 - 274) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào từ vựng liên quan đến nông trại/khu bảo tồn
(farm from over two thousand years ago)
và các quy tắc tham quan
(out of bounds).

Chữa bài Listening 2:
C13 - T2 Section 3 (Tr. 275 - 279) – 10 phút
• Hoạt động: Trợ giảng chữa lỗi
tập trung vào từ vựng liên quan đến quản lý cơ sở học tập
(cramped, timetabling, security)
và nhu cầu của sinh viên
(label them more clearly).
  `,
},
{
  id: "wsi_63_homework",
  learningNodeId: "wsi_63",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 5A

• Hoàn thành Module 5A exercises (p.71–73)
• Học 25 từ vựng chủ đề Arts

Listening:
• Hoàn thành C13 - T2 Section 4 (Tr. 280 - 283)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_64_expert_6_core",
  learningNodeId: "wsi_64",
  title: "EXPERT 6 CORE – MODULE 5A: THE ARTS (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 5A: The Arts (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về màu sắc yêu thích và cách màu sắc ảnh hưởng đến cảm xúc.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (20’):
Reading – Identify Antonyms & Synonyms; Multiple-choice Questions –
học sinh xác định từ đồng nghĩa/trái nghĩa hoặc cụm từ diễn giải trong văn bản,
sau đó làm trắc nghiệm (Questions 1–6) về màu sắc, cảm xúc và ảnh hưởng của chúng.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh giải thích lý do chọn đáp án.

Listening (15’):
Listening – Follow a Sequence of Ideas; Label a Diagram (Section 3) –
trước khi nghe, học sinh vẽ các loại đường (vertical, horizontal, diagonal, curved),
thảo luận vật thể tương ứng, sau đó gán nhãn sơ đồ
How a 3D Printer Works (ONE WORD ONLY).
Phương pháp: Listening for Detail + Controlled Practice.

Speaking (15’):
Speaking – Structure an Argument; Pronunciation (Part 3) –
học sinh sắp xếp câu để tạo câu trả lời mạch lạc
(Introduce – Example – Summarise),
nối người nói với câu tóm tắt ý tưởng.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Opinion Essay –
Should we invest in looking after old buildings, or should we replace them
when they are no longer functional?
Brainstorm, so sánh/đối chiếu, viết đoạn văn có cấu trúc rõ ràng.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_64_writing_speaking_practice",
  learningNodeId: "wsi_64",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.10 Travel
• Do you like travelling?
• What kind of places do you prefer to visit?
• Do you usually travel with family or friends?
• What was your most memorable trip?

Practice Writing:
IELTS Writing Task 1 – Youth Expectations
The bar chart shows expectations of European young people
to change in the next 20 years in five different areas.
  `,
},
{
  id: "wsi_64_teaching_assistant",
  learningNodeId: "wsi_64",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 275) - T2 Section 3
và Listening C13 (Tr. 280) - T2 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. cramped (adj.): Chật chội.
2. timetabling (n.): Lên thời gian biểu.
3. security (n.): An ninh.
4. resources (n.): Nguồn lực.
5. characteristics (n.): Đặc điểm.
6. procedures (n.): Thủ tục/Quy trình.
7. autocratic (adj.): Độc đoán.
8. monetary (adj.): Thuộc tiền tệ/Tài chính.
9. delegate (v.): Ủy quyền.
10. consistency (n.): Sự nhất quán.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T2 Section 3 (Tr. 275 - 279) – 10 phút
• Trợ giảng chữa lỗi về quản lý trung tâm học liệu
(cost, budget, timetable)
và các đề xuất cải tiến
(new models, label more clearly).

Chữa bài Listening 2:
C13 - T2 Section 4 (Tr. 280 - 283) – 10 phút
• Trợ giảng chữa lỗi về văn hóa công ty
(culture, procedures, autocratic)
và các loại văn hóa kinh doanh
(Power Culture, Role Culture, Task Culture).
  `,
},
{
  id: "wsi_64_homework",
  learningNodeId: "wsi_64",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 5A

Grammar:
• Grammar to Connect Ideas
(summary phrases, reference words)

Vocabulary:
• Verbs/Nouns + Prepositions
• Compound Adjectives
• Collocations
• Art Vocabulary

Listening:
• Hoàn thành C13 - T3 Section 2 (Tr. 284 - 287)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_65_expert_6_core",
  learningNodeId: "wsi_65",
  title: "EXPERT 6 CORE – MODULE 5B: HOBBIES AND INTERESTS (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 5B: Hobbies and Interests (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về sở thích cá nhân, chia sẻ hoạt động yêu thích khi rảnh rỗi
và lý do tại sao chúng quan trọng.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Label a Diagram & Table Completion (Section 3) –
học sinh gán nhãn sơ đồ The American gumball machine
(Metal lid, Centre rod, Candy wheel, Coin mechanism).
Sau đó hoàn thành bảng ghi chú về Early vending machines
và Types of vending machine.
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Multiple-choice Questions & Matching Information –
học sinh làm trắc nghiệm (Questions 1–4) về musical tastes,
sau đó nối các tuyên bố (5–10) với các nhà nghiên cứu (A–C).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh giải thích lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Discussing Toys and Games –
luyện phát âm trọng âm và ngữ điệu,
sau đó trả lời các câu hỏi Part 3 về toys and games
(ví dụ: How do toys and games help develop children’s social skills?).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Compare and Contrast Essay –
Compare and contrast the benefits of video games with other hobbies.
In your opinion, which is more useful?
Học sinh hoàn thành spidergram (collocations: be part of a community,
develop quick reactions, learn better co-ordination),
lập bảng so sánh Video games vs Other hobbies,
luyện dùng connectors (In addition to this, however),
sau đó viết bài luận ≥250 từ.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_65_writing_speaking_practice",
  learningNodeId: "wsi_65",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.11 Hobbies
• What hobbies do you enjoy?
• How often do you do your hobbies?
• Do you prefer hobbies indoors or outdoors?
• Do you think hobbies are important for people?

Practice Writing:
IELTS Writing Task 1 – Boys vs Girls Activities
The charts show the percentage of boys and girls aged 5–14
taking part in cultural activities and sports in Australia in 2003.
  `,
},
{
  id: "wsi_65_teaching_assistant",
  learningNodeId: "wsi_65",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 280) - T2 Section 4
và Listening C13 (Tr. 284) - T3 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. autocratic (adj.): Độc đoán.
2. delegate (v.): Ủy quyền.
3. consistency (n.): Sự nhất quán.
4. operational (adj.): Thuộc vận hành.
5. railway (n.): Đường sắt/Đoàn tàu.
6. miniature (adj.): Thu nhỏ.
7. locomotives (n.): Đầu máy xe lửa.
8. visitors (n.): Khách tham quan.
9. geology (n.): Địa chất.
10. construction (n.): Sự xây dựng.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T2 Section 4 (Tr. 280 - 283) – 10 phút
• Trợ giảng chữa lỗi về các loại văn hóa tổ chức.
• Nhấn mạnh Role Culture: ổn định, chi phí cố định thấp (low fixed costs).
• Task Culture: linh hoạt nhưng không tạo ra economies of scale.

Chữa bài Listening 2:
C13 - T3 Section 2 (Tr. 284 - 287) – 10 phút
• Trợ giảng chữa lỗi về công viên đường sắt
(railway park, miniature locomotives),
mô hình gia đình điều hành (family concern),
và các khu vực xây dựng (construction area).
  `,
},
{
  id: "wsi_65_homework",
  learningNodeId: "wsi_65",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 5B

Grammar:
• Participle Clauses (-ing / -ed forms)

Vocabulary:
• Culture and Entertainment
(role, symbol, celebrity, identity, multicultural society)

Listening:
• Hoàn thành C13 - T3 Section 3 (Tr. 288 - 291)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_66_expert_6_core",
  learningNodeId: "wsi_66",
  title: "EXPERT 6 CORE – MODULE 6A: LIVING WITH OUR ENVIRONMENT (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 6A: Living with Our Environment (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về trải nghiệm gần đây với thiên nhiên
(đi dã ngoại, leo núi, tham quan rừng) và cảm nhận về môi trường sống.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Summary Completion (Section 4) –
học sinh xác định dạng từ đúng (noun/verb/adjective),
ví dụ: The purpose of shivering is to create more __.
Hoàn thành tóm tắt (Questions 1–6) về phản ứng của cơ thể với nhiệt độ thấp
(NO MORE THAN TWO WORDS).
Phương pháp: Listening for Detail + Word Form Awareness.

Reading (20’):
Reading – Identify Cause and Effect & Short-answer Questions –
học sinh phân tích mối quan hệ nhân quả trong văn bản.
Trả lời câu hỏi ngắn (NO MORE THAN THREE WORDS) về Earth’s plants
và biến đổi khí hậu (forest fires, changing climate).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh giải thích lý do chọn đáp án.

Speaking (15’):
Speaking – Part 2: Describe a Natural Place –
thay thế các tính từ chung chung (interesting)
bằng các tính từ đa dạng hơn (beautiful, amazing, fantastic).
Thực hành mô tả a natural place you have visited
(What, Where, When, Why you enjoyed it).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe Changes Over Time (Graphs) –
nối các động từ (decrease, increase, rise, fall, reach a peak)
với biểu đồ.
Phân tích tác động của trạng từ (slightly, sharply, steadily, dramatically).
Viết đoạn so sánh dữ liệu về camping, cycling and horse riding.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_66_writing_speaking_practice",
  learningNodeId: "wsi_66",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.12 Daily Routine
• What is your daily routine like?
• Do you usually follow the same routine every day?
• What part of your day do you enjoy most?
• Do you think having a routine is important?

Practice Writing:
IELTS Writing Task 1 – Australian Exports
The graph shows the percentage of Australian exports
to four countries from 1990 to 2012.
  `,
},
{
  id: "wsi_66_teaching_assistant",
  learningNodeId: "wsi_66",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 284) - T3 Section 2
và Listening C13 (Tr. 288) - T3 Section 3

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. railway (n.): Đường sắt.
2. locomotives (n.): Đầu máy xe lửa.
3. geology (n.): Địa chất.
4. construction (n.): Sự xây dựng.
5. dissertation (n.): Luận văn.
6. statistics (n.): Thống kê.
7. note-taking (n.): Ghi chú.
8. peer-group (n. phr.): Nhóm bạn đồng trang lứa.
9. confidence (n.): Sự tự tin.
10. reference (n.): Tài liệu tham khảo.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T3 Section 2 (Tr. 284 - 287) – 10 phút
• Trợ giảng chữa lỗi về phát triển công viên.
• Nhấn mạnh khó khăn địa chất (geology) khi đào hầm (digging tunnels).
• Phân tích khu Go-Kart arena và các quyết định xây dựng.

Chữa bài Listening 2:
C13 - T3 Section 3 (Tr. 288 - 291) – 10 phút
• Trợ giảng chữa lỗi về kỹ năng học tập:
note-taking, statistics, study skills.
• Chiến lược cải thiện điểm yếu:
peer-group discussions, Student Support.
  `,
},
{
  id: "wsi_66_homework",
  learningNodeId: "wsi_66",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 6A

Grammar:
• Present Perfect Simple
(already, just, recently, yet)

Vocabulary:
• The Environment & Collocations
(global effect, environmental issue, natural process)

Listening:
• Hoàn thành C13 - T3 Section 4 (Tr. 292 - 295)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},

{
  id: "wsi_67_expert_6_core",
  learningNodeId: "wsi_67",
  title: "EXPERT 6 CORE – MODULE 6B: LIVING WITH OTHER ANIMALS (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 6B: Living with Other Animals (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về trải nghiệm với động vật
(nuôi thú cưng, đi sở thú, xem tài liệu động vật hoang dã)
và vai trò của động vật trong đời sống con người.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Short-answer Questions; Multiple Choice; Summary Completion (Section 2)
– trả lời câu hỏi ngắn (Questions 1–2) về công việc bảo tồn tại Milton Zoo
(NO MORE THAN THREE WORDS).
– chọn HAI đáp án (A–G) về các loài động vật trong chương trình nhân giống.
– hoàn thành tóm tắt (Questions 5–10) về chương trình bảo tồn
(NO MORE THAN TWO WORDS).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Headings & Short-answer Questions –
nối List of Headings (i–ix) với các đoạn văn (A–F) về Trophy Hunting.
Trả lời câu hỏi ngắn (NO MORE THAN THREE WORDS),
ví dụ: What do trophy hunters provide that helps prevent the unlawful killing of animals?
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh giải thích lý do chọn đáp án.

Speaking (15’):
Speaking – Part 2: Describe an Animal –
mô tả an animal that you find interesting
(where / what it looks like / why it is interesting / how people feel about it).
Nghe và đánh giá bài nói mẫu để phân tích fluency, vocabulary và pronunciation.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Summarise a Graph –
phân tích biểu đồ Fox population,
viết câu giới thiệu và overview.
Luyện tập mô tả biểu đồ, chú trọng punctuation
và sử dụng từ vựng thay thế để tránh lặp.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_67_writing_speaking_practice",
  learningNodeId: "wsi_67",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.13 Weather
• What is the weather like in your country?
• Do you prefer hot or cold weather?
• How does the weather affect your mood?
• What season do you like most?

Practice Writing:
IELTS Writing Task 1 – Spending on Commodities
The charts show the proportion of people’s total spending
on different commodities and services in a European country
in 1998 and 2008.
  `,
},
{
  id: "wsi_67_teaching_assistant",
  learningNodeId: "wsi_67",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 288) - T3 Section 3
và Listening C13 (Tr. 292) - T3 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. dissertation (n.): Luận văn.
2. statistics (n.): Thống kê.
3. note-taking (n.): Ghi chú.
4. peer-group (n. phr.): Nhóm đồng lứa.
5. housing (n.): Nhà ở.
6. contemporary (adj.): Đương đại/Hiện đại.
7. insulation (n.): Vật liệu cách nhiệt.
8. solar panels (n. phr.): Tấm pin mặt trời.
9. carbon dioxide (n. phr.): Carbon dioxide.
10. recycle (v.): Tái chế.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T3 Section 3 (Tr. 288 - 291) – 10 phút
• Chữa lỗi về kỹ năng học tập.
• Nhấn mạnh việc work on weaknesses.
• Phân tích các chiến lược đơn giản:
card index, read everything three times.

Chữa bài Listening 2:
C13 - T3 Section 4 (Tr. 292 - 295) – 10 phút
• Chữa lỗi từ vựng về kiến trúc và môi trường:
housing, underground house.
• Các tính năng tiết kiệm năng lượng:
energy-efficient, photovoltaic tiles.
• Các vấn đề môi trường:
carbon dioxide, waste.
  `,
},
{
  id: "wsi_67_homework",
  learningNodeId: "wsi_67",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 6B

Grammar:
• Articles
• Countable & Uncountable Nouns

Vocabulary:
• Wildlife
(mammal, bird, insect, reptile)

Listening:
• Hoàn thành C13 - T4 Section 2 (Tr. 296 - 299)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_68_expert_6_core",
  learningNodeId: "wsi_68",
  title: "EXPERT 6 CORE – MODULE 7A: THE JOY OF TRAVEL (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 7A: The Joy of Travel (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về trải nghiệm du lịch gần đây
hoặc nơi họ muốn đến, chia sẻ lý do và cảm xúc.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Follow Directions; Label a Map (Section 2) –
học sinh hoàn thành câu bằng các cụm từ chỉ vị trí
(centre of, to the northwest of, just behind, past).
Sau đó gán nhãn bản đồ (Questions 1–7)
Customs House and Immigration Centre
(NO MORE THAN TWO WORDS).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Understand Complex Sentences; Matching Sentence Endings –
học sinh phân tích câu phức (chủ ngữ, động từ chính, mệnh đề quan hệ),
tóm tắt ý chính và xác định ngôn ngữ nhân quả.
Hoàn thành câu với phần kết thúc đúng (A–H).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 1: Expand Answers –
nối các cụm từ mở rộng
(There was one time when…, The main difference between then and now is…)
với chức năng của chúng
(Describe an anecdote, Compare past and now, Predict future developments).
Thực hành trả lời câu hỏi Part 1 về du lịch.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Cause and Effect Essay (Write an Introduction) –
phân tích đoạn mở bài, xác định chức năng từng câu
(General background, Restate the question, Thesis statement).
Viết Introduction và Thesis Statement
cho bài luận về ảnh hưởng của việc đi lại
đến sự hiểu biết giữa các quốc gia.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_68_writing_speaking_practice",
  learningNodeId: "wsi_68",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking Part 1 – Topic 1.14 Books
• Do you like reading books?
• What kind of books do you prefer?
• Do you usually read for pleasure or study?
• Who is your favorite author?

Practice Writing:
IELTS Writing Task 2 – Parenting Courses
The best way to ensure the growth of children
is to make parents take parenting courses.
Do you agree or disagree?
  `,
},
{
  id: "wsi_68_teaching_assistant",
  learningNodeId: "wsi_68",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 292) - T3 Section 4
và Listening C13 (Tr. 296) - T4 Section 2 (30 PHÚT)

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. insulation (n.): Vật liệu cách nhiệt.
2. photovoltaic (adj.): Quang điện.
3. carbon dioxide (n. phr.): Carbon dioxide.
4. recycle (v.): Tái chế.
5. traffic (n.): Giao thông.
6. council (n.): Hội đồng.
7. redevelopment (n.): Tái phát triển.
8. sculpture (n.): Tượng điêu khắc.
9. safety (n.): An toàn.
10. funding (n.): Quỹ.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T3 Section 4 (Tr. 292 - 295) – 10 phút
• Chữa lỗi về các biện pháp environmentally-friendly của ngôi nhà.
• Nhấn mạnh recycled materials và hệ thống xử lý nước thải qua reed beds.

Chữa bài Listening 2:
C13 - T4 Section 2 (Tr. 296 - 299) – 10 phút
• Chữa lỗi về quy hoạch đô thị:
redevelopment, sculpture.
• Các cơ sở vật chất mới:
pool, playground.
• Nhấn mạnh yếu tố safety.
  `,
},
{
  id: "wsi_68_homework",
  learningNodeId: "wsi_68",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 7A

Grammar:
• Zero Conditional
• First Conditional

Vocabulary:
• Travel and Tourism
(collocations, dependent prepositions, cause and effect structures)

Listening:
• Hoàn thành C13 - T4 Section 3 (Tr. 300 - 304)
• Ghi âm lại bài Listening đã làm (shadowing skills)
  `,
},


{
  id: "wsi_69_expert_6_core",
  learningNodeId: "wsi_69",
  title: "EXPERT 6 CORE – MODULE 7B: GLOBAL ISSUES (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 7B: Global Issues (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về một vấn đề toàn cầu mà họ quan tâm
(ví dụ: biến đổi khí hậu, nghèo đói, phân biệt đối xử)
và chia sẻ lý do tại sao nó quan trọng.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Label a Map; Matching (Section 2) –
học sinh thực hành gán nhãn bản đồ của Te Papa Museum (A–I).
Sau đó nối Purpose (A–F) với Area (7–10) của bảo tàng.
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Sentence Endings; Yes/No/Not Given –
học sinh hoàn thành câu với phần kết thúc đúng (A–H),
ví dụ: Journalists are in the habit of writing about bad news...
Sau đó trả lời YES/NO/NOT GIVEN cho các tuyên bố
về thay đổi hành vi bạo lực (violent behaviour).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 1: Describing Learning a Language –
học sinh mở rộng câu trả lời bằng cách suy nghĩ thêm ba điều có thể nói
(ví dụ: I learnt to speak English at school).
Sau đó luyện tập kết nối ý tưởng để tạo câu phức
(complex sentences).
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Cause and Effect Essay –
học sinh phân tích các câu mô tả nguyên nhân hoặc kết quả.
Tiếp theo nối các ý tưởng bằng cụm từ nhân quả
(result in, as a result of, was caused by)
và thực hiện thay đổi ngữ pháp cần thiết.
Cuối cùng viết đoạn văn ngắn áp dụng các connectors này.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_69_writing_speaking_practice",
  learningNodeId: "wsi_69",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.15 Music
• Do you like listening to music?
• What kind of music do you prefer?
• Do you enjoy live performances?
• How does music affect your mood?

Practice Writing:
IELTS Writing task 2 – Famous Brands
More and more people want to buy clothes, cars
and other products from well-known brands.
What are the reasons?
Do you think it is a positive or negative development?
  `,
},
{
  id: "wsi_69_teaching_assistant",
  learningNodeId: "wsi_69",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 296) - T4 Section 2
và Listening C13 (Tr. 300) - T4 Section 3 (30 PHÚT)

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. redevelopment (n.): Tái phát triển.
2. sculpture (n.): Tượng điêu khắc.
3. safety (n.): An toàn.
4. funding (n.): Quỹ.
5. explorer (n.): Nhà thám hiểm.
6. migration (n.): Sự di cư.
7. voyage (n.): Chuyến đi biển dài.
8. discredited (adj.): Bị mất uy tín.
9. carvings (n.): Hình chạm khắc.
10. coastal (adj.): Thuộc ven biển.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T4 Section 2 (Tr. 296 - 299)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về các hạng mục trong công viên mới
(Brackenside Pool, Central Park Playground)
và các khu vực theo chủ đề
(Global Village, Europe: medieval castles).

Chữa bài Listening 2:
C13 - T4 Section 3 (Tr. 300 - 304)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến
thám hiểm/lịch sử (explorer, Polynesian migration, ancient carvings)
và các lập luận của Thor Heyerdahl
về khả năng di cư từ phía đông.
  `,
},
{
  id: "wsi_69_homework",
  learningNodeId: "wsi_69",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 7B

Grammar:
• Complex Noun Phrases
(xác định danh từ chính, viết lại câu với cụm danh từ phức tạp)

Vocabulary:
• Global Issues
(corrupt, security, discrimination, starving)

Listening:
• Hoàn thành C13 - T4 Section 4 (Tr. 305 - 308)
  `,
},

{
  id: "wsi_70_expert_6_core",
  learningNodeId: "wsi_70",
  title: "EXPERT 6 CORE – MODULE 8A: FROM THE FIELD (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 8A: From the Field (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về thực phẩm yêu thích và nguồn gốc của chúng
(từ nông trại, siêu thị, cửa hàng).
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Table Completion (Section 1) –
học sinh luyện nghe để kiểm tra chính tả, ghi lại từ chính xác.
Sau đó thực hành hoàn thành bảng về các cửa hàng bán thực phẩm.
Phương pháp: Listening for Detail + Dictation Practice.

Reading (20’):
Reading – Deal with Unknown Vocabulary; Label a Diagram –
học sinh đoán nghĩa của các từ in đậm
(nurture, harvest, component, mixtures)
dựa trên ngữ cảnh và xác định từ loại.
Tiếp theo thực hành gán nhãn biểu đồ về The Science of Coffee
(NO MORE THAN TWO WORDS).
Phương pháp: Skimming & Context Clues + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Talk about Eating Habits –
học sinh tìm và sử dụng các cụm từ giới thiệu ý kiến đối lập
(However, I don’t think that’s always true).
Sau đó luyện tập phát âm trọng âm và ngữ điệu đúng khi nói.
Cuối cùng thực hành trả lời các câu hỏi Part 3 về thói quen ăn uống.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe Stages in a Process –
học sinh sắp xếp các từ/cụm từ chỉ trình tự
(After that, First, Next, Finally)
vào các giai đoạn (First stage, Middle stages, Last stage).
Sau đó viết mô tả về quá trình làm khoai tây chiên
(Fast food fries), sử dụng các từ chỉ trình tự.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_70_writing_speaking_practice",
  learningNodeId: "wsi_70",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.16 Technology
• Do you often use technology?
• What devices do you use most?
• How has technology changed your life?
• Do you think people depend too much on technology?

Practice Writing:
IELTS Writing task 2 – Communication in Companies
In most successful companies, some people think that communication
between employers and workers is the most important factor.
Other people say that other factors are more important.
Discuss both views.
  `,
},
{
  id: "wsi_70_teaching_assistant",
  learningNodeId: "wsi_70",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 300) - T4 Section 3
và Listening C13 (Tr. 305) - T4 Section 4 (30 PHÚT)

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. explorer (n.): Nhà thám hiểm.
2. migration (n.): Sự di cư.
3. voyage (n.): Chuyến đi biển dài.
4. discredited (adj.): Bị mất uy tín.
5. market (n.): Thị trường.
6. competition (n.): Cạnh tranh.
7. environment (n.): Môi trường.
8. management (n.): Quản lý.
9. consulting (v.): Tham vấn.
10. intellectual property (n. phr.): Sở hữu trí tuệ.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T4 Section 3 (Tr. 300 - 304)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về các chuyến đi của Heyerdahl (voyage),
nhấn mạnh động lực của ông là thử nghiệm lý thuyết
(trying out his idea) và việc sử dụng các kỹ thuật/vật liệu cổ đại
(ancient techniques).

Chữa bài Listening 2:
C13 - T4 Section 4 (Tr. 305 - 308)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến
kinh doanh và quản lý
(business markets, competition, consulting, intellectual property)
và các xu hướng thay đổi nơi làm việc
(remote working, more consultative).
  `,
},
{
  id: "wsi_70_homework",
  learningNodeId: "wsi_70",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 8A

Grammar:
• The Passive
(chuyển đổi câu chủ động ↔ bị động,
hoàn thành mô tả quá trình đóng hộp đậu xanh)

Vocabulary:
• Nutrition
• Synonyms
• Collocations
• Prefixes (dis-, in-, ir-, un-)

Listening:
• Hoàn thành C14 - T1 Section 2 (Tr. 309 - 311)
  `,
},


{
  id: "wsi_71_expert_6_core",
  learningNodeId: "wsi_71",
  title: "EXPERT 6 CORE – MODULE 8B: THE FOOD ON OUR PLATES (60 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 8B: The Food on Our Plates (90’)
(Expert 6 – phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP. Homework: Language Development + Vocabulary)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về thói quen ăn uống hằng ngày
và sự khác biệt giữa ăn ở nhà và ăn ngoài.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Table Completion (Section 1) –
học sinh thực hành hoàn thành bảng (Questions 1–10)
về các công việc tạm thời tại ice cream factory
(NO MORE THAN TWO WORDS).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Information & Label a Diagram –
học sinh nối các tuyên bố (1–6) với các đoạn văn (A–F)
về Grey Poupon.
Sau đó gán nhãn biểu đồ về
How Grey Poupon became a number one brand
(NO MORE THAN ONE WORD).
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học sinh thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Discussing Food and Culture –
học sinh thảo luận về tầm quan trọng của việc ăn uống cùng nhau
và cách thói quen bữa ăn đã thay đổi theo thời gian.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe a Process –
học sinh phân tích tiêu chí Task achievement
(Band 5: recounts detail mechanically).
Sau đó viết mô tả về quá trình đặt hàng thực phẩm trực tuyến
(online food shopping),
sử dụng các động từ phù hợp để thể hiện rõ các bước.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_71_writing_speaking_practice",
  learningNodeId: "wsi_71",
  title: "WRITING / SPEAKING PRACTICE (30 PHÚT)",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.17 Holidays
• What holidays are celebrated in your country?
• Do you prefer family holidays or travelling holidays?
• What is your favorite holiday?
• How do people usually celebrate holidays in your country?

Practice Writing:
IELTS Writing task 2 – Museums and the Internet
Some people claim that public museums and art galleries
will be no longer necessary because people can see
historical objects and works of art by using a computer.
Do you agree or disagree?
  `,
},
{
  id: "wsi_71_teaching_assistant",
  learningNodeId: "wsi_71",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C13 (Tr. 305) - T4 Section 4
và Listening C14 (Tr. 309) - T1 Section 2 (30 PHÚT)

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. competition (n.): Cạnh tranh.
2. consulting (v.): Tham vấn.
3. product life cycles (n. phr.): Chu kỳ sống sản phẩm.
4. intellectual property (n. phr.): Sở hữu trí tuệ.
5. dolphin (n.): Cá heo.
6. trust (n.): Quỹ/Sự tin cậy.
7. pollution (n.): Ô nhiễm.
8. campaigns (n.): Chiến dịch.
9. volunteers (n.): Tình nguyện viên.
10. elusive (adj.): Khó nắm bắt.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C13 - T4 Section 4 (Tr. 305 - 308)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về các xu hướng quản lý trong tương lai,
bao gồm sự tăng trưởng ở các nền kinh tế đang phát triển
(rapidly expanding economies)
và sự thay đổi sang phong cách quản lý hợp tác
(more consultative and collaborative).

Chữa bài Listening 2:
C14 - T1 Section 2 (Tr. 309 - 311)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào từ vựng liên quan đến bảo tồn
(dolphin conservation, pollution, campaigns)
và các hoạt động của quỹ (Adopt a Dolphin).
  `,
},
{
  id: "wsi_71_homework",
  learningNodeId: "wsi_71",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Module 8B

Grammar:
• Review of Formal Structures
(active/passive verb, relative clause, that clause,
simple/complex sentence)

Vocabulary:
• Formal Synonyms
(prepare → arrange,
removes → eliminates,
benefit of → advantage,
as a result → consequently)

Listening:
• Hoàn thành C14 - T1 Section 3 (Tr. 312 - 317)
  `,
},

{
  id: "wsi_72_expert_6_core",
  learningNodeId: "wsi_72",
  title: "DO AND CORRECT – REVIEW TEST 2 (EXPERT 6 CORE)",
  type: "paragraph",
  order: 1,
  content: `
Do and Correct Review Test 2
  `,
},
{
  id: "wsi_72_writing_speaking_practice",
  learningNodeId: "wsi_72",
  title: "WRITING / SPEAKING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.18 School
• What subjects do you study at school?
• Do you enjoy your school life?
• Who is your favorite teacher?
• What extracurricular activities do you take part in?

Practice Writing:
IELTS Writing task 2 – Aging Population
In the future, it is expected that there will be a higher proportion
of older people in some countries.
Is this a positive or negative development?
  `,
},
{
  id: "wsi_72_teaching_assistant",
  learningNodeId: "wsi_72",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 309) - T1 Section 2
và Listening C14 (Tr. 312) - T1 Section 3 (30 PHÚT)

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. dolphin (n.): Cá heo.
2. trust (n.): Quỹ / Sự tin cậy.
3. campaigns (n.): Chiến dịch.
4. volunteers (n.): Tình nguyện viên.
5. performing (v.): Biểu diễn.
6. acting (n.): Diễn xuất.
7. director (n.): Đạo diễn.
8. modules (n.): Học phần.
9. flexible (adj.): Linh hoạt.
10. audition (n.): Buổi thử vai.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T1 Section 2 (Tr. 309 - 311)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về các hình thức hỗ trợ
(support) mà quỹ (Trust) nhận được
(voluntary basis)
và các hoạt động cụ thể
(Adopt a Dolphin scheme, monitoring populations).

Chữa bài Listening 2:
C14 - T1 Section 3 (Tr. 312 - 317)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào từ vựng liên quan
đến nghệ thuật và giáo dục
(performing, acting, director, modules)
và các vấn đề khóa học
(flexible schedule, transfer credit).
  `,
},
{
  id: "wsi_72_homework",
  learningNodeId: "wsi_72",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Review Test 2

Grammar:
• Modals of Obligation
(should, must, need, can’t have)

Vocabulary:
• Adverbs / Adverbials
• Collocations
• Dependent Prepositions
• Healthcare terms

Listening:
• Hoàn thành C14 - T1 Section 4 (Tr. 318 - 321)
  `,
},

{
  id: "wsi_73_expert_6_core",
  learningNodeId: "wsi_73",
  title: "MODULE 9A – WORLD HEALTH (EXPERT 6 CORE)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 9A: World Health (90’)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về thói quen sống lành mạnh và tầm quan trọng của sức khỏe toàn cầu.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Identify Reference Words; Table Completion; Short-answer Questions (Section 3)
– học sinh xác định các từ tham chiếu
(I can bring mine, they don’t contain an active drug, This have no medical effects).
Sau đó hoàn thành bảng (Questions 1–6) về Placebo presentation.
Cuối cùng trả lời câu hỏi ngắn (Questions 7–9) về placebos.
Phương pháp: Listening for Detail + Context Awareness.

Reading (20’):
Reading – Follow a Sequence of Ideas; Flow Chart Completion
– học sinh phân tích cấu trúc văn bản lịch sử
(Introduction, Changes in time order, Conclusion).
Sau đó hoàn thành flow chart (Questions 1–6)
về New discovery spells the end of antibiotic drugs
(NO MORE THAN TWO WORDS).
Phương pháp: Skimming & Scanning + Exam Skills.

Speaking (15’):
Speaking – Part 2: Use a Range of Structures
– hoàn thành câu với so that, in case, even though, despite.
Thực hành mô tả a healthy habit you have.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Write a Conclusion for Essays
– nối loại essay (Opinion, Cause and effect, Problem-solution) với câu hỏi.
Luyện viết kết luận, sử dụng “softening language”.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_73_writing_speaking_practice",
  learningNodeId: "wsi_73",
  title: "WRITING / SPEAKING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.19 Work
• What kind of work do you do?
• Do you enjoy your job?
• What is the most challenging part of your work?
• Do you prefer working alone or in a team?

Practice Writing:
IELTS Writing task 2 – Nature Awareness
Nowadays, people have little awareness of the importance
of the natural world.
What are the reasons and how can people learn more
about the natural world?
  `,
},
{
  id: "wsi_73_teaching_assistant",
  learningNodeId: "wsi_73",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 312) - T1 Section 3
và Listening C14 (Tr. 318) - T1 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. performing (v.): Biểu diễn.
2. acting (n.): Diễn xuất.
3. director (n.): Đạo diễn.
4. flexible (adj.): Linh hoạt.
5. philosopher (n.): Triết gia.
6. virtue (n.): Đức hạnh.
7. emotions (n.): Cảm xúc.
8. resilience (n.): Khả năng phục hồi.
9. logic (n.): Logic/Lý trí.
10. irrational beliefs (n. phr.): Niềm tin phi lý.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T1 Section 3 (Tr. 312 - 317)
Thời lượng: 10 phút
• Chữa lỗi về nội dung khóa học
(literature for children),
nhấn mạnh vai trò của illustrations
và sự khác biệt comics vs books.

Chữa bài Listening 2:
C14 - T1 Section 4 (Tr. 318 - 321)
Thời lượng: 10 phút
• Chữa lỗi về triết học khắc kỷ (Stoicism),
các nguyên tắc cốt lõi (virtue, emotions)
và ứng dụng trong Cognitive Behaviour Therapy.
  `,
},
{
  id: "wsi_73_homework",
  learningNodeId: "wsi_73",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Homework

Grammar:
• Passive and Active Voice
(chọn dạng đúng của động từ trong văn bản)

Vocabulary:
• Describe People
(ngoại hình, phẩm chất)

Listening:
• Hoàn thành C14 - T2 Section 2 (Tr. 322 - 324)
  `,
},

{
  id: "wsi_74_expert_6_core",
  learningNodeId: "wsi_74",
  title: "MODULE 9B – LIFE STAGES (EXPERT 6 CORE)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 9B: Life Stages (90’)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về các giai đoạn trong cuộc đời
(tuổi thơ, tuổi trưởng thành, tuổi già)
và những thay đổi quan trọng ở mỗi giai đoạn.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Multiple Choice; Short-answer Questions; Notes Completion (Section 3)
– trắc nghiệm (Questions 1–2) về điều kiện hình thành tình bạn thời thơ ấu.
– hoàn thành ghi chú How child friendships develop (3 cấp độ).
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Flow Chart Completion; Multiple Choice
– hoàn thành flow chart (Questions 1–7)
về Fit for purpose: A history of fitness
(NO MORE THAN TWO WORDS).
– trắc nghiệm (Questions 8–10) về các giai đoạn lịch sử
và quan điểm của tác giả.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 2: Describe a Person
– mô tả an old person you admire
(how you know them, appearance, qualities, why you admire).
– nghe và đánh giá bài nói mẫu theo Fluency, Lexical resource, Grammar.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 2: Problem–Solution Essay
– hoàn thành bảng lập dàn ý (Problem, Solution, Advantages, Disadvantages).
– viết đoạn văn ngắn theo dàn ý,
tập trung trình bày rõ vấn đề và giải pháp.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_74_writing_speaking_practice",
  learningNodeId: "wsi_74",
  title: "WRITING / SPEAKING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.20 Health & Fitness
• Do you often exercise?
• What kind of exercise do you prefer?
• Do you think diet is important for health?
• How do you manage stress?

Practice Writing:
IELTS Writing task 2 – Imported Food
In many countries, people like to eat a wider range of food
that cannot be grown in their local place.
Do you think the advantages of this development
outweigh disadvantages?
  `,
},
{
  id: "wsi_74_teaching_assistant",
  learningNodeId: "wsi_74",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 322) - T2 Section 2
và Listening C14 (Tr. 325) - T2 Section 3

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. redevelopment (n.): Tái phát triển.
2. sculpture (n.): Tượng điêu khắc.
3. safety (n.): An toàn.
4. funding (n.): Quỹ/Tài trợ.
5. explorer (n.): Nhà thám hiểm.
6. migration (n.): Sự di cư.
7. voyage (n.): Chuyến đi biển dài.
8. discredited (adj.): Bị mất uy tín.
9. carvings (n.): Hình chạm khắc.
10. coastal (adj.): Thuộc ven biển.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T2 Section 2 (Tr. 322 - 324)
Thời lượng: 10 phút
• Chữa lỗi về từ vựng quy hoạch đô thị
(redevelopment),
công trình công cộng (sculpture, pool, playground)
và yếu tố an toàn (safety).

Chữa bài Listening 2:
C14 - T2 Section 3 (Tr. 325 - 329)
Thời lượng: 10 phút
• Chữa lỗi về thám hiểm/lịch sử
(explorer, migration),
các lý thuyết bị bác bỏ (discredited)
và chuyến đi của Thor Heyerdahl (voyage).
  `,
},
{
  id: "wsi_74_homework",
  learningNodeId: "wsi_74",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Homework

• Module 10B exercises p.158–160
• Vocabulary: Community issues – 25 words

Writing:
• Hoàn thành Bài 7 (Tr. 25)

Listening:
• Hoàn thành C14 - T2 Section 4 (Tr. 330 - 334)
  `,
},

{
  id: "wsi_75_expert_6_core",
  learningNodeId: "wsi_75",
  title: "MODULE 10A – LAW AND ORDER (EXPERT 6 CORE)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 10A: Law and Order (90’)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về vai trò của luật pháp và trật tự trong cộng đồng,
chia sẻ ví dụ về các quy tắc hoặc luật mà họ thấy quan trọng.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Flow Chart Completion (Section 4)
– hoàn thành biểu đồ dòng chảy (Questions 1–6)
về Risk assessment process.
– xác định từ chỉ trình tự (The first step, Next, Finally).
Phương pháp: Listening for Detail + Sequencing Practice.

Reading (20’):
Reading – True/False/Not Given
– luyện chiến lược xác định từ khóa và từ tham chiếu.
– trả lời TRUE / FALSE / NOT GIVEN
về Computer Security.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Discuss School Rules
– luyện dùng các cụm hỏi lại:
Sorry, can you say that again? / What do you mean by...?
– thảo luận School rules,
tập trung đưa ra ý kiến và phản hồi.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe Locations on a Map
– viết overview mô tả thay đổi trên bản đồ (fewer, growth, main, number).
– sử dụng Past Simple và Passive
(ví dụ: farmhouses were replaced by a housing estate).
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_75_writing_speaking_practice",
  learningNodeId: "wsi_75",
  title: "WRITING / SPEAKING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.21 Movies
• Do you like watching movies?
• What kind of movies do you prefer?
• Do you usually watch movies at home or in the cinema?
• Who is your favorite actor or actress?

Practice Writing:
IELTS Writing task 2 – Computer Games vs Sports
These days, a great number of children prefer spending time
on computer games rather than on sports.
Why is it?
Is it a positive or negative development?
  `,
},
{
  id: "wsi_75_teaching_assistant",
  learningNodeId: "wsi_75",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 330) - T2 Section 4
và Listening C14 (Tr. 335) - T3 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. consulting (v.): Tham vấn.
2. competition (n.): Cạnh tranh.
3. product life cycles (n. phr.): Chu kỳ sống sản phẩm.
4. remote working (n. phr.): Làm việc từ xa.
5. intellectual property (IP) (n. phr.): Sở hữu trí tuệ.
6. collaborative (adj.): Hợp tác.
7. operational (adj.): Thuộc vận hành.
8. role culture (n. phr.): Văn hóa vai trò.
9. role culture (n. phr.): Văn hóa vai trò.
10. role culture (n. phr.): Văn hóa vai trò.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T2 Section 4 (Tr. 330 - 334)
Thời lượng: 10 phút
• Chữa lỗi tập trung vào từ vựng kinh doanh và quản lý tương lai:
competition, remote working, intellectual property.
• Nhấn mạnh sự dịch chuyển sang phong cách quản lý hợp tác (collaborative).

Chữa bài Listening 2:
C14 - T3 Section 2 (Tr. 335 - 339)
Thời lượng: 10 phút
• Chữa lỗi về hệ thống quản lý doanh nghiệp
và các loại văn hóa công ty:
Power Culture và Role Culture.
  `,
},
{
  id: "wsi_75_homework",
  learningNodeId: "wsi_75",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Homework

Grammar:
• Quantifiers:
many, much, a few, a lot of, plenty of
(phân biệt a few / few và a little / little)

Vocabulary:
• Crime and Punishment
(Crime – Person – Action;
collocations: convicted, punished, arrested, witnesses)

Writing:
• Hoàn thành Bài 1.1:
Line graph – Internet Users (Tr. 2)

Listening:
• Hoàn thành C14 - T3 Section 3 (Tr. 340 - 344)
  `,
},


{
  id: "wsi_76_expert_6_core",
  learningNodeId: "wsi_76",
  title: "MODULE 10B – LIVING TOGETHER (EXPERT 6 CORE)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – Module 10B: Living Together (90’)

Warm-up & Lead-in (10’):
Speaking – học sinh thảo luận về cộng đồng nơi họ đang sống,
những ưu điểm và thách thức khi sống cùng nhau trong thành phố hoặc thị trấn.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Listening (15’):
Listening – Multiple Choice; Flow Chart Completion; Summary Completion (Section 4)
– trắc nghiệm (Questions 1–2) chọn HAI mối quan tâm chính của urban planner.
– hoàn thành biểu đồ dòng chảy Urban Planning Process.
Phương pháp: Listening for Detail + Prediction Strategy.

Reading (20’):
Reading – Matching Headings; True/False/Not Given
– nối tiêu đề (i–vii) với đoạn văn (A–G) về friendships.
– trả lời TRUE / FALSE / NOT GIVEN
về bạn bè và mạng lưới xã hội.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: thảo luận lý do chọn đáp án.

Speaking (15’):
Speaking – Part 3: Discussing Friends, Family and Community
– thảo luận về cộng đồng, cách gặp gỡ người mới,
vai trò của bạn bè và gia đình trong xây dựng mạng lưới xã hội.
Phương pháp: Communicative Practice + Fluency Drills.

Writing (20’):
Writing – Task 1: Describe a Map
– viết overview mô tả sự thay đổi của thư viện.
– sử dụng động từ chỉ thay đổi
(build, extend, knock down, move, remove, replace)
và chia ở thể bị động.
Phương pháp: Guided Discovery + Process Writing.
  `,
},
{
  id: "wsi_76_writing_speaking_practice",
  learningNodeId: "wsi_76",
  title: "WRITING / SPEAKING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.22 Shopping
• Do you enjoy shopping?
• Do you prefer shopping online or in stores?
• What kind of things do you usually buy?
• Do you think shopping habits are changing?

Practice Writing:
IELTS Writing task 2 – Interpersonal Skills
Many employers find that their new employees lack sufficient
interpersonal skills such as the ability to work with colleagues as a team.
What are the causes?
Can you suggest some possible solutions?
  `,
},
{
  id: "wsi_76_teaching_assistant",
  learningNodeId: "wsi_76",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 340) - T3 Section 3
và Listening C14 (Tr. 345) - T3 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. performing (v.): Biểu diễn.
2. acting (n.): Diễn xuất.
3. director (n.): Đạo diễn.
4. modules (n.): Học phần.
5. flexible (adj.): Linh hoạt.
6. philosopher (n.): Triết gia.
7. virtue (n.): Đức hạnh.
8. emotions (n.): Cảm xúc.
9. resilience (n.): Khả năng phục hồi.
10. irrational beliefs (n. phr.): Niềm tin phi lý.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T3 Section 3 (Tr. 340 - 344)
Thời lượng: 10 phút
• Chữa lỗi tập trung vào từ vựng nghệ thuật và giáo dục:
modules, acting, performing.

Chữa bài Listening 2:
C14 - T3 Section 4 (Tr. 345 - 348)
Thời lượng: 10 phút
• Chữa lỗi về Triết học Khắc kỷ (Stoicism),
nhấn mạnh virtue là nền tảng của hạnh phúc
và khả năng kiểm soát cảm xúc.
  `,
},
{
  id: "wsi_76_homework",
  learningNodeId: "wsi_76",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Expert 6 – Homework

Grammar:
• Second Conditional
(imaginary / unlikely situations)

Vocabulary:
• Town and City:
architecture, block, budget, facilities,
inhabitants, lay out, local, network,
overcrowded, residents

Writing:
• Hoàn thành Bài 1.2:
Chart – International Migration in UK (Tr. 3)

Listening:
• Hoàn thành C14 - T4 Section 2 (Tr. 349 - 351)
  `,
},


{
  id: "wsi_77_expert_6_review_1",
  learningNodeId: "wsi_77",
  title: "REVIEW FOR 1ST TEST",
  type: "paragraph",
  order: 1,
  content: `
REVIEW FOR 1ST TEST:
CONTACT ACADEMIC MANAGER FOR CONSOLIDATION MATERIALS
  `,
},
{
  id: "wsi_77_speaking_writing_practice",
  learningNodeId: "wsi_77",
  title: "SPEAKING & WRITING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.23 Cooking
• Do you enjoy cooking?
• Who usually cooks in your family?
• What kind of food do you like to cook?
• Do you think cooking is a useful skill?

Practice Writing:
IELTS Writing task 2 – Advertising
Topic:
Advertising is becoming more and more common in everyday life.
Some people say that advertising has a positive impact on our lives.
To what extent do you agree or disagree?
  `,
},
{
  id: "wsi_77_teaching_assistant",
  learningNodeId: "wsi_77",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 345) - T3 Section 4
và Listening C14 (Tr. 349) - T4 Section 2

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. resilience (n.): Khả năng phục hồi.
2. logic (n.): Logic/Lý trí.
3. irrational beliefs (n. phr.): Niềm tin phi lý.
4. CBT (Cognitive Behaviour Therapy) (n. phr.): Liệu pháp Hành vi Nhận thức.
5. dolphin (n.): Cá heo.
6. trust (n.): Quỹ/Sự tin cậy.
7. pollution (n.): Ô nhiễm.
8. campaigns (n.): Chiến dịch.
9. volunteers (n.): Tình nguyện viên.
10. elusive (adj.): Khó nắm bắt.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T3 Section 4 (Tr. 345 - 348)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về ảnh hưởng của Triết học Khắc kỷ
đến Liệu pháp Hành vi Nhận thức (CBT),
nhấn mạnh việc sử dụng lý trí
để thách thức các niềm tin phi lý.

Chữa bài Listening 2:
C14 - T4 Section 2 (Tr. 349 - 351)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào từ vựng
liên quan đến bảo tồn cá heo,
nhấn mạnh các mối đe dọa từ ô nhiễm
và các chiến dịch hỗ trợ của quỹ (trust).
  `,
},
{
  id: "wsi_77_homework",
  learningNodeId: "wsi_77",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Writing Task:
• Hoàn thành Bài 1.3:
Line graph – UK Acid Rain Emission (Tr. 4)

Listening:
• Hoàn thành C14 - T4 Section 3 (Tr. 352 - 358)
  `,
},


{
  id: "wsi_78_expert_6_final_test",
  learningNodeId: "wsi_78",
  title: "DO FINAL TEST",
  type: "paragraph",
  order: 1,
  content: `
DO FINAL TEST
  `,
},
{
  id: "wsi_78_speaking_writing_practice",
  learningNodeId: "wsi_78",
  title: "SPEAKING & WRITING PRACTICE",
  type: "paragraph",
  order: 2,
  content: `
Practice Speaking:
IELTS Speaking part 1 – Topic 1.24 Packing
• Do you enjoy packing before a trip?
• What do you usually pack when you travel?
• Have you ever forgotten something important while packing?
• Do you prefer packing early or at the last minute?

Practice Writing:
IELTS Writing task 2 – Housing Designs
Topic:
In many cities, there is little control on the design and construction of new houses,
so people can build houses in their own styles rather than building them with the same style
as the old houses in the local area.
Do the advantages outweigh the disadvantages?
  `,
},
{
  id: "wsi_78_teaching_assistant",
  learningNodeId: "wsi_78",
  title: "TRỢ GIẢNG (30 PHÚT)",
  type: "paragraph",
  order: 3,
  content: `
GIÁO ÁN:
Listening C14 (Tr. 352) - T4 Section 3
và Listening C14 (Tr. 359) - T4 Section 4

I. 10 PHÚT ĐẦU GIỜ: GIỚI THIỆU 10 TỪ VỰNG TRỌNG TÂM
1. explorer (n.): Nhà thám hiểm.
2. migration (n.): Sự di cư.
3. voyage (n.): Chuyến đi biển dài.
4. carvings (n.): Hình chạm khắc.
5. nanotechnology (n.): Công nghệ nano.
6. solar cells (n. phr.): Tấm pin mặt trời.
7. famine (n.): Nạn đói.
8. medicine (n.): Y học/Thuốc.
9. biosensors (n.): Cảm biến sinh học.
10. ageing process (n. phr.): Quá trình lão hóa.

II. NỘI DUNG CHÍNH (20 PHÚT)

Chữa bài Listening 1:
C14 - T4 Section 3 (Tr. 352 - 358)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi về các chuyến đi của nhà thám hiểm Heyerdahl,
tập trung vào các lập luận về sự di cư (migration)
và việc sử dụng các kỹ thuật cổ đại (ancient techniques).

Chữa bài Listening 2:
C14 - T4 Section 4 (Tr. 359 - 364)
Thời lượng: 10 phút
• Trợ giảng chữa lỗi tập trung vào công nghệ nano (nanotechnology),
thảo luận về các ứng dụng trong y học
(như cảm biến sinh học – biosensors)
và các ứng dụng môi trường
(như tấm pin mặt trời – solar cells).
  `,
},
{
  id: "wsi_78_homework",
  learningNodeId: "wsi_78",
  title: "HOMEWORK",
  type: "homework",
  order: 4,
  content: `
Writing Task:
• Hoàn thành Bài 1.4:
Graph & Table – Water Consumption (Tr. 5)

Listening:
• Hoàn thành C15 - T1 Section 2 (Tr. 365 - 368)
  `,
},

{
  id: "wsi_79_teacher",
  learningNodeId: "wsi_79",
  title: "GIÁO VIÊN (120 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – IELTS Cambridge 20 Test 1 (120’)
(Phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Giáo viên giới thiệu mục tiêu buổi học và gợi mở thảo luận ngắn về chiến lược làm bài Reading và Listening trong IELTS.
Học viên chia sẻ khó khăn thường gặp, giáo viên định hướng bằng câu hỏi dẫn dắt.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online; lớp 1-1 giáo viên gợi mở trực tiếp.

Reading (50’):
Reading – Cambridge 20 Test 1 Passage 1–3.
Học viên làm bài theo thời gian quy định, sau đó giáo viên chữa chi tiết từng câu,
phân tích từ khóa, highlight bẫy thường gặp.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học viên thảo luận lý do chọn đáp án, so sánh chiến lược làm bài.
Phân bổ thời gian:
• Passage 1 (15’)
• Passage 2 (15’)
• Passage 3 (20’)

Listening (50’):
Listening – Cambridge 20 Test 1 Section 1–4.
Học viên nghe từng section và làm bài trực tiếp,
giáo viên chữa đáp án, phân tích transcript,
nhấn mạnh từ vựng và collocations.
Phương pháp: Listening for Detail + Prediction Strategy.
Tương tác: thảo luận nhóm nhỏ hoặc theo cặp về cách nhận diện keywords trong băng.
Phân bổ thời gian:
• Section 1 (10’)
• Section 2 (10’)
• Section 3 (15’)
• Section 4 (15’)

Review & Wrap-up (10’):
Giáo viên tổng kết lỗi thường gặp trong Reading và Listening,
nhấn mạnh chiến lược quản lý thời gian trong phòng thi.
  `,
},
{
  id: "wsi_79_homework",
  learningNodeId: "wsi_79",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
Homework:
• Writing Task 1 – Cambridge 20 Test 1
• Writing Task 2 – Cambridge 20 Test 1
• Speaking Part 1 – Cambridge 20
• Speaking Part 2 – Cambridge 20
  `,
},

{
  id: "wsi_80_teacher",
  learningNodeId: "wsi_80",
  title: "GIÁO VIÊN (120 PHÚT)",
  type: "paragraph",
  order: 1,
  content: `
LESSON PLAN – IELTS Cambridge 20 Test 2 (120’)
(Phù hợp cho lớp 1-1, nhóm, offline và online, theo PPP)

Warm-up & Lead-in (10’):
Giáo viên giới thiệu mục tiêu buổi học là tiếp tục luyện tập theo đề thi thật,
tập trung vào Reading và Listening của Cambridge 20 Test 2.
Học viên thảo luận ngắn về những khó khăn trong buổi trước và chia sẻ chiến lược đã áp dụng.
Phương pháp: Brainstorming + Guided Discovery.
Tương tác: thảo luận theo cặp, nhóm nhỏ hoặc breakout room online;
lớp 1-1 giáo viên gợi mở bằng câu hỏi dẫn dắt.

Reading (50’):
Reading – Cambridge 20 Test 2 Passage 1–3.
Học viên làm bài theo thời gian quy định,
sau đó giáo viên chữa chi tiết từng câu,
phân tích từ khóa, highlight bẫy thường gặp.
Phương pháp: Skimming & Scanning + Exam Skills.
Tương tác: học viên thảo luận lý do chọn đáp án, so sánh chiến lược làm bài.
Phân bổ thời gian:
• Passage 1 (15’)
• Passage 2 (15’)
• Passage 3 (20’)

Listening (50’):
Listening – Cambridge 20 Test 2 Section 1–4.
Học viên nghe từng section và làm bài trực tiếp,
giáo viên chữa đáp án, phân tích transcript,
nhấn mạnh từ vựng và collocations.
Phương pháp: Listening for Detail + Prediction Strategy.
Tương tác: thảo luận nhóm nhỏ hoặc theo cặp
về cách nhận diện keywords trong băng.
Phân bổ thời gian:
• Section 1 (10’)
• Section 2 (10’)
• Section 3 (15’)
• Section 4 (15’)

Review & Wrap-up (10’):
Giáo viên tổng kết lỗi thường gặp trong Reading và Listening,
nhấn mạnh chiến lược quản lý thời gian
và cách cải thiện kỹ năng cho kỳ thi.
  `,
},
{
  id: "wsi_80_homework",
  learningNodeId: "wsi_80",
  title: "HOMEWORK",
  type: "homework",
  order: 2,
  content: `
Homework:
• Writing Task 1 – Cambridge 20 Test 2
• Writing Task 2 – Cambridge 20 Test 2
• Speaking Part 1 – Cambridge 20
• Speaking Part 2 – Cambridge 20
  `,
},



];
export const project17WeekBlocks: LessonBlock[] = [
  {
    id: "p17_objective",
    learningNodeId: "w17",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về cơ thể, 5 giác quan và trang phục.
• Luyện phát âm /h/, /n/, /s/, /ʃ/ qua bài hát và vận động.
• Luyện mô tả hành động, cảm giác và trang phục.
• Phản xạ giao tiếp qua hoạt động vận động và role-play.
• Hoàn thành sản phẩm lớn: All About Me Book.
    `,
  },

  {
    id: "p17_vocab",
    learningNodeId: "w17",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
Body Parts:
• head, eyes, ears, nose, mouth, arms, hands, legs, feet, fingers.

Five Senses:
• see, hear, smell, taste, touch.

Clothes:
• T-shirt, pants, dress, shoes, cap, jacket, shorts, scarf.

Tính từ mô tả:
• clean, dirty, soft, hard, warm, cold, colorful, long, short.
    `,
  },

  {
    id: "p17_pronunciation",
    learningNodeId: "w17",
    title: " PHÁT ÂM / PRONUNCIATION",
    type: "list",
    order: 3,
    content: `
• /h/ – head, hand → “h–head!”
• /n/ – nose, neck → “nnn–nose!”
• /s/ – see, shoes → “sss–ee!”
• /ʃ/ – shirt, shoes → “shhh–irt!”

Chant:
“Head and shoulders, knees and toes —
 Eyes and ears and mouth and nose!”
    `,
  },

  {
    id: "p17_structures",
    learningNodeId: "w17",
    title: "CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What is this? → It’s my hand.
• What do you use to see? → I use my eyes.
• What are you wearing? → I’m wearing a red T-shirt.

Extended Patterns:
• How many fingers do you have? → I have ten fingers.
• What can you smell? → I can smell flowers.
• How does it feel? → It’s soft / rough / cold.
• What color are your shoes? → They’re blue.
    `,
  },

  {
    id: "p17_communication",
    learningNodeId: "w17",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – Getting Ready for School:
• What are you wearing today? → I’m wearing a blue T-shirt.
• What can you smell? → I can smell my soap!
• What do you use to see? → I use my eyes!
    `,
  },

  {
    id: "p17_activity_1",
    learningNodeId: "w17",
    title: "🧍 ACTIVITY 1 – Life-Size Portrait",
    type: "list",
    order: 6,
    content: `
• Bé nằm lên giấy A0 để vẽ đường viền cơ thể.
• Tô màu và dán nhãn: head, arms, legs, feet…
    `,
  },

  {
    id: "p17_activity_2",
    learningNodeId: "w17",
    title: "ACTIVITY 2 – Body Part Puzzle",
    type: "list",
    order: 7,
    content: `
• Ghép mảnh puzzle thành hình người.
• “This is the arm.”
    `,
  },

  {
    id: "p17_activity_3",
    learningNodeId: "w17",
    title: "🎮 ACTIVITY 3 – Simon Says",
    type: "list",
    order: 8,
    content: `
• Touch your nose! / Clap your hands!
• Luyện nghe – hiểu + phản xạ vận động.
    `,
  },

  {
    id: "p17_activity_4",
    learningNodeId: "w17",
    title: "👁 ACTIVITY 4 – Sense Stations (5 Giác quan)",
    type: "list",
    order: 9,
    content: `
• See: tìm hình đúng.
• Hear: đoán âm thanh.
• Smell: ngửi hoa / cam / xà phòng.
• Taste: nếm vị ngọt–chua.
• Touch: cảm nhận mềm / ráp / cứng.
    `,
  },

  {
    id: "p17_activity_5",
    learningNodeId: "w17",
    title: "👗 ACTIVITY 5 – Paper Doll Dress-Up",
    type: "list",
    order: 10,
    content: `
• Cắt và dán quần áo lên búp bê giấy.
• “Put on the T-shirt.” / “She’s wearing a dress.”
    `,
  },

  {
    id: "p17_activity_6",
    learningNodeId: "w17",
    title: "💃 ACTIVITY 6 – Fashion Show",
    type: "list",
    order: 11,
    content: `
• Bé chọn trang phục thật.
• Giới thiệu: “I’m wearing a red dress and white shoes!”
    `,
  },

  {
    id: "p17_final_product",
    learningNodeId: "w17",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 12,
    content: `
All About Me Book (6 trang):
• My Body
• My Five Senses
• My Clothes
• My Favorite Outfit
• My Self-Portrait
• My Family Picture

Ví dụ:
• “This is my body. I have two eyes and one nose.”
• “I’m wearing a blue jacket.”
    `,
  },

  {
    id: "p17_teacher",
    learningNodeId: "w17",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 13,
    content: `
1. Mở đầu bằng bài hát “Head, Shoulders, Knees and Toes.”
2. Luyện âm /h/, /n/, /s/, /ʃ/ kết hợp vận động.
3. Dạy mẫu câu “What do you use to…?” và “What are you wearing?”.
4. Chia góc hoạt động: Body – Senses – Clothes.
5. Trưng bày All About Me Books + Fashion Show cuối tuần.
    `,
  },

  {
    id: "p17_checklist",
    learningNodeId: "w17",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 14,
    content: `
• Giấy A0, bút màu, kéo.
• Flashcards cơ thể & quần áo.
• Vật mẫu cho Sense Stations.
• Búp bê giấy, trang phục giấy.
• Nhạc “Head, Shoulders…”.
• Camera để quay Fashion Show.
    `,
  },

  {
    id: "p17_outcomes",
    learningNodeId: "w17",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 15,
    content: `
• Phát âm rõ /h/, /n/, /s/, /ʃ/.
• Hỏi–đáp được: “What is this?” / “What do you use to…?” / “What are you wearing?”
• Mô tả được cơ thể, giác quan, và trang phục.
• Hoàn thành All About Me Book & thuyết trình trong Fashion Show.
    `,
  },
  {
    id: "p17_w17_homework",
    learningNodeId: "w17",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 16,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/my-body-book
• https://www.youtube.com/watch?v=bQJ82qMKNqA
• https://www.youtube.com/watch?v=mgROe8lAqOg
    `,
    audioUrl: `
    https://wewin.edu.vn/wp-content/uploads/2025/12/Project-17_Clothes_P2.mp3
    https://wewin.edu.vn/wp-content/uploads/2025/12/ok🎵-SONG_-_MY-FIVE-SENSES_.mp3`,
  },
];

export const project16WeekBlocks: LessonBlock[] = [
  {
    id: "p16_objective",
    learningNodeId: "w16",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về lễ hội Trung Thu.
• Luyện phát âm /m/, /l/, /r/, /b/ theo nhịp chant.
• Luyện mô tả màu sắc, hình dạng, cảm xúc, hành động.
• Rèn kỹ năng kể chuyện và giao tiếp trong lễ hội.
• Tham gia sự kiện WeWIN Mid-Autumn Celebration với sản phẩm cá nhân.
    `,
  },

  {
    id: "p16_vocab",
    learningNodeId: "w16",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
Festival Words:
• moon, mooncake, lantern, rabbit, star, mask, Banyan tree, festival, drum, parade.

Tính từ mở rộng:
• bright, round, full, happy, excited.

Động từ:
• light, dance, celebrate.
    `,
  },

  {
    id: "p16_pronunciation",
    learningNodeId: "w16",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /m/ – moon, mask → “mmm–moon.”
• /l/ – lantern, light → “llll–light.”
• /r/ – rabbit, round → “r–rabbit.”
• /b/ – bright, bamboo → “b–bright.”

Chant:
“Moon so bright, lanterns light —
 Rabbit dances in the night!”
    `,
  },

  {
    id: "p16_structures",
    learningNodeId: "w16",
    title: "CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What can you see? → I can see a lantern.
• What color is your lantern? → It’s red and yellow.
• Do you like mooncakes? → Yes, I do!

Extended Patterns:
• What are you doing? → I’m making a mask.
• What shape is your lantern? → It’s a star.
• How do you feel? → I’m happy and excited!
    `,
  },

  {
    id: "p16_communication",
    learningNodeId: "w16",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – At the Moon Festival:
• “What do you have?” → “I have a lantern!”
• “What color is it?” → “It’s yellow!”
• “Do you like mooncakes?” → “Yes! They’re sweet!”
    `,
  },

  {
    id: "p16_activity_1",
    learningNodeId: "w16",
    title: "🏮 ACTIVITY 1 – Lantern Making",
    type: "list",
    order: 6,
    content: `
• Làm đèn lồng bằng giấy màu, dây treo.
• “This is my lantern. It’s red and bright.”
    `,
  },

  {
    id: "p16_activity_2",
    learningNodeId: "w16",
    title: "🥮 ACTIVITY 2 – Mooncake Craft",
    type: "list",
    order: 7,
    content: `
• Nặn bánh trung thu bằng đất nặn hoặc làm bằng giấy.
• “I’m making a mooncake.”
    `,
  },

  {
    id: "p16_activity_3",
    learningNodeId: "w16",
    title: "🐇 ACTIVITY 3 – Moon Rabbit Story",
    type: "list",
    order: 8,
    content: `
• Nghe/cô kể chuyện Chú Cuội – Thỏ Ngọc.
• Vẽ lại cảnh yêu thích.
• “The rabbit lives on the moon.”
    `,
  },

  {
    id: "p16_activity_4",
    learningNodeId: "w16",
    title: "⭐ ACTIVITY 4 – Star Counting",
    type: "list",
    order: 9,
    content: `
• Bé đếm sao hoặc dán sticker.
• “Ten stars in the sky!”
    `,
  },

  {
    id: "p16_activity_5",
    learningNodeId: "w16",
    title: "😺 ACTIVITY 5 – Mask Decorating",
    type: "list",
    order: 10,
    content: `
• Trang trí mặt nạ múa lân bằng giấy bóng kính, sequin.
• “My mask is colorful!”
    `,
  },

  {
    id: "p16_event",
    learningNodeId: "w16",
    title: "🎉 SỰ KIỆN – WEWIN MID-AUTUMN CELEBRATION",
    type: "list",
    order: 11,
    content: `
• Lantern Parade – Diễu hành đèn lồng.
• Thi “Best Lantern”.
• Biểu diễn bài hát Trung Thu tiếng Anh.
• Trẻ giao tiếp bằng tiếng Anh khi giới thiệu sản phẩm.
    `,
  },

  {
    id: "p16_final_product",
    learningNodeId: "w16",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 12,
    content: `
My Lantern Book / Moon Festival Craft Set:
• Trang 1: Lantern – màu sắc + mô tả.
• Trang 2: Mask – màu + hình dạng.
• Trang 3: Mooncake – mô tả vị.

Ví dụ:
“This is my lantern. It’s yellow and bright.”
    `,
  },

  {
    id: "p16_teacher",
    learningNodeId: "w16",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 13,
    content: `
1. Bắt đầu bằng bài hát “Happy Mid-Autumn Festival”.
2. Luyện âm /m/, /l/, /r/, /b/ qua trò “Say and Shine”.
3. Dạy câu “What can you see?” với flashcards.
4. Chia góc học tập: Lantern – Mask – Story.
5. Tổ chức mini show “WeWIN Moon Parade”.
    `,
  },

  {
    id: "p16_checklist",
    learningNodeId: "w16",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 14,
    content: `
• Giấy màu, bìa cứng, dây treo.
• Đất nặn & khuôn bánh trung thu.
• Mặt nạ giấy bóng kính & sequin.
• Flashcards lễ hội Trung Thu.
• Nhạc “Happy Mid-Autumn Festival”.
• Đèn lồng, trống, đèn led trang trí.
    `,
  },

  {
    id: "p16_outcomes",
    learningNodeId: "w16",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 15,
    content: `
• Phát âm rõ /m/, /l/, /r/, /b/.
• Hỏi – đáp tự nhiên: “What can you see?” / “Do you like…?”.
• Mô tả 3–5 đồ vật/hành động Trung Thu bằng tiếng Anh.
• Hoàn thành My Lantern Book & tham gia WeWIN Moon Parade.
    `,
  },
  {
    id: "p16_w16_homework",
    learningNodeId: "w16",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 16,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/mid-autumn-festival-planner
• https://www.youtube.com/watch?v=M3T2OGfzb5w
    `,
  },
];

export const project15WeekBlocks: LessonBlock[] = [
  {
    id: "p15_objective",
    learningNodeId: "w15",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học và ôn từ vựng đồ dùng học tập.
• Luyện phát âm /b/, /p/, /k/, /s/.
• Luyện mô tả màu sắc, vị trí và sở hữu (my/your).
• Thực hành câu mệnh lệnh và hỏi–đáp trong lớp học.
• Hoàn thành sản phẩm: My School Kit Folder.
    `,
  },

  {
    id: "p15_vocab",
    learningNodeId: "w15",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
Basic School Things:
• pencil, pen, book, notebook, crayon, ruler, eraser, school bag, marker.

Extra Tools:
• compass, glue, scissors, clip, folder, board, backpack.

Động từ đi kèm:
• open, close, put, take, draw, write, cut, glue, color.
    `,
  },

  {
    id: "p15_pronunciation",
    learningNodeId: "w15",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /b/ – bag, book → “b–bag.”
• /p/ – pen, pencil → “p–p–pen.”
• /k/ – color, clip → “k–k–clip.”
• /s/ – scissors, school → “sss–chool.”

Chant:
“Pen and pencil, bag and book —
 Let’s go to school, come take a look!”
    `,
  },

  {
    id: "p15_structures",
    learningNodeId: "w15",
    title: "CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What is this? → It’s a pencil.
• What color is your bag? → It’s blue.
• Where is your book? → It’s in my school bag.

Extended Patterns:
• Do you have a ruler? → Yes, I do. / No, I don’t.
• Whose pencil is this? → It’s mine / It’s yours.
• Please put your book on the desk.
• Let’s organize our school things!
    `,
  },

  {
    id: "p15_communication",
    learningNodeId: "w15",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – In the Classroom:
• “What do you have in your bag?”
• “I have a book and a pencil case.”
• “Where is your ruler?”
• “It’s in my bag.”
• “Good! Please take your crayon.”
• “Yes, teacher!”
    `,
  },

  {
    id: "p15_activity_1",
    learningNodeId: "w15",
    title: "🎒 ACTIVITY 1 – School Bag Packing",
    type: "list",
    order: 6,
    content: `
• Trẻ học cách xếp đồ vào cặp đúng thứ tự.
• “Put the book in the bag.” / “Take out your pencil.”
• Luyện nghe – phản xạ mệnh lệnh.
    `,
  },

  {
    id: "p15_activity_2",
    learningNodeId: "w15",
    title: "🖍 ACTIVITY 2 – Pencil Case Design",
    type: "list",
    order: 7,
    content: `
• Làm hộp bút bằng giấy/bìa tái chế.
• Bé viết: “My Pencil Case.”
• Luyện sáng tạo + viết tiếng Anh.
    `,
  },

  {
    id: "p15_activity_3",
    learningNodeId: "w15",
    title: "ACTIVITY 3 – Tool Matching",
    type: "list",
    order: 8,
    content: `
• Ghép flashcard hình ↔ từ.
• Trò chơi nhóm: “What’s missing?”
• Tăng phản xạ nhận diện từ vựng.
    `,
  },

  {
    id: "p15_activity_4",
    learningNodeId: "w15",
    title: "🏷 ACTIVITY 4 – Name Label Making",
    type: "list",
    order: 9,
    content: `
• Bé viết tên và dán lên đồ dùng.
• “This is my pen.” / “That is your bag.”
• Luyện sở hữu cách: my / your / his / her.
    `,
  },

  {
    id: "p15_activity_5",
    learningNodeId: "w15",
    title: "🔍 ACTIVITY 5 – School Things Hunt",
    type: "list",
    order: 10,
    content: `
• Cô giấu đồ trong lớp.
• Bé tìm và nói: “I found a ruler!”
• Luyện giới từ vị trí: under / on / in.
    `,
  },

  {
    id: "p15_final_product",
    learningNodeId: "w15",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
My School Kit Folder:
• Ảnh/vẽ đồ dùng học tập.
• Mỗi vật có 1 câu mô tả:
  “This is my pencil.”
  “It’s yellow and long.”
• Sản phẩm đẹp, dễ trưng bày.
    `,
  },

  {
    id: "p15_teacher",
    learningNodeId: "w15",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Mở đầu bằng bài hát “What’s in Your Bag?”.
2. Luyện âm /b/, /p/, /k/, /s/ với trò “Say & Touch”.
3. Dạy câu “What is this?” bằng đồ thật.
4. Chia góc: Matching – Label – Packing.
5. Khuyến khích học sinh trình bày School Kit cuối tuần.
    `,
  },

  {
    id: "p15_checklist",
    learningNodeId: "w15",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Flashcards đồ dùng học tập.
• Giấy màu, bìa cứng, keo dán.
• Cặp/túi thật cho hoạt động Packing.
• Sticker chữ cái để trang trí.
• Nhạc “What’s in Your Bag?”.
• Camera ghi hình sản phẩm.
    `,
  },

  {
    id: "p15_outcomes",
    learningNodeId: "w15",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm rõ /b/, /p/, /k/, /s/.
• Hỏi–đáp trôi chảy: “What is this?” / “Where is it?”.
• Sử dụng đúng my / your / this / that.
• Hoàn thành My School Kit Folder và thuyết trình.
    `,
  },
  {
    id: "p15_w15_homework",
    learningNodeId: "w15",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/back-to-school-organizer
• https://www.youtube.com/watch?v=FlgQzX5pZMI
• https://www.youtube.com/watch?v=uU4H53E7RUk
    `,
  },
];

export const project14WeekBlocks: LessonBlock[] = [
  {
    id: "p14_objective",
    learningNodeId: "w14",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về kẹo và món tráng miệng.
• Luyện phát âm /k/, /s/, /l/, /ʧ/ qua trò chơi.
• Luyện đếm, mô tả màu, vị và hình dạng.
• Giao tiếp qua cửa hàng kẹo mini (role-play).
• Hoàn thành sản phẩm lớn: My Candy Menu + Candy Art Box.
    `,
  },

  {
    id: "p14_vocab",
    learningNodeId: "w14",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Sweets & Desserts:
  lollipop, chocolate, cookie, cake, cupcake,
  donut, ice cream, candy, jelly, marshmallow.
• Tính từ mô tả: sweet, yummy, round, soft, cold, hot.
    `,
  },

  {
    id: "p14_pronunciation",
    learningNodeId: "w14",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /k/ – cookie, cake, candy → “k–k–cookie!”
• /s/ – sweet, soft → “sss–weet!”
• /l/ – lollipop → “llll–ollipop.”
• /ʧ/ – chocolate → “ch–ch–ocolate!”

Chant:
“Candy, cookie, chocolate too —
 Sweet and yummy, just for you!”
    `,
  },

  {
    id: "p14_structures",
    learningNodeId: "w14",
    title: "CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What do you want to buy? → I want a donut.
• How many candies do you have? → I have five.
• What color is it? → It’s pink.

Extended Patterns:
• Do you like chocolate? → Yes, I do!
• Is it sweet or sour? → It’s sweet.
• What shape is it? → It’s round.
• How much is it? → It’s one dollar.
    `,
  },

  {
    id: "p14_communication",
    learningNodeId: "w14",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – At the Candy Shop:
• “Welcome to my candy shop!”
• “What do you have?” → “I have cookies and lollipops.”
• “I want an ice cream, please.”
• “Here you are!” – “Thank you!”
    `,
  },

  {
    id: "p14_activity_1",
    learningNodeId: "w14",
    title: "🍬 ACTIVITY 1 – Clay Sweet Making",
    type: "list",
    order: 6,
    content: `
• Nặn donut, cupcake, ice cream bằng đất nặn.
• “I’m making a donut. It’s pink and round.”
    `,
  },

  {
    id: "p14_activity_2",
    learningNodeId: "w14",
    title: "🍭 ACTIVITY 2 – Candy Sorting",
    type: "list",
    order: 7,
    content: `
• Phân loại theo màu / hình dạng / vị.
• “Three round lollipops, two cookies.”
    `,
  },

  {
    id: "p14_activity_3",
    learningNodeId: "w14",
    title: "🏪 ACTIVITY 3 – Sweet Shop Role-Play",
    type: "list",
    order: 8,
    content: `
• Set up quầy kẹo mini + bảng giá sticker.
• “What do you want to buy?” – “I want a chocolate.”
• Trẻ luyện giao tiếp mua–bán thật.
    `,
  },

  {
    id: "p14_activity_4",
    learningNodeId: "w14",
    title: "🧁 ACTIVITY 4 – Cupcake Decorating",
    type: "list",
    order: 9,
    content: `
• Dán topping, vẽ kem và sprinkles.
• “This is my cupcake. It’s pink and sweet.”
    `,
  },

  {
    id: "p14_activity_5",
    learningNodeId: "w14",
    title: "💲 ACTIVITY 5 – Price Tag Making",
    type: "list",
    order: 10,
    content: `
• Viết giá đơn giản: Candy – $1 / Cake – $2.
• Luyện con số + giá trị tiền tệ.
    `,
  },

  {
    id: "p14_event",
    learningNodeId: "w14",
    title: "🎉 SỰ KIỆN – SWEET FAIR",
    type: "list",
    order: 11,
    content: `
• Trẻ trưng bày quầy kẹo mini.
• Giao tiếp tiếng Anh với khách:
  “Welcome to my candy shop!”
  “I sell cookies and lollipops!”
• Quay video giới thiệu sản phẩm.
    `,
  },

  {
    id: "p14_final_product",
    learningNodeId: "w14",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 12,
    content: `
My Candy Menu + Candy Art Box:
• Danh sách món + giá.
• 3–5 câu mô tả:
  “This is my donut. It’s round and sweet.”
• Kết hợp nghệ thuật + mô tả + giao tiếp.
    `,
  },

  {
    id: "p14_teacher",
    learningNodeId: "w14",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 13,
    content: `
1. Mở đầu bằng bài hát “I Like Candy” hoặc “Do You Like Ice Cream?”.
2. Luyện âm /k/, /s/, /l/, /ʧ/ qua trò “Say & Eat!”.
3. Tổ chức 3 góc học tập: Clay – Menu – Role-Play.
4. Chuẩn bị Sweet Fair cuối tuần.
5. Quay video học sinh giới thiệu cửa hàng.
    `,
  },

  {
    id: "p14_checklist",
    learningNodeId: "w14",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 14,
    content: `
• Đất nặn, giấy màu, hồ dán.
• Sticker $, thẻ giá.
• Flashcards đồ ngọt.
• Hộp giấy nhỏ / rổ nhựa làm quầy.
• Nhạc “I Like Candy”.
• Camera để quay sự kiện.
    `,
  },

  {
    id: "p14_outcomes",
    learningNodeId: "w14",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 15,
    content: `
• Phát âm đúng /k/, /s/, /l/, /ʧ/.
• Nói được 3–5 câu mô tả món ngọt.
• Hỏi–đáp trôi chảy về sở thích và mua–bán.
• Hoàn thành My Candy Menu & tham gia Sweet Fair.
    `,
  },
  {
    id: "p14_w14_homework",
    learningNodeId: "w14",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 16,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/sweet-shop-owner
    `,
  },
];

export const project13WeekBlocks: LessonBlock[] = [
  {
    id: "p13_objective",
    learningNodeId: "w13",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Khám phá cảnh quan thiên nhiên: mountain, river, forest, desert, volcano…
• Học mô tả màu sắc, vị trí, đặc điểm thiên nhiên.
• Rèn phát âm /v/, /r/, /f/, /l/.
• Luyện giao tiếp qua mô tả ảnh thiên nhiên.
• Hoàn thành sản phẩm lớn: My Nature Photo Album.
    `,
  },

  {
    id: "p13_vocab",
    learningNodeId: "w13",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Landforms: mountain, river, lake, forest, beach, desert, valley, volcano, island, waterfall.
• Nature Elements: tree, flower, rock, sand, grass, soil, ice, cave, field.
• Tính từ mô tả: tall, green, cold, hot, dry.
• Động từ tự nhiên: flow, grow, fly, fall.
    `,
  },

  {
    id: "p13_pronunciation",
    learningNodeId: "w13",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /v/ – volcano, valley → “v–valley” (cắn nhẹ môi dưới).
• /r/ – river, rock → “r–river” (cuộn nhẹ lưỡi).
• /f/ – forest, flower → “fff–forest”.
• /l/ – lake, leaf → “llll–lake”.
• Phonics Chant:
  “River runs, flower grows –
   Volcano high, the cold wind blows!”
    `,
  },

  {
    id: "p13_structures",
    learningNodeId: "w13",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What is it? → It’s a mountain.
• What color is it? → It’s green.
• Where is the river? → It’s next to the mountain.

Extended Patterns:
• What can you see? → I can see a lake and trees.
• What is the weather like? → It’s sunny and windy.
• Do you like the beach? → Yes, I do!
• How does it feel? → It’s soft / rough / hard.
    `,
  },

  {
    id: "p13_communication",
    learningNodeId: "w13",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – “Exploring Nature”:
• “What can you see?” → “I can see a mountain.”
• “Where is the river?” → “It’s next to the mountain.”
• “Do you like it?” → “Yes! It’s beautiful!”
    `,
  },

  {
    id: "p13_activity_1",
    learningNodeId: "w13",
    title: "🔍 ACTIVITY 1 – Nature Scavenger Hunt",
    type: "list",
    order: 6,
    content: `
• Xem video / tranh thiên nhiên và đánh dấu vật tìm thấy.
• “Tree ✓, flower ✓, river ✓.”
• Rèn kỹ năng quan sát và tên gọi thiên nhiên.
    `,
  },

  {
    id: "p13_activity_2",
    learningNodeId: "w13",
    title: "🎨 ACTIVITY 2 – Landscape Painting",
    type: "list",
    order: 7,
    content: `
• Vẽ mountain, river, forest bằng màu nước.
• Dán bông gòn làm mây, giấy nhăn làm cây.
• Mô tả: “This is my mountain. It’s tall and green.”
    `,
  },

  {
    id: "p13_activity_3",
    learningNodeId: "w13",
    title: "🍃 ACTIVITY 3 – Texture Rubbing",
    type: "list",
    order: 8,
    content: `
• Dùng lá cây, sỏi, vỏ cây để chà tạo texture.
• “This is a leaf. It’s rough.”
• Học tính từ cảm giác: soft, hard, rough.
    `,
  },

  {
    id: "p13_activity_4",
    learningNodeId: "w13",
    title: "🌿 ACTIVITY 4 – Nature Collage",
    type: "list",
    order: 9,
    content: `
• Dán lá khô, hoa, cỏ, sỏi + vẽ thêm.
• “I made a forest. It’s green and big.”
• Kết hợp nghệ thuật & mô tả tiếng Anh.
    `,
  },

  {
    id: "p13_activity_5",
    learningNodeId: "w13",
    title: "🌋 ACTIVITY 5 – Volcano Experiment",
    type: "list",
    order: 10,
    content: `
• Làm núi bằng giấy nhăn.
• Dùng baking soda + giấm tạo “lava”.
• “The volcano is erupting!”
• Tập động từ tự nhiên: erupt, fall, flow.
    `,
  },

  {
    id: "p13_product",
    learningNodeId: "w13",
    title: "SẢN PHẨM / FINAL PRODUCT – My Nature Photo Album",
    type: "list",
    order: 11,
    content: `
Album 6–8 trang gồm:
• Ảnh hoặc tranh phong cảnh.
• Texture thật (lá, sỏi…).
• 1–2 câu mô tả tiếng Anh:
  “This is a river. It’s blue and long.”
  “This is a volcano. It’s hot!”
    `,
  },

  {
    id: "p13_teacher",
    learningNodeId: "w13",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Mở đầu bằng bài hát “The Earth Is Our Home.”
2. Luyện âm /v/, /r/, /f/, /l/ qua trò “Feel & Say.”
3. Dạy mô tả vị trí: on / next to / in / by.
4. Tổ chức 3 góc: Painting – Texture – Volcano Experiment.
5. Thu thập hình và dán vào Nature Photo Album.
    `,
  },

  {
    id: "p13_checklist",
    learningNodeId: "w13",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Lá cây, sỏi, vỏ cây, hoa khô.
• Giấy A4, màu nước, hồ dán.
• Baking soda, giấm, mô hình núi.
• Flashcards thiên nhiên: mountain, river…
• Nhạc “The Earth Is Our Home”.
• Máy ảnh để chụp ảnh album.
    `,
  },

  {
    id: "p13_outcomes",
    learningNodeId: "w13",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm chuẩn /v/, /r/, /f/, /l/.
• Sử dụng đúng cấu trúc mô tả cảnh vật.
• Mô tả được 3–5 yếu tố thiên nhiên bằng tiếng Anh.
• Hoàn thành “My Nature Photo Album.”
• Tự tin thuyết trình trước lớp.
    `,
  },
  {
    id: "p13_w13_homework",
    learningNodeId: "w13",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/nature-photographer
• https://www.youtube.com/watch?v=VNJ9vPF_R9M
    `,
  },
];

export const project12WeekBlocks: LessonBlock[] = [
  {
    id: "p12_objective",
    learningNodeId: "w12",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Khám phá thế giới đại dương: động vật biển & đồ vật bãi biển.
• Học mô tả môi trường sống, màu sắc và hành động (swim, crawl...).
• Rèn phát âm /ʃ/, /k/, /d/, /s/.
• Luyện cấu trúc Where does it live? / Can it swim? / What color is it?
• Tạo sản phẩm lớn: My Ocean Box.
    `,
  },

  {
    id: "p12_vocab",
    learningNodeId: "w12",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Sea Animals: octopus, fish, crab, jellyfish, starfish, dolphin, turtle, coral, shell.
• Beach Words: beach, wave, sand, coconut, surfing, sunglasses, sunscreen, sandcastle, ukulele, hula dance.
• Phân nhóm: “in the sea” & “on the beach”.
    `,
  },

  {
    id: "p12_pronunciation",
    learningNodeId: "w12",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /ʃ/ – shell, fish → “shhh–ell.”
• /k/ – crab, coral → “k–crab!”
• /d/ – dolphin → “d–dolphin.”
• /s/ – sea, sand → “sss–and.”
• Phonics Chant: “Sea, sea, sand and shell – Fish and crab, swim so well!”
    `,
  },

  {
    id: "p12_structures",
    learningNodeId: "w12",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What is it? → It’s a fish.
• Where does it live? → It lives in the sea.
• What color is it? → It’s blue.

Extended Patterns:
• Can it swim? → Yes, it can!
• How many fish can you see? → I can see five fish.
• What are you doing? → I’m building a sandcastle.
    `,
  },

  {
    id: "p12_communication",
    learningNodeId: "w12",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – “At the Beach”:
• What is that? → “It’s a turtle.”
• Where does it live? → “In the sea!”
• Can it swim? → “Yes, it can!”
• Học sinh minh họa hành động: bơi, bò, nhảy.
    `,
  },

  {
    id: "p12_activity_1",
    learningNodeId: "w12",
    title: "🎨 ACTIVITY 1 – Aquarium Craft",
    type: "list",
    order: 6,
    content: `
• Dùng hộp giấy làm bể cá mini.
• Dán cá, rong biển, sỏi giấy.
• Câu nói mục tiêu: “This is my fish tank.” / “Fish live here.”
    `,
  },

  {
    id: "p12_activity_2",
    learningNodeId: "w12",
    title: "🎨 ACTIVITY 2 – Fish Painting (Handprint Art)",
    type: "list",
    order: 7,
    content: `
• In bàn tay bằng màu tạo hình cá.
• Mô tả sản phẩm: “This is my fish. It’s yellow.”
    `,
  },

  {
    id: "p12_activity_3",
    learningNodeId: "w12",
    title: "🎨 ACTIVITY 3 – Underwater Scene",
    type: "list",
    order: 8,
    content: `
• Nhóm học sinh vẽ tranh đại dương lớn.
• Bé chọn 1 con vật để giới thiệu:
  “I have a starfish. It’s red.”
    `,
  },

  {
    id: "p12_activity_4",
    learningNodeId: "w12",
    title: "🐚 ACTIVITY 4 – Shell Sorting",
    type: "list",
    order: 9,
    content: `
• Phân loại vỏ sò theo kích thước và màu.
• Luyện câu mô tả: “Three big shells, two small shells.”
    `,
  },

  {
    id: "p12_activity_5",
    learningNodeId: "w12",
    title: "🏰 ACTIVITY 5 – Sandcastle Craft",
    type: "list",
    order: 10,
    content: `
• Làm lâu đài cát bằng giấy nhám hoặc carton.
• Câu mẫu: “I’m building a sandcastle.”
    `,
  },

  {
    id: "p12_event",
    learningNodeId: "w12",
    title: "🌴 SỰ KIỆN: UNDERWATER FAIR – MINI BEACH PARTY",
    type: "list",
    order: 11,
    content: `
• Trang trí lớp theo chủ đề biển.
• Trẻ đội mũ, đeo kính râm, cầm cá hoặc sao biển.
• Trò chơi: “Find My Shell”, “Swim Like a Fish”.
• Hát: “Baby Shark” hoặc “Under the Sea”.
    `,
  },

  {
    id: "p12_product",
    learningNodeId: "w12",
    title: "SẢN PHẨM / FINAL PRODUCT – My Ocean Box",
    type: "list",
    order: 12,
    content: `
• Hộp đại dương gồm cá giấy, vỏ sò, rong biển.
• Dán 3–5 câu mô tả xung quanh hộp:
  “This is a dolphin. It can swim. It lives in the sea.”
• Sản phẩm vừa sáng tạo vừa rèn kỹ năng mô tả.
    `,
  },

  {
    id: "p12_teacher",
    learningNodeId: "w12",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 13,
    content: `
1. Mở đầu bằng video biển hoặc bài hát “Baby Shark”.
2. Luyện âm /ʃ/, /k/, /d/, /s/ với trò “Move Like a Fish”.
3. Dạy câu “Where does it live?” bằng flashcards.
4. Chia nhóm hoạt động: Aquarium – Painting – Sorting – Castle.
5. Chuẩn bị “Underwater Fair”.
    `,
  },

  {
    id: "p12_checklist",
    learningNodeId: "w12",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 14,
    content: `
• Hộp giấy, giấy màu, vỏ sò.
• Màu nước, keo, cát giấy.
• Flashcards động vật biển.
• Bong bóng xanh, khăn biển.
• Nhạc chủ đề biển.
• Máy ảnh hoặc điện thoại.
    `,
  },

  {
    id: "p12_outcomes",
    learningNodeId: "w12",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 15,
    content: `
• Phát âm đúng /ʃ/, /k/, /d/, /s/.
• Dùng đúng mẫu câu: “Where does it live?” / “Can it swim?”.
• Nói 3–5 câu mô tả động vật biển hoặc hoạt động bãi biển.
• Hoàn thành sản phẩm “My Ocean Box”.
• Tham gia Underwater Fair tự tin và vui vẻ.
    `,
  },
  {
    id: "p12_w12_homework",
    learningNodeId: "w12",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 16,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/ocean-explorer
• https://www.youtube.com/watch?v=BmNc12K9ePk
    `,
  },
];

export const springReviewBlocks: LessonBlock[] = [
  {
    id: "spr_review_objective",
    learningNodeId: "w11_review",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Ôn tập 5 chủ đề từ tháng 3–5: Insects, Food, Farm, Transportation, Fast Food.
• Củng cố phát âm /f/, /b/, /k/, /s/.
• Luyện 5 mẫu câu giao tiếp chính.
• Tăng phản xạ nói qua trò chơi, đóng vai.
• Tổ chức Spring Festival – trình diễn, trưng bày sản phẩm.
    `,
  },

  {
    id: "spr_review_topics",
    learningNodeId: "w11_review",
    title: "REVIEWED TOPICS / CHỦ ĐỀ ÔN TẬP",
    type: "list",
    order: 2,
    content: `
• Insects & Bugs
• What I Eat in a Week
• Farm Animals
• Transportation & My City Map
• Fast Food Day

Tổng hợp từ vựng về động vật, thức ăn, phương tiện và hành động hàng ngày.
    `,
  },

  {
    id: "spr_review_pronunciation",
    learningNodeId: "w11_review",
    title: " PHÁT ÂM ÔN TẬP / PRONUNCIATION",
    type: "list",
    order: 3,
    content: `
• /f/ – farm, food, fast → “fff–farm.”
• /b/ – bus, bird, burger → “b–bus.”
• /k/ – car, cow, cook → “k–car.”
• /s/ – snake, sandwich → “sss–snake.”

Hoạt động lớp: “Phonics Hop!” – nghe âm và nhảy đến thẻ đúng.
    `,
  },

  {
    id: "spr_review_structures",
    learningNodeId: "w11_review",
    title: "CẤU TRÚC CÂU ÔN TẬP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Insects: What is it? → It’s a bee. / Can it fly? → Yes, it can!
• Food: What do you eat on Monday? → I eat apples.
• Farm: Where do cows live? → On the farm.
• Transportation: How do you go to school? → I go by bus.
• Fast Food: What do you want to eat? → I want a pizza.

Giúp trẻ nhớ 5 mẫu câu giao tiếp nền tảng và dùng linh hoạt.
    `,
  },

  {
    id: "spr_review_communication",
    learningNodeId: "w11_review",
    title: "GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – “At the Spring Fair”:
• “What can you see?” → “I can see a cow and a bus!”
• “What do you like to eat?” → “I like burgers and fries!”
• “How do you go to school?” → “I go by bike!”

Mục tiêu: nói tự nhiên – phản xạ nhanh – tăng tự tin.
    `,
  },

  {
    id: "spr_review_activity_1",
    learningNodeId: "w11_review",
    title: "🎡 ACTIVITY 1 – Review Carnival",
    type: "list",
    order: 6,
    content: `
4 trạm trò chơi theo chủ đề:
• Booth 1: Insect Quiz
• Booth 2: Food Memory Game
• Booth 3: Animal Sounds
• Booth 4: Transportation Race

Vừa vận động vừa ghi nhớ từ vựng, tăng phản xạ nghe – nói.
    `,
  },

  {
    id: "spr_review_activity_2",
    learningNodeId: "w11_review",
    title: "🖼 ACTIVITY 2 – Portfolio Presentation",
    type: "list",
    order: 7,
    content: `
Mỗi bé chọn 2 sản phẩm yêu thích trong 3 tháng:
• “This is my farm model.”
• “I made a burger from clay.”

Rèn kỹ năng trình bày – tự tin nói trước lớp.
    `,
  },

  {
    id: "spr_review_activity_3",
    learningNodeId: "w11_review",
    title: "📖 ACTIVITY 3 – Create “Spring Book”",
    type: "list",
    order: 8,
    content: `
Dán ảnh sản phẩm, vẽ hình, viết câu ngắn:
• “I like my bee craft.”
• “I go to school by bus.”

Tổng hợp 3 tháng học – phát triển viết và trình bày.
    `,
  },

  {
    id: "spr_review_activity_4",
    learningNodeId: "w11_review",
    title: "🤸‍♂️ ACTIVITY 4 – Team Challenge",
    type: "list",
    order: 9,
    content: `
Trò chơi “Guess and Act”:
• “Fly like a bee!”
• “Drive a car!”

Kết hợp ngôn ngữ + vận động.
    `,
  },

  {
    id: "spr_review_event",
    learningNodeId: "w11_review",
    title: "🎉 EVENT – WEWIN SPRING FESTIVAL",
    type: "list",
    order: 10,
    content: `
• Trạm trò chơi ôn tập
• Góc triển lãm sản phẩm
• Biểu diễn: “My Favorite Theme” (30 giây/bé)

Kết thúc bằng bài hát: “Spring is Here!”
Tạo môi trường dùng tiếng Anh thật – vui – tự nhiên.
    `,
  },

  {
    id: "spr_review_product",
    learningNodeId: "w11_review",
    title: "SẢN PHẨM / FINAL PRODUCT – My Spring Book",
    type: "list",
    order: 11,
    content: `
My Spring Book – gồm 5 trang:
• My Favorite Theme
• My Favorite Food
• My Favorite Animal
• My Favorite Vehicle
• My Learning Photo

Ví dụ: “I like my burger.” / “I can drive a car in my city map.”
    `,
  },

  {
    id: "spr_review_teacher_guide",
    learningNodeId: "w11_review",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Mở đầu bằng bài hát “Spring is Here.”
2. Chia nhóm – mỗi nhóm phụ trách 1 booth.
3. Nhắc học sinh nói câu tiếng Anh khi chơi.
4. Hướng dẫn chọn 2 sản phẩm đẹp để trưng bày.
5. Tổ chức Spring Festival cuối tuần.
    `,
  },

  {
    id: "spr_review_checklist",
    learningNodeId: "w11_review",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Flashcards 5 chủ đề
• Giấy màu, hồ dán, ảnh chụp sản phẩm
• Sticker thưởng, đồ chơi nhỏ
• Nhạc “Spring is Here”
• Micro, backdrop mini
    `,
  },

  {
    id: "spr_review_outcomes",
    learningNodeId: "w11_review",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm đúng /f/, /b/, /k/, /s/.
• Nói được 3–5 câu mô tả theo chủ đề.
• Nhận diện & dùng linh hoạt cấu trúc đã học.
• Hoàn thành My Spring Book.
• Biểu diễn tự tin tại Spring Festival.
    `,
  },
];

export const project11WeekBlocks: LessonBlock[] = [
  {
    id: "p11_w11_objective",
    learningNodeId: "w11",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về đồ ăn nhanh.
• Luyện phát âm /f/, /s/, /h/, /k/.
• Luyện hỏi – đáp: What do you want to eat? / Is it hot or cold?
• Giao tiếp qua tình huống nhà hàng (ordering food).
• Tham gia sự kiện WeWIN Fast Food Day.
    `,
  },

  {
    id: "p11_w11_vocabulary",
    learningNodeId: "w11",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
Fast Food Items:
• fries, sandwich, hamburger, pizza, hot dog
• spaghetti, ice cream, donut, cake, soda

Phân loại hot food / cold food • mô tả màu sắc – hương vị.
    `,
  },

  {
    id: "p11_w11_pronunciation",
    learningNodeId: "w11",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /f/ – fries, food → “fff–ries.”
• /s/ – sandwich, sausage → “sss–andwich.”
• /h/ – hot dog → “h–hot!”
• /k/ – cake, coke → “k–k–cake.”

Phonics Chant:
“Pizza, burger, fries, and cake,
Let’s eat lunch — don’t be late!”
    `,
  },

  {
    id: "p11_w11_structures",
    learningNodeId: "w11",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• What do you want to eat? → I want a hamburger.
• What do you like? → I like pizza.
• Is it hot or cold? → It’s hot.

Extended Patterns:
• Do you like fries? → Yes, I do.
• What color is your drink? → It’s brown.
• How many burgers do you have? → I have two burgers.
    `,
  },

  {
    id: "p11_w11_communication",
    learningNodeId: "w11",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – At the Restaurant:
• “Welcome! What do you want to eat?”
• “I want a hamburger, please.”
• “Here you are!”
• “Thank you!”

Rèn vai phục vụ – khách hàng, giúp nói tự nhiên & lịch sự.
    `,
  },

  {
    id: "p11_w11_activity_1",
    learningNodeId: "w11",
    title: "🍕 ACTIVITY 1 – Play-Dough Food",
    type: "list",
    order: 6,
    content: `
• Nặn hamburger, pizza, donut bằng đất nặn.
• Câu mẫu:
  • “I’m making a pizza!”
  • “It’s yummy!”
    `,
  },

  {
    id: "p11_w11_activity_2",
    learningNodeId: "w11",
    title: "🍔 ACTIVITY 2 – Restaurant Role-Play",
    type: "list",
    order: 7,
    content: `
• Set up quầy bán hàng, menu, bảng giá.
• Hội thoại:
  • “What do you want?” → “I want fries!”
• Ứng dụng tiếng Anh trong ngữ cảnh thật.
    `,
  },

  {
    id: "p11_w11_activity_3",
    learningNodeId: "w11",
    title: "📄 ACTIVITY 3 – Menu Design",
    type: "list",
    order: 8,
    content: `
• Vẽ menu • thêm hình – giá bằng sticker.
• Câu mẫu:
  • “Pizza – two dollars!”
• Rèn kỹ năng viết – trình bày – giao tiếp.
    `,
  },

  {
    id: "p11_w11_activity_4",
    learningNodeId: "w11",
    title: "🔥 ACTIVITY 4 – Hot vs Cold Sorting",
    type: "list",
    order: 9,
    content: `
• Phân loại:
  • hot dog → hot
  • ice cream → cold

• Câu mẫu:
  • “Ice cream is cold.”
  • “Pizza is hot.”
    `,
  },

  {
    id: "p11_w11_activity_5",
    learningNodeId: "w11",
    title: "🍽 ACTIVITY 5 – Paper Plate Food",
    type: "list",
    order: 10,
    content: `
• Làm món ăn từ giấy.
• Câu mẫu:
  • “This is my pizza.”
  • “It has cheese and tomato.”
    `,
  },

  {
    id: "p11_w11_event",
    learningNodeId: "w11",
    title: "🎉 SỰ KIỆN – WEWIN FAST FOOD DAY",
    type: "list",
    order: 11,
    content: `
Mini fast food party:
• Bé đóng vai đầu bếp / khách hàng.
• Dùng tiền giả để mua đồ ăn.

Câu bắt buộc:
• “I want a hot dog, please!”
• “Here you are!”
    `,
  },

  {
    id: "p11_w11_final_product",
    learningNodeId: "w11",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 12,
    content: `
My Fast Food Menu + Paper Plate Food:
• Tên món
• Giá (sticker $)
• Câu mô tả: “It’s hot.” / “It’s sweet.”
    `,
  },

  {
    id: "p11_w11_teacher_guide",
    learningNodeId: "w11",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 13,
    content: `
1. Mở đầu bằng bài hát “Do You Like Broccoli Ice Cream?”.
2. Luyện âm /f/, /s/, /h/, /k/ qua trò “Say It & Eat It.”.
3. Chia góc: Menu – Play-Dough – Role-Play.
4. Tổ chức Fast Food Day.
5. Quay video – gửi phụ huynh.
    `,
  },

  {
    id: "p11_w11_checklist",
    learningNodeId: "w11",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 14,
    content: `
• Đất nặn, đĩa giấy, giấy màu
• Menu trống, sticker $
• Flashcards đồ ăn nhanh
• Tiền giả
• Nhạc, micro
• Máy ảnh / điện thoại
    `,
  },

  {
    id: "p11_w11_outcomes",
    learningNodeId: "w11",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 15,
    content: `
• Phát âm đúng /f/, /s/, /h/, /k/.
• Giao tiếp: “What do you want to eat?” – “I want a pizza.”
• Phân biệt hot / cold.
• Hoàn thành My Fast Food Menu.
• Tham gia Fast Food Day tự tin.
    `,
  },
  {
    id: "p11_w11_homework",
    learningNodeId: "w11",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 16,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/fast-food-restaurant-owner
    `,
  },
];

export const project10WeekBlocks: LessonBlock[] = [
  {
    id: "p10_w10_objective",
    learningNodeId: "w10",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về phương tiện giao thông & địa điểm trong thành phố.
• Luyện phát âm /b/, /t/, /r/, /p/.
• Luyện hỏi – đáp: How do you go to school? / Where is the bus?
• Sử dụng giới từ: on, in, under, next to.
• Tạo bản đồ thành phố 'My City Map' và mô tả bằng tiếng Anh.
    `,
  },

  {
    id: "p10_w10_vocabulary",
    learningNodeId: "w10",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
Transportation:
• on foot, by car, by motorcycle, by taxi, by bus, by bike, by plane
• train, rocket, ship, truck, submarine, tractor, helicopter

City Elements:
• road, bridge, house, school, park, river, airport, station

Giúp học sinh nhận biết phương tiện và môi trường di chuyển.
    `,
  },

  {
    id: "p10_w10_pronunciation",
    learningNodeId: "w10",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /b/ – bus, bike, bridge → “b–b–bus!”
• /t/ – taxi, train, truck → “t–t–truck!”
• /r/ – rocket, road, river → “r–rocket!”
• /p/ – plane, park → “p–p–plane!”

Phonics Chant:
“Bus and bike, car and train,
Let’s go travel in the rain!”
    `,
  },

  {
    id: "p10_w10_structures",
    learningNodeId: "w10",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
Main Patterns:
• How do you go to school? → I go to school by bus.
• Where is the bus? → It’s on the road.
• What can you see? → I can see a car.

Extended Patterns:
• Do you go to school by bike? → Yes, I do. / No, I go by car.
• Where does the plane fly? → It flies in the sky.
• What color is your car? → It’s red.

Kết hợp giới từ nơi chốn: on, in, under, next to.
    `,
  },

  {
    id: "p10_w10_communication",
    learningNodeId: "w10",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
Mini Dialogue – How Do You Go?
• “How do you go to school?”
• “I go by bus.”
• “Where is the bus?”
• “It’s on the road!”

Luyện câu hỏi – trả lời thực tế, dùng đúng động từ & giới từ.
    `,
  },

  {
    id: "p10_w10_activity_1",
    learningNodeId: "w10",
    title: "🚗 ACTIVITY 1 – Transportation Collage",
    type: "list",
    order: 6,
    content: `
• Cắt – dán hình xe cộ từ tạp chí.
• Bé mô tả:
  • “This is a bus.”
  • “It’s yellow.”
• Rèn phân loại & mô tả hình ảnh.
    `,
  },

  {
    id: "p10_w10_activity_2",
    learningNodeId: "w10",
    title: "🗺 ACTIVITY 2 – Build a City (Vẽ bản đồ)",
    type: "list",
    order: 7,
    content: `
• Nhóm học sinh vẽ đường phố lớn trên giấy A1.
• Dán xe & địa điểm:
  • “The plane flies in the sky.”
  • “The car goes on the road.”
• Luyện giới từ & vị trí trong ngữ cảnh thực tế.
    `,
  },

  {
    id: "p10_w10_activity_3",
    learningNodeId: "w10",
    title: "🏎 ACTIVITY 3 – Vehicle Race Game",
    type: "list",
    order: 8,
    content: `
• Dùng xe đồ chơi & đường dán bằng băng keo.
• Mẫu câu khi chơi:
  • “Go, bus, go!”
  • “Stop at the light!”
• Luyện động từ hành động + mệnh lệnh.
    `,
  },

  {
    id: "p10_w10_activity_4",
    learningNodeId: "w10",
    title: "🚦 ACTIVITY 4 – Traffic Light Craft",
    type: "list",
    order: 9,
    content: `
• Làm đèn giao thông bằng giấy tròn.
• Học câu:
  • “Red means stop.”
  • “Green means go.”
• Luyện mệnh lệnh + luật lệ giao thông.
    `,
  },

  {
    id: "p10_w10_activity_5",
    learningNodeId: "w10",
    title: "✏️ ACTIVITY 5 – Connect the Dots",
    type: "list",
    order: 10,
    content: `
• Nối số tạo hình xe, tàu, máy bay.
• Mẫu câu:
  • “This is a helicopter.”
  • “It flies high!”
• Luyện đếm + mô tả hành động.
    `,
  },

  {
    id: "p10_w10_final_product",
    learningNodeId: "w10",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
My City Map – bản đồ thành phố gồm:
• Tuyến đường – địa điểm – phương tiện.
• Câu mô tả dán kèm:
  “This is my city. I go to school by bike.”

Sản phẩm thể hiện khả năng nói – hiểu – sáng tạo.
    `,
  },

  {
    id: "p10_w10_teacher_guide",
    learningNodeId: "w10",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Warm-up bằng trò “Sound of the City” – đoán tiếng xe.
2. Luyện âm /b/, /t/, /r/, /p/ qua “Say & Move.”
3. Luyện câu “How do you go…?” theo nhóm.
4. Chia góc học tập: Collage – Craft – Map Building.
5. Tổ chức mini “Traffic Parade” cuối tuần.
    `,
  },

  {
    id: "p10_w10_checklist",
    learningNodeId: "w10",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Hình xe, tạp chí, giấy A1
• Băng keo màu, kéo, hồ dán
• Xe đồ chơi
• Flashcards phương tiện
• Nhạc & âm thanh xe
• Micro / máy ảnh để ghi hình
    `,
  },

  {
    id: "p10_w10_outcomes",
    learningNodeId: "w10",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm chuẩn /b/, /t/, /r/, /p/.
• Nói trôi chảy cấu trúc: “How do you go to school?”
• Sử dụng đúng giới từ nơi chốn.
• Hoàn thành My City Map với mô tả bằng tiếng Anh.
    `,
  },
  {
    id: "p10_w10_homework",
    learningNodeId: "w10",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/city-transport-map-maker
• https://www.youtube.com/watch?v=jytezWJ1vVk
    `,
  },
];

export const project9WeekBlocks: LessonBlock[] = [
  {
    id: "p9_w9_objective",
    learningNodeId: "w9",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về động vật trang trại và thú cưng.
• Luyện phát âm /p/, /ʃ/, /k/, /d/.
• Mô tả âm thanh, hành động, nơi sống của động vật.
• Luyện hội thoại: What is this? / What does it say? / Where does it live?
• Tham gia hoạt động Farm Day bằng tiếng Anh.
    `,
  },

  {
    id: "p9_w9_vocabulary",
    learningNodeId: "w9",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Farm Animals: cow, horse, pig, duck, sheep, goat, rooster, turkey, farmer, buffalo.
• Pet Animals: dog, cat, rabbit, turtle, fish, parrot.
• Phân biệt môi trường sống, âm thanh và hành động của từng loài.
    `,
  },

  {
    id: "p9_w9_pronunciation",
    learningNodeId: "w9",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /p/ – pig, puppy → “p–p–pig!”
• /ʃ/ – sheep → “shhh–eep!”
• /k/ – cat, cow → “k–k–cow!”
• /d/ – dog, duck → “d–duck!”
• Phonics Chant:
  “Pig says oink, cow says moo,
   Duck says quack and sheep says baa too!”
    `,
  },

  {
    id: "p9_w9_structures",
    learningNodeId: "w9",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What is this? → It’s a cow.
  • What does it say? → It says moo.
  • What can it do? → It can run / swim / fly.

• Extended:
  • Where does it live? → It lives on the farm.
  • What color is it? → It’s brown.
  • Do you like cows? → Yes, I do. / No, I don’t.
    `,
  },

  {
    id: "p9_w9_communication",
    learningNodeId: "w9",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – At the Farm:
  • “What is this?” → “It’s a pig.”
  • “What does it say?” → “Oink, oink!”
  • “Where does it live?” → “On the farm!”
• Khuyến khích dùng giọng vui + hành động mô phỏng con vật.
    `,
  },

  {
    id: "p9_w9_activity_1",
    learningNodeId: "w9",
    title: "🏡 ACTIVITY 1 – Farm Diorama",
    type: "list",
    order: 6,
    content: `
• Làm mô hình nông trại bằng giấy, bìa, ống hút.
• Mẫu câu:
  • “This is my farm.”
  • “I have cows and ducks.”
    `,
  },

  {
    id: "p9_w9_activity_2",
    learningNodeId: "w9",
    title: " ACTIVITY 2 – Animal Sound Bingo",
    type: "list",
    order: 7,
    content: `
• Nghe âm thanh: moo, quack, baa, neigh…
• Bé chọn đúng hình con vật:
  • “Cow!”
  • “Duck!”
• Phát triển kỹ năng nghe – nhận diện âm thanh.
    `,
  },

  {
    id: "p9_w9_activity_3",
    learningNodeId: "w9",
    title: "👩‍🌾 ACTIVITY 3 – Farmer Costume",
    type: "list",
    order: 8,
    content: `
• Đội mũ rơm, mang găng tay, cầm công cụ.
• Mẫu câu:
  • “I’m a farmer.”
  • “I work on a farm.”
• Rèn sự tự tin và giới thiệu bản thân.
    `,
  },

  {
    id: "p9_w9_activity_4",
    learningNodeId: "w9",
    title: "🔢 ACTIVITY 4 – Animal Counting",
    type: "list",
    order: 9,
    content: `
• Đếm động vật trong tranh:
  • “Three pigs.”
  • “Five ducks.”
• Ôn đếm + danh từ số nhiều.
    `,
  },

  {
    id: "p9_w9_activity_5",
    learningNodeId: "w9",
    title: "🎭 ACTIVITY 5 – Stick Puppet Show",
    type: "list",
    order: 10,
    content: `
• Làm rối bằng que gỗ và giấy.
• Biểu diễn hội thoại:
  • “Hello! I’m a sheep. I can run.”
• Rèn ngữ điệu – biểu cảm – phản xạ tự nhiên.
    `,
  },

  {
    id: "p9_w9_final_product",
    learningNodeId: "w9",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
• My Farm Book – Sách 6 trang:
  • Trang bìa: My Farm
  • Trang 2–5: mỗi con vật + câu mô tả:
    “This is a cow. It says moo. It can walk.”
  • Trang cuối: ảnh Farm Day
    `,
  },

  {
    id: "p9_w9_teacher_guide",
    learningNodeId: "w9",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
• Mở đầu bằng bài hát “Old MacDonald Had a Farm.”
• Luyện âm /p/, /ʃ/, /k/, /d/ qua trò “Say & Move.”
• Cho học sinh bắt chước tiếng động vật thật.
• Tổ chức 3 góc: Diorama – Sound Bingo – Puppet Show.
• Quay video Farm Day gửi phụ huynh.
    `,
  },

  {
    id: "p9_w9_checklist",
    learningNodeId: "w9",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Flashcards động vật + âm thanh
• Giấy bìa, hộp giấy, keo
• Que gỗ, giấy màu cho Puppet Show
• Mũ rơm, áo kẻ, găng tay
• Nhạc Old MacDonald
• Máy ảnh / điện thoại quay Farm Day
    `,
  },

  {
    id: "p9_w9_outcomes",
    learningNodeId: "w9",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm đúng /p/, /ʃ/, /k/, /d/.
• Hỏi – đáp trôi chảy về động vật: “What is this?” / “It says…”
• Mô tả được nơi sống và hành động động vật.
• Hoàn thành “My Farm Book” và tham gia Farm Day tự tin.
    `,
  },
  {
    id: "p9_w9_homework",
    learningNodeId: "w9",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/farm-day-organizer
• https://www.youtube.com/watch?v=a3LOgVUd8Vo
• https://www.youtube.com/watch?v=D9Cc7TGRh00
    `,
  },
];

export const project8WeekBlocks: LessonBlock[] = [
  {
    id: "p8_w8_objective",
    learningNodeId: "w8",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học từ vựng về trái cây và món ăn.
• Luyện phát âm /k/, /s/, /b/, /f/.
• Rèn kỹ năng đếm và danh từ số nhiều.
• Hỏi – đáp mô phỏng theo truyện “The Very Hungry Caterpillar.”
• Kể chuyện và mô tả trình tự sự kiện.
• Sáng tạo “My Hungry Week Book.”
    `,
  },

  {
    id: "p8_w8_vocabulary",
    learningNodeId: "w8",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Fruits & Foods: apple, pear, plum, orange, strawberry, watermelon, cake, cheese, sausage, ice cream, cucumber, salami, cupcake.
• Story Words: egg, caterpillar, leaf, cocoon, butterfly, sun, moon.
• Chủ điểm kết hợp: thức ăn – ngày trong tuần – vòng đời bướm.
    `,
  },

  {
    id: "p8_w8_pronunciation",
    learningNodeId: "w8",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /k/ – cake, cucumber, cocoon → “k–k–cake!”
• /s/ – sausage, strawberry, sun → “sss–ausage!”
• /b/ – butterfly, banana → “b–b–butterfly”
• /f/ – food, fruit → “fff–ood”
• Chant: “Fruit and food, one by one, Caterpillar eats and has fun!”
    `,
  },

  {
    id: "p8_w8_structures",
    learningNodeId: "w8",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What is this? → It’s an apple.
  • How many apples are there? → There are three.
  • What do you like? → I like ice cream.

• Extended Patterns:
  • What does the caterpillar eat? → It eats apples and pears.
  • What happens next? → It becomes a butterfly!
  • What color is it? → It’s green.
    `,
  },

  {
    id: "p8_w8_communication",
    learningNodeId: "w8",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – What Do You Eat?
  • “What do you eat on Monday?” → “I eat one apple.”
  • “What about Tuesday?” → “I eat two pears.”
• Luyện ngày trong tuần + số đếm + cấu trúc I eat…
    `,
  },

  {
    id: "p8_w8_activity_1",
    learningNodeId: "w8",
    title: "📖 ACTIVITY 1 – Story Retelling",
    type: "list",
    order: 6,
    content: `
• Cô kể truyện bằng flashcard/video.
• Học sinh sắp xếp tranh theo thứ tự câu chuyện.
• Rèn kỹ năng nghe – nhớ – kể lại.
    `,
  },

  {
    id: "p8_w8_activity_2",
    learningNodeId: "w8",
    title: "🥗 ACTIVITY 2 – Food Sorting (Healthy vs Treat)",
    type: "list",
    order: 7,
    content: `
• Phân loại thực phẩm:
  – Healthy: apple, pear, cucumber
  – Treat: cake, ice cream, sausage
• Mẫu câu:
  • “Apple is healthy.”
  • “Cake is sweet.”
    `,
  },

  {
    id: "p8_w8_activity_3",
    learningNodeId: "w8",
    title: "🐛 ACTIVITY 3 – Caterpillar Craft",
    type: "list",
    order: 8,
    content: `
• Làm sâu bằng que kem + pompom.
• Mẫu câu:
  • “This is my caterpillar.”
  • “It eats apples.”
    `,
  },

  {
    id: "p8_w8_activity_4",
    learningNodeId: "w8",
    title: "🔢 ACTIVITY 4 – Food Counting",
    type: "list",
    order: 9,
    content: `
• Dán sticker số lượng theo truyện:
  • 1 apple
  • 2 pears
  • 3 plums
• Rèn đếm – danh từ số nhiều – từ nối số.
    `,
  },

  {
    id: "p8_w8_activity_5",
    learningNodeId: "w8",
    title: "ACTIVITY 5 – My Weekly Food Diary",
    type: "list",
    order: 10,
    content: `
• Mỗi trang = 1 ngày:
  • “On Monday, I eat an apple.”
  • “On Tuesday, I eat two pears.”
• Kết hợp viết + đếm + kể chuyện.
    `,
  },

  {
    id: "p8_w8_final_product",
    learningNodeId: "w8",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
• My Hungry Week Book – gồm 7 trang:
  • Giới thiệu: egg → caterpillar
  • 5–7 trang về thức ăn mỗi ngày
  • Kết thúc: “It becomes a butterfly!”
• Example: “On Sunday, I eat a leaf. I’m full!”
    `,
  },

  {
    id: "p8_w8_teacher_guide",
    learningNodeId: "w8",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
• Luyện âm /k/, /s/, /b/, /f/ với trò “Say It with Action.”
• Dạy mẫu câu bằng flashcard + clap–speak–repeat.
• Tổ chức 3 góc: Storytelling – Craft – Food Sorting.
• Cho học sinh kể chuyện nhóm/cá nhân.
• Quay clip “My Hungry Week” gửi phụ huynh.
    `,
  },

  {
    id: "p8_w8_checklist",
    learningNodeId: "w8",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Thẻ tranh truyện & audio
• Giấy màu, que kem, pompom
• Sticker trái cây & món ăn
• Flashcards Healthy vs Treat
• Giấy A5 cho Hungry Week Book
• Nhạc & micro luyện kể chuyện
• Máy ảnh / điện thoại quay video
    `,
  },

  {
    id: "p8_w8_outcomes",
    learningNodeId: "w8",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm chuẩn 4 âm /k/, /s/, /b/, /f/.
• Sử dụng đúng cấu trúc I eat… / How many…?
• Kể lại được 4–6 phần câu chuyện.
• Hoàn thành “My Hungry Week Book.”
    `,
  },
  {
    id: "p8_w8_homework",
    learningNodeId: "w8",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/hungry-caterpillar-food-diary
• https://www.youtube.com/watch?v=z0oXMJiRK-c
• https://www.youtube.com/watch?v=yd1XSWV0dww
• https://www.youtube.com/watch?v=Sbtma3taSFc
    `,
    audioUrl: "https://wewin.edu.vn/wp-content/uploads/2025/12/song_8.mp3",
  },
];

export const project7WeekBlocks: LessonBlock[] = [
  {
    id: "p7_w7_objective",
    learningNodeId: "w7",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Khám phá thế giới côn trùng xung quanh.
• Học từ vựng theo hành động: fly, crawl, jump.
• Luyện phát âm /b/, /f/, /s/, /ɡ/.
• Phát triển kỹ năng hỏi – đáp, mô tả đặc điểm.
• Sáng tạo Bug Hotel và Insect Journal.
    `,
  },

  {
    id: "p7_w7_vocabulary",
    learningNodeId: "w7",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• ladybug
• spider
• bee
• butterfly
• fly
• dragonfly
• ant
• mosquito
• Tích hợp màu sắc & hành động (fly, crawl, jump)
    `,
  },

  {
    id: "p7_w7_pronunciation",
    learningNodeId: "w7",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /b/ – bee, butterfly → “b–bee!”
• /f/ – fly, flower → “fff–ly”
• /s/ – spider, mosquito → “sss–pider”
• /ɡ/ – grass, dragonfly → “g–grass”
• Phân biệt /b/ và /f/ giúp tránh nhầm bee–fee.
• Phonics Chant:
  “Buzz, buzz, bee, fly with me!
   Crawl, crawl, ant, under the tree!”
    `,
  },

  {
    id: "p7_w7_structures",
    learningNodeId: "w7",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What is it? → It’s a butterfly.
  • What color is it? → It’s yellow.
  • Can it fly? → Yes, it can. / No, it can’t.

• Extended Patterns:
  • Where does it live? → It lives in the garden.
  • What can it do? → It can fly / crawl / sting.
  • Is it big or small? → It’s small.
    `,
  },

  {
    id: "p7_w7_communication",
    learningNodeId: "w7",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – Talking About Bugs:
  • “What is it?” → “It’s a ladybug.”
  • “Can it fly?” → “Yes, it can!”
  • “What color is it?” → “It’s red and black.”
• Luyện phản xạ – trọng âm – ngữ điệu câu hỏi.
    `,
  },

  {
    id: "p7_w7_activity_1",
    learningNodeId: "w7",
    title: "🔍 ACTIVITY 1 – Bug Hunt Outdoor",
    type: "list",
    order: 6,
    content: `
• Quan sát côn trùng thật ngoài sân / video.
• Vẽ lại côn trùng yêu thích.
• Câu mẫu:
  • “This is a butterfly. It can fly.”
    `,
  },

  {
    id: "p7_w7_activity_2",
    learningNodeId: "w7",
    title: "🦋 ACTIVITY 2 – Butterfly Life Cycle",
    type: "list",
    order: 7,
    content: `
• Làm mô hình: egg → caterpillar → cocoon → butterfly.
• Câu mẫu:
  • “It’s a butterfly.”
  • “It was a caterpillar.”
• Materials: giấy màu, bông gòn, que tre.
    `,
  },

  {
    id: "p7_w7_activity_3",
    learningNodeId: "w7",
    title: "🐝 ACTIVITY 3 – Insect Craft",
    type: "list",
    order: 8,
    content: `
• Làm ong từ chai nhựa, bướm từ giấy & kẹp.
• Câu mẫu:
  • “I made a bee!”
  • “It’s yellow and black.”
    `,
  },

  {
    id: "p7_w7_activity_4",
    learningNodeId: "w7",
    title: "ACTIVITY 4 – Dot-to-Dot Insects",
    type: "list",
    order: 9,
    content: `
• Nối số 1–20 tạo hình insect.
• Tô màu và dán vào “My Insect Journal.”
    `,
  },

  {
    id: "p7_w7_activity_5",
    learningNodeId: "w7",
    title: "🏨 ACTIVITY 5 – Bug Hotel",
    type: "list",
    order: 10,
    content: `
• Làm Bug Hotel từ hộp giấy, ống hút, lá cây.
• Bé đặt nhãn:
  • “Bee Room”
  • “Ant Room”
• Câu mẫu:
  • “This is my bug hotel.”
  • “Ants live here.”
    `,
  },

  {
    id: "p7_w7_final_product",
    learningNodeId: "w7",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
• My Insect Journal – 5 trang:
  • Tên côn trùng
  • Màu sắc
  • Nơi sống
  • Hành động
  • Hình ảnh / tranh craft
• Ví dụ: “This is a dragonfly. It can fly. It lives near the pond.”
    `,
  },

  {
    id: "p7_w7_teacher_guide",
    learningNodeId: "w7",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Mở đầu bằng video “Bugs Around Us” hoặc bài hát “The Ants Go Marching.”
2. Luyện âm /b/, /f/, /s/, /ɡ/ qua trò “Buzz and Freeze.”
3. Luyện câu “Can it fly?” bằng Yes/No Jumping Game.
4. Tổ chức 3 góc học tập: Craft – Life Cycle – Role Play.
5. Trưng bày Bug Hotel cuối tuần và quay video “Little Scientists.”
    `,
  },

  {
    id: "p7_w7_checklist",
    learningNodeId: "w7",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Ảnh / video côn trùng
• Giấy màu, bông gòn, chai nhựa
• Ống hút, hộp giấy
• Phiếu nối số
• Flashcards côn trùng
• Giấy A5 / bìa cứng
• Micro, nhạc vui
    `,
  },

  {
    id: "p7_w7_outcomes",
    learningNodeId: "w7",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm đúng /b/, /f/, /s/, /ɡ/.
• Đặt & trả lời được 3–5 câu mô tả côn trùng.
• Giới thiệu sản phẩm bằng 1–2 câu trôi chảy.
• Hoàn thành “My Insect Journal” & “Bug Hotel.”
    `,
  },
];

export const reviewWeekBlocks: LessonBlock[] = [
  {
    id: "rv_overview",
    learningNodeId: "w_review",
    title: "OBJECTIVE / MỤC TIÊU",
    type: "list",
    order: 1,
    content: `
• Review toàn bộ chủ đề từ tháng 11–1.
• Games, pronunciation practice, communication tasks, creative exhibitions.
• Students review vocabulary, structures, pronunciation & communication.
    `,
  },

  {
    id: "rv_topics",
    learningNodeId: "w_review",
    title: "REVIEWED TOPICS",
    type: "list",
    order: 2,
    content: `
• Career Project – When I Grow Up
• Bird World – My Bird Book
• Christmas – Mini Christmas Party
• Tet & Zodiac – Lunar New Year
• Flowers – My Flower Shop
    `,
  },

  {
    id: "rv_pronunciation",
    learningNodeId: "w_review",
    title: " PRONUNCIATION REVIEW",
    type: "list",
    order: 3,
    content: `
• /b/ – bird, bus, bag
• /f/ – flower, fireman
• /s/ – snow, snake
• /l/ – lantern, leaf
• Class activity: Phonics Race – nghe âm, giơ thẻ từ.
    `,
  },

  {
    id: "rv_structures",
    learningNodeId: "w_review",
    title: "SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Career: What do you want to be? → I want to be a doctor.
• Birds: Can it fly? → Yes, it can.
• Christmas: What can you see? → I can see a snowman.
• Tet: What color is your lantern? → It’s red.
• Flowers: What’s your favorite flower? → I like the sunflower.
    `,
  },

  {
    id: "rv_communication",
    learningNodeId: "w_review",
    title: "COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – At the Winter Festival:
  • “What did you learn last month?”
  • “I learned about birds and flowers!”
  • “What’s your favorite?” → “I love sunflowers!”
    `,
  },

  {
    id: "rv_stations",
    learningNodeId: "w_review",
    title: "🎮 CLASS ACTIVITIES – REVIEW STATIONS",
    type: "list",
    order: 6,
    content: `
• Station 1: Career Quiz – Ghép nghề & dụng cụ.
• Station 2: Bird Puzzle.
• Station 3: Tet Memory Game.
• Station 4: Flower Arrangement.
    `,
  },

  {
    id: "rv_gameshow",
    learningNodeId: "w_review",
    title: "BIG REVIEW GAME SHOW",
    type: "list",
    order: 7,
    content: `
• Game: “Who Wants to Be a Champion?”
• Câu hỏi về từ vựng – cấu trúc – phát âm.
• Ví dụ: “What can fly?” → “A bird!”
    `,
  },

  {
    id: "rv_portfolio",
    learningNodeId: "w_review",
    title: "PORTFOLIO REVIEW",
    type: "list",
    order: 8,
    content: `
• Xem lại sản phẩm 3 tháng qua:
  – Bird Book
  – Christmas Book
  – Tết Book
  – Flower Shop
• Câu mẫu: “This is my Bird Book.”
    `,
  },

  {
    id: "rv_memorybook",
    learningNodeId: "w_review",
    title: "📖 MEMORY BOOK ACTIVITY",
    type: "list",
    order: 9,
    content: `
• Dán ảnh – trang trí – viết câu:
  • “I like Christmas.”
  • “I made a pink flower.”
    `,
  },

  {
    id: "rv_event",
    learningNodeId: "w_review",
    title: "EVENT – WeWIN Winter Showcase",
    type: "list",
    order: 10,
    content: `
• Trưng bày sản phẩm học tập.
• Góc trò chơi ôn luyện.
• Biểu diễn “My Favorite Topic” – 30s.
    `,
  },

  {
    id: "rv_final_product",
    learningNodeId: "w_review",
    title: "🏅 FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
• My Winter Memory Book – 6 trang:
  • My Favorite Theme
  • My Best Work
  • My Friend’s Project
  • What I Learned
  • My Goal Next Month
  • Teacher’s Message
    `,
  },

  {
    id: "rv_outcomes",
    learningNodeId: "w_review",
    title: "LEARNING OUTCOMES",
    type: "list",
    order: 12,
    content: `
• Phát âm chuẩn /b/, /f/, /s/, /l/.
• Giao tiếp với 3–5 mẫu câu.
• Nhận diện & sử dụng từ vựng 5 chủ đề.
• Biểu diễn tại Winter Showcase.
    `,
  },
  {
    id: "p7_w7_homework",
    learningNodeId: "w7",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 13,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/insect-explorer
    `,
  },
];

export const project6WeekBlocks: LessonBlock[] = [
  {
    id: "p6_w6_objective",
    learningNodeId: "w6",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Giúp học sinh làm quen với các loài hoa mùa xuân.
• Học mô tả màu sắc, hình dạng, mùi hương.
• Luyện phát âm /f/, /s/, /r/, /l/ chủ đề hoa.
• Giao tiếp mua – bán qua trò chơi Flower Shop Role-Play.
    `,
  },

  {
    id: "p6_w6_vocabulary",
    learningNodeId: "w6",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• apricot flower (hoa mai)
• peach flower (hoa đào)
• daisy
• lily
• lotus
• rose
• sunflower
    `,
  },

  {
    id: "p6_w6_pronunciation",
    learningNodeId: "w6",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /f/ – flower, fun → “ffff–lower!”
• /s/ – sunflower, scent → “ssss–unflower!”
• /r/ – rose, red → “r–rose.”
• /l/ – lily, lotus → “llll–ily.”
• Phonics Chant:
  “Flower, flower, what color are you? I’m red, I’m yellow, I’m pretty too!”
    `,
  },

  {
    id: "p6_w6_structures",
    learningNodeId: "w6",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What flower is this? → It’s a rose.
  • What color is it? → It’s red.
  • Do you like flowers? → Yes, I do!

• Extended Patterns:
  • What can you smell? → I can smell a lily.
  • How many flowers are there? → There are five flowers.
  • What flower do you like? → I like lotus.
  • Can I have a rose, please? → Yes! Here you are.
    `,
  },

  {
    id: "p6_w6_communication",
    learningNodeId: "w6",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Role-Play: At the Flower Shop
  • “Hello! What flower do you want?”
  • “I want a sunflower, please.”
  • “Here you are!”
  • “Thank you!”
• Luyện nói trong tình huống mua – bán thật.
    `,
  },

  {
    id: "p6_w6_activity_1",
    learningNodeId: "w6",
    title: "🌼 ACTIVITY 1 – Paper Flower Craft",
    type: "list",
    order: 6,
    content: `
• Gấp hoa bằng giấy crepe / giấy màu.
• Câu mẫu:
  • “This is my flower.”
  • “It’s pink.”
• Materials: giấy màu, keo, kéo, que tre.
    `,
  },

  {
    id: "p6_w6_activity_2",
    learningNodeId: "w6",
    title: "🎨 ACTIVITY 2 – Flower Color Sorting",
    type: "list",
    order: 7,
    content: `
• Dán hoa theo nhóm màu: red, yellow, pink, white.
• Nói to: “Sunflower is yellow!”
• Giúp trẻ liên kết từ – màu – hình ảnh.
    `,
  },

  {
    id: "p6_w6_activity_3",
    learningNodeId: "w6",
    title: "🏪 ACTIVITY 3 – Flower Shop Role-Play",
    type: "list",
    order: 8,
    content: `
• Set up quầy hoa mini với bảng giá ($ sticker).
• Hội thoại luyện tập:
  • “What flower do you want?”
  • “A rose, please.”
• Ứng dụng kỹ năng nói thật.
    `,
  },

  {
    id: "p6_w6_activity_4",
    learningNodeId: "w6",
    title: "🔢 ACTIVITY 4 – Connect the Flowers",
    type: "list",
    order: 9,
    content: `
• Nối số 1–20 tạo hình hoa.
• Củng cố đếm + từ vựng.
    `,
  },

  {
    id: "p6_w6_activity_5",
    learningNodeId: "w6",
    title: "🌺 ACTIVITY 5 – Flower Stamping Art",
    type: "list",
    order: 10,
    content: `
• Dùng rau củ (cần tây, cà rốt…) in hình hoa.
• Nói:
  • “I made a rose with celery!”
• Học mô tả hành động qua trải nghiệm.
    `,
  },

  {
    id: "p6_w6_final_product",
    learningNodeId: "w6",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 11,
    content: `
• My Flower Shop gồm:
  • Bó hoa giấy do bé làm
  • Price Tag tiếng Anh
  • Ảnh / video role-play
• Ví dụ: “This is my flower shop. I sell roses and lilies!”
    `,
  },

  {
    id: "p6_w6_teacher_guide",
    learningNodeId: "w6",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 12,
    content: `
1. Bắt đầu bằng bài hát “Flowers Grow.”
2. Luyện âm /f/, /s/, /r/, /l/ qua trò “Say it, touch it.”
3. Học theo 3 góc: Craft – Sorting – Role-Play.
4. Set up Flower Shop mini trong lớp.
5. Quay video hội thoại để gửi phụ huynh.
    `,
  },

  {
    id: "p6_w6_checklist",
    learningNodeId: "w6",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 13,
    content: `
• Giấy crepe, giấy màu, keo, kéo
• Sticker $, thẻ giá
• Rau củ để in hoa
• Flashcards hoa & màu
• Nhạc, micro đồ chơi
• Máy ảnh quay video
• Bảng IPA nhỏ
    `,
  },

  {
    id: "p6_w6_outcomes",
    learningNodeId: "w6",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 14,
    content: `
• Phát âm chuẩn /f/, /s/, /r/, /l/.
• Nói được câu hỏi – đáp về hoa & màu.
• Giao tiếp mua – bán đơn giản bằng tiếng Anh.
• Hoàn thành “My Flower Shop” + Price Tag.
    `,
  },
  {
    id: "p6_w6_homework",
    learningNodeId: "w6",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 15,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/flower-shop-owner
    `,
  },
];

export const project5WeekBlocks: LessonBlock[] = [
  {
    id: "p5_w5_objective",
    learningNodeId: "w5",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Tìm hiểu Tết cổ truyền Việt Nam bằng tiếng Anh.
• Học từ vựng: trái cây Tết, lucky money, dragon dance, 12 con giáp.
• Practice pronunciation, communication, and cultural expression.
• Students explore Vietnamese Lunar New Year using English through crafts & games.
    `,
  },

  {
    id: "p5_w5_vocabulary",
    learningNodeId: "w5",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Lunar New Year (Tuần 1–2): papaya, coconut, mango, fig, lucky money, watermelon, sticky rice cake, dragon dance.
• Zodiac Animals (Tuần 3–4): rat, dragon, goat, rooster, snake, horse, duck, ox, monkey, pig.
    `,
  },

  {
    id: "p5_w5_pronunciation",
    learningNodeId: "w5",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /l/ – lucky, lion, light → "llll–ucky!"
• /k/ – cake, coconut → bật âm cuối rõ.
• /m/ – monkey, mango → mím môi ngân nhẹ.
• /s/ – snake, sticky → "ssss–".
• Phonics Chant:
  “Lucky money, lion dance, Mango, melon – Tết’s in chance!”
    `,
  },

  {
    id: "p5_w5_structures",
    learningNodeId: "w5",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What is this? → This is a watermelon.
  • What color is it? → It’s red / green.
  • What animal is this? → It’s a dragon.

• Extended Patterns:
  • What do you do at Tết? → I give lucky money.
  • What can a dragon do? → It can dance!
  • What do you eat at Tết? → I eat sticky rice cake.
  • What animal year is it? → It’s the year of the dragon.
    `,
  },

  {
    id: "p5_w5_communication",
    learningNodeId: "w5",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – Talking About Tết:
  • “What do you like at Tết?” → “I like lucky money!”
  • “What color is your envelope?” → “It’s red!”
• Học sinh nói về trải nghiệm thật bằng tiếng Anh.
    `,
  },

  {
    id: "p5_w5_activity_fruit_plate",
    learningNodeId: "w5",
    title: "🍉 ACTIVITY 1 – Five Fruits Platter (Mâm Ngũ Quả)",
    type: "list",
    order: 6,
    content: `
• Cắt – dán – tô màu 5 loại trái cây.
• Mẫu câu:
  • “This is a mango.”
  • “It’s yellow.”
• Luyện từ + màu sắc + số (5 fruits).
• Materials: giấy màu, hình trái cây, hồ dán.
    `,
  },

  {
    id: "p5_w5_activity_lucky_money",
    learningNodeId: "w5",
    title: "🧧 ACTIVITY 2 – Lucky Money Envelope",
    type: "list",
    order: 7,
    content: `
• Gấp bao lì xì giấy đỏ, dán hoa mai / hoa đào.
• Mẫu câu:
  • “Happy New Year!”
  • “Here’s your lucky money!”
• Materials: giấy đỏ, keo, sticker hoa mai.
    `,
  },

  {
    id: "p5_w5_activity_dragon_dance",
    learningNodeId: "w5",
    title: "🐉 ACTIVITY 3 – Dragon Dance Practice",
    type: "list",
    order: 8,
    content: `
• Làm đầu rồng + thân dài bằng giấy.
• Vừa múa vừa hô:
  • “Go, dragon, go!”
  • “The dragon is dancing!”
• Teamwork – vận động – văn hoá.
    `,
  },

  {
    id: "p5_w5_activity_tracing",
    learningNodeId: "w5",
    title: "🔢 ACTIVITY 4 – Number Tracing (Nối Số Hình Trái Cây)",
    type: "list",
    order: 9,
    content: `
• Nối số 1–10 tạo hình trái cây Tết.
• Luyện đếm + củng cố từ vựng.
    `,
  },

  {
    id: "p5_w5_activity_zodiac_wheel",
    learningNodeId: "w5",
    title: "🐲 ACTIVITY 5 – Zodiac Wheel Craft (Vòng 12 Con Giáp)",
    type: "list",
    order: 10,
    content: `
• Tạo vòng quay 12 con giáp.
• Mẫu câu:
  • “I’m a tiger!”
  • “I’m a dragon!”
• Luyện giới thiệu bản thân bằng tiếng Anh.
    `,
  },

  {
    id: "p5_w5_activity_animal_game",
    learningNodeId: "w5",
    title: "🦁 ACTIVITY 6 – Animal Movement Game",
    type: "list",
    order: 11,
    content: `
• Trò chơi hành động:
  • “Slither like a snake!”
  • “Jump like a monkey!”
• Kết hợp động từ + phát âm + vận động.
    `,
  },

  {
    id: "p5_w5_storytime",
    learningNodeId: "w5",
    title: "📖 ACTIVITY 7 – Zodiac Story Time",
    type: "list",
    order: 12,
    content: `
• Nghe truyện tiếng Anh “The Great Race”.
• Đóng vai:
  • “I’m the rat! I’m fast!”
• Phát triển nghe – hiểu – diễn đạt.
    `,
  },

  {
    id: "p5_w5_event_tet_fair",
    learningNodeId: "w5",
    title: "🎪 SỰ KIỆN – Tết Fair (Hội Chợ Tết WeWIN)",
    type: "list",
    order: 13,
    content: `
• Trưng bày mâm ngũ quả, bao lì xì, vòng hoàng đạo.
• Học sinh giới thiệu bằng tiếng Anh:
  • “This is our fruit plate.”
  • “We made lucky envelopes.”
    `,
  },

  {
    id: "p5_w5_final_product",
    learningNodeId: "w5",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 14,
    content: `
• My Tết Book – 6 trang:
  • Trái cây Tết
  • Bao lì xì
  • Con giáp của em
  • Hình múa rồng
  • Từ vựng Tết
  • Ảnh lớp Tết Fair
    `,
  },

  {
    id: "p5_w5_teacher_guide",
    learningNodeId: "w5",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 15,
    content: `
1. Ôn âm /l/, /m/, /k/, /s/ với lucky, mango, cake, snake.
2. Giới thiệu Tết qua video và hình ảnh.
3. Hai tuần đầu: craft + art; hai tuần sau: zodiac + storytelling.
4. Luyện hội thoại mẫu trước hoạt động.
5. Chuẩn bị góc trưng bày cho Tết Fair.
    `,
  },

  {
    id: "p5_w5_checklist",
    learningNodeId: "w5",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 16,
    content: `
• Giấy màu, kéo, hồ, sticker.
• Giấy đỏ & ruy băng.
• Video “The Great Race”.
• Flashcards Zodiac & trái cây.
• Bìa carton làm đầu rồng.
• Giấy A5 & vòng quay nhựa.
• Nhạc Tết vui nhộn.
• Máy ảnh / điện thoại.
    `,
  },

  {
    id: "p5_w5_outcomes",
    learningNodeId: "w5",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 17,
    content: `
• Phát âm chuẩn các âm /l/, /k/, /m/, /s/.
• Nói 3–5 câu mô tả về Tết bằng tiếng Anh.
• Hiểu & dùng “can / color / animal” trong ngữ cảnh văn hoá.
• Giới thiệu sản phẩm tại Tết Fair bằng 1–2 câu tiếng Anh.
    `,
  },
  {
    id: "p5_w5_homework",
    learningNodeId: "w5",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 18,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/tet-festival-organizer
• https://www.youtube.com/watch?v=LuIeaioWX74

    `,
    audioUrl: "https://wewin.edu.vn/wp-content/uploads/2025/11/project5.mp3",
  },
];

export const project4WeekBlocks: LessonBlock[] = [
  {
    id: "p4_w4_objective",
    learningNodeId: "w4",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Giúp học sinh làm quen từ vựng, bài hát và hoạt động chủ đề Giáng Sinh.
• Rèn kỹ năng phát âm, câu đơn giản và hỏi – đáp về đồ vật lễ hội.
• Students learn Christmas vocabulary, pronunciation, Q&A patterns and join a mini party in English.
    `,
  },

  {
    id: "p4_w4_vocabulary",
    learningNodeId: "w4",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• Week 1: Santa Claus, snowman, sleigh, gift, Christmas tree, bell
• Week 2: wreath, gingerbread, stocking, elf, candle, candy cane, reindeer
    `,
  },

  {
    id: "p4_w4_pronunciation",
    learningNodeId: "w4",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /s/ – Santa, sleigh, stocking → "ssss–" như hơi tuyết.
• /r/ – reindeer, wreath → cuộn lưỡi không rung.
• /g/ – gift, gingerbread → bật âm cuối rõ.
• /b/ – bell, biscuit → "b–b–bell".
• Mini Chant:
  “Santa, snowman, sleigh and star – Christmas fun is not too far!”
    `,
  },

  {
    id: "p4_w4_structures",
    learningNodeId: "w4",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Patterns:
  • What is this? → It’s a [Christmas tree].
  • What color is it? → It’s [green / red / white].
  • Do you like Christmas? → Yes, I do!

• Extended:
  • What do you see? → I see Santa Claus!
  • What do you want for Christmas? → I want a gift!
  • Where is the star? → On the Christmas tree!
    `,
  },

  {
    id: "p4_w4_conversation",
    learningNodeId: "w4",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Mini Dialogue – At the Christmas Party:
  • “What do you see?” → “I see a snowman!”
  • “Do you like it?” → “Yes, it's cute!”
• Học sinh thực hành theo cặp hoặc nhóm, dùng đồ vật thật trong lớp.
    `,
  },

  {
    id: "p4_w4_activities",
    learningNodeId: "w4",
    title: "HOẠT ĐỘNG TRẢI NGHIỆM / CLASS ACTIVITIES",
    type: "list",
    order: 6,
    content: `
1) Santa Costume Design:
• Vẽ và tô trang phục Santa / elf, dán bông gòn và kim tuyến.
• “This is Santa’s hat.” / “It’s red and white.”

2) Christmas Tree Decorating:
• Trang trí cây thông mini.
• “Put the star on the top!” / “It’s shiny!”

3) Present Hunt Map:
• Nối số 1–15 để tìm đường đến hộp quà.
• “I found a gift!”

4) Counting Gifts:
• Đếm snowman, gift, candy cane: “Three presents! Five snowmen!”

5) Shadow Matching Noel:
• Ghép hình Santa – tree – gift – bell với bóng đổ.
    `,
  },

  {
    id: "p4_w4_event",
    learningNodeId: "w4",
    title: "🎄 MINI CHRISTMAS PARTY",
    type: "list",
    order: 7,
    content: `
• Bé mặc trang phục Santa hoặc elf.
• Hát: “We Wish You a Merry Christmas”.
• Trò chơi: Pass the Gift:
  – Ai nhận quà phải nói: “Merry Christmas!” hoặc “I love Christmas!”
• Luyện nói trong ngữ cảnh thật.
    `,
  },

  {
    id: "p4_w4_final_product",
    learningNodeId: "w4",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 8,
    content: `
• My Christmas Book – 5 trang:
  • “This is Santa.”
  • “This is my Christmas tree.”
  • “I see a snowman.”
  • “I want a gift.”
• + Ảnh hoặc tranh hoạt động party.
    `,
  },

  {
    id: "p4_w4_teacher_guide",
    learningNodeId: "w4",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 9,
    content: `
1. Ôn từ bằng flashcard / bài hát “Santa, Tree, Bell”.
2. Luyện âm /s/, /r/, /b/, /g/ qua trò “Say and Touch”.
3. Dạy mẫu câu: “What is this?” → “It’s a gift.”
4. Chia nhóm hoạt động: decorate – count – hunt – act.
5. Tổ chức mini party và quay video kỷ niệm.
    `,
  },

  {
    id: "p4_w4_checklist",
    learningNodeId: "w4",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 10,
    content: `
• Giấy màu, bông gòn, keo, kéo.
• Sticker Noel, ornament mini.
• Phiếu nối số & shadow cards.
• Flashcards từ vựng Noel.
• Nhạc Giáng Sinh & micro đồ chơi.
• Giấy A5 / bìa cứng cho Christmas Book.
• Máy ảnh / điện thoại quay video.
    `,
  },

  {
    id: "p4_w4_outcomes",
    learningNodeId: "w4",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 11,
    content: `
• Phát âm chuẩn 4 âm /s/, /r/, /b/, /g/.
• Hỏi – đáp được: “What is this?” / “It’s a [Christmas word].”
• Đếm & mô tả màu sắc trong ngữ cảnh Noel.
• Giao tiếp tự nhiên trong mini party.
• Hoàn thành “My Christmas Book”.
    `,
  },
  {
    id: "p4_w4_homework",
    learningNodeId: "w4",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 12,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/christmas-party-mini
• https://www.youtube.com/watch?v=G_NGo52IAwk
    `,
    audioUrl: "https://wewin.edu.vn/wp-content/uploads/2025/11/project4.mp3",
  },
];
export const project3WeekBlocks: LessonBlock[] = [
  {
    id: "p3_w3_objective",
    learningNodeId: "w3",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Giúp học sinh nhận biết các loài chim và đặc điểm của chúng.
• Rèn phát âm, mô tả hành động bay / đi / hót bằng tiếng Anh.
• Students learn bird vocabulary and characteristics using speaking and action verbs.
• Học sinh tự tay làm sách 'My Bird Book'.
    `,
  },

  {
    id: "p3_w3_vocabulary",
    learningNodeId: "w3",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• owl • eagle • dove • ostrich • penguin • flamingo • swan • turkey • peacock • sparrow
• Tập trung loài chim + khả năng bay / không bay + màu sắc.
    `,
  },

  {
    id: "p3_w3_pronunciation",
    learningNodeId: "w3",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /b/ – bird, beak → "b-b-bird" (bật hơi mạnh).
• /w/ – wing, white → khẩu hình môi tròn: "wuh–ing".
• /f/ – feather, flamingo → răng chạm môi: "ffff–".
• /p/ – penguin, peacock → nổ hơi: "p-p-penguin!".
• Phonics Chant:
  “Birds can fly, birds can sing — Eagle, peacock, spread your wings!”
    `,
  },

  {
    id: "p3_w3_structures",
    learningNodeId: "w3",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Structures:
  • What is this? → This is a [bird name].
  • Can it fly? → Yes, it can. / No, it can’t.

• Extended Patterns:
  • What color is it? → It’s blue and white.
  • What can a bird do? → It can fly and sing.
  • Can a penguin fly? → No, it can’t. It can swim.
    `,
  },

  {
    id: "p3_w3_conversation",
    learningNodeId: "w3",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Bird Talk Conversation:
  • “What’s this?” → “It’s a peacock!”
  • “Can it fly?” → “Yes, it can!”
  • “It’s beautiful!”
• Khuyến khích học sinh nói nhanh – tự nhiên.
    `,
  },

  {
    id: "p3_w3_activities",
    learningNodeId: "w3",
    title: "HOẠT ĐỘNG TRẢI NGHIỆM / CLASS ACTIVITIES",
    type: "list",
    order: 6,
    content: `
1) Bird Identification Game:
• Xem ảnh/video → nói: “This is an owl.” / “Can it fly?”

2) Feather Painting:
• Vẽ bằng lông vũ thật.
• “This is my bird.” / “It has big wings.”

3) Bird Mask Craft:
• Làm mặt nạ + đóng vai: “I’m a flamingo! I can fly!”

4) Flying or Not? Game:
• Chia nhóm thẻ: “Can fly / Can’t fly”.

5) My Bird Book Craft:
• Trang 1: “This is a peacock.”
• Trang 2: “It can fly.”
• Trang 3: “It’s colorful.”
• Trang 4: “It has big feathers.”
• Trang 5: ảnh thật hoặc tự vẽ.
    `,
  },

  {
    id: "p3_w3_final_product",
    learningNodeId: "w3",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 7,
    content: `
• My Bird Book – sách mini 5 trang:
  • “This is a penguin. It can’t fly. It can swim.”
  • “This is a peacock. It’s colorful!”
    `,
  },

  {
    id: "p3_w3_teacher_guide",
    learningNodeId: "w3",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 8,
    content: `
1. Mở đầu với âm thanh chim hót để tạo hứng thú.
2. Luyện âm /b/, /p/, /f/, /w/ qua trò “Touch your lips!”.
3. Tổ chức trạm học tập: Identification – Art – Mask – Movement.
4. Trò “Yes, it can!” jumping game.
5. Thu thập “My Bird Book” làm sản phẩm cuối tuần.
    `,
  },

  {
    id: "p3_w3_checklist",
    learningNodeId: "w3",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 9,
    content: `
• Flashcards chim + video.
• Lông vũ, màu nước, giấy A4.
• Giấy cứng, dây, sticker.
• Thẻ “Can fly / Can’t fly”.
• Giấy A5 / bìa cứng cho My Bird Book.
• Keo, bút màu, kéo.
• Micro + bảng IPA.
• Nhạc nền “Bird Song”.
    `,
  },

  {
    id: "p3_w3_outcomes",
    learningNodeId: "w3",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 10,
    content: `
• Phát âm chuẩn 4 âm /b/, /p/, /f/, /w/.
• Hỏi – đáp trôi chảy: “Can it fly?” / “Yes, it can.”
• Mô tả được 3 đặc điểm của 1 loài chim.
• Hoàn thành sản phẩm “My Bird Book”.
    `,
  },
  {
    id: "p3_w3_homework",
    learningNodeId: "w3",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 11,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/bird-watching-adventure
• https://www.youtube.com/watch?v=XNupSaW6eO0
• https://www.youtube.com/watch?v=qW2yOwonRdc

`,
    audioUrl: "https://wewin.edu.vn/wp-content/uploads/2025/11/project3.mp3",
  },
];

export const project2WeekBlocks: LessonBlock[] = [
  {
    id: "p2_w2_objective",
    learningNodeId: "w2",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Giúp học sinh nhận biết và thể hiện năng khiếu, tài năng của bản thân qua tiếng Anh.
• Rèn kỹ năng phát âm, giao tiếp, mô tả hành động và trình bày trên sân khấu.
• Students talk about their talents and actions in English, improving pronunciation, fluency, and self-expression.
    `,
  },

  {
    id: "p2_w2_vocabulary",
    learningNodeId: "w2",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• vet • cook • scientist • astronaut • singer • dancer • artist • waiter
• Từ vựng tập trung vào tài năng, nghề sáng tạo và hành động mô tả.
    `,
  },

  {
    id: "p2_w2_pronunciation",
    learningNodeId: "w2",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /s/ – singer, scientist → Rít nhẹ: "ssss–inger!"
• /k/ – cook, rocket → Gõ âm cuối: "k–k–cook!"
• /d/ – dancer, doctor → Nhấn âm đầu: "d–an–cer!"
• /t/ – artist, astronaut → Nhấn âm cuối: "artis–t!"
• Mini Game: “Say it loud – say it proud!” → Singer! Dancer! Artist! Cook!
    `,
  },

  {
    id: "p2_w2_structures",
    learningNodeId: "w2",
    title: "CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES",
    type: "list",
    order: 4,
    content: `
• Main Pattern:
  • What can you do?
  • I can [sing / dance / paint / cook / draw].

• Extended Patterns:
  • What's your talent? → My talent is singing.
  • Can you dance? → Yes, I can.
  • What do you like doing? → I like drawing.
  • Who can sing well? → I can!
    `,
  },

  {
    id: "p2_w2_communication",
    learningNodeId: "w2",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 5,
    content: `
• Talent Interview:
  • “What can you do?” → “I can sing!”
  • “Show me, please!” → (học sinh biểu diễn)
    `,
  },

  {
    id: "p2_w2_activities",
    learningNodeId: "w2",
    title: "HOẠT ĐỘNG TRẢI NGHIỆM / CLASS ACTIVITIES",
    type: "list",
    order: 6,
    content: `
1) Talent Station – 4 góc tài năng:
• Singer Zone → hát với micro
• Artist Zone → vẽ tranh / tô tượng
• Chef Zone → nặn pizza
• Science Zone → thí nghiệm baking soda + giấm

2) Performance Preparation:
• “Hello! My name is ___.”
• “I can dance.”

3) Costume Making – Làm trang phục:
• Mũ, huy hiệu, vòng tay

4) Connect-the-Dots Art – Nối số nghệ sĩ:
• Hoàn thành và dán vào 'My Talent Book'

5) WeWIN’s Got Talent Show:
• Bé biểu diễn 30–60 giây trước lớp
    `,
  },

  {
    id: "p2_w2_final_product",
    learningNodeId: "w2",
    title: "SẢN PHẨM / FINAL PRODUCT",
    type: "list",
    order: 7,
    content: `
• My Talent Album gồm:
  • Trang giới thiệu
  • Ảnh hoặc tranh biểu diễn
  • 1 câu: “I can sing / dance / cook.”
    `,
  },

  {
    id: "p2_w2_teacher_guide",
    learningNodeId: "w2",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 8,
    content: `
1. Ôn động từ hành động.
2. Dạy phát âm /s/ /t/ /k/.
3. Luyện hội thoại tại Talent Stations.
4. Chuẩn bị mini stage.
5. Chấm điểm theo Pronunciation – Sentence – Confidence.
    `,
  },

  {
    id: "p2_w2_checklist",
    learningNodeId: "w2",
    title: "CHECKLIST CHUẨN BỊ",
    type: "list",
    order: 9,
    content: `
• Flashcards nghề & hành động
• Micro & loa
• Giấy màu, sticker
• Đất nặn & bộ thí nghiệm
• Phiếu nối số nghệ sĩ
• Banner “WeWIN’s Got Talent”
• Điện thoại quay video
    `,
  },

  {
    id: "p2_w2_outcomes",
    learningNodeId: "w2",
    title: "KẾT QUẢ KỲ VỌNG",
    type: "list",
    order: 10,
    content: `
• Phát âm chuẩn 6/8 từ tài năng.
• Nói 2–3 câu mô tả tài năng.
• Biểu diễn tự tin trước lớp.
• Hoàn thành “My Talent Album”.
    `,
  },
  {
    id: "p2_w2_homework",
    learningNodeId: "w2",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 12,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/im-a-star-performer
• https://www.youtube.com/watch?v=m80qAEVeW94
    `,
    audioUrl: `
    https://wewin.edu.vn/wp-content/uploads/2025/11/song_1.mp3
    https://wewin.edu.vn/wp-content/uploads/2025/12/song_2.mp3`,
  },
];

export const project1WeekBlocks: LessonBlock[] = [
  {
    id: "w1_objectives",
    learningNodeId: "w1",
    title: "MỤC TIÊU MỞ RỘNG / EXTENDED OBJECTIVES",
    type: "list",
    order: 1,
    content: `
• Phát triển nghe – nói – phát âm chuẩn qua các từ nghề nghiệp.
• Luyện mẫu câu giao tiếp cơ bản xoay quanh chủ đề nghề nghiệp.
• Giúp học sinh nghe hiểu, trả lời tự nhiên, tự tin diễn đạt ước mơ bằng tiếng Anh.
    `,
  },

  {
    id: "w1_pronunciation",
    learningNodeId: "w1",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 2,
    content: `
• Sound Focus:
• /tʃ/ – teacher, child, chair — “I’m a teacher.” – Tee–cher!
• /dɒ/ – doctor, dog, doll — “Doctor helps people.”
• /p/ – pilot, policeman — “Pilot flies a plane.”
• /f/ – farmer, fireman — “Fireman puts out fire.”
• Học sinh nghe – nhại – nói theo rhythm vui (TPR: touch your nose when you hear /p/).
• Hoạt động gợi ý:
• Phonics chant: “Tee-cher! Doc-tor! Pi-lot! Farmer! — I want to be one day!”
• Mouth Mirror: dùng gương nhỏ để quan sát khẩu hình /tʃ/ – /p/ – /f/.
    `,
  },

  {
    id: "w1_sentence_structures",
    learningNodeId: "w1",
    title: "CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "list",
    order: 3,
    content: `
• Main pattern:
• What do you want to become?
• I want to be a [job].

• Supporting sentences:
• What’s your dream job? → My dream job is a teacher.
• What does a doctor do? → A doctor helps sick people.
• Who works at school? → A teacher works at school.
• Where does a pilot work? → A pilot works in the airplane.
• Luyện theo cặp – hỏi & trả lời thật.
    `,
  },

  {
    id: "w1_communication",
    learningNodeId: "w1",
    title: "MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "list",
    order: 4,
    content: `
• Role-Play Corner:
• Bé đóng vai nghề mình chọn.
• “What do you want to become?”
• “I want to be a doctor.”
• “What do you do?” – “I help sick people.”
• Dream Job Microphone – bé trả lời phỏng vấn.
• Speech Bubble Poster – viết câu tiếng Anh lên poster.
    `,
  },

  {
    id: "w1_song",
    learningNodeId: "w1",
    title: "SONG / CHANT ĐỀ XUẤT",
    type: "list",
    order: 5,
    content: `
• “When I Grow Up” Chant:
• I want to be, I want to be,
• A teacher, doctor, pilot, see!
• I help, I fly, I teach today,
• When I grow up, I’ll find my way!
    `,
  },

  {
    id: "w1_dialogues",
    learningNodeId: "w1",
    title: "MINI DIALOGUES PRACTICE",
    type: "list",
    order: 6,
    content: `
• Teacher: What do you want to be, Nam?
• Student: I want to be a policeman!
• Teacher: What does a policeman do?
• Student: He helps people!
    `,
  },

  {
    id: "w1_integration",
    learningNodeId: "w1",
    title: "TÍCH HỢP VÀO BÀI HỌC HIỆN CÓ",
    type: "list",
    order: 7,
    content: `
• Color & Create: Bé tô tranh – đọc từ nghề.
• Tool Matching: “Doctor uses a stethoscope.”
• Dress-Up Corner: “I’m a pilot!”
• Poster Project: Bé viết câu: “I want to be a teacher.”
    `,
  },

  {
    id: "w1_drill",
    learningNodeId: "w1",
    title: "PHONICS + SPEAKING DRILL (3 phút cuối)",
    type: "list",
    order: 8,
    content: `
• Say it Fast Game: flashcard → phát âm 3 lần → đặt câu.
• Pass the Mic Game: ai cầm mic phải nói 1 câu hoàn chỉnh.
    `,
  },

  {
    id: "w1_checklist",
    learningNodeId: "w1",
    title: "BỔ SUNG CHECKLIST (PHẦN NGÔN NGỮ)",
    type: "list",
    order: 9,
    content: `
• Flashcards IPA (job words)
• Gương nhỏ (phonics mirror)
• Micro đồ chơi
• Speech bubbles & stickers
• Bảng hội thoại mẫu
    `,
  },

  {
    id: "w1_outcomes",
    learningNodeId: "w1",
    title: "KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "list",
    order: 10,
    content: `
• Phát âm đúng tối thiểu 6/8 từ nghề.
• Nói trọn câu: “I want to be a [job].”
• Phản xạ câu hỏi “What do you want to become?”
• Trình bày nghề mơ ước bằng 1–2 câu.
    `,
  },

  /* -----------------------------
     TUẦN 2 — MINI CAREER FAIR
  ------------------------------ */

  {
    id: "w1_2_objective",
    learningNodeId: "w1_2",
    title: "MỤC TIÊU / OBJECTIVE",
    type: "list",
    order: 1,
    content: `
• Học sinh thực hành giao tiếp thật về chủ đề nghề nghiệp.
• Students apply and communicate knowledge of jobs.
    `,
  },

  {
    id: "w1_2_vocabulary",
    learningNodeId: "w1_2",
    title: "TỪ VỰNG / VOCABULARY",
    type: "list",
    order: 2,
    content: `
• teacher • doctor • pilot • fireman • nurse • farmer • policeman • student
• Review từ vựng tuần 1 + mở rộng câu mô tả công việc.
    `,
  },

  {
    id: "w1_2_pronunciation",
    learningNodeId: "w1_2",
    title: " PHÁT ÂM / PRONUNCIATION FOCUS",
    type: "list",
    order: 3,
    content: `
• /tʃ/ – teacher → “tea–cher!”
• /p/ – pilot → p–p–pilot!
• /f/ – farmer → f–f–farmer!
• /d/ – doctor → d–d–doctor!
• Mini phonics game: “Say it fast!”
    `,
  },

  {
    id: "w1_2_structures",
    learningNodeId: "w1_2",
    title: "CẤU TRÚC NGỮ PHÁP",
    type: "list",
    order: 4,
    content: `
• What do you want to become? → I want to be a [teacher].
• What does a doctor do? → A doctor helps sick people.
• What does a pilot do? → A pilot flies a plane.
• Where does a teacher work? → A teacher works at school.
    `,
  },

  {
    id: "w1_2_communication",
    learningNodeId: "w1_2",
    title: "MẪU CÂU GIAO TIẾP",
    type: "list",
    order: 5,
    content: `
• “What do you want to be?” → “I want to be a doctor.”
• “Why?” → “Because I help people!”
• “Where do you work?” → “I work at the hospital.”
    `,
  },

  {
    id: "w1_2_activities",
    learningNodeId: "w1_2",
    title: "HOẠT ĐỘNG TRẢI NGHIỆM",
    type: "list",
    order: 6,
    content: `
• Job Interview Role-Play
• Career Tools Hunt
• Create Job Badge
• Mini Career Fair presentation
    `,
  },

  {
    id: "w1_2_final_product",
    learningNodeId: "w1_2",
    title: "SẢN PHẨM",
    type: "list",
    order: 7,
    content: `
• My Dream Job Booth:
• Huy hiệu nghề
• 1–2 câu giới thiệu tiếng Anh
• Ví dụ: “I’m a teacher. I work at school.”
    `,
  },

  {
    id: "w1_2_drill",
    learningNodeId: "w1_2",
    title: "DRILL",
    type: "list",
    order: 8,
    content: `
• Pass the Mic Game
• Rhythm Repeat: “What – do – you – want – to – be?”
    `,
  },

  {
    id: "w1_2_teacher_guide",
    learningNodeId: "w1_2",
    title: "HƯỚNG DẪN GIÁO VIÊN",
    type: "list",
    order: 9,
    content: `
• Ôn từ vựng nghề + dụng cụ.
• Giới thiệu cấu trúc nghề + nơi làm việc.
• Luyện hội thoại trước Career Fair.
• Quay video gửi phụ huynh.
    `,
  },

  {
    id: "w1_2_checklist",
    learningNodeId: "w1_2",
    title: "CHECKLIST",
    type: "list",
    order: 10,
    content: `
• Flashcards nghề & dụng cụ
• Micro & bảng câu hỏi
• Dây + sticker cho Job Badge
• Bàn nhỏ & biển tên nghề
• Máy ảnh quay video
    `,
  },

  {
    id: "w1_2_outcomes",
    learningNodeId: "w1_2",
    title: "OUTCOMES",
    type: "list",
    order: 11,
    content: `
• Phát âm đúng 6/8 từ nghề
• Đặt câu: “I want to be ...”
• Nói 2–3 câu mô tả nghề
• Tự tin trong Mini Career Fair
    `,
  },

  {
    id: "w1_2_homework",
    learningNodeId: "w1_2",
    title: "BÀI TẬP VỀ NHÀ",
    type: "homework",
    order: 12,
    content: `
• Hoàn thành Worksheet
• https://wewin-education.vercel.app/resources/kids/Games/my-future-career-fair
• https://www.youtube.com/watch?v=ACl4wbkk5FI
• https://www.youtube.com/watch?v=Gf52YEHBSaQ
• https://www.youtube.com/watch?v=NWiLhH1Yzig
    `,
  },
];

export const mockLessonContents: LessonBlock[] = [

  /////////// IELTS //////////////
  ...project1IELTSWeekBlocks,
  /////////// KIDS ///////////////
  ...project1WeekBlocks,
  ...project2WeekBlocks,
  ...project3WeekBlocks,
  ...project4WeekBlocks,
  ...project5WeekBlocks,
  ...project6WeekBlocks,
  ...reviewWeekBlocks,
  ...project7WeekBlocks,
  ...project8WeekBlocks,
  ...project9WeekBlocks,
  ...project10WeekBlocks,
  ...project11WeekBlocks,
  ...springReviewBlocks,
  ...project12WeekBlocks,
  ...project13WeekBlocks,
  ...project14WeekBlocks,
  ...project15WeekBlocks,
  ...project16WeekBlocks,
  ...project17WeekBlocks,
  ...projectFinalWeekBlocks,
];
