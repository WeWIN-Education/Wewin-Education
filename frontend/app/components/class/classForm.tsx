"use client";

import { useState } from "react";
import { CirclePlus, Pencil } from "lucide-react";
import { categoryOptions, Class } from "@/lib/constants/class";
import BaseEntityFormModal from "../form";

interface ClassFormProps {
  cls?: Class | null;
  isAddMode?: boolean;
  onSave: (cls: Class) => void;
  onCancel: () => void;
}

type ClassFormData = {
  name: string;
  category: string;
  teacher1: string;
  teacher2: string;
  ta1: string;
  ta2: string;
  schedule: string;
};

export default function ClassForm({
  cls,
  isAddMode = false,
  onSave,
  onCancel,
}: ClassFormProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    name: cls?.name || "",
    category: cls?.category || "",
    teacher1: cls?.teacher1 || "",
    teacher2: cls?.teacher2 || "",
    ta1: cls?.ta1 || "",
    ta2: cls?.ta2 || "",
    schedule: Array.isArray(cls?.schedule)
      ? cls.schedule.join("; ")
      : cls?.schedule || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave({
      id: cls?.id || `CLS-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      students: cls?.students || [],
    });
  };

  const fields: {
    name: keyof ClassFormData;
    label: string;
    hint?: string;
  }[] = [
    { name: "teacher1", label: "Giáo viên 1" },
    { name: "teacher2", label: "Giáo viên 2" },
    { name: "ta1", label: "Trợ giảng 1" },
    { name: "ta2", label: "Trợ giảng 2" },
    {
      name: "schedule",
      label: "Lịch dạy",
      hint: "VD: T4 17:30 - 19:00; T6 17:30 - 19:00",
    },
  ];

  return (
    <BaseEntityFormModal
      mode={isAddMode ? "add" : "edit"}
      submitText={isAddMode ? "Thêm lớp học" : "Lưu thay đổi"}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      title={
        isAddMode ? (
          <>
            <CirclePlus className="w-6 h-6 text-green-600" />
            <span className="text-green-700">Thêm lớp học mới</span>
          </>
        ) : (
          <>
            <Pencil className="w-5 h-5 text-[#0E4BA9]" />
            <span className="text-[#0E4BA9]">Chỉnh sửa lớp học</span>
          </>
        )
      }
    >
      {/* Tên lớp */}
      <div>
        <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
          Tên lớp học <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tên lớp học (VD: IELTS Foundation 1)"
          className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
        />
      </div>

      {/* Phân loại */}
      <div>
        <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
          Phân loại <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-blue-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#0E4BA9] outline-none"
        >
          <option value="" disabled>
            Chọn phân loại
          </option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Giáo viên / Trợ giảng / Lịch dạy */}
      {fields.map(({ name, label, hint }) => (
        <div key={name}>
          <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
            {label}
          </label>
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Thêm ${label.toLowerCase()}`}
            className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
          />
          {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        </div>
      ))}
    </BaseEntityFormModal>
  );
}
