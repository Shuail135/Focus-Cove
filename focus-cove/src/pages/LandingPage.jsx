import React from "react";
import { motion } from "framer-motion";
import { TimerReset, BarChart3, Heart } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function LandingPage({ goTo }) {
    const cards = [
        {
            title: "Study Timer",
            desc: "Use the Pomodoro technique to stay focused with customizable work and break intervals.",
            action: "Start Studying",
            icon: TimerReset,
            target: "study",
        },
        {
            title: "Track Progress",
            desc: "Visualize your study sessions and celebrate your achievements along the way.",
            action: "View Progress",
            icon: BarChart3,
            target: "progress",
        },
        {
            title: "Wellness Hub",
            desc: "Find tips and resources to manage stress and beat procrastination effectively.",
            action: "Explore Wellness",
            icon: Heart,
            target: "wellness",
        },
    ];

    return (
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 text-white md:pt-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center">
                    <div className="text-5xl font-semibold tracking-tight md:text-6xl">
                        ✧ Welcome to Focus Cove ✧
                    </div>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
                        Your cozy corner for productive studying and mindful breaks. Manage your
                        workload, track your progress, and take care of your wellbeing—all in one
                        peaceful place.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <GlassCard key={card.title} className="p-5">
                                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                                    <Icon className="h-5 w-5 text-white/90" />
                                </div>
                                <h3 className="text-2xl font-medium">{card.title}</h3>
                                <p className="mt-3 min-h-[108px] text-base leading-8 text-white/60">
                                    {card.desc}
                                </p>
                                <button
                                    onClick={() => goTo(card.target)}
                                    className="mt-4 w-full rounded-xl bg-[#a5a8d3] px-4 py-3 text-sm font-medium text-[#262764] transition hover:brightness-105"
                                >
                                    {card.action}
                                </button>
                            </GlassCard>
                        );
                    })}
                </div>

                <GlassCard className="mt-7 p-5">
                    <h4 className="text-2xl font-medium">Daily Reminder</h4>
                    <p className="mt-3 text-base leading-8 text-white/60">
                        “Progress, not perfection. Every study session counts, no matter how small.
                        Take breaks, stay hydrated, and remember to be kind to yourself.” 🌿
                    </p>
                </GlassCard>
            </motion.div>
        </div>
    );
}