export default function SelectStatus({ value = "", onValueChange = () => {}, className = "" }) {
  return (
    <select
      name="status"
      id="status"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <option value="wishlist">📋 Wishlist</option>
      <option value="reading">📖 Leggendo</option>
      <option value="finished">✅ Finito</option>
      <option value="dropped">❌ Droppato</option>
    </select>
  );
}
