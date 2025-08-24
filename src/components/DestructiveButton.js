// src/components/Button.js
export default function DestructiveButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center text-white hover:scale-105 rounded-md p-2 text-md px-4 bg-red-600 text-card-foreground hover:shadow-card transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
