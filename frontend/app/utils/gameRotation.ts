import type { GameKey } from "@/types/games";

/**
 * Helper function để xác định game xoay vòng dựa trên index
 * Pattern: memory -> ordering -> scramble -> memory (lặp lại)
 * 
 * @param index - Index của unit/part (0-based)
 * @returns GameKey của game xoay vòng
 */
export function getRotatingGame(index: number): GameKey {
  const rotatingGames: GameKey[] = ["memory", "ordering", "scramble"];
  return rotatingGames[index % 3];
}

/**
 * Tạo enabledGames cho sách mới với cấu trúc:
 * - 3 game cố định: matching, flip, speak
 * - 1 game xoay vòng: memory, ordering, scramble (xoay theo index)
 * 
 * @param index - Index của unit/part (0-based)
 * @returns Array of GameKey
 */
export function createStandardGameSet(index: number): GameKey[] {
  const fixedGames: GameKey[] = ["matching", "flip", "speak"];
  const rotatingGame = getRotatingGame(index);
  return [...fixedGames, rotatingGame];
}

