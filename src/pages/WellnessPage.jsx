import React, { useState } from "react";
import {
    Hammer,
    LaptopMinimalCheck,
    Scale,
    Toolbox,
    Trophy,
    Users,
    Heart,
    Brain,
    Coffee,
    ChevronDown,
    Wind,
    Moon,
    Droplets,
    Dumbbell,
    BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

export default function WellnessPage({ t }) {
    const [tab, setTab] = useState("stress");
    const [openIndex, setOpenIndex] = useState(0);

    const stressItems = [
        {
            title: t.wellness.stressItems.breathing.title,
            icon: Wind,
            body: t.wellness.stressItems.breathing.body,
        },
        {
            title: t.wellness.stressItems.breaks.title,
            icon: Coffee,
            body: t.wellness.stressItems.breaks.body,
        },
        {
            title: t.wellness.stressItems.hydration.title,
            icon: Droplets,
            body: t.wellness.stressItems.hydration.body,
        },
        {
            title: t.wellness.stressItems.sleep.title,
            icon: Moon,
            body: t.wellness.stressItems.sleep.body,
        },
        {
            title: t.wellness.stressItems.exercise.title,
            icon: Dumbbell,
            body: t.wellness.stressItems.exercise.body,
        },
    ];

    const procrastinationItems = [
        {
            title: t.wellness.procrastinationItems.smallSteps.title,
            icon: Hammer,
            body: t.wellness.procrastinationItems.smallSteps.body,
        },
        {
            title: t.wellness.procrastinationItems.twoMinuteRule.title,
            icon: Scale,
            body: t.wellness.procrastinationItems.twoMinuteRule.body,
        },
        {
            title: t.wellness.procrastinationItems.distractions.title,
            icon: LaptopMinimalCheck,
            body: t.wellness.procrastinationItems.distractions.body,
        },
        {
            title: t.wellness.procrastinationItems.intentions.title,
            icon: Toolbox,
            body: t.wellness.procrastinationItems.intentions.body,
        },
        {
            title: t.wellness.procrastinationItems.reward.title,
            icon: Trophy,
            body: t.wellness.procrastinationItems.reward.body,
        },
    ];

    const featureCards = [
        {
            title: t.wellness.featureCards.meditation.title,
            body: t.wellness.featureCards.meditation.body,
            icon: Brain,
        },
        {
            title: t.wellness.featureCards.gratitude.title,
            body: t.wellness.featureCards.gratitude.body,
            icon: Heart,
        },
        {
            title: t.wellness.featureCards.mindfulBreaks.title,
            body: t.wellness.featureCards.mindfulBreaks.body,
            icon: Coffee,
        },
    ];

    const slide = tab === "stress" ? stressItems : procrastinationItems;

    return (
        <div className="px-6 pb-20 pt-0 text-white">
            <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:px-8">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center">
                        <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                            {t.wellness.title}
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            {t.wellness.subtitle}
                        </p>
                    </div>

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

                    <div className="mt-6 flex overflow-hidden rounded-full bg-white/20 p-1 text-sm text-white">
                        <button
                            onClick={() => {
                                setTab("stress");
                                setOpenIndex(0);
                            }}
                            className={`flex-1 rounded-full px-5 py-2 transition ${
                                tab === "stress" ? "bg-[#272757]" : "text-white/80"
                            }`}
                        >
                            {t.wellness.stressTab}
                        </button>
                        <button
                            onClick={() => {
                                setTab("procrastination");
                                setOpenIndex(0);
                            }}
                            className={`flex-1 rounded-full px-5 py-2 transition ${
                                tab === "procrastination" ? "bg-[#272757]" : "text-white/80"
                            }`}
                        >
                            {t.wellness.procrastinationTab}
                        </button>
                    </div>

                    <GlassCard className="mt-6 p-6">
                        <div className="text-xl font-medium">
                            {tab === "stress"
                                ? t.wellness.stressTitle
                                : t.wellness.procrastinationTitle}
                        </div>

                        <div className="mt-2 text-sm text-white/50">
                            {tab === "stress"
                                ? t.wellness.stressDesc
                                : t.wellness.procrastinationDesc}
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
                                                    <div className="px-5 pb-5 text-sm leading-7 text-white/60">
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

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <GlassCard className="p-5">
                            <div className="flex items-center gap-3 text-lg font-medium">
                                <BookOpen className="h-5 w-5" />
                                {t.wellness.rememberTitle}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-white/60">
                                {t.wellness.rememberText}
                            </p>
                        </GlassCard>

                        <GlassCard className="p-5">
                            <div className="flex items-center gap-3 text-lg font-medium">
                                <Users className="h-5 w-5 text-white/80" />
                                {t.wellness.notAloneTitle}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-white/60">
                                {t.wellness.notAloneText}
                            </p>
                        </GlassCard>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}