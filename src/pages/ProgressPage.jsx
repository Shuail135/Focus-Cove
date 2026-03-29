import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, CalendarDays } from "lucide-react";
import GlassCard from "../components/GlassCard";
import axios from "axios";
import { toast } from "sonner";
import { getOrCreateUser } from "../utils/device";

function MetricCard({ title, value, sub, icon: Icon }) {
    return (
        <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-medium text-white/90">{title}</div>
                <Icon className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-7 text-6xl font-light">{value}</div>
            <div className="mt-2 text-sm text-white/45">{sub}</div>
        </GlassCard>
    );
}

export default function ProgressPage() {
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [last7Days, setLast7Days] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        async function fetchProgress() {
            try {
                const user = await getOrCreateUser();

                const response = await axios.get(
                    `${API_BASE}/progress/${user.user_id}`
                );

                setTotalMinutes(response.data.totalMinutes || 0);
                setSessions(response.data.sessions || 0);
                setStreak(response.data.streak || 0);
                setBestStreak(response.data.bestStreak || 0);
                setLast7Days(response.data.last7Days || [0, 0, 0, 0, 0, 0, 0]);
            } catch (error) {
                console.error("Error loading progress:", error.response?.data || error.message);
                toast.error("Failed to load progress");
            } finally {
                setLoading(false);
            }
        }

        fetchProgress();
    }, []);

    const max = Math.max(...last7Days, 30);

    const dayLabels = last7Days.map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString("en-US", { weekday: "short" });
    });

    const milestone =
        sessions === 0
            ? "Ready to Begin! 👋"
            : sessions < 5
                ? "Building Momentum ✨"
                : "Consistency in Motion 🌟";

    if (loading) {
        return (
            <div className="px-6 pb-20 pt-0 text-white">
                <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    Loading progress...
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pb-20 pt-0 text-white">
            <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <div>
                        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Your Progress
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            Track your study journey and celebrate your wins
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-4">
                        <MetricCard
                            title="Total Sessions"
                            value={sessions}
                            sub={`${totalMinutes} minutes studied`}
                            icon={CalendarDays}
                        />
                        <MetricCard
                            title="Current Streak"
                            value={streak}
                            sub="days in a row"
                            icon={Flame}
                        />
                        <MetricCard
                            title="Best Streak"
                            value={bestStreak}
                            sub="personal record"
                            icon={Trophy}
                        />
                        <div className="rounded-xl bg-[#6b6b96] p-6 text-white shadow-[0_16px_40px_rgba(18,18,60,0.18)]">
                            <div className="text-lg font-medium text-white/90">Milestone</div>
                            <div className="mt-6 text-lg md:text-xl font-medium leading-tight text-white">
                                {milestone}
                            </div>
                        </div>
                    </div>

                    <GlassCard className="mt-6 p-6">
                        <div className="text-2xl font-medium">Last 7 Days</div>
                        <div className="mt-2 text-white/50">Your daily study time in minutes</div>

                        <div className="mt-8 h-[320px] rounded-xl border border-white/10 bg-[#272757] p-6">
                            {last7Days.every((v) => v === 0) ? (
                                <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
                                    <CalendarDays className="h-12 w-12" />
                                    <div className="mt-4 text-2xl">No study sessions yet</div>
                                    <div className="mt-2 text-base">
                                        Complete a focus session to see your progress!
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-end gap-4">
                                    {last7Days.map((value, i) => {
                                        const heightPercent =
                                            value === 0
                                                ? 12
                                                : Math.max((value / max) * 100, 22);

                                        return (
                                            <div key={i} className="flex flex-1 flex-col items-center gap-3">
                                                <div className="text-sm text-white/55 font-medium">
                                                    {value}m
                                                </div>

                                                <div className="flex h-[220px] w-full items-end rounded-2xl bg-white/5 p-2">
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0.7 }}
                                                        animate={{
                                                            height: `${heightPercent}%`,
                                                            opacity: 1,
                                                        }}
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        title={`${value} minutes`}
                                                        className={`w-full rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${
                                                            value === 0
                                                                ? "bg-white/20"
                                                                : "bg-gradient-to-t from-[#8f95d8] via-[#a8ace6] to-[#d6d8ff]"
                                                        }`}
                                                    />
                                                </div>

                                                <div className="text-sm text-white/55 font-medium">
                                                    {dayLabels[i]}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard className="mt-6 p-6">
                        <div className="text-2xl font-medium">Keep Going! 🌟</div>
                        <div className="mt-3 text-white/55">
                            {sessions === 0
                                ? "Start your first study session to begin tracking your progress. Remember, every expert was once a beginner!"
                                : "You are building a rhythm. Keep showing up, even on low-energy days. Small sessions still count."}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}