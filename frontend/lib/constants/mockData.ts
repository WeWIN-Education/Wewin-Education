import { Book, Project, LearningNode, LessonBlock } from "./types";

export const mockBooks: Book[] = [
  {
    id: "book_kids",
    name: "KIDS",
    status: "active",
    imgUrl:"https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN",
    gameUrl: "/resources/kids/Games",
  },

  {
    id: "book_starters_foundation",
    name: "STARTERS FOUNDATION",
    status: "active",
    imgUrl:"https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN STARTERS FOUNDATION",
    gameUrl: "",
  },
];

export const mockProjects: Project[] = [
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
