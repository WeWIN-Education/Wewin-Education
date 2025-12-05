import type { UnitGameConfig, WordItem } from "@/types/games";

/**
 * Cấu trúc định nghĩa toàn bộ cuốn sách Kids Book
 * Chỉ cần thêm từ vựng ở đây, hệ thống sẽ tự động tạo:
 * - Trang trò chơi tổng (Kids Book)
 * - Các game lẻ
 * - Menu logic
 * - Unit có 1 phần hoặc nhiều phần
 */

// Helper function để tự động tạo matching pairs từ words
function createMatchingPairs(words: WordItem[]): { left: string; right: string }[] {
  return words.map((word) => ({
    left: word.emoji || word.text,
    right: word.meaning || word.text,
  }));
}

// Helper function để tự động tạo quiz từ words
function createQuiz(words: WordItem[], question: string, correctWordId: string) {
  const correctWord = words.find((w) => w.id === correctWordId);
  if (!correctWord) return null;

  const otherWords = words.filter((w) => w.id !== correctWordId);
  const options = [
    { label: correctWord.text, value: correctWord.id },
    ...otherWords.slice(0, 3).map((w) => ({ label: w.text, value: w.id })),
  ].slice(0, 4);

  return {
    title: "Quiz",
    question: question,
    answer: correctWord.id,
    options: options,
  };
}

const PROJECT1_WORDS: WordItem[] = [
  { id: "teacher", text: "teacher", emoji: "👩‍🏫", meaning: "Giáo viên" },
  { id: "doctor", text: "doctor", emoji: "👨‍⚕️", meaning: "Bác sĩ" },
  { id: "pilot", text: "pilot", emoji: "✈️", meaning: "Phi công" },
  { id: "fireman", text: "fireman", emoji: "👨‍🚒", meaning: "Lính cứu hỏa" },
  { id: "nurse", text: "nurse", emoji: "👩‍⚕️", meaning: "Y tá" },
  { id: "farmer", text: "farmer", emoji: "👨‍🌾", meaning: "Nông dân" },
  { id: "policeman", text: "policeman", emoji: "👮", meaning: "Cảnh sát" },
  { id: "student", text: "student", emoji: "🎓", meaning: "Học sinh" },
];

// ============================================
// ĐỊNH NGHĨA CUỐN SÁCH - CHỈ CẦN THÊM TỪ VỰNG Ở ĐÂY
// ============================================

export const BOOK_CONFIG: (UnitGameConfig & { backgroundColor?: string })[] = [
  // ========== PROJECT 1: MY FUTURE CAREER FAIR ==========
  {
    slug: "my-future-career-fair",
    name: "MY FUTURE CAREER FAIR",
    unit: "Unit 1",
    bookname: "GIAI ĐOẠN 1: Mùa Thu - Khám phá nghề nghiệp & thiên nhiên",
    backgroundColor: "from-orange-50 via-amber-50 to-yellow-50", // Màu vàng cam cho nghề nghiệp
    flashcards: {
      title: "Careers",
      autoAudio: true,
      words: PROJECT1_WORDS,
    },
    quiz: createQuiz(PROJECT1_WORDS, "Who helps people when they are sick?", "doctor")!,
    matching: {
      title: "Match careers",
      pairs: createMatchingPairs(PROJECT1_WORDS),
    },
    wordOrdering: {
      title: "Career Word Ordering",
      words: PROJECT1_WORDS,
      showScore: true,
    },
    wordScramble: {
      title: "Career Word Scramble",
      words: PROJECT1_WORDS,
      showScore: true,
    },
    enabledGames: ["matching", "flip", "speak", "memory", "ordering", "scramble"],
  },

  // ========== PROJECT 2: I'M A STAR PERFORMER ==========
  {
    slug: "im-a-star-performer",
    name: "I'M A STAR PERFORMER",
    unit: "Unit 2",
    bookname: "GIAI ĐOẠN 1: Mùa Thu - Khám phá nghề nghiệp & thiên nhiên",
    backgroundColor: "from-pink-50 via-purple-50 to-indigo-50", // Màu hồng tím cho ngôi sao
    flashcards: {
      title: "Talents & Careers",
      autoAudio: true,
      words: [
        { id: "vet", text: "vet", emoji: "🐾", meaning: "Bác sĩ thú y" },
        { id: "cook", text: "cook", emoji: "🍳", meaning: "Đầu bếp" },
        { id: "scientist", text: "scientist", emoji: "⚗️", meaning: "Nhà khoa học" },
        { id: "astronaut", text: "astronaut", emoji: "🚀", meaning: "Phi hành gia" },
        { id: "singer", text: "singer", emoji: "🎤", meaning: "Ca sĩ" },
        { id: "dancer", text: "dancer", emoji: "💃", meaning: "Vũ công" },
        { id: "artist", text: "artist", emoji: "🎨", meaning: "Họa sĩ" },
        { id: "waiter", text: "waiter", emoji: "🍽️", meaning: "Bồi bàn" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "singer", text: "singer", emoji: "🎤", meaning: "Ca sĩ" },
        { id: "dancer", text: "dancer", emoji: "💃", meaning: "Vũ công" },
        { id: "artist", text: "artist", emoji: "🎨", meaning: "Họa sĩ" },
        { id: "astronaut", text: "astronaut", emoji: "🚀", meaning: "Phi hành gia" },
      ],
      "Who performs on stage?",
      "singer"
    )!,
    matching: {
      title: "Match talents",
      pairs: createMatchingPairs([
        { id: "vet", text: "vet", emoji: "🐾", meaning: "Bác sĩ thú y" },
        { id: "cook", text: "cook", emoji: "🍳", meaning: "Đầu bếp" },
        { id: "scientist", text: "scientist", emoji: "⚗️", meaning: "Nhà khoa học" },
        { id: "astronaut", text: "astronaut", emoji: "🚀", meaning: "Phi hành gia" },
        { id: "singer", text: "singer", emoji: "🎤", meaning: "Ca sĩ" },
        { id: "dancer", text: "dancer", emoji: "💃", meaning: "Vũ công" },
        { id: "artist", text: "artist", emoji: "🎨", meaning: "Họa sĩ" },
        { id: "waiter", text: "waiter", emoji: "🍽️", meaning: "Bồi bàn" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak", "memory"],
  },

  // ========== PROJECT 3: BIRD WATCHING ADVENTURE ==========
  {
    slug: "bird-watching-adventure",
    name: "BIRD WATCHING ADVENTURE",
    unit: "Unit 3",
    bookname: "GIAI ĐOẠN 1: Mùa Thu - Khám phá nghề nghiệp & thiên nhiên",
    backgroundColor: "from-sky-50 via-blue-50 to-cyan-50", // Màu xanh trời cho chim
    flashcards: {
      title: "Birds",
      autoAudio: true,
      words: [
        { id: "owl", text: "owl", emoji: "🦉", meaning: "Cú mèo" },
        { id: "eagle", text: "eagle", emoji: "🦅", meaning: "Đại bàng" },
        { id: "dove", text: "dove", emoji: "🕊️", meaning: "Bồ câu" },
        { id: "ostrich", text: "ostrich", emoji: "🐦", meaning: "Đà điểu" },
        { id: "penguin", text: "penguin", emoji: "🐧", meaning: "Chim cánh cụt" },
        { id: "flamingo", text: "flamingo", emoji: "🦩", meaning: "Hồng hạc" },
        { id: "swan", text: "swan", emoji: "🦢", meaning: "Thiên nga" },
        { id: "turkey", text: "turkey", emoji: "🦃", meaning: "Gà tây" },
        { id: "peacock", text: "peacock", emoji: "🦚", meaning: "Công" },
        { id: "sparrow", text: "sparrow", emoji: "🐤", meaning: "Chim sẻ" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "owl", text: "owl", emoji: "🦉", meaning: "Cú mèo" },
        { id: "eagle", text: "eagle", emoji: "🦅", meaning: "Đại bàng" },
        { id: "penguin", text: "penguin", emoji: "🐧", meaning: "Chim cánh cụt" },
        { id: "peacock", text: "peacock", emoji: "🦚", meaning: "Công" },
      ],
      "Which bird can't fly?",
      "penguin"
    )!,
    matching: {
      title: "Match birds",
      pairs: createMatchingPairs([
        { id: "owl", text: "owl", emoji: "🦉", meaning: "Cú mèo" },
        { id: "eagle", text: "eagle", emoji: "🦅", meaning: "Đại bàng" },
        { id: "dove", text: "dove", emoji: "🕊️", meaning: "Bồ câu" },
        { id: "ostrich", text: "ostrich", emoji: "🐦", meaning: "Đà điểu" },
        { id: "penguin", text: "penguin", emoji: "🐧", meaning: "Chim cánh cụt" },
        { id: "flamingo", text: "flamingo", emoji: "🦩", meaning: "Hồng hạc" },
        { id: "swan", text: "swan", emoji: "🦢", meaning: "Thiên nga" },
        { id: "turkey", text: "turkey", emoji: "🦃", meaning: "Gà tây" },
        { id: "peacock", text: "peacock", emoji: "🦚", meaning: "Công" },
        { id: "sparrow", text: "sparrow", emoji: "🐤", meaning: "Chim sẻ" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 4: CHRISTMAS PARTY MINI (Có 2 parts) ==========
  {
    slug: "christmas-party-mini",
    name: "CHRISTMAS PARTY MINI",
    unit: "Unit 4",
    bookname: "GIAI ĐOẠN 1: Mùa Thu - Khám phá nghề nghiệp & thiên nhiên",
    backgroundColor: "from-red-50 via-green-50 to-emerald-50", // Màu đỏ xanh cho Giáng sinh
    flashcards: {
      title: "Christmas",
      autoAudio: true,
      words: [
        { id: "santa-claus", text: "santa claus", emoji: "🎅", meaning: "Ông già Noel" },
        { id: "snowman", text: "snowman", emoji: "⛄", meaning: "Người tuyết" },
        { id: "sleigh", text: "sleigh", emoji: "🛷", meaning: "Xe trượt tuyết" },
        { id: "gift", text: "gift", emoji: "🎁", meaning: "Quà" },
        { id: "christmas-tree", text: "christmas tree", emoji: "🎄", meaning: "Cây thông Noel" },
        { id: "bell", text: "bell", emoji: "🔔", meaning: "Chuông" },
        { id: "wreath", text: "wreath", emoji: "🎀", meaning: "Vòng nguyệt quế" },
        { id: "gingerbread", text: "gingerbread", emoji: "🍪", meaning: "Bánh gừng" },
        { id: "stocking", text: "stocking", emoji: "🧦", meaning: "Tất Giáng sinh" },
        { id: "elf", text: "elf", emoji: "🧝", meaning: "Yêu tinh" },
        { id: "candle", text: "candle", emoji: "🕯️", meaning: "Nến" },
        { id: "candy-cane", text: "candy cane", emoji: "🍬", meaning: "Kẹo gậy" },
        { id: "reindeer", text: "reindeer", emoji: "🦌", meaning: "Tuần lộc" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "santa-claus", text: "santa claus", emoji: "🎅", meaning: "Ông già Noel" },
        { id: "gift", text: "gift", emoji: "🎁", meaning: "Quà" },
        { id: "christmas-tree", text: "christmas tree", emoji: "🎄", meaning: "Cây thông Noel" },
        { id: "reindeer", text: "reindeer", emoji: "🦌", meaning: "Tuần lộc" },
      ],
      "Who brings gifts on Christmas?",
      "santa-claus"
    )!,
    matching: {
      title: "Match Christmas words",
      pairs: createMatchingPairs([
        { id: "santa-claus", text: "santa claus", emoji: "🎅", meaning: "Ông già Noel" },
        { id: "snowman", text: "snowman", emoji: "⛄", meaning: "Người tuyết" },
        { id: "gift", text: "gift", emoji: "🎁", meaning: "Quà" },
        { id: "christmas-tree", text: "christmas tree", emoji: "🎄", meaning: "Cây thông Noel" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "week-1",
        title: "Week 1",
        words: [
          { id: "santa-claus", text: "santa claus", emoji: "🎅", meaning: "Ông già Noel" },
          { id: "snowman", text: "snowman", emoji: "⛄", meaning: "Người tuyết" },
          { id: "sleigh", text: "sleigh", emoji: "🛷", meaning: "Xe trượt tuyết" },
          { id: "gift", text: "gift", emoji: "🎁", meaning: "Quà" },
          { id: "christmas-tree", text: "christmas tree", emoji: "🎄", meaning: "Cây thông Noel" },
          { id: "bell", text: "bell", emoji: "🔔", meaning: "Chuông" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "santa-claus", text: "santa claus", emoji: "🎅", meaning: "Ông già Noel" },
            { id: "snowman", text: "snowman", emoji: "⛄", meaning: "Người tuyết" },
            { id: "gift", text: "gift", emoji: "🎁", meaning: "Quà" },
            { id: "christmas-tree", text: "christmas tree", emoji: "🎄", meaning: "Cây thông Noel" },
          ],
          "What do we put under the tree?",
          "gift"
        )!,
      },
      {
        id: "week-2",
        title: "Week 2",
        words: [
          { id: "wreath", text: "wreath", emoji: "🎀", meaning: "Vòng nguyệt quế" },
          { id: "gingerbread", text: "gingerbread", emoji: "🍪", meaning: "Bánh gừng" },
          { id: "stocking", text: "stocking", emoji: "🧦", meaning: "Tất Giáng sinh" },
          { id: "elf", text: "elf", emoji: "🧝", meaning: "Yêu tinh" },
          { id: "candle", text: "candle", emoji: "🕯️", meaning: "Nến" },
          { id: "candy-cane", text: "candy cane", emoji: "🍬", meaning: "Kẹo gậy" },
          { id: "reindeer", text: "reindeer", emoji: "🦌", meaning: "Tuần lộc" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "reindeer", text: "reindeer", emoji: "🦌", meaning: "Tuần lộc" },
            { id: "elf", text: "elf", emoji: "🧝", meaning: "Yêu tinh" },
            { id: "candy-cane", text: "candy cane", emoji: "🍬", meaning: "Kẹo gậy" },
            { id: "gingerbread", text: "gingerbread", emoji: "🍪", meaning: "Bánh gừng" },
          ],
          "What helps Santa fly?",
          "reindeer"
        )!,
      },
    ],
  },

  // ========== PROJECT 5: TET FESTIVAL ORGANIZER (Có 2 parts) ==========
  {
    slug: "tet-festival-organizer",
    name: "TET FESTIVAL ORGANIZER",
    unit: "Unit 5",
    bookname: "GIAI ĐOẠN 2: Tết Nguyên Đán - Văn hóa Việt Nam",
    backgroundColor: "from-red-50 via-yellow-50 to-orange-50", // Màu đỏ vàng cho Tết
    flashcards: {
      title: "Tet Festival",
      autoAudio: true,
      words: [
        { id: "papaya", text: "papaya", emoji: "🍈", meaning: "Đu đủ" },
        { id: "coconut", text: "coconut", emoji: "🥥", meaning: "Dừa" },
        { id: "mango", text: "mango", emoji: "🥭", meaning: "Xoài" },
        { id: "fig", text: "fig", emoji: "🌰", meaning: "Sung" },
        { id: "lucky-money", text: "lucky money", emoji: "🧧", meaning: "Tiền lì xì" },
        { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
        { id: "sticky-rice-cake", text: "sticky rice cake", emoji: "🥮", meaning: "Bánh chưng/Bánh tét" },
        { id: "dragon-dance", text: "dragon dance", emoji: "🐉", meaning: "Múa lân/rồng" },
        { id: "rat", text: "rat", emoji: "🐀", meaning: "Chuột" },
        { id: "dragon", text: "dragon", emoji: "🐉", meaning: "Rồng" },
        { id: "goat", text: "goat", emoji: "🐐", meaning: "Dê" },
        { id: "rooster", text: "rooster", emoji: "🐓", meaning: "Gà trống" },
        { id: "snake", text: "snake", emoji: "🐍", meaning: "Rắn" },
        { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
        { id: "duck", text: "duck", emoji: "🦆", meaning: "Vịt" },
        { id: "ox", text: "ox", emoji: "🐂", meaning: "Trâu" },
        { id: "monkey", text: "monkey", emoji: "🐒", meaning: "Khỉ" },
        { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "lucky-money", text: "lucky money", emoji: "🧧", meaning: "Tiền lì xì" },
        { id: "dragon-dance", text: "dragon dance", emoji: "🐉", meaning: "Múa lân/rồng" },
        { id: "sticky-rice-cake", text: "sticky rice cake", emoji: "🥮", meaning: "Bánh chưng/Bánh tét" },
        { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
      ],
      "What do children receive during Tet?",
      "lucky-money"
    )!,
    matching: {
      title: "Match Tet words",
      pairs: createMatchingPairs([
        { id: "lucky-money", text: "lucky money", emoji: "🧧", meaning: "Tiền lì xì" },
        { id: "dragon-dance", text: "dragon dance", emoji: "🐉", meaning: "Múa lân/rồng" },
        { id: "sticky-rice-cake", text: "sticky rice cake", emoji: "🥮", meaning: "Bánh chưng/Bánh tét" },
        { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "lunar-new-year",
        title: "Lunar New Year (Week 1-2)",
        words: [
          { id: "papaya", text: "papaya", emoji: "🍈", meaning: "Đu đủ" },
          { id: "coconut", text: "coconut", emoji: "🥥", meaning: "Dừa" },
          { id: "mango", text: "mango", emoji: "🥭", meaning: "Xoài" },
          { id: "fig", text: "fig", emoji: "🌰", meaning: "Sung" },
          { id: "lucky-money", text: "lucky money", emoji: "🧧", meaning: "Tiền lì xì" },
          { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
          { id: "sticky-rice-cake", text: "sticky rice cake", emoji: "🥮", meaning: "Bánh chưng/Bánh tét" },
          { id: "dragon-dance", text: "dragon dance", emoji: "🐉", meaning: "Múa lân/rồng" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "lucky-money", text: "lucky money", emoji: "🧧", meaning: "Tiền lì xì" },
            { id: "sticky-rice-cake", text: "sticky rice cake", emoji: "🥮", meaning: "Bánh chưng/Bánh tét" },
            { id: "dragon-dance", text: "dragon dance", emoji: "🐉", meaning: "Múa lân/rồng" },
            { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
          ],
          "What is a traditional Tet food?",
          "sticky-rice-cake"
        )!,
      },
      {
        id: "zodiac-animals",
        title: "Zodiac Animals (Week 3-4)",
        words: [
          { id: "rat", text: "rat", emoji: "🐀", meaning: "Chuột" },
          { id: "dragon", text: "dragon", emoji: "🐉", meaning: "Rồng" },
          { id: "goat", text: "goat", emoji: "🐐", meaning: "Dê" },
          { id: "rooster", text: "rooster", emoji: "🐓", meaning: "Gà trống" },
          { id: "snake", text: "snake", emoji: "🐍", meaning: "Rắn" },
          { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
          { id: "duck", text: "duck", emoji: "🦆", meaning: "Vịt" },
          { id: "ox", text: "ox", emoji: "🐂", meaning: "Trâu" },
          { id: "monkey", text: "monkey", emoji: "🐒", meaning: "Khỉ" },
          { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "dragon", text: "dragon", emoji: "🐉", meaning: "Rồng" },
            { id: "rat", text: "rat", emoji: "🐀", meaning: "Chuột" },
            { id: "rooster", text: "rooster", emoji: "🐓", meaning: "Gà trống" },
            { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
          ],
          "Which animal is the strongest in zodiac?",
          "dragon"
        )!,
      },
    ],
  },

  // ========== PROJECT 6: FLOWER SHOP OWNER ==========
  {
    slug: "flower-shop-owner",
    name: "FLOWER SHOP OWNER",
    unit: "Unit 6",
    bookname: "GIAI ĐOẠN 3: Mùa Xuân - Khám phá thiên nhiên",
    backgroundColor: "from-pink-50 via-rose-50 to-fuchsia-50", // Màu hồng cho hoa
    flashcards: {
      title: "Flowers",
      autoAudio: true,
      words: [
        { id: "apricot-flower", text: "apricot flower", emoji: "🌼", meaning: "Hoa mai" },
        { id: "peach-flower", text: "peach flower", emoji: "🌸", meaning: "Hoa đào" },
        { id: "daisy", text: "daisy", emoji: "🌼", meaning: "Hoa cúc" },
        { id: "lily", text: "lily", emoji: "⚜️", meaning: "Hoa ly" },
        { id: "lotus", text: "lotus", emoji: "🪷", meaning: "Hoa sen" },
        { id: "rose", text: "rose", emoji: "🌹", meaning: "Hoa hồng" },
        { id: "sunflower", text: "sunflower", emoji: "🌻", meaning: "Hoa hướng dương" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "rose", text: "rose", emoji: "🌹", meaning: "Hoa hồng" },
        { id: "lotus", text: "lotus", emoji: "🪷", meaning: "Hoa sen" },
        { id: "sunflower", text: "sunflower", emoji: "🌻", meaning: "Hoa hướng dương" },
        { id: "lily", text: "lily", emoji: "⚜️", meaning: "Hoa ly" },
      ],
      "Which flower is the symbol of love?",
      "rose"
    )!,
    matching: {
      title: "Match flowers",
      pairs: createMatchingPairs([
        { id: "apricot-flower", text: "apricot flower", emoji: "🌼", meaning: "Hoa mai" },
        { id: "peach-flower", text: "peach flower", emoji: "🌸", meaning: "Hoa đào" },
        { id: "daisy", text: "daisy", emoji: "🌼", meaning: "Hoa cúc" },
        { id: "lily", text: "lily", emoji: "⚜️", meaning: "Hoa ly" },
        { id: "lotus", text: "lotus", emoji: "🪷", meaning: "Hoa sen" },
        { id: "rose", text: "rose", emoji: "🌹", meaning: "Hoa hồng" },
        { id: "sunflower", text: "sunflower", emoji: "🌻", meaning: "Hoa hướng dương" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 7: INSECT EXPLORER ==========
  {
    slug: "insect-explorer",
    name: "INSECT EXPLORER",
    unit: "Unit 7",
    bookname: "GIAI ĐOẠN 3: Mùa Xuân - Khám phá thiên nhiên",
    backgroundColor: "from-green-50 via-lime-50 to-emerald-50", // Màu xanh lá cho côn trùng
    flashcards: {
      title: "Insects",
      autoAudio: true,
      words: [
        { id: "ladybug", text: "ladybug", emoji: "🐞", meaning: "Bọ rùa" },
        { id: "spider", text: "spider", emoji: "🕷️", meaning: "Nhện" },
        { id: "bee", text: "bee", emoji: "🐝", meaning: "Ong" },
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
        { id: "fly", text: "fly", emoji: "🪰", meaning: "Ruồi" },
        { id: "dragonfly", text: "dragonfly", emoji: "🦗", meaning: "Chuồn chuồn" },
        { id: "ant", text: "ant", emoji: "🐜", meaning: "Kiến" },
        { id: "mosquito", text: "mosquito", emoji: "🦟", meaning: "Muỗi" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
        { id: "bee", text: "bee", emoji: "🐝", meaning: "Ong" },
        { id: "ladybug", text: "ladybug", emoji: "🐞", meaning: "Bọ rùa" },
        { id: "dragonfly", text: "dragonfly", emoji: "🦗", meaning: "Chuồn chuồn" },
      ],
      "Which insect makes honey?",
      "bee"
    )!,
    matching: {
      title: "Match insects",
      pairs: createMatchingPairs([
        { id: "ladybug", text: "ladybug", emoji: "🐞", meaning: "Bọ rùa" },
        { id: "spider", text: "spider", emoji: "🕷️", meaning: "Nhện" },
        { id: "bee", text: "bee", emoji: "🐝", meaning: "Ong" },
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
        { id: "fly", text: "fly", emoji: "🪰", meaning: "Ruồi" },
        { id: "dragonfly", text: "dragonfly", emoji: "🦗", meaning: "Chuồn chuồn" },
        { id: "ant", text: "ant", emoji: "🐜", meaning: "Kiến" },
        { id: "mosquito", text: "mosquito", emoji: "🦟", meaning: "Muỗi" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 8: HUNGRY CATERPILLAR'S FOOD DIARY (Có 2 parts) ==========
  {
    slug: "hungry-caterpillar-food-diary",
    name: "HUNGRY CATERPILLAR'S FOOD DIARY",
    unit: "Unit 8",
    bookname: "GIAI ĐOẠN 3: Mùa Xuân - Khám phá thiên nhiên",
    backgroundColor: "from-yellow-50 via-orange-50 to-red-50", // Màu vàng cam đỏ cho thức ăn
    flashcards: {
      title: "Food & Story",
      autoAudio: true,
      words: [
        { id: "apple", text: "apple", emoji: "🍎", meaning: "Táo" },
        { id: "pear", text: "pear", emoji: "🍐", meaning: "Lê" },
        { id: "plum", text: "plum", emoji: "🍑", meaning: "Mận" },
        { id: "orange", text: "orange", emoji: "🍊", meaning: "Cam" },
        { id: "strawberry", text: "strawberry", emoji: "🍓", meaning: "Dâu tây" },
        { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
        { id: "cheese", text: "cheese", emoji: "🧀", meaning: "Phô mai" },
        { id: "sausage", text: "sausage", emoji: "🌭", meaning: "Xúc xích" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "cucumber", text: "cucumber", emoji: "🥒", meaning: "Dưa leo" },
        { id: "salami", text: "salami", emoji: "🥓", meaning: "Xúc xích Ý" },
        { id: "cupcake", text: "cupcake", emoji: "🧁", meaning: "Bánh cupcake" },
        { id: "egg", text: "egg", emoji: "🥚", meaning: "Trứng" },
        { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "Sâu bướm" },
        { id: "leaf", text: "leaf", emoji: "🍃", meaning: "Lá" },
        { id: "cocoon", text: "cocoon", emoji: "🧶", meaning: "Kén" },
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
        { id: "sun", text: "sun", emoji: "☀️", meaning: "Mặt trời" },
        { id: "moon", text: "moon", emoji: "🌙", meaning: "Mặt trăng" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "apple", text: "apple", emoji: "🍎", meaning: "Táo" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "strawberry", text: "strawberry", emoji: "🍓", meaning: "Dâu tây" },
      ],
      "What is a sweet dessert?",
      "cake"
    )!,
    matching: {
      title: "Match food and story words",
      pairs: createMatchingPairs([
        { id: "apple", text: "apple", emoji: "🍎", meaning: "Táo" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
        { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "Sâu bướm" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "fruits-food",
        title: "Fruits & Food (Week 1-2)",
        words: [
          { id: "apple", text: "apple", emoji: "🍎", meaning: "Táo" },
          { id: "pear", text: "pear", emoji: "🍐", meaning: "Lê" },
          { id: "plum", text: "plum", emoji: "🍑", meaning: "Mận" },
          { id: "orange", text: "orange", emoji: "🍊", meaning: "Cam" },
          { id: "strawberry", text: "strawberry", emoji: "🍓", meaning: "Dâu tây" },
          { id: "watermelon", text: "watermelon", emoji: "🍉", meaning: "Dưa hấu" },
          { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
          { id: "cheese", text: "cheese", emoji: "🧀", meaning: "Phô mai" },
          { id: "sausage", text: "sausage", emoji: "🌭", meaning: "Xúc xích" },
          { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
          { id: "cucumber", text: "cucumber", emoji: "🥒", meaning: "Dưa leo" },
          { id: "salami", text: "salami", emoji: "🥓", meaning: "Xúc xích Ý" },
          { id: "cupcake", text: "cupcake", emoji: "🧁", meaning: "Bánh cupcake" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "apple", text: "apple", emoji: "🍎", meaning: "Táo" },
            { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
            { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
            { id: "strawberry", text: "strawberry", emoji: "🍓", meaning: "Dâu tây" },
          ],
          "What is a red fruit?",
          "apple"
        )!,
      },
      {
        id: "story-words",
        title: "Story Words (Week 3-4)",
        words: [
          { id: "egg", text: "egg", emoji: "🥚", meaning: "Trứng" },
          { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "Sâu bướm" },
          { id: "leaf", text: "leaf", emoji: "🍃", meaning: "Lá" },
          { id: "cocoon", text: "cocoon", emoji: "🧶", meaning: "Kén" },
          { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
          { id: "sun", text: "sun", emoji: "☀️", meaning: "Mặt trời" },
          { id: "moon", text: "moon", emoji: "🌙", meaning: "Mặt trăng" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "Bướm" },
            { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "Sâu bướm" },
            { id: "egg", text: "egg", emoji: "🥚", meaning: "Trứng" },
            { id: "cocoon", text: "cocoon", emoji: "🧶", meaning: "Kén" },
          ],
          "What does a caterpillar become?",
          "butterfly"
        )!,
      },
    ],
  },

  // ========== PROJECT 9: FARM DAY ORGANIZER (Có 2 parts) ==========
  {
    slug: "farm-day-organizer",
    name: "FARM DAY ORGANIZER",
    unit: "Unit 9",
    bookname: "GIAI ĐOẠN 3: Mùa Xuân - Khám phá thiên nhiên",
    backgroundColor: "from-amber-50 via-yellow-50 to-orange-50", // Màu vàng cam cho nông trại
    flashcards: {
      title: "Farm & Pet Animals",
      autoAudio: true,
      words: [
        { id: "cow", text: "cow", emoji: "🐄", meaning: "Bò" },
        { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
        { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
        { id: "duck", text: "duck", emoji: "🦆", meaning: "Vịt" },
        { id: "sheep", text: "sheep", emoji: "🐑", meaning: "Cừu" },
        { id: "goat", text: "goat", emoji: "🐐", meaning: "Dê" },
        { id: "rooster", text: "rooster", emoji: "🐓", meaning: "Gà trống" },
        { id: "turkey", text: "turkey", emoji: "🦃", meaning: "Gà tây" },
        { id: "farmer", text: "farmer", emoji: "👨‍🌾", meaning: "Nông dân" },
        { id: "buffalo", text: "buffalo", emoji: "🐃", meaning: "Trâu" },
        { id: "dog", text: "dog", emoji: "🐕", meaning: "Chó" },
        { id: "cat", text: "cat", emoji: "🐈", meaning: "Mèo" },
        { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ" },
        { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa" },
        { id: "fish", text: "fish", emoji: "🐟", meaning: "Cá" },
        { id: "parrot", text: "parrot", emoji: "🦜", meaning: "Vẹt" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "cow", text: "cow", emoji: "🐄", meaning: "Bò" },
        { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
        { id: "farmer", text: "farmer", emoji: "👨‍🌾", meaning: "Nông dân" },
        { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
      ],
      "Who takes care of farm animals?",
      "farmer"
    )!,
    matching: {
      title: "Match farm and pet animals",
      pairs: createMatchingPairs([
        { id: "cow", text: "cow", emoji: "🐄", meaning: "Bò" },
        { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
        { id: "dog", text: "dog", emoji: "🐕", meaning: "Chó" },
        { id: "cat", text: "cat", emoji: "🐈", meaning: "Mèo" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "farm-animals",
        title: "Farm Animals (Week 1-2)",
        words: [
          { id: "cow", text: "cow", emoji: "🐄", meaning: "Bò" },
          { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
          { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
          { id: "duck", text: "duck", emoji: "🦆", meaning: "Vịt" },
          { id: "sheep", text: "sheep", emoji: "🐑", meaning: "Cừu" },
          { id: "goat", text: "goat", emoji: "🐐", meaning: "Dê" },
          { id: "rooster", text: "rooster", emoji: "🐓", meaning: "Gà trống" },
          { id: "turkey", text: "turkey", emoji: "🦃", meaning: "Gà tây" },
          { id: "farmer", text: "farmer", emoji: "👨‍🌾", meaning: "Nông dân" },
          { id: "buffalo", text: "buffalo", emoji: "🐃", meaning: "Trâu" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "cow", text: "cow", emoji: "🐄", meaning: "Bò" },
            { id: "horse", text: "horse", emoji: "🐎", meaning: "Ngựa" },
            { id: "farmer", text: "farmer", emoji: "👨‍🌾", meaning: "Nông dân" },
            { id: "pig", text: "pig", emoji: "🐖", meaning: "Heo" },
          ],
          "What animal gives us milk?",
          "cow"
        )!,
      },
      {
        id: "pet-animals",
        title: "Pet Animals (Week 3-4)",
        words: [
          { id: "dog", text: "dog", emoji: "🐕", meaning: "Chó" },
          { id: "cat", text: "cat", emoji: "🐈", meaning: "Mèo" },
          { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ" },
          { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa" },
          { id: "fish", text: "fish", emoji: "🐟", meaning: "Cá" },
          { id: "parrot", text: "parrot", emoji: "🦜", meaning: "Vẹt" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "dog", text: "dog", emoji: "🐕", meaning: "Chó" },
            { id: "cat", text: "cat", emoji: "🐈", meaning: "Mèo" },
            { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ" },
            { id: "parrot", text: "parrot", emoji: "🦜", meaning: "Vẹt" },
          ],
          "Which pet can talk?",
          "parrot"
        )!,
      },
    ],
  },

  // ========== PROJECT 10: CITY TRANSPORT MAP MAKER (Có 2 parts) ==========
  {
    slug: "city-transport-map-maker",
    name: "CITY TRANSPORT MAP MAKER",
    unit: "Unit 10",
    bookname: "GIAI ĐOẠN 4: Giao thông & Du lịch",
    backgroundColor: "from-blue-50 via-cyan-50 to-teal-50", // Màu xanh dương cho giao thông
    flashcards: {
      title: "Transportation & City",
      autoAudio: true,
      words: [
        { id: "on-foot", text: "on foot", emoji: "🚶", meaning: "Đi bộ" },
        { id: "by-car", text: "by car", emoji: "🚗", meaning: "Bằng ô tô" },
        { id: "by-motorcycle", text: "by motorcycle", emoji: "🏍️", meaning: "Bằng xe máy" },
        { id: "by-taxi", text: "by taxi", emoji: "🚕", meaning: "Bằng taxi" },
        { id: "by-bus", text: "by bus", emoji: "🚌", meaning: "Bằng xe buýt" },
        { id: "by-bike", text: "by bike", emoji: "🚲", meaning: "Bằng xe đạp" },
        { id: "by-plane", text: "by plane", emoji: "✈️", meaning: "Bằng máy bay" },
        { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
        { id: "rocket-ship", text: "rocket ship", emoji: "🚀", meaning: "Tàu vũ trụ" },
        { id: "truck", text: "truck", emoji: "🚚", meaning: "Xe tải" },
        { id: "submarine", text: "submarine", emoji: "⛴️", meaning: "Tàu ngầm" },
        { id: "tractor", text: "tractor", emoji: "🚜", meaning: "Máy kéo" },
        { id: "helicopter", text: "helicopter", emoji: "🚁", meaning: "Trực thăng" },
        { id: "road", text: "road", emoji: "🛣️", meaning: "Đường" },
        { id: "bridge", text: "bridge", emoji: "🌉", meaning: "Cầu" },
        { id: "house", text: "house", emoji: "🏠", meaning: "Nhà" },
        { id: "school", text: "school", emoji: "🏫", meaning: "Trường học" },
        { id: "park", text: "park", emoji: "🌳", meaning: "Công viên" },
        { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
        { id: "airport", text: "airport", emoji: "🛫", meaning: "Sân bay" },
        { id: "station", text: "station", emoji: "🚉", meaning: "Nhà ga" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "by-plane", text: "by plane", emoji: "✈️", meaning: "Bằng máy bay" },
        { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
        { id: "by-car", text: "by car", emoji: "🚗", meaning: "Bằng ô tô" },
        { id: "by-bus", text: "by bus", emoji: "🚌", meaning: "Bằng xe buýt" },
      ],
      "What is the fastest way to travel?",
      "by-plane"
    )!,
    matching: {
      title: "Match transportation and city",
      pairs: createMatchingPairs([
        { id: "by-car", text: "by car", emoji: "🚗", meaning: "Bằng ô tô" },
        { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
        { id: "airport", text: "airport", emoji: "🛫", meaning: "Sân bay" },
        { id: "station", text: "station", emoji: "🚉", meaning: "Nhà ga" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "transportation",
        title: "Transportation (Week 1-2)",
        words: [
          { id: "on-foot", text: "on foot", emoji: "🚶", meaning: "Đi bộ" },
          { id: "by-car", text: "by car", emoji: "🚗", meaning: "Bằng ô tô" },
          { id: "by-motorcycle", text: "by motorcycle", emoji: "🏍️", meaning: "Bằng xe máy" },
          { id: "by-taxi", text: "by taxi", emoji: "🚕", meaning: "Bằng taxi" },
          { id: "by-bus", text: "by bus", emoji: "🚌", meaning: "Bằng xe buýt" },
          { id: "by-bike", text: "by bike", emoji: "🚲", meaning: "Bằng xe đạp" },
          { id: "by-plane", text: "by plane", emoji: "✈️", meaning: "Bằng máy bay" },
          { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
          { id: "rocket-ship", text: "rocket ship", emoji: "🚀", meaning: "Tàu vũ trụ" },
          { id: "truck", text: "truck", emoji: "🚚", meaning: "Xe tải" },
          { id: "submarine", text: "submarine", emoji: "⛴️", meaning: "Tàu ngầm" },
          { id: "tractor", text: "tractor", emoji: "🚜", meaning: "Máy kéo" },
          { id: "helicopter", text: "helicopter", emoji: "🚁", meaning: "Trực thăng" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "by-plane", text: "by plane", emoji: "✈️", meaning: "Bằng máy bay" },
            { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
            { id: "by-car", text: "by car", emoji: "🚗", meaning: "Bằng ô tô" },
            { id: "by-bus", text: "by bus", emoji: "🚌", meaning: "Bằng xe buýt" },
          ],
          "How do we travel in the sky?",
          "by-plane"
        )!,
      },
      {
        id: "city-elements",
        title: "City Elements (Week 3-4)",
        words: [
          { id: "road", text: "road", emoji: "🛣️", meaning: "Đường" },
          { id: "bridge", text: "bridge", emoji: "🌉", meaning: "Cầu" },
          { id: "house", text: "house", emoji: "🏠", meaning: "Nhà" },
          { id: "school", text: "school", emoji: "🏫", meaning: "Trường học" },
          { id: "park", text: "park", emoji: "🌳", meaning: "Công viên" },
          { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
          { id: "airport", text: "airport", emoji: "🛫", meaning: "Sân bay" },
          { id: "station", text: "station", emoji: "🚉", meaning: "Nhà ga" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "school", text: "school", emoji: "🏫", meaning: "Trường học" },
            { id: "house", text: "house", emoji: "🏠", meaning: "Nhà" },
            { id: "park", text: "park", emoji: "🌳", meaning: "Công viên" },
            { id: "airport", text: "airport", emoji: "🛫", meaning: "Sân bay" },
          ],
          "Where do children go to learn?",
          "school"
        )!,
      },
    ],
  },

  // ========== PROJECT 11: FAST FOOD RESTAURANT OWNER ==========
  {
    slug: "fast-food-restaurant-owner",
    name: "FAST FOOD RESTAURANT OWNER",
    unit: "Unit 11",
    bookname: "GIAI ĐOẠN 4: Giao thông & Du lịch",
    backgroundColor: "from-red-50 via-orange-50 to-yellow-50", // Màu đỏ cam cho thức ăn nhanh
    flashcards: {
      title: "Fast Food",
      autoAudio: true,
      words: [
        { id: "fries", text: "fries", emoji: "🍟", meaning: "Khoai tây chiên" },
        { id: "sandwich", text: "sandwich", emoji: "🥪", meaning: "Bánh mì kẹp" },
        { id: "hamburger", text: "hamburger", emoji: "🍔", meaning: "Bánh hăm-bơ-gơ" },
        { id: "pizza", text: "pizza", emoji: "🍕", meaning: "Bánh pizza" },
        { id: "hot-dog", text: "hot dog", emoji: "🌭", meaning: "Bánh mì xúc xích" },
        { id: "spaghetti", text: "spaghetti", emoji: "🍝", meaning: "Mì Ý" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "donut", text: "donut", emoji: "🍩", meaning: "Bánh vòng" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
        { id: "soda", text: "soda", emoji: "🥤", meaning: "Nước ngọt" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "hamburger", text: "hamburger", emoji: "🍔", meaning: "Bánh hăm-bơ-gơ" },
        { id: "pizza", text: "pizza", emoji: "🍕", meaning: "Bánh pizza" },
        { id: "fries", text: "fries", emoji: "🍟", meaning: "Khoai tây chiên" },
        { id: "hot-dog", text: "hot dog", emoji: "🌭", meaning: "Bánh mì xúc xích" },
      ],
      "What is a popular fast food with meat and bread?",
      "hamburger"
    )!,
    matching: {
      title: "Match fast food",
      pairs: createMatchingPairs([
        { id: "fries", text: "fries", emoji: "🍟", meaning: "Khoai tây chiên" },
        { id: "sandwich", text: "sandwich", emoji: "🥪", meaning: "Bánh mì kẹp" },
        { id: "hamburger", text: "hamburger", emoji: "🍔", meaning: "Bánh hăm-bơ-gơ" },
        { id: "pizza", text: "pizza", emoji: "🍕", meaning: "Bánh pizza" },
        { id: "hot-dog", text: "hot dog", emoji: "🌭", meaning: "Bánh mì xúc xích" },
        { id: "spaghetti", text: "spaghetti", emoji: "🍝", meaning: "Mì Ý" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "donut", text: "donut", emoji: "🍩", meaning: "Bánh vòng" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh ngọt" },
        { id: "soda", text: "soda", emoji: "🥤", meaning: "Nước ngọt" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 12: OCEAN EXPLORER (Có 2 parts) ==========
  {
    slug: "ocean-explorer",
    name: "OCEAN EXPLORER",
    unit: "Unit 12",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-blue-50 via-cyan-50 to-teal-50", // Màu xanh dương cho đại dương
    flashcards: {
      title: "Ocean & Beach",
      autoAudio: true,
      words: [
        { id: "octopus", text: "octopus", emoji: "🐙", meaning: "Bạch tuộc" },
        { id: "fish", text: "fish", emoji: "🐟", meaning: "Cá" },
        { id: "crab", text: "crab", emoji: "🦀", meaning: "Cua" },
        { id: "jellyfish", text: "jellyfish", emoji: "🪼", meaning: "Sứa" },
        { id: "starfish", text: "starfish", emoji: "⭐", meaning: "Sao biển" },
        { id: "dolphin", text: "dolphin", emoji: "🐬", meaning: "Cá heo" },
        { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa biển" },
        { id: "coral", text: "coral", emoji: "🪸", meaning: "San hô" },
        { id: "shell", text: "shell", emoji: "🐚", meaning: "Vỏ sò" },
        { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
        { id: "wave", text: "wave", emoji: "🌊", meaning: "Sóng" },
        { id: "sand", text: "sand", emoji: "🏝️", meaning: "Cát" },
        { id: "coconut", text: "coconut", emoji: "🥥", meaning: "Dừa" },
        { id: "surfing", text: "surfing", emoji: "🏄", meaning: "Lướt sóng" },
        { id: "sunglasses", text: "sunglasses", emoji: "😎", meaning: "Kính mát" },
        { id: "sunscreen", text: "sunscreen", emoji: "🧴", meaning: "Kem chống nắng" },
        { id: "sandcastle", text: "sandcastle", emoji: "🏰", meaning: "Lâu đài cát" },
        { id: "ukulele", text: "ukulele", emoji: "🎸", meaning: "Đàn Ukulele" },
        { id: "hula-dance", text: "hula dance", emoji: "💃", meaning: "Điệu nhảy Hula" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "dolphin", text: "dolphin", emoji: "🐬", meaning: "Cá heo" },
        { id: "octopus", text: "octopus", emoji: "🐙", meaning: "Bạch tuộc" },
        { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa biển" },
        { id: "crab", text: "crab", emoji: "🦀", meaning: "Cua" },
      ],
      "Which sea animal is very smart?",
      "dolphin"
    )!,
    matching: {
      title: "Match ocean and beach words",
      pairs: createMatchingPairs([
        { id: "dolphin", text: "dolphin", emoji: "🐬", meaning: "Cá heo" },
        { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
        { id: "wave", text: "wave", emoji: "🌊", meaning: "Sóng" },
        { id: "shell", text: "shell", emoji: "🐚", meaning: "Vỏ sò" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "sea-animals",
        title: "Sea Animals (Week 1-2)",
        words: [
          { id: "octopus", text: "octopus", emoji: "🐙", meaning: "Bạch tuộc" },
          { id: "fish", text: "fish", emoji: "🐟", meaning: "Cá" },
          { id: "crab", text: "crab", emoji: "🦀", meaning: "Cua" },
          { id: "jellyfish", text: "jellyfish", emoji: "🪼", meaning: "Sứa" },
          { id: "starfish", text: "starfish", emoji: "⭐", meaning: "Sao biển" },
          { id: "dolphin", text: "dolphin", emoji: "🐬", meaning: "Cá heo" },
          { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa biển" },
          { id: "coral", text: "coral", emoji: "🪸", meaning: "San hô" },
          { id: "shell", text: "shell", emoji: "🐚", meaning: "Vỏ sò" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "dolphin", text: "dolphin", emoji: "🐬", meaning: "Cá heo" },
            { id: "octopus", text: "octopus", emoji: "🐙", meaning: "Bạch tuộc" },
            { id: "turtle", text: "turtle", emoji: "🐢", meaning: "Rùa biển" },
            { id: "crab", text: "crab", emoji: "🦀", meaning: "Cua" },
          ],
          "Which sea animal has 8 arms?",
          "octopus"
        )!,
      },
      {
        id: "beach-words",
        title: "Beach Words (Week 3-4)",
        words: [
          { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
          { id: "wave", text: "wave", emoji: "🌊", meaning: "Sóng" },
          { id: "sand", text: "sand", emoji: "🏝️", meaning: "Cát" },
          { id: "coconut", text: "coconut", emoji: "🥥", meaning: "Dừa" },
          { id: "surfing", text: "surfing", emoji: "🏄", meaning: "Lướt sóng" },
          { id: "sunglasses", text: "sunglasses", emoji: "😎", meaning: "Kính mát" },
          { id: "sunscreen", text: "sunscreen", emoji: "🧴", meaning: "Kem chống nắng" },
          { id: "sandcastle", text: "sandcastle", emoji: "🏰", meaning: "Lâu đài cát" },
          { id: "ukulele", text: "ukulele", emoji: "🎸", meaning: "Đàn Ukulele" },
          { id: "hula-dance", text: "hula dance", emoji: "💃", meaning: "Điệu nhảy Hula" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
            { id: "wave", text: "wave", emoji: "🌊", meaning: "Sóng" },
            { id: "sandcastle", text: "sandcastle", emoji: "🏰", meaning: "Lâu đài cát" },
            { id: "surfing", text: "surfing", emoji: "🏄", meaning: "Lướt sóng" },
          ],
          "What do we build on the beach?",
          "sandcastle"
        )!,
      },
    ],
  },

  // ========== PROJECT 13: NATURE PHOTOGRAPHER (Có 2 parts) ==========
  {
    slug: "nature-photographer",
    name: "NATURE PHOTOGRAPHER",
    unit: "Unit 13",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-green-50 via-emerald-50 to-teal-50", // Màu xanh lá cho thiên nhiên
    flashcards: {
      title: "Nature & Landforms",
      autoAudio: true,
      words: [
        { id: "mountain", text: "mountain", emoji: "🏔️", meaning: "Núi" },
        { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
        { id: "lake", text: "lake", emoji: "🏞️", meaning: "Hồ" },
        { id: "forest", text: "forest", emoji: "🌲", meaning: "Rừng" },
        { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
        { id: "desert", text: "desert", emoji: "🏜️", meaning: "Sa mạc" },
        { id: "valley", text: "valley", emoji: "⛰️", meaning: "Thung lũng" },
        { id: "volcano", text: "volcano", emoji: "🌋", meaning: "Núi lửa" },
        { id: "island", text: "island", emoji: "🏝️", meaning: "Hòn đảo" },
        { id: "waterfall", text: "waterfall", emoji: "🌊", meaning: "Thác nước" },
        { id: "tree", text: "tree", emoji: "🌳", meaning: "Cây" },
        { id: "flower", text: "flower", emoji: "🌸", meaning: "Hoa" },
        { id: "rock", text: "rock", emoji: "🪨", meaning: "Đá" },
        { id: "sand", text: "sand", emoji: "🏖️", meaning: "Cát" },
        { id: "grass", text: "grass", emoji: "🌱", meaning: "Cỏ" },
        { id: "soil", text: "soil", emoji: "🟤", meaning: "Đất" },
        { id: "ice", text: "ice", emoji: "🧊", meaning: "Băng" },
        { id: "cave", text: "cave", emoji: "🦇", meaning: "Hang động" },
        { id: "field", text: "field", emoji: "🌾", meaning: "Cánh đồng" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "mountain", text: "mountain", emoji: "🏔️", meaning: "Núi" },
        { id: "volcano", text: "volcano", emoji: "🌋", meaning: "Núi lửa" },
        { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
        { id: "lake", text: "lake", emoji: "🏞️", meaning: "Hồ" },
      ],
      "What is the highest landform?",
      "mountain"
    )!,
    matching: {
      title: "Match nature and landforms",
      pairs: createMatchingPairs([
        { id: "mountain", text: "mountain", emoji: "🏔️", meaning: "Núi" },
        { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
        { id: "tree", text: "tree", emoji: "🌳", meaning: "Cây" },
        { id: "flower", text: "flower", emoji: "🌸", meaning: "Hoa" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "landforms",
        title: "Landforms (Week 1-2)",
        words: [
          { id: "mountain", text: "mountain", emoji: "🏔️", meaning: "Núi" },
          { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
          { id: "lake", text: "lake", emoji: "🏞️", meaning: "Hồ" },
          { id: "forest", text: "forest", emoji: "🌲", meaning: "Rừng" },
          { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
          { id: "desert", text: "desert", emoji: "🏜️", meaning: "Sa mạc" },
          { id: "valley", text: "valley", emoji: "⛰️", meaning: "Thung lũng" },
          { id: "volcano", text: "volcano", emoji: "🌋", meaning: "Núi lửa" },
          { id: "island", text: "island", emoji: "🏝️", meaning: "Hòn đảo" },
          { id: "waterfall", text: "waterfall", emoji: "🌊", meaning: "Thác nước" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "mountain", text: "mountain", emoji: "🏔️", meaning: "Núi" },
            { id: "volcano", text: "volcano", emoji: "🌋", meaning: "Núi lửa" },
            { id: "river", text: "river", emoji: "🌊", meaning: "Sông" },
            { id: "lake", text: "lake", emoji: "🏞️", meaning: "Hồ" },
          ],
          "What has fire inside?",
          "volcano"
        )!,
      },
      {
        id: "nature-elements",
        title: "Nature Elements (Week 3-4)",
        words: [
          { id: "tree", text: "tree", emoji: "🌳", meaning: "Cây" },
          { id: "flower", text: "flower", emoji: "🌸", meaning: "Hoa" },
          { id: "rock", text: "rock", emoji: "🪨", meaning: "Đá" },
          { id: "sand", text: "sand", emoji: "🏖️", meaning: "Cát" },
          { id: "grass", text: "grass", emoji: "🌱", meaning: "Cỏ" },
          { id: "soil", text: "soil", emoji: "🟤", meaning: "Đất" },
          { id: "ice", text: "ice", emoji: "🧊", meaning: "Băng" },
          { id: "cave", text: "cave", emoji: "🦇", meaning: "Hang động" },
          { id: "field", text: "field", emoji: "🌾", meaning: "Cánh đồng" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "tree", text: "tree", emoji: "🌳", meaning: "Cây" },
            { id: "flower", text: "flower", emoji: "🌸", meaning: "Hoa" },
            { id: "rock", text: "rock", emoji: "🪨", meaning: "Đá" },
            { id: "grass", text: "grass", emoji: "🌱", meaning: "Cỏ" },
          ],
          "What grows in the ground?",
          "tree"
        )!,
      },
    ],
  },

  // ========== PROJECT 14: SWEET SHOP OWNER ==========
  {
    slug: "sweet-shop-owner",
    name: "SWEET SHOP OWNER",
    unit: "Unit 14",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-pink-50 via-rose-50 to-fuchsia-50", // Màu hồng cho kẹo ngọt
    flashcards: {
      title: "Sweets & Desserts",
      autoAudio: true,
      words: [
        { id: "lollipop", text: "lollipop", emoji: "🍭", meaning: "Kẹo mút" },
        { id: "chocolate", text: "chocolate", emoji: "🍫", meaning: "Sô-cô-la" },
        { id: "cookie", text: "cookie", emoji: "🍪", meaning: "Bánh quy" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh kem" },
        { id: "cupcake", text: "cupcake", emoji: "🧁", meaning: "Bánh cupcake" },
        { id: "donut", text: "donut", emoji: "🍩", meaning: "Bánh vòng" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "candy", text: "candy", emoji: "🍬", meaning: "Kẹo" },
        { id: "jelly", text: "jelly", emoji: "🍮", meaning: "Thạch" },
        { id: "marshmallow", text: "marshmallow", emoji: "☁️", meaning: "Kẹo dẻo" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "chocolate", text: "chocolate", emoji: "🍫", meaning: "Sô-cô-la" },
        { id: "lollipop", text: "lollipop", emoji: "🍭", meaning: "Kẹo mút" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh kem" },
      ],
      "What is a sweet brown treat?",
      "chocolate"
    )!,
    matching: {
      title: "Match sweets",
      pairs: createMatchingPairs([
        { id: "lollipop", text: "lollipop", emoji: "🍭", meaning: "Kẹo mút" },
        { id: "chocolate", text: "chocolate", emoji: "🍫", meaning: "Sô-cô-la" },
        { id: "cookie", text: "cookie", emoji: "🍪", meaning: "Bánh quy" },
        { id: "cake", text: "cake", emoji: "🍰", meaning: "Bánh kem" },
        { id: "cupcake", text: "cupcake", emoji: "🧁", meaning: "Bánh cupcake" },
        { id: "donut", text: "donut", emoji: "🍩", meaning: "Bánh vòng" },
        { id: "ice-cream", text: "ice cream", emoji: "🍦", meaning: "Kem" },
        { id: "candy", text: "candy", emoji: "🍬", meaning: "Kẹo" },
        { id: "jelly", text: "jelly", emoji: "🍮", meaning: "Thạch" },
        { id: "marshmallow", text: "marshmallow", emoji: "☁️", meaning: "Kẹo dẻo" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 15: BACK TO SCHOOL ORGANIZER (Có 2 parts) ==========
  {
    slug: "back-to-school-organizer",
    name: "BACK TO SCHOOL ORGANIZER",
    unit: "Unit 15",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-indigo-50 via-purple-50 to-pink-50", // Màu tím cho trường học
    flashcards: {
      title: "School Supplies",
      autoAudio: true,
      words: [
        { id: "pencil", text: "pencil", emoji: "✏️", meaning: "Bút chì" },
        { id: "pen", text: "pen", emoji: "🖊️", meaning: "Bút mực" },
        { id: "book", text: "book", emoji: "📖", meaning: "Sách" },
        { id: "notebook", text: "notebook", emoji: "📓", meaning: "Tập vở" },
        { id: "crayon", text: "crayon", emoji: "🖍️", meaning: "Bút sáp" },
        { id: "ruler", text: "ruler", emoji: "📏", meaning: "Thước kẻ" },
        { id: "eraser", text: "eraser", emoji: "🧼", meaning: "Gôm/Tẩy" },
        { id: "school-bag", text: "school bag", emoji: "🎒", meaning: "Cặp sách" },
        { id: "marker", text: "marker", emoji: "🖍️", meaning: "Bút lông" },
        { id: "compass", text: "compass", emoji: "🧭", meaning: "Compa" },
        { id: "glue", text: "glue", emoji: "🧴", meaning: "Keo dán" },
        { id: "scissors", text: "scissors", emoji: "✂️", meaning: "Kéo" },
        { id: "clip", text: "clip", emoji: "📎", meaning: "Kẹp giấy" },
        { id: "folder", text: "folder", emoji: "📂", meaning: "Bìa hồ sơ" },
        { id: "board", text: "board", emoji: "📋", meaning: "Bảng" },
        { id: "backpack", text: "backpack", emoji: "🎒", meaning: "Ba lô" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "pencil", text: "pencil", emoji: "✏️", meaning: "Bút chì" },
        { id: "book", text: "book", emoji: "📖", meaning: "Sách" },
        { id: "ruler", text: "ruler", emoji: "📏", meaning: "Thước kẻ" },
        { id: "eraser", text: "eraser", emoji: "🧼", meaning: "Gôm/Tẩy" },
      ],
      "What do we use to write?",
      "pencil"
    )!,
    matching: {
      title: "Match school supplies",
      pairs: createMatchingPairs([
        { id: "pencil", text: "pencil", emoji: "✏️", meaning: "Bút chì" },
        { id: "book", text: "book", emoji: "📖", meaning: "Sách" },
        { id: "ruler", text: "ruler", emoji: "📏", meaning: "Thước kẻ" },
        { id: "eraser", text: "eraser", emoji: "🧼", meaning: "Gôm/Tẩy" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "basic-school-things",
        title: "Basic School Things (Week 1-2)",
        words: [
          { id: "pencil", text: "pencil", emoji: "✏️", meaning: "Bút chì" },
          { id: "pen", text: "pen", emoji: "🖊️", meaning: "Bút mực" },
          { id: "book", text: "book", emoji: "📖", meaning: "Sách" },
          { id: "notebook", text: "notebook", emoji: "📓", meaning: "Tập vở" },
          { id: "crayon", text: "crayon", emoji: "🖍️", meaning: "Bút sáp" },
          { id: "ruler", text: "ruler", emoji: "📏", meaning: "Thước kẻ" },
          { id: "eraser", text: "eraser", emoji: "🧼", meaning: "Gôm/Tẩy" },
          { id: "school-bag", text: "school bag", emoji: "🎒", meaning: "Cặp sách" },
          { id: "marker", text: "marker", emoji: "🖍️", meaning: "Bút lông" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "pencil", text: "pencil", emoji: "✏️", meaning: "Bút chì" },
            { id: "book", text: "book", emoji: "📖", meaning: "Sách" },
            { id: "ruler", text: "ruler", emoji: "📏", meaning: "Thước kẻ" },
            { id: "eraser", text: "eraser", emoji: "🧼", meaning: "Gôm/Tẩy" },
          ],
          "What do we use to draw?",
          "crayon"
        )!,
      },
      {
        id: "extra-tools",
        title: "Extra Tools (Week 3-4)",
        words: [
          { id: "compass", text: "compass", emoji: "🧭", meaning: "Compa" },
          { id: "glue", text: "glue", emoji: "🧴", meaning: "Keo dán" },
          { id: "scissors", text: "scissors", emoji: "✂️", meaning: "Kéo" },
          { id: "clip", text: "clip", emoji: "📎", meaning: "Kẹp giấy" },
          { id: "folder", text: "folder", emoji: "📂", meaning: "Bìa hồ sơ" },
          { id: "board", text: "board", emoji: "📋", meaning: "Bảng" },
          { id: "backpack", text: "backpack", emoji: "🎒", meaning: "Ba lô" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "scissors", text: "scissors", emoji: "✂️", meaning: "Kéo" },
            { id: "glue", text: "glue", emoji: "🧴", meaning: "Keo dán" },
            { id: "compass", text: "compass", emoji: "🧭", meaning: "Compa" },
            { id: "clip", text: "clip", emoji: "📎", meaning: "Kẹp giấy" },
          ],
          "What do we use to cut paper?",
          "scissors"
        )!,
      },
    ],
  },

  // ========== PROJECT 16: MID-AUTUMN FESTIVAL PLANNER ==========
  {
    slug: "mid-autumn-festival-planner",
    name: "MID-AUTUMN FESTIVAL PLANNER",
    unit: "Unit 16",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-yellow-50 via-amber-50 to-orange-50", // Màu vàng cam cho Trung Thu
    flashcards: {
      title: "Mid-Autumn Festival",
      autoAudio: true,
      words: [
        { id: "moon", text: "moon", emoji: "🌕", meaning: "Mặt trăng" },
        { id: "mooncake", text: "mooncake", emoji: "🥮", meaning: "Bánh trung thu" },
        { id: "lantern", text: "lantern", emoji: "🏮", meaning: "Đèn lồng" },
        { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ ngọc" },
        { id: "star", text: "star", emoji: "⭐", meaning: "Ngôi sao" },
        { id: "mask", text: "mask", emoji: "🎭", meaning: "Mặt nạ" },
        { id: "banyan-tree", text: "banyan tree", emoji: "🌳", meaning: "Cây đa" },
        { id: "festival", text: "festival", emoji: "🎉", meaning: "Lễ hội" },
        { id: "drum", text: "drum", emoji: "🥁", meaning: "Trống" },
        { id: "parade", text: "parade", emoji: "🎊", meaning: "Diễu hành" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "mooncake", text: "mooncake", emoji: "🥮", meaning: "Bánh trung thu" },
        { id: "lantern", text: "lantern", emoji: "🏮", meaning: "Đèn lồng" },
        { id: "moon", text: "moon", emoji: "🌕", meaning: "Mặt trăng" },
        { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ ngọc" },
      ],
      "What do we eat during Mid-Autumn Festival?",
      "mooncake"
    )!,
    matching: {
      title: "Match Mid-Autumn Festival words",
      pairs: createMatchingPairs([
        { id: "moon", text: "moon", emoji: "🌕", meaning: "Mặt trăng" },
        { id: "mooncake", text: "mooncake", emoji: "🥮", meaning: "Bánh trung thu" },
        { id: "lantern", text: "lantern", emoji: "🏮", meaning: "Đèn lồng" },
        { id: "rabbit", text: "rabbit", emoji: "🐇", meaning: "Thỏ ngọc" },
        { id: "star", text: "star", emoji: "⭐", meaning: "Ngôi sao" },
        { id: "mask", text: "mask", emoji: "🎭", meaning: "Mặt nạ" },
        { id: "banyan-tree", text: "banyan tree", emoji: "🌳", meaning: "Cây đa" },
        { id: "festival", text: "festival", emoji: "🎉", meaning: "Lễ hội" },
        { id: "drum", text: "drum", emoji: "🥁", meaning: "Trống" },
        { id: "parade", text: "parade", emoji: "🎊", meaning: "Diễu hành" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
  },

  // ========== PROJECT 17: MY BODY BOOK (Có 3 parts) ==========
  {
    slug: "my-body-book",
    name: "MY BODY BOOK",
    unit: "Unit 17",
    bookname: "GIAI ĐOẠN 5: Mùa Hè - Biển & Thiên nhiên",
    backgroundColor: "from-rose-50 via-pink-50 to-purple-50", // Màu hồng tím cho cơ thể
    flashcards: {
      title: "Body & Senses",
      autoAudio: true,
      words: [
        { id: "head", text: "head", emoji: "🗣️", meaning: "Đầu" },
        { id: "eyes", text: "eyes", emoji: "👀", meaning: "Mắt" },
        { id: "ears", text: "ears", emoji: "👂", meaning: "Tai" },
        { id: "nose", text: "nose", emoji: "👃", meaning: "Mũi" },
        { id: "mouth", text: "mouth", emoji: "👄", meaning: "Miệng" },
        { id: "arms", text: "arms", emoji: "💪", meaning: "Cánh tay" },
        { id: "hands", text: "hands", emoji: "✋", meaning: "Bàn tay" },
        { id: "legs", text: "legs", emoji: "🦵", meaning: "Chân" },
        { id: "feet", text: "feet", emoji: "🦶", meaning: "Bàn chân" },
        { id: "fingers", text: "fingers", emoji: "🖐️", meaning: "Ngón tay" },
        { id: "see", text: "see", emoji: "👀", meaning: "Nhìn" },
        { id: "hear", text: "hear", emoji: "👂", meaning: "Nghe" },
        { id: "smell", text: "smell", emoji: "👃", meaning: "Ngửi" },
        { id: "taste", text: "taste", emoji: "👅", meaning: "Nếm" },
        { id: "touch", text: "touch", emoji: "✋", meaning: "Chạm" },
        { id: "t-shirt", text: "t-shirt", emoji: "👕", meaning: "Áo thun" },
        { id: "pants", text: "pants", emoji: "👖", meaning: "Quần dài" },
        { id: "dress", text: "dress", emoji: "👗", meaning: "Váy" },
        { id: "shoes", text: "shoes", emoji: "👟", meaning: "Giày" },
        { id: "cap", text: "cap", emoji: "🧢", meaning: "Nón lưỡi trai" },
        { id: "jacket", text: "jacket", emoji: "🧥", meaning: "Áo khoác" },
        { id: "shorts", text: "shorts", emoji: "🩳", meaning: "Quần ngắn" },
        { id: "scarf", text: "scarf", emoji: "🧣", meaning: "Khăn quàng" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "head", text: "head", emoji: "🗣️", meaning: "Đầu" },
        { id: "eyes", text: "eyes", emoji: "👀", meaning: "Mắt" },
        { id: "hands", text: "hands", emoji: "✋", meaning: "Bàn tay" },
        { id: "feet", text: "feet", emoji: "🦶", meaning: "Bàn chân" },
      ],
      "What do we use to see?",
      "eyes"
    )!,
    matching: {
      title: "Match body parts and clothes",
      pairs: createMatchingPairs([
        { id: "head", text: "head", emoji: "🗣️", meaning: "Đầu" },
        { id: "eyes", text: "eyes", emoji: "👀", meaning: "Mắt" },
        { id: "t-shirt", text: "t-shirt", emoji: "👕", meaning: "Áo thun" },
        { id: "shoes", text: "shoes", emoji: "👟", meaning: "Giày" },
      ]),
    },
    enabledGames: ["matching", "flip", "speak"],
    parts: [
      {
        id: "body-parts",
        title: "Body Parts (Week 1-2)",
        words: [
          { id: "head", text: "head", emoji: "🗣️", meaning: "Đầu" },
          { id: "eyes", text: "eyes", emoji: "👀", meaning: "Mắt" },
          { id: "ears", text: "ears", emoji: "👂", meaning: "Tai" },
          { id: "nose", text: "nose", emoji: "👃", meaning: "Mũi" },
          { id: "mouth", text: "mouth", emoji: "👄", meaning: "Miệng" },
          { id: "arms", text: "arms", emoji: "💪", meaning: "Cánh tay" },
          { id: "hands", text: "hands", emoji: "✋", meaning: "Bàn tay" },
          { id: "legs", text: "legs", emoji: "🦵", meaning: "Chân" },
          { id: "feet", text: "feet", emoji: "🦶", meaning: "Bàn chân" },
          { id: "fingers", text: "fingers", emoji: "🖐️", meaning: "Ngón tay" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "head", text: "head", emoji: "🗣️", meaning: "Đầu" },
            { id: "eyes", text: "eyes", emoji: "👀", meaning: "Mắt" },
            { id: "hands", text: "hands", emoji: "✋", meaning: "Bàn tay" },
            { id: "feet", text: "feet", emoji: "🦶", meaning: "Bàn chân" },
          ],
          "What is on top of our body?",
          "head"
        )!,
      },
      {
        id: "five-senses",
        title: "Five Senses (Week 3-4)",
        words: [
          { id: "see", text: "see", emoji: "👀", meaning: "Nhìn" },
          { id: "hear", text: "hear", emoji: "👂", meaning: "Nghe" },
          { id: "smell", text: "smell", emoji: "👃", meaning: "Ngửi" },
          { id: "taste", text: "taste", emoji: "👅", meaning: "Nếm" },
          { id: "touch", text: "touch", emoji: "✋", meaning: "Chạm" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "see", text: "see", emoji: "👀", meaning: "Nhìn" },
            { id: "hear", text: "hear", emoji: "👂", meaning: "Nghe" },
            { id: "smell", text: "smell", emoji: "👃", meaning: "Ngửi" },
            { id: "taste", text: "taste", emoji: "👅", meaning: "Nếm" },
          ],
          "What do we do with our eyes?",
          "see"
        )!,
      },
      {
        id: "clothes",
        title: "Clothes (Week 5-6)",
        words: [
          { id: "t-shirt", text: "t-shirt", emoji: "👕", meaning: "Áo thun" },
          { id: "pants", text: "pants", emoji: "👖", meaning: "Quần dài" },
          { id: "dress", text: "dress", emoji: "👗", meaning: "Váy" },
          { id: "shoes", text: "shoes", emoji: "👟", meaning: "Giày" },
          { id: "cap", text: "cap", emoji: "🧢", meaning: "Nón lưỡi trai" },
          { id: "jacket", text: "jacket", emoji: "🧥", meaning: "Áo khoác" },
          { id: "shorts", text: "shorts", emoji: "🩳", meaning: "Quần ngắn" },
          { id: "scarf", text: "scarf", emoji: "🧣", meaning: "Khăn quàng" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: createQuiz(
          [
            { id: "t-shirt", text: "t-shirt", emoji: "👕", meaning: "Áo thun" },
            { id: "pants", text: "pants", emoji: "👖", meaning: "Quần dài" },
            { id: "shoes", text: "shoes", emoji: "👟", meaning: "Giày" },
            { id: "cap", text: "cap", emoji: "🧢", meaning: "Nón lưỡi trai" },
          ],
          "What do we wear on our feet?",
          "shoes"
        )!,
      },
    ],
  },
];

/**
 * Tự động generate danh sách projects từ BOOK_CONFIG
 */
export function getProjectsFromBook() {
  return BOOK_CONFIG.map((unit, index) => ({
    id: unit.slug,
    name: unit.name, // Dùng tên thực tế của project thay vì "Project 1", "Project 2"...
    unitSlug: unit.slug,
  }));
}

/**
 * Lấy unit theo slug
 */
export function getUnitBySlug(slug: string): UnitGameConfig | undefined {
  return BOOK_CONFIG.find((unit) => unit.slug === slug);
}

