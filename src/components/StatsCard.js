export default function StatsCard ({ number = '', description = '', className = ''}) {
    return (
        <div
            className={`bg-gradient-card shadow-card rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        >
            <div className="p-6 text-center ">
                <div className="text-3xl font-bold text-primary mb-2">{number}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
            </div>
        </div>
    );
}