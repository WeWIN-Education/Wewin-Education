/**
 * Utility function để gửi điểm lên Google Sheet
 *
 * @param data - Object chứa thông tin cần gửi
 * @param data.id - ID người chơi
 * @param data.unit - Tên unit (ví dụ: "Unit 8")
 * @param data.project - Project ID (tùy chọn)
 * @param data.game_id - ID của game (look_and_find, listen_and_find, Pronunciation Game)
 * @param data.score - Điểm số
 * @param data.bookname - Tên sách
 */

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbx7xULsIWLcOb0B-DGtc3xO28rW3T58wrfZov6Se8cjo1Yhfbtc1qOsfsTEcdYFW0jd/exec";

export type SubmitScoreData = {
  id: string;
  unit: string;
  project?: string;
  game_id: string;
  score: number;
  bookname: string;
};

export async function submitScoreToSheet(data: SubmitScoreData): Promise<void> {
  // Format date theo định dạng vi-VN
  const now = new Date();
  const dateStr = now.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Tạo object data với đầy đủ thông tin
  const payload = {
    id: data.id || "anonymous",
    unit: data.unit,
    project: data.project || data.unit,
    game_id: data.game_id,
    score: data.score,
    date: dateStr,
    bookname: data.bookname,
  };

  // Chuyển data thành URLSearchParams (format form-urlencoded)
  const formData = new URLSearchParams();
  Object.keys(payload).forEach((key) => {
    formData.append(key, String(payload[key as keyof typeof payload]));
  });

  try {
    // Gửi POST request đến Google Apps Script web app
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // no-cors vì Google Apps Script không cho CORS
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

  } catch (err) {

  }
}

/**
 * Map game type sang game_id theo format Google Apps Script expect
 */
export function getGameId(gameType: string): string {
  const gameIdMap: Record<string, string> = {
    matching: "look_and_find",
    flip: "listen_and_find",
    speak: "Pronunciation Game",
    quiz: "Quiz Game",
    memory: "Memory Game",
  };

  return gameIdMap[gameType] || gameType.toLowerCase();
}

/**
 * Gửi signal reset unit lên Google Sheet
 *
 * @param data - Object chứa thông tin reset
 * @param data.id - ID người chơi
 * @param data.unit - Unit game ID (ví dụ: "Unit 8")
 * @param data.project - Project name (tùy chọn)
 * @param data.bookname - Tên sách
 */
export type ResetUnitData = {
  id: string;
  unit: string;
  project?: string;
  bookname: string;
};

export async function resetUnitToSheet(data: ResetUnitData): Promise<void> {
  // Format date theo định dạng vi-VN
  const now = new Date();
  const dateStr = now.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Tạo object data với action reset
  const payload = {
    id: data.id || "anonymous",
    unit: data.unit,
    project: data.project || data.unit,
    action: "reset", // Signal để Google Apps Script biết đây là reset
    bookname: data.bookname,
    date: dateStr,
    timestamp: new Date().toISOString(),
  };

  // Chuyển data thành URLSearchParams (format form-urlencoded)
  const formData = new URLSearchParams();
  Object.keys(payload).forEach((key) => {
    formData.append(key, String(payload[key as keyof typeof payload]));
  });

  try {
    // Gửi POST request đến Google Apps Script web app
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // no-cors vì Google Apps Script không cho CORS
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Lưu ý: Với no-cors mode, không thể đọc response
    // Nhưng request vẫn được gửi thành công
  } catch (err) {
    // Lỗi này thường không xảy ra với no-cors mode
    // Nhưng vẫn log để debug
  }
}
