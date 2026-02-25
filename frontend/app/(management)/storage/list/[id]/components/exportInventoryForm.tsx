"use client";

import { useState } from "react";

interface ExportInventoryFormProps {
  productId: string;
  onSuccess: () => void;
}

export default function ExportInventoryForm({
  productId,
  onSuccess,
}: ExportInventoryFormProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [receiver, setReceiver] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const payload = {
      productId,
      type: "OUT",
      quantity,
      receiver,
      note,
    };

    console.log("EXPORT INVENTORY PAYLOAD:", payload);

    // TODO: call API create inventory document (EXPORT)
    onSuccess();
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">
          Số lượng xuất
        </label>
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
        <label className="block text-sm font-medium mb-1">
          Người nhận
        </label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Tên người / bộ phận nhận"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ghi chú</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          rows={3}
        />
      </div>

      <button type="submit" onClick={handleSubmit} hidden />
    </>
  );
}
