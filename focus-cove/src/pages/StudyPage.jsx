import React, { useEffect, useState } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const tips = [
    "Find a quiet, comfortable space",
    "Silence notifications",
    "Stay hydrated",
    "Stretch during breaks",
];

export default function StudyPage({ sessions, onCompleteSession }) {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    onCompleteSession(25);
                    return 25 * 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning, onCompleteSession]);

    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");
    const progress = ((25 * 60 - secondsLeft) / (25 * 60)) * 100;

    return (
        <div className="min-h-screen bg-[#505081] px-6 pb-20 pt-10 text-white">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Study Timer
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            Stay focused with the Pomodoro technique
                        </p>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-[1.5fr_0.8fr]">
                        <GlassCard className="p-6 bg-[#2c2f73]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-2xl font-medium">Focus Time 📚</div>
                                    <div className="mt-2 text-sm text-white/55">
                                        Stay focused and avoid distractions
                                    </div>
                                </div>

                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/80">
                                    <Settings className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <div
                                    className="relative grid h-64 w-64 place-items-center rounded-full"
                                    style={{
                                        background: `conic-gradient(#080c71 ${progress}%, rgba(255,255,255,0.12) ${progress}% 100%)`,
                                    }}
                                >
                                    <div className="grid h-[190px] w-[190px] place-items-center rounded-full bg-[#2c2f73] shadow-inner">
                                        <div className="text-center">
                                            <div className="font-mono text-5xl tracking-wider">
                                                {mins}:{secs}
                                            </div>
                                            <div className="mt-2 text-xs text-white/45">
                                                Focus Mode
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setIsRunning((v) => !v)}
                                    className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-[#a5a8d3] px-4 py-2 text-sm font-medium text-[#252760] transition hover:brightness-105"
                                >
                                    <Play className="h-4 w-4" />
                                    {isRunning ? "Pause" : "Start"}
                                </button>

                                <button
                                    onClick={() => {
                                        setIsRunning(false);
                                        setSecondsLeft(25 * 60);
                                    }}
                                    className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Reset
                                </button>
                            </div>
                        </GlassCard>

                        <div className="space-y-5">
                            <GlassCard className="p-6 bg-[#2c2f73]">
                                <div className="text-xl font-medium">Today's Sessions</div>
                                <div className="mt-6 text-center text-5xl font-light">
                                    {sessions}
                                </div>
                                <div className="mt-2 text-center text-sm text-white/50">
                                    Completed focus sessions
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6 bg-[#2c2f73]">
                                <div className="text-xl font-medium">Quick Tips</div>
                                <ul className="mt-4 space-y-2 text-sm text-white/60">
                                    {tips.map((tip) => (
                                        <li key={tip} className="flex gap-3 leading-6">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}