// FeatureCard.js
export default function FeatureCard ({ icon: Icon, title, description, className = "" }) {
    return(
        <div className="text-center p-8 bg-gradient-card rounded-lg border bg-card text-card-foreground hover:scale-110 transition-all duration-300">
            <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    {Icon && <Icon className="h-8 w-8 text-primary-foreground" />}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
