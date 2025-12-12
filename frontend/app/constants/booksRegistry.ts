/**
 * Registry quản lý tất cả các cuốn sách trong hệ thống
 * Mỗi cuốn sách sẽ có:
 * - Tên sách (bookName)
 * - Slug (bookSlug) - dùng cho routing
 * - Config file path
 * - Background color mặc định
 */

import { getProjectsFromBook, getUnitBySlug, BOOK_CONFIG } from "./bookConfig";
import { getProjectsFromMoverBook, getMoverUnitBySlug } from "./moverBookConfig";
import { getProjectsFromFlyerBook, getFlyerUnitBySlug } from "./flyerBookConfig";
import { getProjectsFromStarterBook, getStarterUnitBySlug } from "./starterBookConfig";

export type BookInfo = {
  bookName: string; // Tên hiển thị của cuốn sách
  bookSlug: string; // Slug dùng cho routing (ví dụ: "kids", "starters", "movers")
  getProjects: () => Array<{ id: string; name: string; unitSlug: string }>;
  getUnitBySlug: (slug: string) => any;
  basePath: string; // Base path cho routing (ví dụ: "/resources/kids/Games")
  defaultBackground?: string; // Background color mặc định
};

// Registry tất cả các cuốn sách
export const BOOKS_REGISTRY: Record<string, BookInfo> = {
  kids: {
    bookName: "Kids Book",
    bookSlug: "kids",
    getProjects: getProjectsFromBook,
    getUnitBySlug: getUnitBySlug,
    basePath: "/resources/kids/Games",
    defaultBackground: "from-pink-50 via-rose-50 to-emerald-50",
  },
  mover: {
    bookName: "Mover Book",
    bookSlug: "mover",
    getProjects: getProjectsFromMoverBook,
    getUnitBySlug: getMoverUnitBySlug,
    basePath: "/resources/mover/Games",
    defaultBackground: "from-green-50 via-emerald-50 to-teal-50",
  },
  flyer: {
    bookName: "Flyer Book",
    bookSlug: "flyer",
    getProjects: getProjectsFromFlyerBook,
    getUnitBySlug: getFlyerUnitBySlug,
    basePath: "/resources/flyer/Games",
    defaultBackground: "from-blue-50 via-indigo-50 to-purple-50",
  },
  starter: {
    bookName: "Starter Book",
    bookSlug: "starter",
    getProjects: getProjectsFromStarterBook,
    getUnitBySlug: getStarterUnitBySlug,
    basePath: "/resources/starters/Games",
    defaultBackground: "from-blue-50 via-cyan-50 to-teal-50",
  },
};

/**
 * Lấy thông tin cuốn sách theo slug
 */
export function getBookBySlug(bookSlug: string): BookInfo | undefined {
  return BOOKS_REGISTRY[bookSlug];
}

/**
 * Lấy danh sách tất cả các cuốn sách
 */
export function getAllBooks(): BookInfo[] {
  return Object.values(BOOKS_REGISTRY);
}

