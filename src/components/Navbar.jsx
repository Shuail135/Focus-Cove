import { Home, TimerReset, BarChart3, Heart } from "lucide-react";
import translations from "../translations";

const NAV_ITEMS = [
    { id: "home", key: "home", icon: Home },
    { id: "study", key: "study", icon: TimerReset },
    { id: "progress", key: "progress", icon: BarChart3 },
    { id: "wellness", key: "wellness", icon: Heart },
];

export default function Navbar({ current, setCurrent, lang, setLang }) {
    const t = translations[lang];

    return (
        <div className="sticky top-0 z-20 bg-[#3b3b6c]/95 backdrop-blur-md">
            <div className="flex justify-between px-6 py-4 text-white">
                <div className="text-xl font-bold">Focus Cove</div>

                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setLang(lang === "en" ? "fr" : "en")}
                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                    >
                        {lang === "en" ? "FR" : "EN"}
                    </button>

                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrent(item.id)}
                                className={`min-w-[70px] px-3 py-1 rounded flex items-center justify-center ${
                                    current === item.id ? "bg-white/20" : "hover:bg-white/10"
                                }`}
                            >
                                <Icon className="inline w-4 h-4 mr-1" />
                                {t.nav[item.key]}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}