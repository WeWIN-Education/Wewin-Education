"use client";

import { useState } from "react";

interface ImportInventoryFormProps {
  productId: string;
  onSuccess: () => void;
}

export default function ImportInventoryForm({
  productId,
  onSuccess,
}: ImportInventoryFormProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);
  const [supplier, setSupplier] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const payload = {
      productId,
      type: "IN",
      quantity,
      price,
      vat,
      supplier,
      note,
    };

    console.log("IMPORT INVENTORY PAYLOAD:", payload);

    // TODO: call API create inventory document (IMPORT)
    onSuccess();
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Số lượng nhập</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Giá ước tính</label>
        <input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Giá VAT</label>
        <input
          type="number"
          min={0}
          value={vat}
          onChange={(e) => setVat(Number(e.target.value))}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nhà cung cấp</label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="VD: Công ty Văn Phòng Phẩm ABC"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ghi chú</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          rows={8}
        />
      </div>

      {/* submit trigger cho BaseEntityFormModal */}
      <button type="submit" onClick={handleSubmit} hidden />
    </>
  );
}
