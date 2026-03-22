import { Home, TimerReset, BarChart3, Heart } from "lucide-react";

const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Home },
    { id: "study", label: "Study", icon: TimerReset },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "wellness", label: "Wellness", icon: Heart },
];

export default function Navbar({ current, setCurrent }) {
    return (
        <div className="sticky top-0 z-20 bg-[#3b3b6c]/95 backdrop-blur-md">
            <div className="flex justify-between px-6 py-4 text-white">
                <div className="text-xl font-bold">Focus Cove</div>

                <div className="flex gap-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrent(item.id)}
                                className={`px-3 py-1 rounded ${
                                    current === item.id ? "bg-white/20" : ""
                                }`}
                            >
                                <Icon className="inline w-4 h-4 mr-1" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}