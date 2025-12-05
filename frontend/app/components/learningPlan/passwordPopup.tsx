import React, { useRef, useState } from "react";

interface PasswordPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (input: string) => void;
  error: boolean;
}

export default function PasswordPopup({ open, onClose, onConfirm, error }: PasswordPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleConfirm = () => {
    const value = inputRef.current?.value || "";
    onConfirm(value);
  };

  return (
    <div className="popup-overlay" style={{ display: open ? "flex" : "none" }}>
      <div className="popup-box">
        <h2>Nhập mật khẩu</h2>
        <input type="password" ref={inputRef} placeholder="Mật khẩu..." />
        <div className="popup-actions">
          <button onClick={onClose}>Hủy</button>
          <button onClick={handleConfirm}>Xác nhận</button>
        </div>
        {error && <p style={{ color: "red" }}>Sai mật khẩu!</p>}
      </div>
    </div>
  );
}
