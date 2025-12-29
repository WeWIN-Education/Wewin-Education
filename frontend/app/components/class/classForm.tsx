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

export default function ClassForm({
  cls,
  isAddMode = false,
  onSave,
  onCancel,
}: ClassFormProps) {
  const [formData, setFormData] = useState({
    name: cls?.name || "",
    category: cls?.category || "",
    teacher1: cls?.teacher1 || "",
    teacher2: cls?.teacher2 || "",
    ta1: cls?.ta1 || "",
    ta2: cls?.ta2 || "",
    schedule: cls?.schedule || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      id: cls?.id || `CLS-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      students: cls?.students || [],
    });
  };

  return (
    <BaseEntityFormModal
      mode={isAddMode ? "add" : "edit"}
      submitText={isAddMode ? "Add Class" : "Save Changes"}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      title={
        isAddMode ? (
          <>
            <CirclePlus className="w-6 h-6 text-green-600" />
            <span className="text-green-700">Add New Class</span>
          </>
        ) : (
          <>
            <Pencil className="w-5 h-5 text-[#0E4BA9]" />
            <span className="text-[#0E4BA9]">Edit Class</span>
          </>
        )
      }
    >
      {/* ===== Fields (UI giữ y chang) ===== */}

      {/* Class Name */}
      <div>
        <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
          Class Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter class name (e.g., IELTS Foundation 1)"
          className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-blue-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#0E4BA9] outline-none"
        >
          <option value="" disabled>
            Select category
          </option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Teachers / TAs / Schedule */}
      {[
        { name: "teacher1", label: "Teacher 1" },
        { name: "teacher2", label: "Teacher 2" },
        { name: "ta1", label: "TA 1" },
        { name: "ta2", label: "TA 2" },
        {
          name: "schedule",
          label: "Schedule",
          hint: "Example: T4 17:30 - 19:00; T6 17:30 - 19:00",
        },
      ].map(({ name, label, hint }) => (
        <div key={name}>
          <label className="block text-sm font-semibold text-[#0E4BA9] mb-1">
            {label}
          </label>
          <input
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
          />
          {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        </div>
      ))}
    </BaseEntityFormModal>
  );
}
