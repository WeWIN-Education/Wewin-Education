"use client";

import { useEffect, useState } from "react";
import { CirclePlus, Pencil } from "lucide-react";
import FormField from "../form/formField";
import TextInput from "../form/field/textInput";
import SelectInput from "../form/field/selectInput";
import TextArea from "../form/field/textArea";
import ImageInput from "../form/field/ImageInput";
import BaseEntityFormModal from "../form";
import { categoryService } from "@/services/product-category-service";
import { Category } from "@/types/storage";

export type InventoryFormData = {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  unit: string;
  quantity: number;
  description: string;
  imageUrl: string | null; // ✅ ảnh từ DB
  imageFile: File | null;
};

interface InventoryFormProps {
  mode: "add" | "edit";
  initialData?: Partial<InventoryFormData>;
  onSubmit: (data: InventoryFormData) => void;
  onCancel: () => void;
}

export default function InventoryForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: InventoryFormProps) {
  const [formData, setFormData] = useState<InventoryFormData>({
    id: "",
    code: "",
    name: "",
    categoryId: "",
    unit: "",
    quantity: 0,
    description: "",
    imageUrl: null,
    imageFile: null,
    ...initialData,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  /* ===== image preview ===== */
  const previewUrl = formData.imageFile
    ? URL.createObjectURL(formData.imageFile)
    : (formData.imageUrl ?? undefined);

  useEffect(() => {
    return () => {
      if (formData.imageFile && previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, formData.imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    let isCancelled = false;

    const loadCategories = async () => {
      try {
        const res = await categoryService.searchCategories({
          page: 1,
          limit: 1000,
          sortBy: "createAt",
          order: "DESC",
        });

        if (isCancelled) return;
        const items = Array.isArray(res.items)
          ? res.items
          : Array.isArray(res)
            ? res
            : [];
        setCategories(items);
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };

    loadCategories();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <BaseEntityFormModal
      mode={mode}
      submitText={mode === "add" ? "Nhập kho" : "Cập nhật"}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      title={
        mode === "add" ? (
          <div className="flex items-center gap-2 text-green-700">
            <CirclePlus className="w-6 h-6" />
            <span>Nhập kho vật dụng</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#0E4BA9]">
            <Pencil className="w-5 h-5" />
            <span>Cập nhật vật dụng</span>
          </div>
        )
      }
    >
      {/* ===== CODE ===== */}
      <FormField label="Mã vật dụng" required>
        <TextInput
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="P001"
        />
      </FormField>

      {/* ===== NAME ===== */}
      <FormField label="Tên vật dụng" required>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Bút bi xanh"
        />
      </FormField>

      {/* ===== CATEGORY ===== */}
      <FormField label="Danh mục" required>
        <SelectInput
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={categories.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
        />
      </FormField>

      {/* ===== UNIT ===== */}
      <FormField label="Đơn vị">
        <TextInput
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="cái / hộp / quyển"
        />
      </FormField>

      {/* ===== QUANTITY ===== */}
      <FormField label="Số lượng">
        <TextInput
          type="number"
          name="quantity"
          value={String(formData.quantity)}
          onChange={handleChange}
        />
      </FormField>

      {/* ===== DESCRIPTION ===== */}
      <FormField label="Mô tả">
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ghi chú thêm..."
        />
      </FormField>

      {/* ===== IMAGE ===== */}
      <FormField label="Hình ảnh">
        <ImageInput
          value={previewUrl}
          onChange={(file) =>
            setFormData((prev) => ({
              ...prev,
              imageFile: file,
              imageUrl: file ? null : prev.imageUrl, // ✅ chọn ảnh mới thì bỏ ảnh DB
            }))
          }
        />
      </FormField>
    </BaseEntityFormModal>
  );
}
