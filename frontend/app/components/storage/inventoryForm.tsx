"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  imageUrl: string | null;
  imageFile: File | null;
};

type InventoryFormErrors = Partial<Record<keyof InventoryFormData, string>>;
type TouchedMap = Partial<Record<keyof InventoryFormData, boolean>>;

interface InventoryFormProps {
  mode: "add" | "edit";
  initialData?: Partial<InventoryFormData>;
  onSubmit: (data: InventoryFormData) => void;
  onCancel: () => void;
}

function clampNonNegativeNumber(input: string) {
  if (input.trim() === "") return 0;

  const n = Number(input);
  if (!Number.isFinite(n)) return 0;

  return Math.max(0, n);
}

function isIntegerLike(n: number) {
  return Number.isFinite(n) && Math.floor(n) === n;
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
  const [errors, setErrors] = useState<InventoryFormErrors>({});
  const [touched, setTouched] = useState<TouchedMap>({});

  /* ===== image preview ===== */
  const previewUrl = useMemo(() => {
    if (formData.imageFile) return URL.createObjectURL(formData.imageFile);
    return formData.imageUrl ?? undefined;
  }, [formData.imageFile, formData.imageUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
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

  // ===== Validation core =====
  const validate = (data: InventoryFormData): InventoryFormErrors => {
    const next: InventoryFormErrors = {};

    const code = data.code.trim();
    const name = data.name.trim();
    const unit = data.unit.trim();
    const desc = data.description.trim();

    if (!code) next.code = "Vui lòng nhập mã vật dụng.";
    else if (code.length < 2) next.code = "Mã vật dụng quá ngắn (>= 2 ký tự).";
    else if (code.length > 20) next.code = "Mã vật dụng quá dài (<= 20 ký tự).";
    else if (!/^[A-Za-z0-9_-]+$/.test(code))
      next.code = "Mã chỉ gồm chữ, số, '_' hoặc '-'.";

    if (!name) next.name = "Vui lòng nhập tên vật dụng.";
    else if (name.length < 2) next.name = "Tên vật dụng quá ngắn (>= 2 ký tự).";
    else if (name.length > 100)
      next.name = "Tên vật dụng quá dài (<= 100 ký tự).";

    if (!data.categoryId) next.categoryId = "Vui lòng chọn danh mục.";

    if (unit && unit.length > 30) next.unit = "Đơn vị tối đa 30 ký tự.";

    const q = Number(data.quantity);
    if (!Number.isFinite(q)) next.quantity = "Số lượng không hợp lệ.";
    else if (q < 0) next.quantity = "Số lượng không được âm.";
    else if (!isIntegerLike(q)) next.quantity = "Số lượng phải là số nguyên.";

    if (desc.length > 500) next.description = "Mô tả tối đa 500 ký tự.";

    // Nếu bạn muốn bắt buộc ảnh khi add:
    // if (mode === "add" && !data.imageFile && !data.imageUrl) {
    //   next.imageFile = "Vui lòng chọn hình ảnh.";
    // }

    return next;
  };

  const markTouched = (name: keyof InventoryFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateAndSetErrors = (data: InventoryFormData) => {
    const next = validate(data);
    setErrors(next);
    return next;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: name === "quantity" ? clampNonNegativeNumber(value) : value,
      } as InventoryFormData;

      // Nếu field đã touched thì validate realtime cho field đó (optional)
      if (touched[name as keyof InventoryFormData]) {
        const nextErrors = validate(next);
        setErrors((prevErr) => ({
          ...prevErr,
          [name]: nextErrors[name as keyof InventoryFormData],
        }));
      }

      return next;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    const key = name as keyof InventoryFormData;
    markTouched(key);

    // validate field khi blur
    const nextErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
  };

  const handleSubmit = () => {
    // normalize trước khi validate
    const safeQuantity = Math.max(0, Number(formData.quantity) || 0);

    const normalized: InventoryFormData = {
      ...formData,
      code: formData.code.trim(),
      name: formData.name.trim(),
      unit: formData.unit.trim(),
      description: formData.description.trim(),
      quantity: safeQuantity,
    };

    const nextErrors = validateAndSetErrors(normalized);

    // mark touched hết để show lỗi toàn bộ
    setTouched({
      code: true,
      name: true,
      categoryId: true,
      unit: true,
      quantity: true,
      description: true,
      imageUrl: true,
      imageFile: true,
      id: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit(normalized);
  };

  const getError = (field: keyof InventoryFormData) =>
    touched[field] ? errors[field] : undefined;

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
          onBlur={handleBlur}
          placeholder="P001"
        />
        {getError("code") && (
          <p className="mt-1 text-sm text-red-600">{getError("code")}</p>
        )}
      </FormField>

      {/* ===== NAME ===== */}
      <FormField label="Tên vật dụng" required>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Bút bi xanh"
        />
        {getError("name") && (
          <p className="mt-1 text-sm text-red-600">{getError("name")}</p>
        )}
      </FormField>

      {/* ===== CATEGORY ===== */}
      <FormField label="Danh mục" required>
        <SelectInput
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          onBlur={handleBlur}
          options={categories.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
        />
        {getError("categoryId") && (
          <p className="mt-1 text-sm text-red-600">{getError("categoryId")}</p>
        )}
      </FormField>

      {/* ===== UNIT ===== */}
      <FormField label="Đơn vị">
        <TextInput
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="cái / hộp / quyển"
        />
        {getError("unit") && (
          <p className="mt-1 text-sm text-red-600">{getError("unit")}</p>
        )}
      </FormField>

      {/* ===== QUANTITY ===== */}
      <FormField label="Số lượng">
        <TextInput
          type="number"
          name="quantity"
          value={String(formData.quantity)}
          onChange={handleChange}
          onBlur={handleBlur}
          min={0}
          step={1}
        />
        {getError("quantity") && (
          <p className="mt-1 text-sm text-red-600">{getError("quantity")}</p>
        )}
      </FormField>

      {/* ===== DESCRIPTION ===== */}
      <FormField label="Mô tả">
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ghi chú thêm..."
        />
        {getError("description") && (
          <p className="mt-1 text-sm text-red-600">{getError("description")}</p>
        )}
      </FormField>

      {/* ===== IMAGE ===== */}
      <FormField label="Hình ảnh">
        <ImageInput
          value={previewUrl}
          onChange={(file) => {
            setFormData((prev) => {
              const next = {
                ...prev,
                imageFile: file,
                imageUrl: file ? null : prev.imageUrl,
              };
              // nếu muốn validate ảnh realtime khi touched
              if (touched.imageFile || touched.imageUrl) {
                const nextErrors = validate(next);
                setErrors((prevErr) => ({
                  ...prevErr,
                  imageFile: nextErrors.imageFile,
                  imageUrl: nextErrors.imageUrl,
                }));
              }
              return next;
            });
          }}
        />
        {(getError("imageFile") || getError("imageUrl")) && (
          <p className="mt-1 text-sm text-red-600">
            {getError("imageFile") ?? getError("imageUrl")}
          </p>
        )}
      </FormField>
    </BaseEntityFormModal>
  );
}
