export interface InvertoryDocument {
  id: string;
  note?: string;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  createdBy: string;   // FK → User.id
}   

