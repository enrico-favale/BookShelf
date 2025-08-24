import { Star } from "lucide-react";

export default function BookCard({
  bookId = "",
  thumbnail = "no_cover_thumb.gif",
  title = "",
  author = "",
  rating = "",
  state = "Whishlist",
}) {
  return (
    <div className="flex bg-gradient-card rounded-lg border transition-all duration-300 hover:scale-105">
      <img src={thumbnail} className=" h-44 object-cover rounded-l-lg" />

      <div className="flex flex-col flex-1 p-2 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <h2 className="text-md font-bold text-muted-foreground">{author}</h2>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "text-accent fill-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({rating}/5)
              </span>
            </div>
          )}

        </div> 
          <div className="w-full inline-flex items-center justify-center bg-primary/90 text-white border border-ring rounded-md p-1 text-md font-bold">{state.toUpperCase()}</div>
      </div>
    </div>
  );
}
