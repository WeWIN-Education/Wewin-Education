# Hướng dẫn thêm cuốn sách mới

Để thêm một cuốn sách mới vào hệ thống (ví dụ: Starters Book, Movers Book, Flyers Book), làm theo các bước sau:

## Bước 1: Tạo file config cho cuốn sách mới

Tạo file mới trong thư mục `frontend/app/constants/`, ví dụ: `startersBookConfig.ts`

```typescript
import type { UnitGameConfig, WordItem, GameKey } from "@/types/games";

// Helper functions (copy từ bookConfig.ts)
function createMatchingPairs(words: WordItem[]): { left: string; right: string }[] {
  return words.map((word) => ({
    left: word.emoji || word.text,
    right: word.meaning || word.text,
  }));
}

function createQuiz(words: WordItem[], question: string, correctWordId: string) {
  // ... (copy từ bookConfig.ts)
}

// Định nghĩa các projects/units cho cuốn sách mới
export const STARTERS_BOOK_CONFIG: (UnitGameConfig & { backgroundColor?: string })[] = [
  {
    slug: "unit-1",
    name: "UNIT 1",
    unit: "Unit 1",
    bookname: "Starters Book",
    backgroundColor: "from-blue-50 via-cyan-50 to-teal-50",
    flashcards: {
      title: "Vocabulary",
      autoAudio: true,
      words: [
        { id: "word1", text: "word1", emoji: "📝", meaning: "Nghĩa 1" },
        // ... thêm từ vựng
      ],
    },
    quiz: createQuiz(/* ... */)!,
    matching: {
      title: "Match words",
      pairs: createMatchingPairs(/* ... */),
    },
    enabledGames: ["matching", "flip", "speak"],
  },
  // ... thêm các units khác
];

// Export functions
export function getProjectsFromStartersBook() {
  return STARTERS_BOOK_CONFIG.map((unit, index) => ({
    id: unit.slug,
    name: unit.name,
    unitSlug: unit.slug,
  }));
}

export function getStartersUnitBySlug(slug: string): UnitGameConfig | undefined {
  return STARTERS_BOOK_CONFIG.find((unit) => unit.slug === slug);
}
```

## Bước 2: Đăng ký cuốn sách trong booksRegistry.ts

Mở file `frontend/app/constants/booksRegistry.ts` và thêm entry mới:

```typescript
import { getProjectsFromStartersBook, getStartersUnitBySlug } from "./startersBookConfig";

export const BOOKS_REGISTRY: Record<string, BookInfo> = {
  kids: {
    // ... (giữ nguyên)
  },
  starters: {
    bookName: "Starters Book",
    bookSlug: "starters",
    getProjects: getProjectsFromStartersBook,
    getUnitBySlug: getStartersUnitBySlug,
    basePath: "/resources/starters/Games",
    defaultBackground: "from-blue-50 via-cyan-50 to-teal-50",
  },
  // Có thể thêm thêm movers, flyers, v.v.
};
```

## Bước 3: Tạo routing cho cuốn sách mới

Tạo cấu trúc thư mục tương tự như Kids Book:

```
frontend/app/(user)/resources/starters/
  └── Games/
      ├── page.tsx                    # Trang tổng quan
      └── [slug]/
          ├── page.tsx                # Trang unit
          ├── matching/
          │   └── page.tsx
          ├── flip/
          │   └── page.tsx
          ├── speak/
          │   └── page.tsx
          └── quiz/
              └── page.tsx
```

### Ví dụ: `frontend/app/(user)/resources/starters/Games/page.tsx`

```typescript
"use client";

import { BookScreen } from "@/app/components/games/BookScreen";
import { getBookBySlug } from "@/app/constants/booksRegistry";

export default function StartersBookGamesPage() {
  const book = getBookBySlug("starters");
  
  if (!book) {
    return <div>Book not found</div>;
  }

  const projects = book.getProjects();

  return (
    <BookScreen
      bookName={book.bookName}
      projects={projects}
      basePath={book.basePath}
      defaultBackground={book.defaultBackground}
    />
  );
}
```

### Ví dụ: `frontend/app/(user)/resources/starters/Games/[slug]/page.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { UnitGameScreen } from "@/app/components/games/UnitGameScreen";
import { BookUnitsSidebar } from "@/app/components/games/BookUnitsSidebar";
import { getBookBySlug } from "@/app/constants/booksRegistry";

function getSavedPlayerId(bookSlug: string): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(`${bookSlug}_player_id`) || "";
}

export default function StartersProjectGamePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const book = getBookBySlug("starters");
  if (!book) return <div>Book not found</div>;
  
  const unit = book.getUnitBySlug(slug);
  const projects = book.getProjects();

  const [playerId, setPlayerId] = useState<string | null>(null);
  const [showIdModal, setShowIdModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SESSION_FLAG_KEY = `${book.bookSlug}_session_started`;
    const hasSession = sessionStorage.getItem(SESSION_FLAG_KEY);
    
    if (!hasSession) {
      localStorage.removeItem(`${book.bookSlug}_player_id`);
      sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    }

    const savedPlayerId = getSavedPlayerId(book.bookSlug);
    if (savedPlayerId) {
      setPlayerId(savedPlayerId);
      setShowIdModal(false);
    } else {
      setPlayerId("");
      setShowIdModal(true);
    }
  }, [book.bookSlug]);

  const handlePlayerIdSubmit = (id: string) => {
    setPlayerId(id);
    localStorage.setItem(`${book.bookSlug}_player_id`, id);
    setShowIdModal(false);
  };

  const handlePlayerIdSkip = () => {
    setPlayerId("anonymous");
    localStorage.setItem(`${book.bookSlug}_player_id`, "anonymous");
    setShowIdModal(false);
  };

  if (!unit) {
    return <div>Unit not found</div>;
  }

  if (playerId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <BookUnitsSidebar
        bookName={book.bookName}
        projects={projects}
        basePath={book.basePath}
      />
      <div className="flex-1">
        <UnitGameScreen
          unit={unit}
          heading={unit.name}
          subheading={unit.bookname}
          showBreadcrumb={true}
          breadcrumbBackUrl={book.basePath}
          breadcrumbBackLabel={book.bookName}
          initialPlayerId={playerId || ""}
          showIdModal={showIdModal}
          onPlayerIdSubmit={handlePlayerIdSubmit}
          onPlayerIdSkip={handlePlayerIdSkip}
        />
      </div>
    </div>
  );
}
```

### Tạo các trang game riêng (matching, flip, speak, quiz)

Copy từ `frontend/app/(user)/resources/kids/Games/[slug]/matching/page.tsx` và sửa import:

```typescript
"use client";
import StartersProjectGamePage from "../page";
export default function MatchingGamePage() {
  return <StartersProjectGamePage />;
}
```

## Bước 4: Cập nhật GameMenu để hỗ trợ basePath động

Nếu cần, có thể cập nhật `GameMenu.tsx` để nhận `basePath` từ props thay vì hardcode `/resources/kids/Games`.

## Tóm tắt

1. ✅ Tạo file config mới (ví dụ: `startersBookConfig.ts`)
2. ✅ Đăng ký trong `booksRegistry.ts`
3. ✅ Tạo routing structure (`/resources/starters/Games/...`)
4. ✅ Sử dụng `BookScreen` và `BookUnitsSidebar` components
5. ✅ Mỗi cuốn sách có player ID riêng trong localStorage (`${bookSlug}_player_id`)

Sau khi làm xong, cuốn sách mới sẽ hoạt động giống hệt Kids Book! 🎉

