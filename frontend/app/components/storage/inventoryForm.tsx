"use client";

import { useEffect, useState } from "react";
import { CirclePlus, Pencil } from "lucide-react";
import FormField from "../form/formField";
import TextInput from "../form/field/textInput";
import SelectInput from "../form/field/selectInput";
import TextArea from "../form/field/textArea";
import ImageInput from "../form/field/ImageInput";
import BaseEntityFormModal from "../form";
import { MOCK_CATEGORIES } from "@/lib/constants/storage/category";

export type InventoryFormData = {
  id: string;
  name: string;
  categoryId: string;
  unit: string;
  quantity: number;
  description: string;
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
    name: "",
    categoryId: "",
    unit: "",
    quantity: 0,
    description: "",
    imageFile: null,
    ...initialData,
  });

  /* ===== image preview ===== */
  const previewUrl = formData.imageFile
    ? URL.createObjectURL(formData.imageFile)
    : undefined;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
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
          options={MOCK_CATEGORIES.map((c) => ({
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
            setFormData((prev) => ({ ...prev, imageFile: file }))
          }
        />
      </FormField>
    </BaseEntityFormModal>
  );
}
