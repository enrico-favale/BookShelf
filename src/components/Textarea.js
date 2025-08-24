export default function Textarea({ id, placeholder = "", value = "", onChange = () => {}, className = "" }) {
  return (
    <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        id = {id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    >

    </textarea>
  );
}
