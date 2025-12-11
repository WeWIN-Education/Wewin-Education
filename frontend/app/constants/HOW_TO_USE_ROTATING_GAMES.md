# Hướng dẫn sử dụng Game Xoay Vòng cho các sách mới

## Tổng quan

Hệ thống hỗ trợ 2 cấu trúc game:

1. **Kids Book (cấu trúc cũ)**: Mỗi unit có thể có nhiều game tùy chỉnh
2. **Sách mới (cấu trúc mới)**: Mỗi unit/part có **4 game cố định**:
   - 3 game cố định: **Matching Game**, **Flip Card Game**, **Pronunciation Game**
   - 1 game xoay vòng: **Memory Game**, **Word Ordering Game**, **Word Scramble Game** (xoay theo index)

## Cách sử dụng

### Bước 1: Thêm `useRotatingGame: true` vào config

Trong file config của sách mới (ví dụ: `startersBookConfig.ts`):

```typescript
export const STARTERS_BOOK_CONFIG: (UnitGameConfig & { backgroundColor?: string })[] = [
  {
    slug: "unit-1",
    name: "UNIT 1",
    unit: "Unit 1",
    bookname: "Starters Book",
    useRotatingGame: true, // ← Thêm dòng này
    flashcards: {
      title: "Vocabulary",
      autoAudio: true,
      words: [/* ... */],
    },
    quiz: createQuiz(/* ... */)!,
    matching: {
      title: "Match words",
      pairs: createMatchingPairs(/* ... */),
    },
    // Cần có config cho các game xoay vòng
    wordOrdering: {
      title: "Word Ordering",
      words: words,
      showScore: true,
    },
    wordScramble: {
      title: "Word Scramble",
      words: words,
      showScore: true,
    },
    // KHÔNG cần enabledGames - hệ thống sẽ tự động tính
  },
  {
    slug: "unit-2",
    name: "UNIT 2",
    // ... tương tự
    useRotatingGame: true,
  },
  // ...
];
```

### Bước 2: Đảm bảo có config cho các game xoay vòng

Cần có config cho:
- `wordOrdering?: WordOrderingGameConfig`
- `wordScramble?: WordScrambleGameConfig`
- `memory` sẽ tự động dùng `words` từ `flashcards`

### Bước 3: Pattern xoay vòng

Game xoay vòng sẽ tự động xoay theo index của unit/part:

- **Unit 1** (index 0): `memory`
- **Unit 2** (index 1): `ordering`
- **Unit 3** (index 2): `scramble`
- **Unit 4** (index 3): `memory` (lặp lại)
- **Unit 5** (index 4): `ordering`
- **Unit 6** (index 5): `scramble`
- ...

### Bước 4: Truyền `unitIndex` vào UnitGameScreen

Trong file page của sách mới (ví dụ: `[slug]/page.tsx`):

```typescript
import { getUnitIndex } from "@/app/constants/startersBookConfig";

export default function StartersGamePage() {
  const unit = getStartersUnitBySlug(slug);
  const unitIndex = getUnitIndex(slug); // Lấy index của unit
  
  return (
    <UnitGameScreen
      unit={unit}
      unitIndex={unitIndex} // ← Truyền index vào
      // ... các props khác
    />
  );
}
```

## Ví dụ hoàn chỉnh

```typescript
// startersBookConfig.ts
export const STARTERS_BOOK_CONFIG = [
  {
    slug: "unit-1",
    name: "UNIT 1",
    unit: "Unit 1",
    bookname: "Starters Book",
    useRotatingGame: true, // ← Bật game xoay vòng
    flashcards: {
      title: "Animals",
      autoAudio: true,
      words: [
        { id: "cat", text: "cat", emoji: "🐱", meaning: "Mèo" },
        { id: "dog", text: "dog", emoji: "🐶", meaning: "Chó" },
        // ...
      ],
    },
    quiz: createQuiz(/* ... */)!,
    matching: {
      title: "Match animals",
      pairs: createMatchingPairs(words),
    },
    wordOrdering: {
      title: "Animal Word Ordering",
      words: words,
      showScore: true,
    },
    wordScramble: {
      title: "Animal Word Scramble",
      words: words,
      showScore: true,
    },
    // enabledGames sẽ tự động = ["matching", "flip", "speak", "memory"]
  },
  {
    slug: "unit-2",
    // ... tương tự
    useRotatingGame: true,
    // enabledGames sẽ tự động = ["matching", "flip", "speak", "ordering"]
  },
];
```

## Lưu ý

- Nếu `useRotatingGame = true`, không cần định nghĩa `enabledGames` - hệ thống sẽ tự động tính
- Nếu `useRotatingGame = false` hoặc không có, dùng `enabledGames` như cũ
- Game xoay vòng dựa trên index của unit trong BOOK_CONFIG, không phải `unit` field

