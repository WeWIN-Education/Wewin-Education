import type { UnitGameConfig, WordItem } from "@/types/games";

/**
 * Cấu trúc định nghĩa cuốn sách Mover Book
 * Sử dụng cấu trúc game xoay vòng: 3 game cố định + 1 game xoay vòng
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

// ============================================
// UNIT 1 – At the park - Từ vựng
// ============================================

// 1️⃣ Verbs – Động từ
const VERBS: WordItem[] = [
  { id: "hop", text: "hop", emoji: "🦘", meaning: "Nhảy lò cò" },
  { id: "skip", text: "skip", emoji: "⏭️", meaning: "Nhảy dây" },
  { id: "walk", text: "walk", emoji: "🚶", meaning: "Đi bộ" },
  { id: "climb", text: "climb", emoji: "🧗", meaning: "Leo trèo" },
  { id: "laugh", text: "laugh", emoji: "😂", meaning: "Cười" },
  { id: "skate", text: "skate", emoji: "⛸️", meaning: "Trượt băng" },
  { id: "dance", text: "dance", emoji: "💃", meaning: "Nhảy múa" },
  { id: "cry", text: "cry", emoji: "😢", meaning: "Khóc" },
  { id: "fish", text: "fish", emoji: "🎣", meaning: "Câu cá" },
  { id: "hide", text: "hide", emoji: "🙈", meaning: "Trốn" },
];

// 2️⃣ Colours – Màu sắc
const COLOURS: WordItem[] = [
  { id: "orange", text: "orange", emoji: "🟠", meaning: "Màu cam" },
  { id: "pink", text: "pink", emoji: "🩷", meaning: "Màu hồng" },
  { id: "yellow", text: "yellow", emoji: "🟡", meaning: "Màu vàng" },
  { id: "black", text: "black", emoji: "⚫", meaning: "Màu đen" },
  { id: "green", text: "green", emoji: "🟢", meaning: "Màu xanh lá" },
  { id: "purple", text: "purple", emoji: "🟣", meaning: "Màu tím" },
  { id: "brown", text: "brown", emoji: "🟤", meaning: "Màu nâu" },
  { id: "blue", text: "blue", emoji: "🔵", meaning: "Màu xanh dương" },
  { id: "red", text: "red", emoji: "🔴", meaning: "Màu đỏ" },
  { id: "grey", text: "grey", emoji: "⚪", meaning: "Màu xám" },
];

// 3️⃣ Clothes – Quần áo
const CLOTHES: WordItem[] = [
  { id: "coat", text: "coat", emoji: "🧥", meaning: "Áo khoác" },
  { id: "sweater", text: "sweater", emoji: "🧶", meaning: "Áo len" },
  { id: "scarf", text: "scarf", emoji: "🧣", meaning: "Khăn quàng" },
  { id: "socks", text: "pair of socks", emoji: "🧦", meaning: "Đôi tất" },
  { id: "trousers", text: "pair of trousers", emoji: "👖", meaning: "Đôi quần dài" },
  { id: "shoes", text: "pair of shoes", emoji: "👟", meaning: "Đôi giày" },
  { id: "tshirt", text: "T-shirt", emoji: "👕", meaning: "Áo thun" },
  { id: "glasses", text: "pair of glasses", emoji: "👓", meaning: "Kính mắt" },
  { id: "swimsuit", text: "swimsuit", emoji: "🩱", meaning: "Đồ bơi" },
  { id: "jacket", text: "jacket", emoji: "🧥", meaning: "Áo khoác" },
];

// 4️⃣ Extra vocabulary
const EXTRA: WordItem[] = [
  { id: "tennis", text: "tennis", emoji: "🎾", meaning: "Quần vợt" },
  { id: "drawing", text: "drawing", emoji: "🎨", meaning: "Vẽ" },
  { id: "basketball", text: "basketball", emoji: "🏀", meaning: "Bóng rổ" },
];

// 5️⃣ Opposites
const OPPOSITES: WordItem[] = [
  { id: "young", text: "young", emoji: "👶", meaning: "Trẻ" },
  { id: "old", text: "old", emoji: "👴", meaning: "Già" },
  { id: "big", text: "big", emoji: "🐘", meaning: "Lớn" },
  { id: "small", text: "small", emoji: "🐭", meaning: "Nhỏ" },
  { id: "long", text: "long", emoji: "📏", meaning: "Dài" },
  { id: "short", text: "short", emoji: "📐", meaning: "Ngắn" },
  { id: "tall", text: "tall", emoji: "🌳", meaning: "Cao" },
];

// 6️⃣ Comparative / Superlative
const COMPARATIVES: WordItem[] = [
  { id: "bigger", text: "bigger", emoji: "📈", meaning: "Lớn hơn" },
  { id: "smaller", text: "smaller", emoji: "📉", meaning: "Nhỏ hơn" },
  { id: "taller", text: "taller", emoji: "📏", meaning: "Cao hơn" },
  { id: "shorter", text: "shorter", emoji: "📐", meaning: "Ngắn hơn" },
  { id: "oldest", text: "oldest", emoji: "👴", meaning: "Già nhất" },
  { id: "youngest", text: "youngest", emoji: "👶", meaning: "Trẻ nhất" },
  { id: "tallest", text: "tallest", emoji: "🌳", meaning: "Cao nhất" },
  { id: "shortest", text: "shortest", emoji: "📐", meaning: "Ngắn nhất" },
];

// Chia thành 2 phần để giảm số từ mỗi phần
// Part 1: Verbs + Colours + Clothes (30 từ)
const UNIT1_PART1_WORDS: WordItem[] = [
  ...VERBS,
  ...COLOURS,
  ...CLOTHES,
];

// Part 2: Extra + Opposites + Comparatives (18 từ)
const UNIT1_PART2_WORDS: WordItem[] = [
  ...EXTRA,
  ...OPPOSITES,
  ...COMPARATIVES,
];

// ============================================
// UNIT 2 – Weekly activities & Preferences - Từ vựng
// ============================================

// 1️⃣ Actions / Weekly activities
const ACTIONS: WordItem[] = [
  { id: "ride", text: "ride", emoji: "🚴", meaning: "Đi xe đạp" },
  { id: "do_homework", text: "do homework", emoji: "📝", meaning: "Làm bài tập về nhà" },
  { id: "watch_film", text: "watch a film", emoji: "🎬", meaning: "Xem phim" },
  { id: "walk", text: "walk", emoji: "🚶", meaning: "Đi bộ" },
  { id: "look_website", text: "look at a website", emoji: "💻", meaning: "Xem trang web" },
  { id: "go_shopping", text: "go shopping", emoji: "🛒", meaning: "Đi mua sắm" },
  { id: "go_swim", text: "go for a swim", emoji: "🏊", meaning: "Đi bơi" },
  { id: "go_walk", text: "go for a walk", emoji: "🚶", meaning: "Đi dạo" },
  { id: "go_run", text: "go for a run", emoji: "🏃", meaning: "Chạy bộ" },
  { id: "go_bike", text: "go on your bike", emoji: "🚲", meaning: "Đi xe đạp" },
  { id: "watch_tv", text: "watch TV", emoji: "📺", meaning: "Xem TV" },
  { id: "listen_music", text: "listen to music", emoji: "🎵", meaning: "Nghe nhạc" },
  { id: "look_internet", text: "look at the internet", emoji: "🌐", meaning: "Xem internet" },
];

// 2️⃣ Transport / Objects
const TRANSPORT_OBJECTS: WordItem[] = [
  { id: "cd", text: "CD", emoji: "💿", meaning: "Đĩa CD" },
  { id: "film", text: "film", emoji: "🎞️", meaning: "Phim" },
  { id: "dvd", text: "DVD", emoji: "📀", meaning: "Đĩa DVD" },
  { id: "website", text: "website", emoji: "🌐", meaning: "Trang web" },
  { id: "music", text: "music", emoji: "🎵", meaning: "Âm nhạc" },
];

// 3️⃣ Verbs
const VERBS_UNIT2: WordItem[] = [
  { id: "email", text: "email", emoji: "📧", meaning: "Gửi email" },
  { id: "sail", text: "sail", emoji: "⛵", meaning: "Chèo thuyền" },
  { id: "text", text: "text", emoji: "💬", meaning: "Nhắn tin" },
  { id: "cook", text: "cook", emoji: "👨‍🍳", meaning: "Nấu ăn" },
  { id: "wash", text: "wash", emoji: "🧼", meaning: "Rửa" },
  { id: "call", text: "call", emoji: "📞", meaning: "Gọi điện" },
];

// 4️⃣ Days of the week
const DAYS: WordItem[] = [
  { id: "monday", text: "Monday", emoji: "📅", meaning: "Thứ Hai" },
  { id: "tuesday", text: "Tuesday", emoji: "📅", meaning: "Thứ Ba" },
  { id: "wednesday", text: "Wednesday", emoji: "📅", meaning: "Thứ Tư" },
  { id: "thursday", text: "Thursday", emoji: "📅", meaning: "Thứ Năm" },
  { id: "friday", text: "Friday", emoji: "📅", meaning: "Thứ Sáu" },
  { id: "saturday", text: "Saturday", emoji: "📅", meaning: "Thứ Bảy" },
  { id: "sunday", text: "Sunday", emoji: "📅", meaning: "Chủ Nhật" },
];

// 5️⃣ Adverbs of frequency
const ADVERBS: WordItem[] = [
  { id: "never", text: "never", emoji: "❌", meaning: "Không bao giờ" },
  { id: "sometimes", text: "sometimes", emoji: "🔄", meaning: "Thỉnh thoảng" },
  { id: "often", text: "often", emoji: "✅", meaning: "Thường xuyên" },
  { id: "always", text: "always", emoji: "⭐", meaning: "Luôn luôn" },
];

// 6️⃣ Personality / Preferences vocabulary
const PREFERENCES: WordItem[] = [
  { id: "brown", text: "brown", emoji: "🟤", meaning: "Màu nâu" },
  { id: "blue", text: "blue", emoji: "🔵", meaning: "Màu xanh dương" },
  { id: "like", text: "like", emoji: "❤️", meaning: "Thích" },
  { id: "sport", text: "sport", emoji: "⚽", meaning: "Thể thao" },
  { id: "tennis", text: "tennis", emoji: "🎾", meaning: "Quần vợt" },
  { id: "football", text: "football", emoji: "⚽", meaning: "Bóng đá" },
  { id: "baseball", text: "baseball", emoji: "⚾", meaning: "Bóng chày" },
  { id: "swimming", text: "swimming", emoji: "🏊", meaning: "Bơi lội" },
  { id: "running", text: "running", emoji: "🏃", meaning: "Chạy bộ" },
];

// Chia thành 3 phần để hợp lý
// Part 1: Actions + Transport/Objects (18 từ)
const UNIT2_PART1_WORDS: WordItem[] = [
  ...ACTIONS,
  ...TRANSPORT_OBJECTS,
];

// Part 2: Verbs + Days (13 từ)
const UNIT2_PART2_WORDS: WordItem[] = [
  ...VERBS_UNIT2,
  ...DAYS,
];

// Part 3: Adverbs + Preferences (13 từ)
const UNIT2_PART3_WORDS: WordItem[] = [
  ...ADVERBS,
  ...PREFERENCES,
];

// ============================================
// UNIT 4 – My home
// ============================================
const U4_ROOMS: WordItem[] = [
  { id: "living_room", text: "living room", emoji: "🛋️", meaning: "Phòng khách" },
  { id: "dining_room", text: "dining room", emoji: "🍽️", meaning: "Phòng ăn" },
  { id: "bathroom", text: "bathroom", emoji: "🛁", meaning: "Phòng tắm" },
  { id: "bedroom", text: "bedroom", emoji: "🛏️", meaning: "Phòng ngủ" },
  { id: "kitchen", text: "kitchen", emoji: "🍳", meaning: "Nhà bếp" },
  { id: "garden", text: "garden", emoji: "🌳", meaning: "Vườn" },
  { id: "garage", text: "garage", emoji: "🚗", meaning: "Ga-ra" },
  { id: "hall", text: "hall", emoji: "🚪", meaning: "Hành lang" },
  { id: "stairs", text: "stairs", emoji: "🪜", meaning: "Cầu thang" },
];
const U4_FURNITURE: WordItem[] = [
  { id: "sofa", text: "sofa", emoji: "🛋️", meaning: "Ghế sofa" },
  { id: "chair", text: "chair", emoji: "🪑", meaning: "Ghế" },
  { id: "table", text: "table", emoji: "🪑", meaning: "Bàn" },
  { id: "cupboard", text: "cupboard", emoji: "🗄️", meaning: "Tủ chén" },
  { id: "fridge", text: "fridge", emoji: "🧊", meaning: "Tủ lạnh" },
  { id: "bed", text: "bed", emoji: "🛏️", meaning: "Giường" },
  { id: "lamp", text: "lamp", emoji: "💡", meaning: "Đèn" },
  { id: "tv", text: "television / TV", emoji: "📺", meaning: "Tivi" },
  { id: "mirror", text: "mirror", emoji: "🪞", meaning: "Gương" },
  { id: "carpet", text: "carpet", emoji: "🧶", meaning: "Thảm" },
  { id: "telephone", text: "telephone", emoji: "📞", meaning: "Điện thoại" },
];
const U4_CHORES: WordItem[] = [
  { id: "wash_home", text: "wash", emoji: "🧼", meaning: "Rửa" },
  { id: "clean", text: "clean", emoji: "🧹", meaning: "Dọn dẹp" },
  { id: "cook_home", text: "cook", emoji: "👩‍🍳", meaning: "Nấu ăn" },
  { id: "sweep", text: "sweep", emoji: "🧹", meaning: "Quét" },
  { id: "make_bed", text: "make the bed", emoji: "🛏️", meaning: "Dọn giường" },
  { id: "tidy", text: "tidy", emoji: "🗂️", meaning: "Gọn gàng" },
];
const UNIT4_PART1 = U4_ROOMS;
const UNIT4_PART2 = U4_FURNITURE;
const UNIT4_PART3 = U4_CHORES;
const UNIT4_ALL = [...UNIT4_PART1, ...UNIT4_PART2, ...UNIT4_PART3];

// ============================================
// UNIT 5 – Let’s go on holiday!
// ============================================
const U5_PLACES: WordItem[] = [
  { id: "beach", text: "beach", emoji: "🏖️", meaning: "Bãi biển" },
  { id: "sea", text: "sea", emoji: "🌊", meaning: "Biển" },
  { id: "hotel", text: "hotel", emoji: "🏨", meaning: "Khách sạn" },
  { id: "mountains", text: "mountains", emoji: "⛰️", meaning: "Núi" },
  { id: "forest_holiday", text: "forest", emoji: "🌲", meaning: "Rừng" },
  { id: "tent", text: "tent", emoji: "⛺", meaning: "Lều" },
  { id: "campsite", text: "campsite", emoji: "🏕️", meaning: "Khu cắm trại" },
  { id: "suitcase", text: "suitcase", emoji: "🧳", meaning: "Vali" },
  { id: "map", text: "map", emoji: "🗺️", meaning: "Bản đồ" },
];
const U5_TRANSPORT: WordItem[] = [
  { id: "plane", text: "plane", emoji: "✈️", meaning: "Máy bay" },
  { id: "train", text: "train", emoji: "🚆", meaning: "Tàu hỏa" },
  { id: "bus_transport", text: "bus", emoji: "🚌", meaning: "Xe buýt" },
  { id: "car_transport", text: "car", emoji: "🚗", meaning: "Xe hơi" },
  { id: "boat", text: "boat", emoji: "⛵", meaning: "Thuyền" },
];
const U5_ACTIVITIES: WordItem[] = [
  { id: "swim_holiday", text: "swim", emoji: "🏊", meaning: "Bơi" },
  { id: "sunbathe", text: "sunbathe", emoji: "☀️", meaning: "Tắm nắng" },
  { id: "take_photos", text: "take photos", emoji: "📸", meaning: "Chụp ảnh" },
  { id: "climb_holiday", text: "climb", emoji: "🧗", meaning: "Leo núi" },
  { id: "camp", text: "camp", emoji: "🏕️", meaning: "Cắm trại" },
  { id: "eat_icecream", text: "eat ice cream", emoji: "🍦", meaning: "Ăn kem" },
  { id: "play_beach", text: "play on the beach", emoji: "🏖️", meaning: "Chơi ở bãi biển" },
];
const UNIT5_PART1 = U5_PLACES;
const UNIT5_PART2 = U5_TRANSPORT;
const UNIT5_PART3 = U5_ACTIVITIES;
const UNIT5_ALL = [...UNIT5_PART1, ...UNIT5_PART2, ...UNIT5_PART3];

// ============================================
// UNIT 6 – My favourite book
// ============================================
const U6_BOOK: WordItem[] = [
  { id: "story", text: "story", emoji: "📖", meaning: "Câu chuyện" },
  { id: "chapter", text: "chapter", emoji: "📘", meaning: "Chương" },
  { id: "page", text: "page", emoji: "📄", meaning: "Trang" },
  { id: "writer", text: "writer / author", emoji: "✍️", meaning: "Tác giả" },
  { id: "pictures", text: "pictures", emoji: "🖼️", meaning: "Tranh" },
  { id: "title", text: "title", emoji: "🏷️", meaning: "Tiêu đề" },
  { id: "bookshop", text: "bookshop", emoji: "🏪", meaning: "Hiệu sách" },
];
const U6_CHARACTERS: WordItem[] = [
  { id: "princess", text: "princess", emoji: "👸", meaning: "Công chúa" },
  { id: "king", text: "king", emoji: "🤴", meaning: "Nhà vua" },
  { id: "queen", text: "queen", emoji: "👑", meaning: "Nữ hoàng" },
  { id: "dragon", text: "dragon", emoji: "🐉", meaning: "Rồng" },
  { id: "knight", text: "knight", emoji: "🛡️", meaning: "Hiệp sĩ" },
  { id: "monster", text: "monster", emoji: "👾", meaning: "Quái vật" },
];
const U6_ACTIONS: WordItem[] = [
  { id: "read_book", text: "read", emoji: "📖", meaning: "Đọc" },
  { id: "open_book", text: "open", emoji: "📂", meaning: "Mở" },
  { id: "close_book", text: "close", emoji: "🔒", meaning: "Đóng" },
  { id: "imagine", text: "imagine", emoji: "🤔", meaning: "Tưởng tượng" },
  { id: "draw", text: "draw", emoji: "✏️", meaning: "Vẽ" },
  { id: "write", text: "write", emoji: "✍️", meaning: "Viết" },
];
const UNIT6_PART1 = U6_BOOK;
const UNIT6_PART2 = U6_CHARACTERS;
const UNIT6_PART3 = U6_ACTIONS;
const UNIT6_ALL = [...UNIT6_PART1, ...UNIT6_PART2, ...UNIT6_PART3];

// ============================================
// UNIT 7 – This is my family
// ============================================
const U7_FAMILY: WordItem[] = [
  { id: "mum", text: "mum", emoji: "👩", meaning: "Mẹ" },
  { id: "dad", text: "dad", emoji: "👨", meaning: "Bố" },
  { id: "brother", text: "brother", emoji: "👦", meaning: "Anh/em trai" },
  { id: "sister", text: "sister", emoji: "👧", meaning: "Chị/em gái" },
  { id: "baby", text: "baby", emoji: "👶", meaning: "Em bé" },
  { id: "grandparents", text: "grandparents", emoji: "👵🧓", meaning: "Ông bà" },
  { id: "grandad", text: "grandad / grandfather", emoji: "👴", meaning: "Ông" },
  { id: "grandma", text: "grandma / grandmother", emoji: "👵", meaning: "Bà" },
  { id: "cousin", text: "cousin", emoji: "🧑", meaning: "Anh/chị/em họ" },
  { id: "uncle", text: "uncle", emoji: "🧔", meaning: "Chú/cậu/bác" },
  { id: "aunt", text: "aunt", emoji: "👩‍🦰", meaning: "Cô/dì/bác" },
];
const U7_DESCRIPTIONS: WordItem[] = [
  { id: "tall_family", text: "tall", emoji: "📏", meaning: "Cao" },
  { id: "short_family", text: "short", emoji: "📐", meaning: "Thấp" },
  { id: "young_family", text: "young", emoji: "🧒", meaning: "Trẻ" },
  { id: "old_family", text: "old", emoji: "👴", meaning: "Già" },
  { id: "strong_family", text: "strong", emoji: "💪", meaning: "Khỏe" },
  { id: "funny", text: "funny", emoji: "😆", meaning: "Vui tính" },
  { id: "kind", text: "kind", emoji: "🤝", meaning: "Tốt bụng" },
];
const U7_ACTIONS: WordItem[] = [
  { id: "carry", text: "carry", emoji: "🧳", meaning: "Mang vác" },
  { id: "help", text: "help", emoji: "🤝", meaning: "Giúp đỡ" },
  { id: "cook_family", text: "cook", emoji: "👩‍🍳", meaning: "Nấu ăn" },
  { id: "play_family", text: "play", emoji: "🎲", meaning: "Chơi" },
  { id: "run_family", text: "run", emoji: "🏃", meaning: "Chạy" },
];
const UNIT7_PART1 = U7_FAMILY;
const UNIT7_PART2 = U7_DESCRIPTIONS;
const UNIT7_PART3 = U7_ACTIONS;
const UNIT7_ALL = [...UNIT7_PART1, ...UNIT7_PART2, ...UNIT7_PART3];

// ============================================
// UNIT 8 – What’s for lunch?
// ============================================
const U8_FOOD: WordItem[] = [
  { id: "chicken", text: "chicken", emoji: "🍗", meaning: "Gà" },
  { id: "fish_food", text: "fish", emoji: "🐟", meaning: "Cá" },
  { id: "beef", text: "beef", emoji: "🥩", meaning: "Thịt bò" },
  { id: "vegetables", text: "vegetables", emoji: "🥕", meaning: "Rau" },
  { id: "salad", text: "salad", emoji: "🥗", meaning: "Salad" },
  { id: "fruit_food", text: "fruit", emoji: "🍎", meaning: "Trái cây" },
  { id: "apple_food", text: "apple", emoji: "🍎", meaning: "Táo" },
  { id: "orange_food", text: "orange", emoji: "🍊", meaning: "Cam" },
  { id: "banana", text: "banana", emoji: "🍌", meaning: "Chuối" },
  { id: "potato", text: "potato", emoji: "🥔", meaning: "Khoai tây" },
  { id: "tomato", text: "tomato", emoji: "🍅", meaning: "Cà chua" },
  { id: "sandwich", text: "sandwich", emoji: "🥪", meaning: "Bánh mì kẹp" },
  { id: "soup", text: "soup", emoji: "🍲", meaning: "Súp" },
];
const U8_DRINKS: WordItem[] = [
  { id: "water", text: "water", emoji: "💧", meaning: "Nước" },
  { id: "milk", text: "milk", emoji: "🥛", meaning: "Sữa" },
  { id: "juice", text: "juice", emoji: "🧃", meaning: "Nước ép" },
];
const U8_COOK: WordItem[] = [
  { id: "cut", text: "cut", emoji: "🔪", meaning: "Cắt" },
  { id: "mix", text: "mix", emoji: "🥣", meaning: "Trộn" },
  { id: "cook_lunch", text: "cook", emoji: "👩‍🍳", meaning: "Nấu" },
  { id: "wash_food", text: "wash", emoji: "🧼", meaning: "Rửa" },
  { id: "peel", text: "peel", emoji: "🪒", meaning: "Gọt" },
  { id: "chop", text: "chop", emoji: "🔪", meaning: "Băm" },
];
const UNIT8_PART1 = U8_FOOD;
const UNIT8_PART2 = [...U8_DRINKS];
const UNIT8_PART3 = U8_COOK;
const UNIT8_ALL = [...UNIT8_PART1, ...UNIT8_PART2, ...UNIT8_PART3];

// ============================================
// UNIT 9 – Do you like animals?
// ============================================
const U9_ANIMALS: WordItem[] = [
  { id: "dog", text: "dog", emoji: "🐶", meaning: "Chó" },
  { id: "cat", text: "cat", emoji: "🐱", meaning: "Mèo" },
  { id: "rabbit", text: "rabbit", emoji: "🐰", meaning: "Thỏ" },
  { id: "mouse", text: "mouse", emoji: "🐭", meaning: "Chuột" },
  { id: "snake", text: "snake", emoji: "🐍", meaning: "Rắn" },
  { id: "horse", text: "horse", emoji: "🐴", meaning: "Ngựa" },
  { id: "cow", text: "cow", emoji: "🐮", meaning: "Bò" },
  { id: "duck", text: "duck", emoji: "🦆", meaning: "Vịt" },
  { id: "bird", text: "bird", emoji: "🐦", meaning: "Chim" },
  { id: "sheep", text: "sheep", emoji: "🐑", meaning: "Cừu" },
  { id: "goat", text: "goat", emoji: "🐐", meaning: "Dê" },
  { id: "chicken", text: "chicken", emoji: "🐔", meaning: "Gà" },
];
const U9_ACTIONS: WordItem[] = [
  { id: "run_animal", text: "run", emoji: "🏃", meaning: "Chạy" },
  { id: "jump_animal", text: "jump", emoji: "🤾", meaning: "Nhảy" },
  { id: "fly_animal", text: "fly", emoji: "🪽", meaning: "Bay" },
  { id: "swim_animal", text: "swim", emoji: "🏊", meaning: "Bơi" },
];
const U9_DESC: WordItem[] = [
  { id: "big", text: "big", emoji: "🦛", meaning: "To" },
  { id: "small", text: "small", emoji: "🐭", meaning: "Nhỏ" },
  { id: "long", text: "long", emoji: "📏", meaning: "Dài" },
  { id: "short", text: "short", emoji: "📐", meaning: "Ngắn" },
  { id: "furry", text: "furry", emoji: "🐻", meaning: "Lông xù" },
];
const UNIT9_PART1 = U9_ANIMALS;
const UNIT9_PART2 = U9_ACTIONS;
const UNIT9_PART3 = U9_DESC;
const UNIT9_ALL = [...UNIT9_PART1, ...UNIT9_PART2, ...UNIT9_PART3];

// ============================================
// UNIT 10 – The weather
// ============================================
const U10_WEATHER: WordItem[] = [
  { id: "sunny", text: "sunny", emoji: "☀️", meaning: "Nắng" },
  { id: "rainy", text: "rainy", emoji: "🌧️", meaning: "Mưa" },
  { id: "cloudy", text: "cloudy", emoji: "☁️", meaning: "Nhiều mây" },
  { id: "windy", text: "windy", emoji: "🌬️", meaning: "Gió" },
  { id: "snowy", text: "snowy", emoji: "❄️", meaning: "Tuyết" },
  { id: "stormy", text: "stormy", emoji: "⛈️", meaning: "Bão" },
  { id: "hot", text: "hot", emoji: "🥵", meaning: "Nóng" },
  { id: "cold", text: "cold", emoji: "🥶", meaning: "Lạnh" },
  { id: "warm", text: "warm", emoji: "🙂", meaning: "Ấm" },
  { id: "cool", text: "cool", emoji: "😎", meaning: "Mát" },
];
const U10_ITEMS: WordItem[] = [
  { id: "umbrella", text: "umbrella", emoji: "☂️", meaning: "Ô" },
  { id: "coat_weather", text: "coat", emoji: "🧥", meaning: "Áo khoác" },
  { id: "boots", text: "boots", emoji: "🥾", meaning: "Ủng" },
  { id: "scarf_weather", text: "scarf", emoji: "🧣", meaning: "Khăn" },
];
const UNIT10_PART1 = U10_WEATHER;
const UNIT10_PART2 = U10_ITEMS;
const UNIT10_ALL = [...UNIT10_PART1, ...UNIT10_PART2];

// ============================================
// UNIT 11 – What’s the matter?
// ============================================
const U11_PROBLEMS: WordItem[] = [
  { id: "headache", text: "headache", emoji: "🤕", meaning: "Đau đầu" },
  { id: "stomachache", text: "stomachache", emoji: "🤢", meaning: "Đau bụng" },
  { id: "toothache", text: "toothache", emoji: "😬", meaning: "Đau răng" },
  { id: "cold_problem", text: "cold", emoji: "🤧", meaning: "Cảm lạnh" },
  { id: "cough", text: "cough", emoji: "😮‍💨", meaning: "Ho" },
  { id: "fever", text: "fever", emoji: "🥵", meaning: "Sốt" },
];
const U11_BODY: WordItem[] = [
  { id: "head", text: "head", emoji: "🧠", meaning: "Đầu" },
  { id: "arm", text: "arm", emoji: "💪", meaning: "Cánh tay" },
  { id: "leg", text: "leg", emoji: "🦵", meaning: "Chân" },
  { id: "knee", text: "knee", emoji: "🦵", meaning: "Đầu gối" },
  { id: "hand", text: "hand", emoji: "✋", meaning: "Tay" },
  { id: "foot", text: "foot", emoji: "🦶", meaning: "Bàn chân" },
  { id: "back", text: "back", emoji: "🦴", meaning: "Lưng" },
  { id: "shoulder", text: "shoulder", emoji: "💪", meaning: "Vai" },
];
const U11_ACTIONS: WordItem[] = [
  { id: "rest", text: "rest", emoji: "😴", meaning: "Nghỉ ngơi" },
  { id: "drink_water", text: "drink water", emoji: "💧", meaning: "Uống nước" },
  { id: "take_medicine", text: "take medicine", emoji: "💊", meaning: "Uống thuốc" },
];
const UNIT11_PART1 = U11_PROBLEMS;
const UNIT11_PART2 = U11_BODY;
const UNIT11_PART3 = U11_ACTIONS;
const UNIT11_ALL = [...UNIT11_PART1, ...UNIT11_PART2, ...UNIT11_PART3];

// ============================================
// UNIT 12 – In the countryside
// ============================================
const U12_PLACES: WordItem[] = [
  { id: "river", text: "river", emoji: "🏞️", meaning: "Sông" },
  { id: "lake", text: "lake", emoji: "🛶", meaning: "Hồ" },
  { id: "hill", text: "hill", emoji: "⛰️", meaning: "Đồi" },
  { id: "field", text: "field", emoji: "🌾", meaning: "Cánh đồng" },
  { id: "forest_country", text: "forest", emoji: "🌳", meaning: "Rừng" },
  { id: "farm", text: "farm", emoji: "🚜", meaning: "Nông trại" },
];
const U12_ANIMALS: WordItem[] = [
  { id: "cow_country", text: "cow", emoji: "🐮", meaning: "Bò" },
  { id: "sheep_country", text: "sheep", emoji: "🐑", meaning: "Cừu" },
  { id: "horse_country", text: "horse", emoji: "🐴", meaning: "Ngựa" },
  { id: "pig", text: "pig", emoji: "🐷", meaning: "Heo" },
  { id: "goat_country", text: "goat", emoji: "🐐", meaning: "Dê" },
  { id: "duck_country", text: "duck", emoji: "🦆", meaning: "Vịt" },
  { id: "chicken_country", text: "chicken", emoji: "🐔", meaning: "Gà" },
];
const U12_ACTIONS: WordItem[] = [
  { id: "climb_country", text: "climb", emoji: "🧗", meaning: "Leo" },
  { id: "walk_country", text: "walk", emoji: "🚶", meaning: "Đi bộ" },
  { id: "run_country", text: "run", emoji: "🏃", meaning: "Chạy" },
  { id: "pick_flowers", text: "pick flowers", emoji: "🌸", meaning: "Hái hoa" },
  { id: "swim_country", text: "swim", emoji: "🏊", meaning: "Bơi" },
];
const UNIT12_PART1 = U12_PLACES;
const UNIT12_PART2 = U12_ANIMALS;
const UNIT12_PART3 = U12_ACTIONS;
const UNIT12_ALL = [...UNIT12_PART1, ...UNIT12_PART2, ...UNIT12_PART3];
// Tổng hợp tất cả từ cho flashcards chung
const UNIT2_ALL_WORDS: WordItem[] = [
  ...UNIT2_PART1_WORDS,
  ...UNIT2_PART2_WORDS,
  ...UNIT2_PART3_WORDS,
];

// ============================================
// ĐỊNH NGHĨA CUỐN SÁCH MOVER
// ============================================

export const MOVER_BOOK_CONFIG: (UnitGameConfig & { backgroundColor?: string })[] = [
  // ========== UNIT 1: At the park ==========
  {
    slug: "unit-1-at-the-park",
    name: "UNIT 1 – At the park",
    unit: "Unit 1",
    bookname: "Mover Book",
    useRotatingGame: true, // Sử dụng cấu trúc game xoay vòng
    backgroundColor: "from-green-50 via-emerald-50 to-teal-50",
    flashcards: {
      title: "At the park",
      autoAudio: true,
      words: UNIT1_PART1_WORDS, // Dùng part 1 làm mặc định
    },
    quiz: createQuiz(UNIT1_PART1_WORDS, "What do you do at the park?", "walk")!,
    matching: {
      title: "Match words",
      pairs: createMatchingPairs(UNIT1_PART1_WORDS),
    },
    wordOrdering: {
      title: "Word Ordering",
      words: UNIT1_PART1_WORDS,
      showScore: true,
    },
    wordScramble: {
      title: "Word Scramble",
      words: UNIT1_PART1_WORDS,
      showScore: true,
    },
    // Chia thành 2 parts
    parts: [
      {
        id: "part1",
        title: "Verbs, Colours & Clothes",
        words: UNIT1_PART1_WORDS,
        quiz: createQuiz(UNIT1_PART1_WORDS, "What do you do at the park?", "walk")!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", "memory"] (vì part index 0)
      },
      {
        id: "part2",
        title: "Extra Vocabulary & Adjectives",
        words: UNIT1_PART2_WORDS,
        quiz: createQuiz(UNIT1_PART2_WORDS, "What is the opposite of big?", "small")!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", "ordering"] (vì part index 1)
      },
    ],
  },
  // ========== UNIT 2: Weekly activities & Preferences ==========
  {
    slug: "unit-2-weekly-activities",
    name: "UNIT 2 – Weekly activities & Preferences",
    unit: "Unit 2",
    bookname: "Mover Book",
    useRotatingGame: true, // Sử dụng cấu trúc game xoay vòng
    backgroundColor: "from-blue-50 via-indigo-50 to-purple-50",
    flashcards: {
      title: "Weekly activities & Preferences",
      autoAudio: true,
      words: UNIT2_PART1_WORDS, // Dùng part 1 làm mặc định
    },
    quiz: createQuiz(UNIT2_PART1_WORDS, "What do you do on weekends?", "go_shopping")!,
    matching: {
      title: "Match words",
      pairs: createMatchingPairs(UNIT2_PART1_WORDS),
    },
    wordOrdering: {
      title: "Word Ordering",
      words: UNIT2_ALL_WORDS,
      showScore: true,
    },
    wordScramble: {
      title: "Word Scramble",
      words: UNIT2_ALL_WORDS,
      showScore: true,
    },
    // Chia thành 3 parts
    parts: [
      {
        id: "part-1-actions-transport",
        title: "Part 1: Actions & Transport",
        words: UNIT2_PART1_WORDS,
        quiz: createQuiz(UNIT2_PART1_WORDS, "What do you do on weekends?", "go_shopping")!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", "memory"] (vì part index 0)
      },
      {
        id: "part-2-verbs-days",
        title: "Part 2: Verbs & Days of the week",
        words: UNIT2_PART2_WORDS,
        quiz: createQuiz(UNIT2_PART2_WORDS, "What day comes after Monday?", "tuesday")!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", "ordering"] (vì part index 1)
      },
      {
        id: "part-3-adverbs-preferences",
        title: "Part 3: Adverbs & Preferences",
        words: UNIT2_PART3_WORDS,
        quiz: createQuiz(UNIT2_PART3_WORDS, "How often do you play sports?", "often")!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", "scramble"] (vì part index 2)
      },
    ],
  },
  // ========== UNIT 3: In the town ==========
  {
    slug: "unit-3-in-the-town",
    name: "UNIT 3 – In the town",
    unit: "Unit 3",
    bookname: "Mover Book",
    useRotatingGame: true, // 3 game cố định + 1 xoay vòng
    backgroundColor: "from-sky-50 via-blue-50 to-cyan-50",
    // Từ vựng
    flashcards: {
      title: "In the town",
      autoAudio: true,
      words: [
        { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
        { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
        { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
        { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
        { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
        { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
        { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
        { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
        { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
        { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
        { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
        { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
      ],
    },
    quiz: createQuiz(
      [
        { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
        { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
        { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
        { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
        { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
        { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
        { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
        { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
        { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
        { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
        { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
        { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
      ],
      "Where do you buy food and things?",
      "supermarket"
    )!,
    matching: {
      title: "Match words",
      pairs: createMatchingPairs([
        { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
        { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
        { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
        { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
        { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
        { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
        { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
        { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
        { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
        { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
        { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
        { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
      ]),
    },
    wordOrdering: {
      title: "Word Ordering",
      words: [
        { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
        { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
        { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
        { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
        { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
        { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
        { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
        { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
        { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
        { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
        { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
        { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
      ],
      showScore: true,
    },
    wordScramble: {
      title: "Word Scramble",
      words: [
        { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
        { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
        { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
        { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
        { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
        { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
        { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
        { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
        { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
        { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
        { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
        { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
      ],
      showScore: true,
    },
    // 1 part (vì số lượng từ vừa phải)
    parts: [
      {
        id: "part-1-places-in-town",
        title: "Places in town",
        words: [
          { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
          { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
          { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
          { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
          { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
          { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
          { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
          { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
          { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
          { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
          { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
          { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
        ],
        quiz: createQuiz(
          [
            { id: "bus_station", text: "bus station", emoji: "🚌", meaning: "Bến xe buýt" },
            { id: "shopping_centre", text: "shopping centre", emoji: "🛍️", meaning: "Trung tâm mua sắm" },
            { id: "playground", text: "playground", emoji: "🛝", meaning: "Sân chơi" },
            { id: "circus", text: "circus", emoji: "🎪", meaning: "Rạp xiếc" },
            { id: "hospital", text: "hospital", emoji: "🏥", meaning: "Bệnh viện" },
            { id: "funfair", text: "funfair", emoji: "🎡", meaning: "Hội chợ" },
            { id: "car_park", text: "car park", emoji: "🚗", meaning: "Bãi đỗ xe" },
            { id: "market", text: "market", emoji: "🧺", meaning: "Chợ" },
            { id: "square", text: "square", emoji: "🏛️", meaning: "Quảng trường" },
            { id: "supermarket", text: "supermarket", emoji: "🛒", meaning: "Siêu thị" },
            { id: "train_station", text: "train station", emoji: "🚆", meaning: "Nhà ga" },
            { id: "town", text: "town", emoji: "🏙️", meaning: "Thị trấn" },
          ],
          "Where can you park your car?",
          "car_park"
        )!,
        // enabledGames sẽ tự động = ["matching", "flip", "speak", rotatingGame] theo index part (0)
      },
    ],
  },
  // ========== UNIT 4: My home ==========
  {
    slug: "unit-4-my-home",
    name: "UNIT 4 – My home",
    unit: "Unit 4",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-amber-50 via-orange-50 to-yellow-50",
    flashcards: {
      title: "My home",
      autoAudio: true,
      words: UNIT4_PART1,
    },
    quiz: createQuiz(UNIT4_PART1, "Where do you cook?", "kitchen")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT4_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT4_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT4_ALL, showScore: true },
    parts: [
      {
        id: "part-1-rooms",
        title: "Rooms & places",
        words: UNIT4_PART1,
        quiz: createQuiz(UNIT4_PART1, "Where do you sleep?", "bedroom")!,
      },
      {
        id: "part-2-furniture",
        title: "Furniture & items",
        words: UNIT4_PART2,
        quiz: createQuiz(UNIT4_PART2, "Which item keeps food cold?", "fridge")!,
      },
      {
        id: "part-3-chores",
        title: "Chores at home",
        words: UNIT4_PART3,
        quiz: createQuiz(UNIT4_PART3, "What do you do after waking up?", "make_bed")!,
      },
    ],
  },
  // ========== UNIT 5: Let’s go on holiday! ==========
  {
    slug: "unit-5-holiday",
    name: "UNIT 5 – Let’s go on holiday!",
    unit: "Unit 5",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-cyan-50 via-sky-50 to-blue-50",
    flashcards: { title: "Holiday", autoAudio: true, words: UNIT5_PART1 },
    quiz: createQuiz(UNIT5_PART1, "Where do you stay on a trip?", "hotel")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT5_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT5_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT5_ALL, showScore: true },
    parts: [
      {
        id: "part-1-places-holiday",
        title: "Holiday places",
        words: UNIT5_PART1,
        quiz: createQuiz(UNIT5_PART1, "Where do you sleep indoors on holiday?", "hotel")!,
      },
      {
        id: "part-2-transport-holiday",
        title: "Holiday transport",
        words: UNIT5_PART2,
        quiz: createQuiz(UNIT5_PART2, "Which transport flies?", "plane")!,
      },
      {
        id: "part-3-activities-holiday",
        title: "Holiday activities",
        words: UNIT5_PART3,
        quiz: createQuiz(UNIT5_PART3, "What do you do with a camera?", "take_photos")!,
      },
    ],
  },
  // ========== UNIT 6: My favourite book ==========
  {
    slug: "unit-6-favourite-book",
    name: "UNIT 6 – My favourite book",
    unit: "Unit 6",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-purple-50 via-violet-50 to-fuchsia-50",
    flashcards: { title: "My favourite book", autoAudio: true, words: UNIT6_PART1 },
    quiz: createQuiz(UNIT6_PART1, "What is on the cover of a book?", "title")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT6_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT6_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT6_ALL, showScore: true },
    parts: [
      {
        id: "part-1-book-words",
        title: "Book & reading",
        words: UNIT6_PART1,
        quiz: createQuiz(UNIT6_PART1, "What do you see on the cover?", "title")!,
      },
      {
        id: "part-2-characters",
        title: "Fantasy characters",
        words: UNIT6_PART2,
        quiz: createQuiz(UNIT6_PART2, "Who wears a crown?", "queen")!,
      },
      {
        id: "part-3-actions-reading",
        title: "Reading actions",
        words: UNIT6_PART3,
        quiz: createQuiz(UNIT6_PART3, "What do you do with a storybook?", "read_book")!,
      },
    ],
  },
  // ========== UNIT 7: This is my family ==========
  {
    slug: "unit-7-family",
    name: "UNIT 7 – This is my family",
    unit: "Unit 7",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-rose-50 via-red-50 to-orange-50",
    flashcards: { title: "My family", autoAudio: true, words: UNIT7_PART1 },
    quiz: createQuiz(UNIT7_PART1, "Who is your father's father?", "grandad")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT7_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT7_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT7_ALL, showScore: true },
    parts: [
      {
        id: "part-1-members",
        title: "Family members",
        words: UNIT7_PART1,
        quiz: createQuiz(UNIT7_PART1, "Who is your mother's mother?", "grandma")!,
      },
      {
        id: "part-2-descriptions",
        title: "Descriptions",
        words: UNIT7_PART2,
        quiz: createQuiz(UNIT7_PART2, "Who is tall?", "tall_family")!,
      },
      {
        id: "part-3-actions-family",
        title: "Daily actions",
        words: UNIT7_PART3,
        quiz: createQuiz(UNIT7_PART3, "What do you do to move fast?", "run_family")!,
      },
    ],
  },
  // ========== UNIT 8: What’s for lunch? ==========
  {
    slug: "unit-8-lunch",
    name: "UNIT 8 – What’s for lunch?",
    unit: "Unit 8",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-lime-50 via-green-50 to-emerald-50",
    flashcards: { title: "What’s for lunch?", autoAudio: true, words: UNIT8_PART1 },
    quiz: createQuiz(UNIT8_PART1, "Which one is a drink?", "juice")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT8_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT8_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT8_ALL, showScore: true },
    parts: [
      {
        id: "part-1-food",
        title: "Food",
        words: UNIT8_PART1,
        quiz: createQuiz(UNIT8_PART1, "Which one is meat?", "beef")!,
      },
      {
        id: "part-2-drinks",
        title: "Drinks",
        words: UNIT8_PART2,
        quiz: createQuiz(UNIT8_PART2, "Which one is milk?", "milk")!,
      },
      {
        id: "part-3-cooking",
        title: "Cooking verbs",
        words: UNIT8_PART3,
        quiz: createQuiz(UNIT8_PART3, "What do you do with a knife?", "cut")!,
      },
    ],
  },
  // ========== UNIT 9: Do you like animals? ==========
  {
    slug: "unit-9-animals",
    name: "UNIT 9 – Do you like animals?",
    unit: "Unit 9",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-emerald-50 via-green-50 to-lime-50",
    flashcards: { title: "Animals", autoAudio: true, words: UNIT9_PART1 },
    quiz: createQuiz(UNIT9_PART1, "Which one can fly?", "bird")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT9_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT9_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT9_ALL, showScore: true },
    parts: [
      {
        id: "part-1-animals",
        title: "Animals",
        words: UNIT9_PART1,
        quiz: createQuiz(UNIT9_PART1, "Which animal says meow?", "cat")!,
      },
      {
        id: "part-2-actions",
        title: "Animal actions",
        words: UNIT9_PART2,
        quiz: createQuiz(UNIT9_PART2, "Which one means jumping?", "jump_animal")!,
      },
      {
        id: "part-3-descriptions",
        title: "Descriptions",
        words: UNIT9_PART3,
        quiz: createQuiz(UNIT9_PART3, "Which one means very big?", "big")!,
      },
    ],
  },
  // ========== UNIT 10: The weather ==========
  {
    slug: "unit-10-weather",
    name: "UNIT 10 – The weather",
    unit: "Unit 10",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-blue-50 via-sky-50 to-gray-50",
    flashcards: { title: "Weather", autoAudio: true, words: UNIT10_PART1 },
    quiz: createQuiz(UNIT10_PART1, "Which word is for rain?", "rainy")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT10_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT10_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT10_ALL, showScore: true },
    parts: [
      {
        id: "part-1-weather",
        title: "Weather words",
        words: UNIT10_PART1,
        quiz: createQuiz(UNIT10_PART1, "What weather has snow?", "snowy")!,
      },
      {
        id: "part-2-items",
        title: "Weather items",
        words: UNIT10_PART2,
        quiz: createQuiz(UNIT10_PART2, "What do you use when it rains?", "umbrella")!,
      },
    ],
  },
  // ========== UNIT 11: What’s the matter? ==========
  {
    slug: "unit-11-health",
    name: "UNIT 11 – What’s the matter?",
    unit: "Unit 11",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-red-50 via-rose-50 to-orange-50",
    flashcards: { title: "Health", autoAudio: true, words: UNIT11_PART1 },
    quiz: createQuiz(UNIT11_PART1, "Which one is about head pain?", "headache")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT11_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT11_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT11_ALL, showScore: true },
    parts: [
      {
        id: "part-1-problems",
        title: "Health problems",
        words: UNIT11_PART1,
        quiz: createQuiz(UNIT11_PART1, "Which one is about teeth?", "toothache")!,
      },
      {
        id: "part-2-body",
        title: "Body parts",
        words: UNIT11_PART2,
        quiz: createQuiz(UNIT11_PART2, "Which part do you use to walk?", "foot")!,
      },
      {
        id: "part-3-actions-health",
        title: "Health actions",
        words: UNIT11_PART3,
        quiz: createQuiz(UNIT11_PART3, "What should you do when tired?", "rest")!,
      },
    ],
  },
  // ========== UNIT 12: In the countryside ==========
  {
    slug: "unit-12-countryside",
    name: "UNIT 12 – In the countryside",
    unit: "Unit 12",
    bookname: "Mover Book",
    useRotatingGame: true,
    backgroundColor: "from-teal-50 via-green-50 to-lime-50",
    flashcards: { title: "Countryside", autoAudio: true, words: UNIT12_PART1 },
    quiz: createQuiz(UNIT12_PART1, "Where do you see boats?", "river")!,
    matching: { title: "Match words", pairs: createMatchingPairs(UNIT12_PART1) },
    wordOrdering: { title: "Word Ordering", words: UNIT12_ALL, showScore: true },
    wordScramble: { title: "Word Scramble", words: UNIT12_ALL, showScore: true },
    parts: [
      {
        id: "part-1-places-country",
        title: "Countryside places",
        words: UNIT12_PART1,
        quiz: createQuiz(UNIT12_PART1, "Where do you see many trees?", "forest_country")!,
      },
      {
        id: "part-2-animals-country",
        title: "Countryside animals",
        words: UNIT12_PART2,
        quiz: createQuiz(UNIT12_PART2, "Which animal gives milk?", "cow_country")!,
      },
      {
        id: "part-3-actions-country",
        title: "Nature actions",
        words: UNIT12_PART3,
        quiz: createQuiz(UNIT12_PART3, "What do you do with flowers?", "pick_flowers")!,
      },
    ],
  },
];

/**
 * Tự động generate danh sách projects từ MOVER_BOOK_CONFIG
 */
export function getProjectsFromMoverBook() {
  return MOVER_BOOK_CONFIG.map((unit, index) => ({
    id: unit.slug,
    name: unit.name,
    unitSlug: unit.slug,
  }));
}

/**
 * Lấy unit theo slug
 */
export function getMoverUnitBySlug(slug: string): UnitGameConfig | undefined {
  return MOVER_BOOK_CONFIG.find((unit) => unit.slug === slug);
}

/**
 * Lấy index của unit trong MOVER_BOOK_CONFIG
 */
export function getMoverUnitIndex(slug: string): number {
  return MOVER_BOOK_CONFIG.findIndex((unit) => unit.slug === slug);
}

