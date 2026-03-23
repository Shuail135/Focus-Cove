export default function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`bg-[#272757] rounded-xl p-4 shadow-lg ${className}`}
        >
            {children}
        </div>
    );
}