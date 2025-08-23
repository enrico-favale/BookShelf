export default function Label ({children, forId = '', className = ''}) {
  return (
      <label
        for = {forId}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      >
        {children}
      </label>
  );
}