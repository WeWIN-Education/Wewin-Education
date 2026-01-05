export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;  
  imageUrl?: string;
  status: string;
  categoryId: string; 
  createdAt: string;  
  updatedAt: string;  
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

