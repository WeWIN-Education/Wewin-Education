/* ==================================================================================
   MOCK DATA - Dữ liệu giả lập từ Database cho KIDS Learning Plan
   ================================================================================== */

export interface Book {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  bookId: string;
  order: number;
}

export interface LearningNode {
  id: string;
  title: string;
  description?: string;
  type: 'stage' | 'week';
  order: number;
  parentId?: string;
  projectId: string;
}

export interface LessonContent {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'html' | 'audio' | 'video' | 'list';
  learningNodeId: string;
  mediaUrl?: string;
}

// ==================== BOOKS ====================
export const mockBooks: Book[] = [
  { 
    id: 'book_kids', 
    name: 'KIDS - When I Grow Up', 
    status: 'active',
    description: 'KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN'
  }
];

// ==================== PROJECTS ====================
export const mockProjects: Project[] = [
  {
    id: 'proj1',
    bookId: 'book_kids',
    name: 'PROJECT 1: "MY FUTURE CAREER FAIR" (Hội chợ nghề nghiệp của bé)',
    description: 'GIAI ĐOẠN 1: THÁNG 11–12 (Mùa Thu – Khám phá nghề nghiệp & thiên nhiên)',
    order: 1
  }
];

// ==================== LEARNING NODES ====================
export const mockLearningNodes: LearningNode[] = [
  {
    id: 'w1',
    projectId: 'proj1',
    title: 'Tuần 1 – Chủ đề: Dream Job – Play • Speak • Pronounce • Communicate',
    type: 'week',
    order: 1
  },
  {
    id: 'w2',
    projectId: 'proj1',
    title: 'Tuần 2 – Chủ đề: Mini Career Fair – My Dream Job Presentation',
    type: 'week',
    order: 2
  }
];

// ==================== LESSON CONTENTS ====================
/* ==================== PROJECT 1 — WEEK 1 (FULL FROM HTML) ==================== */

export const mockLessonContents: LessonContent[] = [
  {
    id: "p1_w1_objectives",
    learningNodeId: "w1",
    title: "🎯 MỤC TIÊU MỞ RỘNG / EXTENDED OBJECTIVES",
    type: "html",
    order: 1,
    content: `
      <ul>
        <li>Phát triển nghe – nói – phát âm chuẩn qua các từ nghề nghiệp.</li>
        <li>Luyện mẫu câu giao tiếp cơ bản xoay quanh chủ đề nghề nghiệp.</li>
        <li>Giúp học sinh hiểu, tự giới thiệu nghề, tự tin diễn đạt ước mơ bằng tiếng Anh.</li>
      </ul>
    `,
  },

  {
    id: "p1_w1_pronunciation",
    learningNodeId: "w1",
    title: "🔊 PHÁT ÂM / PRONUNCIATION FOCUS – Sound Focus",
    type: "html",
    order: 2,
    content: `
      <ul>
        <li>Âm /tʃ/ – teacher, child, chair → câu luyện: “I’m a teacher – Tee–cher!”</li>
        <li>Âm /d/ – doctor, dog, doll → “Doctor helps people.”</li>
        <li>Âm /p/ – pilot, policeman → “Pilot flies a plane.”</li>
        <li>Âm /f/ – farmer, fireman → “Fireman puts out fire.”</li>
        <li class="tag-note">Học sinh nghe – nhại – nói theo rhythm vui (TPR: touch your nose when you hear /p/).</li>
      </ul>

      <p>Hoạt động gợi ý:</p>
      <ul>
        <li><i>Phonics chant</i></li>
      </ul>

      <p>“Tee-cher! Doc-tor! Pi-lot! Farmer! — I want to be one day!"</p>

      <ul>
        <li><i>Mouth Mirror: dùng gương nhỏ để quan sát khẩu hình /tʃ/ – /p/ – /f/.</i></li>
      </ul>
    `,
  },

  {
    id: "p1_w1_structures",
    learningNodeId: "w1",
    title: "🧩 CẤU TRÚC CÂU / SENTENCE STRUCTURES",
    type: "html",
    order: 3,
    content: `
      <p>Main Pattern:</p>
      <ul>
        <li>What’s your dream job? → My dream job is a teacher.</li>
        <li>What does a doctor do? → A doctor helps sick people.</li>
        <li>Who works at school? → A teacher works at school.</li>
        <li>Where does a pilot work? → A pilot works in the airplane.</li>
      </ul>

      <p><i>Học sinh luyện theo cặp (pair practice) – hỏi & trả lời thật.</i></p>
    `,
  },

  {
    id: "p1_w1_communication",
    learningNodeId: "w1",
    title: "💬 MẪU CÂU GIAO TIẾP / COMMUNICATION PRACTICE",
    type: "html",
    order: 4,
    content: `
      <p>Role-Play Corner: bé đội mũ nghề, cầm đạo cụ và trả lời phỏng vấn.</p>

      <ul>
        <li>Bé đóng vai nghề mình chọn (đội mũ bác sĩ / áo phi công).</li>

        <li>Thực hành hội thoại:
          <ul>
            <li>“What do you want to become?”</li>
            <li>“I want to be a doctor.”</li>
            <li>“What do you do?”</li>
            <li>“I help sick people.”</li>
          </ul>
        </li>
      </ul>

      <p><i>Giúp bé nói tiếng Anh tự nhiên, dùng câu thật thay vì chỉ từ rời rạc.</i></p>

      <p>Gợi ý mở rộng lớp học:</p>
      <ul>
        <li>Dream Job Microphone – bé trả lời phỏng vấn.</li>
        <li>Speech Bubble Poster – viết câu tiếng Anh mình nói.</li>
      </ul>
    `,
  },

  {
    id: "p1_w1_song",
    learningNodeId: "w1",
    title: "🎵 SONG / CHANT ĐỀ XUẤT",
    type: "audio",
    order: 5,
    mediaUrl: "https://wewin.edu.vn/wp-content/uploads/2025/11/song.mp3",
    content: `
      <p>“When I Grow Up” Chant (WeWIN remix)</p>
      <ul>
        <li>I want to be, I want to be,</li>
        <li>A teacher, doctor, pilot, see!</li>
        <li>I help, I fly, I teach today,</li>
        <li>When I grow up, I’ll find my way!</li>
      </ul>

      <p><i>Rèn phát âm, rhythm, stress.</i></p>
    `,
  },

  {
    id: "p1_w1_dialogues",
    learningNodeId: "w1",
    title: "🗣 MINI DIALOGUES PRACTICE",
    type: "html",
    order: 6,
    content: `
      <ul>
        <li>Teacher: What do you want to be, Nam?</li>
        <li>Student: I want to be a policeman!</li>
        <li>Teacher: What does a policeman do?</li>
        <li>Student: He helps people!</li>
      </ul>

      <p><i>Dùng puppet / flashcard để đóng vai.</i></p>
    `,
  },

  {
    id: "p1_w1_integrate",
    learningNodeId: "w1",
    title: "🔗 TÍCH HỢP VÀO BÀI HỌC HIỆN CÓ",
    type: "html",
    order: 7,
    content: `
      <ul>
        <li>Color & Create → bé tô nghề yêu thích + đọc từ 3 lần.</li>
        <li>Tool Matching → nối nghề với dụng cụ → “Doctor uses a stethoscope.”</li>
        <li>Dress-Up Corner → hóa trang → “I’m a pilot!”.</li>
        <li>Poster Project → “I want to be a teacher.”</li>
      </ul>
    `,
  },

  {
    id: "p1_w1_phonics",
    learningNodeId: "w1",
    title: "📢 PHONICS + SPEAKING DRILL (3 phút cuối)",
    type: "html",
    order: 8,
    content: `
      <p><strong>“Say it Fast!” Game:</strong></p>
      <p><i>Giơ flashcard → học sinh phát âm to 3 lần → đặt câu.</i></p>

      <p>“Pass the Mic” Game:</p>
      <p><i>Ai cầm mic phải nói 1 câu hoàn chỉnh.</i></p>
    `,
  },

  {
    id: "p1_w1_checklist",
    learningNodeId: "w1",
    title: "📝 BỔ SUNG CHECKLIST (PHẦN NGÔN NGỮ)",
    type: "html",
    order: 9,
    content: `
      <ul>
        <li>Flashcards IPA (job words) – luyện phát âm.</li>
        <li>Gương nhỏ (phonics mirror).</li>
        <li>Micro đồ chơi.</li>
        <li>Speech bubbles & stickers.</li>
        <li>Bảng hội thoại mẫu.</li>
      </ul>
    `,
  },

  {
    id: "p1_w1_outcomes",
    learningNodeId: "w1",
    title: "🎓 KẾT QUẢ HỌC TẬP KỲ VỌNG",
    type: "html",
    order: 10,
    content: `
      <p>✔ Phát âm đúng từ nghề (tối thiểu 6/8 từ).</p>
      <p>✔ Nói trọn câu “I want to be a [job].”.</p>
      <p>✔ Phản xạ câu hỏi “What do you want to become?”.</p>
      <p>✔ Trình bày ước mơ bằng 1–2 câu.</p>

      <p><i>Chủ đề trở thành bài học tiếng Anh giao tiếp thực thụ.</i></p>
    `,
  },

  {
    id: "p1_w1_homework",
    learningNodeId: "w1",
    title: "📚 BTVN / HOMEWORK",
    type: "html",
    order: 11,
    content: `
      <p>Hoàn thành Worksheet.</p>
    `,
  },
  {
    id: "p1_w2_objectives",
    learningNodeId: "w2",
    title: "🎯 MỤC TIÊU / OBJECTIVE",
    type: "html",
    order: 1,
    content: `
      <ul>
        <li>Học sinh được thực hành giao tiếp thật về chủ đề nghề nghiệp: hỏi – đáp, mô tả dụng cụ làm việc, trình bày nghề mơ ước trước lớp.</li>
        <li>Students apply and communicate their knowledge of jobs, using speaking practice, phonics, and mini presentations in English.</li>
      </ul>
    `,
  },

  // ---------- VOCABULARY ----------
  {
    id: "p1_w2_vocab",
    learningNodeId: "w2",
    title: "🧠 TỪ VỰNG / VOCABULARY",
    type: "html",
    order: 2,
    content: `
      <ul>
        <li><i>teacher • doctor • pilot • fireman • nurse • farmer • policeman • student</i></li>
        <li>Review từ vựng tuần 1 + mở rộng câu mô tả công việc.</li>
      </ul>
    `,
  },

  // ---------- PRONUNCIATION ----------
  {
    id: "p1_w2_pronunciation",
    learningNodeId: "w2",
    title: "🔊 PHÁT ÂM / PRONUNCIATION FOCUS – Sound Focus",
    type: "html",
    order: 3,
    content: `
      <ul>
        <li>Âm /tʃ/ – teacher, child, chair → “I’m a teacher – Tee–cher!”</li>
        <li>Âm /d/ – doctor, dog, doll → “Doctor helps people.”</li>
        <li>Âm /p/ – pilot, policeman → “Pilot flies a plane.”</li>
        <li>Âm /f/ – farmer, fireman → “Fireman puts out fire.”</li>
        <li class="tag-note">Kết hợp gương nhỏ và hành động TPR để bé chạm – cảm nhận khẩu hình.</li>
      </ul>
    `,
  },

  // ---------- STRUCTURES ----------
  {
    id: "p1_w2_structures",
    learningNodeId: "w2",
    title: "🧩 CẤU TRÚC NGỮ PHÁP / SENTENCE STRUCTURES – Pattern Review",
    type: "html",
    order: 4,
    content: `
      <ul>
        <li>What do you want to become? – I want to be a [teacher].</li>
        <li>Where do you work? – I work at the [hospital].</li>
        <li>What does a [job] do? – A [job] helps people.</li>
      </ul>
    `,
  },

  // ---------- ACTIVITIES ----------
  {
    id: "p1_w2_activities",
    learningNodeId: "w2",
    title: "🎯 HOẠT ĐỘNG TRẢI NGHIỆM / CLASS ACTIVITIES (tóm tắt)",
    type: "html",
    order: 5,
    content: `
      <ul>
        <li>Job Interview Role-Play – Phỏng vấn nghề nghiệp có bảng chấm điểm mini.</li>
        <li>Career Tools Hunt – Săn dụng cụ nghề kết hợp câu: “A [job] uses a [tool].”.</li>
        <li>Mini “Career Fair” – mỗi bé chuẩn bị booth nhỏ và giới thiệu nghề của mình trước lớp.</li>
      </ul>
    `,
  },

  // ---------- OUTCOMES ----------
  {
    id: "p1_w2_outcomes",
    learningNodeId: "w2",
    title: "🎓 KẾT QUẢ HỌC TẬP KỲ VỌNG / LEARNING OUTCOMES",
    type: "html",
    order: 6,
    content: `
      <ul>
        <li>Học sinh phản xạ được câu hỏi “What do you want to become?” bằng 1–2 câu đầy đủ.</li>
        <li>Học sinh tự tin trình bày ít nhất 1 lần trước nhóm / lớp.</li>
      </ul>
    `,
  },
];
