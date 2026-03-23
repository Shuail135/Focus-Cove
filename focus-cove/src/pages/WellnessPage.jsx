import { Hammer, LaptopMinimalCheck, Scale, Timer, Toolbox, Trophy, Users } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import {
    Heart,
    Brain,
    Coffee,
    ChevronDown,
    Wind,
    Moon,
    Droplets,
    Dumbbell,
    BookOpen,
    Sparkles,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const stressItems = [
    {
        title: "Practice Deep Breathing",
        icon: Wind,
        body: "Inhale for four seconds, hold briefly, and exhale slowly. A few calm cycles can help reset your focus before returning to work.",
    },
    {
        title: "Take Regular Breaks",
        icon: Coffee,
        body: "Short pauses protect your concentration. Step away from the screen, loosen your shoulders, and let your mind reset.",
    },
    {
        title: "Stay Hydrated",
        icon: Droplets,
        body: "Keep water nearby during study sessions. Dehydration can quietly worsen fatigue, headaches, and reduced concentration.",
    },
    {
        title: "Get Quality Sleep",
        icon: Moon,
        body: "Sleep is part of studying, not a reward after it. Better rest supports memory, emotional balance, and steadier performance.",
    },
    {
        title: "Exercise Regularly",
        icon: Dumbbell,
        body: "Even a short walk or stretch can improve energy and mood. Movement helps break the cycle of tension and procrastination.",
    },
];

const procrastinationItems = [
    {
        title: "Break Large Tasks into Small Steps",
        icon: Hammer,
        body: "Large tasks feel overwhelming. Break them down into 5-10 minute chunks. Starting is often the hardest part!",
    },
    {
        title: "Use the 2-Minute Rule",
        icon: Scale,
        body: "If a task takes less than 2 minutes, do it immediately. This builds momentum and reduces your mental load.",
    },
    {
        title: "Eliminate Distractions",
        icon: LaptopMinimalCheck,
        body: "Put your phone in another room, use website blockers, or study in a quiet space. Make it easy to focus.",
    },
    {
        title: "Set Clear Intentions",
        icon: Toolbox,
        body: "Before each study session, write down exactly what you want to accomplish. Specific goals are more motivating.",
    },
    {
        title: "Reward Yourself",
        icon: Trophy,
        body: "After completing a task, give yourself a small reward. This creates positive associations with productivity.",
    },
];

export default function WellnessPage() {
    const [tab, setTab] = useState("stress");
    const [openIndex, setOpenIndex] = useState(0);

    const featureCards = [
        {
            title: "5-Minute Meditation",
            body: "Sit comfortably, close your eyes, and focus on your breath. When your mind wanders, gently bring it back. Even 5 minutes can help clear mental fog.",
            icon: Brain,
        },
        {
            title: "Gratitude Journaling",
            body: "Write down 3 things you're grateful for each day. This simple practice can shift your mindset and reduce anxiety.",
            icon: Heart,
        },
        {
            title: "Mindful Breaks",
            body: "During breaks, fully disconnect from studying. Go for a walk, make tea, or do gentle stretches. Be present in the moment.",
            icon: Coffee,
        },
    ];
    const slide = tab === "stress" ? stressItems : procrastinationItems;

    return (
        <div className="px-6 pb-20 pt-0 text-white">

            {/* Purple background section */}
            <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

                    {/* Header */}
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Wellness Hub
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            Take care of your mind and body while you study
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {featureCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <GlassCard key={card.title} className="p-5">
                                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                                        <Icon className="h-5 w-5 text-white/90" />
                                    </div>
                                    <div className="text-xl font-medium">{card.title}</div>
                                    <div className="mt-3 text-sm leading-7 text-white/60">
                                        {card.body}
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 flex overflow-hidden rounded-full bg-white/20 p-1 text-sm text-white">
                        <button
                            onClick={() => setTab("stress")}
                            className={`flex-1 rounded-full px-5 py-2 transition ${
                                tab === "stress" ? "bg-[#272757]" : "text-white/80"
                            }`}
                        >
                            Stress Management
                        </button>
                        <button
                            onClick={() => setTab("procrastination")}
                            className={`flex-1 rounded-full px-5 py-2 transition ${
                                tab === "procrastination" ? "bg-[#272757]" : "text-white/80"
                            }`}
                        >
                            Beat Procrastination
                        </button>
                    </div>

                    {/* Accordion section */}
                    <GlassCard className="mt-6 p-6">
                        <div className="text-xl font-medium">
                            {tab === "stress"
                                ? "Managing Academic Stress"
                                : "Beating Procrastination"}
                        </div>

                        <div className="mt-2 text-sm text-white/50">
                            {tab === "procrastination"
                                ? "Practical strategies to stay calm and focused during demanding times"
                                : "Gentle ways to start tasks, reduce overwhelm, and build momentum"}
                        </div>

                        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#272757]">
                            {slide.map((item, idx) => {
                                const Icon = item.icon;
                                const isOpen = openIndex === idx;

                                return (
                                    <div key={item.title} className="border-b border-white/10 last:border-b-0">
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                            className="flex w-full items-center justify-between px-5 py-4 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-4 w-4 text-white/70" />
                                                <span className="text-sm font-medium">
                                                    {item.title}
                                                </span>
                                            </div>

                                            <ChevronDown
                                                className={`h-4 w-4 text-white/60 transition ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <div className="px-5 pb-5 text-sm text-white/60 leading-7">
                                                        {item.body}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>

                    {/* Bottom cards */}
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <GlassCard className="p-5">
                            <div className="flex items-center gap-3 text-lg font-medium">
                                <BookOpen className="h-5 w-5" /> Remember
                            </div>
                            <p className="mt-3 text-sm text-white/60 leading-7">
                                Your worth isn't defined by your grades or productivity.
                                Taking care of yourself isn't selfish—it's essential for
                                sustainable success.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-5">
                            <div className="flex items-center gap-3 text-lg font-medium">
                                <Users className="h-5 w-5 text-white/80" />
                                You're Not Alone
                            </div>
                            <p className="mt-3 text-sm text-white/60 leading-7">
                                Every student faces challenges. If you're struggling,
                                reach out to friends or support services.
                            </p>
                        </GlassCard>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}