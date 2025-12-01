// export type ClassId = "KIDS" | "STARTERS_FOUNDATION" | "STARTERS" | "MOVERS" | "FLYERS" | "GAMES" | "AUDIO" | "VIDEOS";
export type ClassId =
  | "KIDS"
  | "STARTERS_FOUNDATION"
  | "GAMES"
  | "AUDIO"
  | "VIDEOS";

/* Overview (giới thiệu book) */
export interface OverviewSection {
  id: string;
  icon?: string;
  title: string;
  items?: string[];
}

export interface ClassDetail {
  title: string;
  learningTitle: string;
  overview: OverviewSection[];
}

/* BOOK / PROJECT / NODE / LESSON */
export interface Book {
  id: string;
  name: string;
  status: "active" | "inactive";
  description?: string;
}

export interface Project {
  id: string;
  bookId: string;
  name: string;
  description: string;
  order: number;
}

export interface LearningNode {
  id: string;
  projectId: string;
  parentId?: string;
  title: string;
  description?: string;
  type: "week" | "section";
  order: number;
}

export interface LessonBlock {
  id: string;
  learningNodeId: string;
  title: string;
  type: "list" | "paragraph" | "audio" | "homework";
  order: number;
  dataType: string[] | string | { url: string }; 
}

