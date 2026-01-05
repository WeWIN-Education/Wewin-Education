export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;   // TỒN KHO HIỆN TẠI
  status: string;
  imageUrl?: string;
  categoryId: string;  // FK → Category.id
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Purchase_Orders {
  id: string;
  code: string;
  name: string;
  note?: string;
  status: string;
  type: Type;
  createdBy: string;   // FK → User.id
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
}

export type Type = "IN" | "OUT";

