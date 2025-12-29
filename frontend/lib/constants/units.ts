import type { UnitGameConfig } from "@/types/games";

export const unitConfigs: UnitGameConfig[] = [
  {
    slug: "transportation",
    name: "Transportation",
    unit: "Unit 1",
    bookname: "Transportation",
    flashcards: {
      title: "Vehicles",
      autoAudio: true,
      words: [
        { id: "bus", text: "bus", icon: "/icons/bus.svg", emoji: "🚌", meaning: "xe buýt" },
        { id: "train", text: "train", icon: "/icons/train.svg", emoji: "🚂", meaning: "tàu hỏa" },
        { id: "bike", text: "bike", icon: "/icons/bike.svg", emoji: "🚲", meaning: "xe đạp" },
        { id: "plane", text: "plane", icon: "/icons/plane.svg", emoji: "✈️", meaning: "máy bay" },
      ],
    },
    quiz: {
      title: "Guess the Vehicle",
      question: "Which vehicle has wings?",
      answer: "plane",
      options: [
        { label: "Bus", value: "bus" },
        { label: "Bike", value: "bike" },
        { label: "Plane", value: "plane" },
        { label: "Car", value: "car" },
      ],
    },
    matching: {
      title: "Match icon to word",
      pairs: [
        { left: "🚲", right: "bike" },
        { left: "✈️", right: "plane" },
        { left: "🚌", right: "bus" },
        { left: "🚂", right: "train" },
      ],
    },
    enabledGames: ["matching", "flip", "speak"],
  },
  {
    slug: "story-words",
    name: "Story Words - Butterfly Life Cycle",
    unit: "Unit 8",
    bookname: "Story Words - Butterfly Life Cycle",
    flashcards: {
      title: "Story Words",
      autoAudio: true,
      words: [
        { id: "egg", text: "egg", emoji: "🥚", meaning: "quả trứng" },
        { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "sâu bướm" },
        { id: "leaf", text: "leaf", emoji: "🍃", meaning: "chiếc lá" },
        { id: "cocoon", text: "cocoon", emoji: "🕸️", meaning: "kén" },
        { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "bướm" },
        { id: "sun", text: "sun", emoji: "☀️", meaning: "mặt trời" },
        { id: "moon", text: "moon", emoji: "🌙", meaning: "mặt trăng" },
      ],
    },
    quiz: {
      title: "Story Words Quiz",
      question: "What comes from an egg?",
      answer: "caterpillar",
      options: [
        { label: "Egg", value: "egg" },
        { label: "Caterpillar", value: "caterpillar" },
        { label: "Butterfly", value: "butterfly" },
        { label: "Cocoon", value: "cocoon" },
      ],
    },
    matching: {
      title: "Match words",
      pairs: [
        { left: "🥚", right: "egg" },
        { left: "🐛", right: "caterpillar" },
        { left: "🦋", right: "butterfly" },
      ],
    },
    enabledGames: ["matching", "flip", "quiz"],
    parts: [
      {
        id: "part-1",
        title: "Part 1 · Early Journey",
        words: [
          { id: "egg", text: "egg", emoji: "🥚", meaning: "quả trứng" },
          { id: "caterpillar", text: "caterpillar", emoji: "🐛", meaning: "sâu bướm" },
          { id: "leaf", text: "leaf", emoji: "🍃", meaning: "chiếc lá" },
          { id: "cocoon", text: "cocoon", emoji: "🕸️", meaning: "kén" },
        ],
        enabledGames: ["matching", "flip", "speak"],
        quiz: {
          title: "Early Journey Quiz",
          question: "Sinh vật nào xuất hiện sau khi trứng nở?",
          answer: "caterpillar",
          options: [
            { label: "Egg", value: "egg" },
            { label: "Caterpillar", value: "caterpillar" },
            { label: "Leaf", value: "leaf" },
            { label: "Cocoon", value: "cocoon" },
          ],
        },
      },
      {
        id: "part-2",
        title: "Part 2 · Nature Friends",
        words: [
          { id: "butterfly", text: "butterfly", emoji: "🦋", meaning: "bướm" },
          { id: "sun", text: "sun", emoji: "☀️", meaning: "mặt trời" },
          { id: "moon", text: "moon", emoji: "🌙", meaning: "mặt trăng" },
        ],
        enabledGames: ["matching", "flip", "quiz"],
        quiz: {
          title: "Nature Friends Quiz",
          question: "Biểu tượng nào đại diện cho ban đêm?",
          answer: "moon",
          options: [
            { label: "Sun", value: "sun" },
            { label: "Moon", value: "moon" },
            { label: "Butterfly", value: "butterfly" },
            { label: "Caterpillar", value: "caterpillar" },
          ],
        },
      },
    ],
  },
];

export const getUnitBySlug = (slug: string) =>
  unitConfigs.find((unit) => unit.slug === slug);
