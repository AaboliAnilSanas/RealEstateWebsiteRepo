import React, { useEffect } from "react";

const toastStyles = {
  success: {
    borderLeft: "5px solid #16A34A",
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Success",
  },
  error: {
    borderLeft: "5px solid #DC2626",
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
    title: "Error",
  },
};

export default function Toast({ type = "success", message, onClose }) {
  const style = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        width: "320px",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "white",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        ...style
      }}
    >
      <div
        style={{
          minWidth: "34px",
          height: "34px",
          borderRadius: "50%",
          background: style.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: style.iconColor,
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {type === "success" ? "✓" : "!"}
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>{style.title}</p>
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#555" }}>
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#888",
        }}
      >
        ×
      </button>
    </div>
  );
}
