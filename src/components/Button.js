// src/components/Button.js
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center hover:bg-primary/90 dark:hover:bg-primary/90 hover:text-white hover:scale-105 border border-ring rounded-md p-2 text-xl px-4 bg-card text-card-foreground hover:shadow-card transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
